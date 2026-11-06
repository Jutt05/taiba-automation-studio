/**
 * WordPress entry point. Renders the exact same 11 components as src/routes/index.tsx,
 * without TanStack Start / the server runtime, inside a Shadow DOM so the WordPress
 * theme and Elementor CSS cannot affect the page (and the page CSS cannot leak out).
 */
import { MotionConfig } from "motion/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BeforeAfter } from "@/components/ai/BeforeAfter";
import { Chatbots } from "@/components/ai/Chatbots";
import { Faq } from "@/components/ai/Faq";
import { FinalCta } from "@/components/ai/FinalCta";
import { Header } from "@/components/ai/Header";
import { Hero } from "@/components/ai/Hero";
import { Industries } from "@/components/ai/Industries";
import { Overview } from "@/components/ai/Overview";
import { PainPoints } from "@/components/ai/PainPoints";
import { Process } from "@/components/ai/Process";
import { Tools } from "@/components/ai/Tools";
import { Workflows } from "@/components/ai/Workflows";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import css from "../../src/styles.css?inline";

function SmoothScroll() {
  useSmoothScroll();
  return null;
}

function Page({ header, smooth }: { header: boolean; smooth: boolean }) {
  return (
    <MotionConfig reducedMotion="user">
      {smooth ? <SmoothScroll /> : null}
      {header ? <Header /> : null}
      <main>
        <Hero />
        <Overview />
        <PainPoints />
        <Chatbots />
        <Workflows />
        <BeforeAfter />
        <Tools />
        <Process />
        <Industries />
        <Faq />
        <FinalCta />
      </main>
    </MotionConfig>
  );
}

/* ---- CSS handling ------------------------------------------------------------------ */
// Tailwind v4 registers its --tw-* defaults with @property, which browsers ignore inside a
// shadow root, so those rules are also placed once on the document.
const atProperty = (css.match(/@property\s+--[\w-]+\s*\{[^}]*\}/g) ?? []).join("");
// :root variables must target the shadow host instead.
const shadowCss = css.replace(/:root\b/g, ":host");

const HOST_CSS = `
:host{display:block;position:relative;background-color:var(--background);color:var(--foreground);
font-family:var(--font-sans);overflow-x:clip;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
`;

// Lenis' own helper rules live on <html>, outside the shadow root.
const DOC_CSS = `${atProperty}
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
.lenis.lenis-stopped{overflow:hidden}
.lenis.lenis-smooth iframe{pointer-events:none}`;

function injectDocumentCss() {
  if (document.getElementById("taiba-ai-doc-css")) return;
  const s = document.createElement("style");
  s.id = "taiba-ai-doc-css";
  s.textContent = DOC_CSS;
  document.head.appendChild(s);
}

function mount(host: HTMLElement) {
  if (host.dataset.taibaMounted) return;
  host.dataset.taibaMounted = "1";
  injectDocumentCss();
  const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = shadowCss + HOST_CSS;
  const mountPoint = document.createElement("div");
  shadow.append(style, mountPoint);
  createRoot(mountPoint).render(
    <StrictMode>
      <Page header={host.dataset.header === "yes"} smooth={host.dataset.smooth !== "no"} />
    </StrictMode>,
  );
}

function mountAll() {
  document.querySelectorAll<HTMLElement>("[data-taiba-ai-automation]").forEach(mount);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountAll);
else mountAll();

// Elementor's editor can inject the shortcode output after load.
new MutationObserver(mountAll).observe(document.documentElement, { childList: true, subtree: true });
