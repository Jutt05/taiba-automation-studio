import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
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
import { faqs } from "@/content/ai-automation";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const TITLE = "AI Automation, Chatbots & AI Employees | TAIBA Creations";
const DESCRIPTION =
  "Missed calls and slow replies can easily turn into lost sales. At TAIBA Creations, we build AI employees, voice agents, chatbots, and automated workflows.";

// The page ships no og:image, so hosting can inject the project's social preview.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: AiAutomationPage,
});

function AiAutomationPage() {
  useSmoothScroll();
  return (
    <MotionConfig reducedMotion="user">
      <Header />
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
