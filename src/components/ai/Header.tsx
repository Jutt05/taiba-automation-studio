import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { LINKS, hero } from "@/content/ai-automation";
import { CtaButton, Logo } from "./brand";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 400);
    setScrolled(v > 40);
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-primary"
      />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto mt-3 flex max-w-[1500px] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6",
            scrolled ? "mx-3 bg-background/75 shadow-soft backdrop-blur-xl md:mx-auto md:w-[calc(100%-3rem)]" : "w-full",
          )}
        >
          <a href="/" aria-label="TAIBA Creations" className="text-foreground">
            <Logo />
          </a>
          <CtaButton href={LINKS.booking} variant="ink" bubble className="hidden px-5 py-2.5 text-sm sm:inline-flex md:text-base">
            {hero.primary}
          </CtaButton>
        </div>
      </motion.header>
    </>
  );
}
