/**
 * Separate Vite build for the WordPress embed.
 * Does NOT touch the original Lovable/TanStack build (vite.config.ts stays as is).
 *
 * Run from the project root:
 *   npx vite build --config wordpress-export/vite.wp.config.ts
 *
 * Output: wordpress-export/taiba-ai-automation/assets/  (taiba-ai.js + images)
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const src = path.resolve(root, "src");
const posix = (p: string) => p.split(path.sep).join("/");

/**
 * Every `import x from "@/assets/foo.jpg"` becomes a tiny module that returns
 * window.TAIBA_CONTENT.images["foo"] (set from WordPress) or the bundled default.
 * Components stay untouched.
 */
function wpImageOverride(): Plugin {
  const PREFIX = "\0taiba-img:";
  return {
    name: "taiba-wp-image-override",
    enforce: "pre",
    resolveId(source) {
      if (source.includes("?")) return null;
      const m = posix(source).match(/\/src\/assets\/([^/]+)\.jpg$/) ?? source.match(/^@\/assets\/([^/]+)\.jpg$/);
      return m ? PREFIX + m[1] : null;
    },
    load(id) {
      if (!id.startsWith(PREFIX)) return null;
      const key = id.slice(PREFIX.length);
      const file = posix(path.resolve(src, "assets", `${key}.jpg`));
      return `import url from ${JSON.stringify(file + "?url")};
const o = (typeof window !== "undefined" && window.TAIBA_CONTENT && window.TAIBA_CONTENT.images) || {};
export default (o[${JSON.stringify(key)}] || url);`;
    },
  };
}

export default defineConfig({
  root,
  base: "./", // asset URLs are resolved with import.meta.url, so the plugin folder can live anywhere
  publicDir: false,
  plugins: [react(), tailwindcss(), wpImageOverride()],
  resolve: {
    alias: [
      // original copy file (used by the runtime merge wrapper)
      { find: "taiba-original-content", replacement: path.resolve(src, "content/ai-automation.ts") },
      // every component imports content from here -> swap for the WordPress-aware wrapper
      { find: /^@\/content\/ai-automation$/, replacement: path.resolve(here, "src/content-runtime.ts") },
      { find: /^@\//, replacement: posix(src) + "/" },
    ],
  },
  build: {
    outDir: path.resolve(here, "taiba-ai-automation/assets"),
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: false,
    assetsInlineLimit: 0, // keep images as real files so WordPress can serve/cache them
    rollupOptions: {
      input: path.resolve(here, "src/main.tsx"),
      output: {
        format: "es",
        entryFileNames: "taiba-ai.js",
        chunkFileNames: "chunk-[name].js",
        assetFileNames: "[name][extname]",
      },
    },
  },
});
