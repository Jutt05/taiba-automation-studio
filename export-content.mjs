// Regenerates taiba-ai-automation/default-content.json from src/content/ai-automation.ts.
// Needs Node 22.6+:  node --experimental-strip-types wordpress-export/scripts/export-content.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const mod = await import(path.resolve(here, "../../src/content/ai-automation.ts"));
const out = path.resolve(here, "../taiba-ai-automation/default-content.json");
writeFileSync(out, JSON.stringify({ ...mod }, null, 2));
console.log("written", out);
