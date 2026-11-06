import { motion } from "motion/react";
import { Clock3, MoonStar, PhoneMissed, Unplug, PhoneOff } from "lucide-react";
import { pain } from "@/content/ai-automation";
import { EASE, SplitReveal } from "./motion";

const icons = [PhoneMissed, Clock3, Unplug, MoonStar];
// grid placement around the central visual
const placement = [
  "lg:col-start-1 lg:row-start-1 lg:text-right lg:items-end",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2 lg:text-right lg:items-end",
  "lg:col-start-3 lg:row-start-2",
];
const from = [-70, 70, -70, 70];

function SignalVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[380px]">
      {/* broken connection lines */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        {[
          "M200 200 L20 60",
          "M200 200 L380 60",
          "M200 200 L20 340",
          "M200 200 L380 340",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            className="stroke-spark"
            strokeWidth="2"
            strokeDasharray="6 10"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 0.62, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.3 + i * 0.15 }}
          />
        ))}
      </svg>
      {/* pulsing rings */}
      {[0, 0.8, 1.6].map((d) => (
        <span
          key={d}
          className="absolute inset-[34%] rounded-full border-2 border-spark/60 animate-ring"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="absolute inset-[34%] grid place-items-center rounded-full bg-ink text-spark shadow-soft"
      >
        <motion.div
          animate={{ rotate: [0, -14, 14, -10, 10, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1.6 }}
        >
          <PhoneOff className="h-12 w-12" />
        </motion.div>
      </motion.div>
      {/* stray missed dots */}
      {[
        "left-[12%] top-[30%]",
        "right-[14%] top-[22%]",
        "left-[22%] bottom-[14%]",
        "right-[10%] bottom-[30%]",
      ].map((p, i) => (
        <motion.span
          key={p}
          className={`absolute ${p} h-3 w-3 rounded-full bg-spark`}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}
    </div>
  );
}

export function PainPoints() {
  return (
    <section aria-labelledby="pain-title" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SplitReveal
          id="pain-title"
          text={pain.title}
          className="mx-auto max-w-6xl text-center font-display text-[clamp(2.5rem,6vw,6.6rem)] leading-[0.92]"
          wordClassName={(w) => (w === "Missed" || w === "Slow" ? "text-outline text-foreground" : undefined)}
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:mt-24 lg:grid-cols-[1fr_minmax(280px,380px)_1fr] lg:grid-rows-2 lg:gap-x-16 lg:gap-y-20">
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <SignalVisual />
          </div>
          {pain.points.map((point, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: from[i], filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 * i }}
                className={`group flex flex-col gap-5 ${placement[i]}`}
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-spark/60 text-foreground transition-all duration-500 group-hover:rotate-12 group-hover:bg-spark">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="max-w-md text-xl leading-snug text-foreground md:text-2xl">{point}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
