import { motion, useScroll, useTransform } from "motion/react";
import { Bot, Sparkles } from "lucide-react";
import { useRef } from "react";
import aiEmployee from "@/assets/ai-employee.jpg";
import { overview } from "@/content/ai-automation";
import { ScrollFillText, SplitReveal } from "./motion";

export function Overview() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["circle(14% at 50% 50%)", "circle(72% at 50% 50%)"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 0]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      aria-labelledby="overview-title"
      className="noise relative z-10 -mt-24 overflow-hidden rounded-t-[3rem] bg-gradient-ink pb-28 pt-24 text-ink-foreground md:-mt-32 md:rounded-t-[5rem] md:pb-40 md:pt-36"
    >
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SplitReveal
            id="overview-title"
            text={overview.title}
            className="font-display text-[clamp(2.6rem,5.6vw,6.2rem)] leading-[0.92]"
            wordClassName={(_, i) => (i === 2 || i === 3 ? "text-primary-glow" : undefined)}
          />
        </div>

        <div className="relative lg:col-span-5">
          <motion.div style={{ rotate }} className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <motion.div style={{ rotate: ringRotate }} aria-hidden="true" className="absolute -inset-6">
              <svg viewBox="0 0 200 250" className="h-full w-full">
                <rect x="2" y="2" width="196" height="246" rx="98" fill="none" className="stroke-primary/60" strokeDasharray="2 7" />
              </svg>
            </motion.div>
            <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden rounded-[999px]">
              <motion.img
                style={{ scale: imgScale }}
                src={aiEmployee}
                alt="Team member supported by AI chat assistants"
                width={1280}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div aria-hidden="true" className="absolute -left-6 top-[16%] grid h-16 w-16 animate-float place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
              <Bot className="h-7 w-7" />
            </div>
            <div aria-hidden="true" className="absolute -right-4 bottom-[14%] grid h-12 w-12 animate-float-slow place-items-center rounded-full bg-spark text-ink">
              <Sparkles className="h-5 w-5" />
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-10 lg:col-start-2 lg:mt-10">
          <ScrollFillText
            text={overview.body}
            className="text-[clamp(1.5rem,2.9vw,2.9rem)] font-medium leading-[1.25] tracking-tight"
          />
        </div>
      </div>
    </section>
  );
}
