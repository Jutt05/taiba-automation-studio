import { motion, useScroll, useTransform } from "motion/react";
import { CalendarCheck, Database, MessageSquareText, PhoneCall, Workflow } from "lucide-react";
import { useRef } from "react";
import aiCore from "@/assets/ai-core.jpg";
import { LINKS, hero } from "@/content/ai-automation";
import { CtaButton, StarGlyph } from "./brand";
import { EASE, Magnetic, SplitReveal } from "./motion";

// word indices of "AI Employee" in the hero title
const ACCENT = new Set([4, 5]);

const chips = [
  { Icon: MessageSquareText, pos: "left-[2%] top-[18%]", delay: 0.9, float: "animate-float" },
  { Icon: PhoneCall, pos: "right-[0%] top-[6%]", delay: 1.05, float: "animate-float-slow" },
  { Icon: CalendarCheck, pos: "right-[-2%] bottom-[22%]", delay: 1.2, float: "animate-float" },
  { Icon: Database, pos: "left-[8%] bottom-[6%]", delay: 1.35, float: "animate-float-slow" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden pb-40 pt-28 md:pt-32 lg:pb-56">
      {/* blurred brand light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[15%] h-[55vw] w-[55vw] rounded-full bg-primary/35 blur-[120px] animate-blob" />
        <div className="absolute right-[20%] top-[30%] h-[28vw] w-[28vw] rounded-full bg-primary-glow/40 blur-[100px] animate-blob [animation-delay:-6s]" />
        <div className="absolute -left-[10%] bottom-[-10%] h-[30vw] w-[30vw] rounded-full bg-accent blur-[90px]" />
        <div className="absolute inset-0 grid-dots text-foreground opacity-40 [mask-image:radial-gradient(70%_60%_at_30%_40%,black,transparent)]" />
      </div>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-12">
        {/* Orb composition */}
        <motion.div
          style={{ y: orbY, scale: orbScale }}
          className="relative order-first mx-auto w-[78vw] max-w-[620px] lg:absolute lg:right-[2vw] lg:top-[9rem] lg:order-none lg:w-[40vw]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6, filter: "blur(30px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
            className="relative aspect-square"
          >
            <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute -inset-[8%] h-[116%] w-[116%] animate-spin-slow">
              <circle cx="200" cy="200" r="196" fill="none" className="stroke-primary/25" strokeDasharray="3 9" />
              <circle cx="200" cy="4" r="5" className="fill-primary" />
            </svg>
            <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute inset-[4%] h-[92%] w-[92%] animate-spin-slower">
              <ellipse cx="200" cy="200" rx="196" ry="120" fill="none" className="stroke-primary/30" strokeDasharray="60 20" />
              <circle cx="396" cy="200" r="5" className="fill-spark" />
            </svg>
            <motion.img
              style={{ rotate: orbRotate }}
              src={aiCore}
              alt="Glowing AI core with connected neural light trails"
              width={1280}
              height={1280}
              fetchPriority="high"
              className="relative h-full w-full rounded-full object-cover mix-blend-multiply"
            />
            {chips.map(({ Icon, pos, delay, float }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay }}
                className={`absolute ${pos}`}
              >
                <div className={`${float} grid h-14 w-14 place-items-center rounded-2xl border border-background/70 bg-background/70 text-primary shadow-soft backdrop-blur-md md:h-16 md:w-16`} style={{ animationDelay: `${-i * 1.7}s` }}>
                  <Icon className="h-6 w-6 md:h-7 md:w-7" />
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.5 }}
              className="absolute bottom-[38%] left-[-6%] hidden items-center gap-2 rounded-full bg-ink px-3 py-2 text-ink-foreground shadow-soft md:flex"
              aria-hidden="true"
            >
              <Workflow className="h-4 w-4 text-primary-glow" />
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-ink-foreground"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
                  />
                ))}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-8 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            <StarGlyph className="mb-4 text-[clamp(2.2rem,4.5vw,4.5rem)]" />
          </motion.div>
          <SplitReveal
            as="h1"
            text={hero.title}
            delay={0.25}
            stagger={0.05}
            className="font-display text-[clamp(2.9rem,6.6vw,7.4rem)] leading-[0.9] text-foreground"
            wordClassName={(_, i) => (ACCENT.has(i) ? "text-primary" : undefined)}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end lg:mt-14">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
              className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {hero.body}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <CtaButton href={LINKS.booking} variant="primary">
                {hero.primary}
              </CtaButton>
            </Magnetic>
            <Magnetic strength={0.2}>
              <CtaButton href={LINKS.caseStudies} variant="ghost">
                {hero.secondary}
              </CtaButton>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
