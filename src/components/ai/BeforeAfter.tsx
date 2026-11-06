import { motion } from "motion/react";
import { CheckCircle2, Hourglass, Info, Zap } from "lucide-react";
import { example, type StepKind } from "@/content/ai-automation";
import { cn } from "@/lib/utils";
import { EASE, Reveal, SplitReveal } from "./motion";

const chip: Record<StepKind, string> = {
  Trigger: "border border-current/30",
  "Manual step": "bg-spark text-ink",
  Automatic: "bg-primary-foreground text-primary",
};

function Track({
  data,
  fast,
}: {
  data: typeof example.without;
  fast: boolean;
}) {
  const stepDelay = fast ? 0.18 : 0.75;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] p-7 md:p-12",
        fast ? "bg-gradient-deep text-primary-foreground shadow-glow" : "bg-muted text-foreground",
      )}
    >
      {fast && (
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl animate-blob" />
      )}
      <div className="relative flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-4xl leading-none md:text-5xl">{data.label}</h3>
          <p className={cn("mt-3 text-base md:text-lg", fast ? "text-primary-foreground/80" : "text-muted-foreground")}>{data.meta}</p>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "grid h-14 w-14 shrink-0 place-items-center rounded-full",
            fast ? "bg-primary-foreground text-primary" : "bg-background text-foreground",
          )}
        >
          {fast ? <Zap className="h-6 w-6" /> : <Hourglass className="h-6 w-6 animate-spin-slow" />}
        </span>
      </div>

      <ol className="relative mt-10 space-y-0">
        {/* track line */}
        <div aria-hidden="true" className={cn("absolute bottom-10 left-[15px] top-4 w-0.5", fast ? "bg-primary-foreground/20" : "bg-foreground/10")}>
          <motion.div
            className={cn("absolute inset-x-0 top-0 origin-top", fast ? "bg-primary-foreground" : "bg-foreground/50")}
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: stepDelay * 5, ease: fast ? EASE : "linear" }}
          />
        </div>
        {data.steps.map((s, i) => (
          <motion.li
            key={s.text + i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * stepDelay }}
            className="relative flex flex-wrap items-center gap-x-4 gap-y-2 pb-7 pl-12"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0.5 grid h-8 w-8 place-items-center rounded-full text-xs font-semibold",
                fast ? "bg-primary-foreground text-primary" : "bg-background text-foreground",
              )}
            >
              {i + 1}
            </span>
            <span className="text-lg md:text-xl">{s.text}</span>
            <span className={cn("rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider", chip[s.kind])}>{s.kind}</span>
          </motion.li>
        ))}
        <motion.li
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE, delay: data.steps.length * stepDelay }}
          className={cn(
            "relative flex items-center gap-3 rounded-2xl px-5 py-4 text-lg font-medium md:text-xl",
            fast ? "bg-primary-foreground text-primary" : "border border-dashed border-foreground/25",
          )}
        >
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          {data.outcome}
        </motion.li>
      </ol>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section aria-labelledby="example-title" className="relative bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SplitReveal
            id="example-title"
            text={example.title}
            className="font-display text-[clamp(2.5rem,5.6vw,6rem)] leading-[0.92] lg:col-span-8"
            wordClassName={(w) => (w === "Before" || w === "after:" ? "text-primary" : undefined)}
          />
          <Reveal delay={0.3} className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{example.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2 lg:gap-8">
          <Reveal y={60}>
            <Track data={example.without} fast={false} />
          </Reveal>
          <Reveal y={60} delay={0.15} className="lg:mt-16">
            <Track data={example.with} fast />
          </Reveal>
        </div>

        <Reveal className="mt-14 grid gap-6 border-t border-border pt-10 md:grid-cols-2 md:gap-12">
          <p className="text-lg leading-relaxed text-foreground">{example.note}</p>
          <p className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
            <Info aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
            {example.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
