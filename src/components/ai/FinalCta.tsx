import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LINKS, finalCta } from "@/content/ai-automation";
import { AiCore, CtaButton, Logo, StarGlyph } from "./brand";
import { Magnetic, Reveal, SplitReveal } from "./motion";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const radius = useTransform(scrollYProgress, [0, 0.6], ["6rem", "0rem"]);
  const inset = useTransform(scrollYProgress, [0, 0.6], ["4vw", "0vw"]);
  const coreY = useTransform(scrollYProgress, [0, 1], [120, -40]);

  return (
    <section ref={ref} aria-labelledby="final-title" className="relative bg-background">
      <motion.div style={{ marginInline: inset, borderTopLeftRadius: radius, borderTopRightRadius: radius }} className="noise relative overflow-hidden bg-gradient-deep text-primary-foreground">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] top-[10%] h-[40vw] w-[40vw] rounded-full bg-primary-glow/30 blur-[120px] animate-blob" />
          <div className="absolute inset-0 grid-dots text-primary-foreground opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
        </div>

        <div className="relative mx-auto flex max-w-[1500px] flex-col items-center px-5 pb-16 pt-28 text-center md:px-10 md:pt-40">
          <motion.div style={{ y: coreY }} className="mb-10 w-40 md:w-56">
            <AiCore />
          </motion.div>
          <StarGlyph className="mb-6 text-5xl text-primary-foreground" />
          <SplitReveal
            id="final-title"
            text={finalCta.title}
            className="max-w-6xl font-display text-[clamp(2.8rem,7.4vw,8.4rem)] leading-[0.88]"
            wordClassName={(w) => (w === "AI" || w === "Employee?" ? "text-spark" : undefined)}
          />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 md:text-2xl">{finalCta.body}</p>
          </Reveal>
          <Reveal delay={0.45} className="mt-12">
            <Magnetic>
              <CtaButton href={LINKS.booking} variant="light" className="px-10 py-5 text-lg md:text-xl">
                {finalCta.button}
              </CtaButton>
            </Magnetic>
          </Reveal>

          <footer className="mt-28 flex w-full items-center justify-between border-t border-primary-foreground/20 pt-8 md:mt-40">
            <a href="https://taibacreations.com/" aria-label="TAIBA Creations" className="text-primary-foreground">
              <Logo />
            </a>
            <span aria-hidden="true" className="h-3 w-3 animate-pulse rounded-full bg-spark" />
          </footer>
        </div>
      </motion.div>
    </section>
  );
}
