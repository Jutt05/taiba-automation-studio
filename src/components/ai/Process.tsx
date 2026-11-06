import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { process } from "@/content/ai-automation";
import { EASE, SplitReveal } from "./motion";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] top-[10%] h-[40vw] w-[40vw] rounded-full bg-primary/15 blur-[120px]" />
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SplitReveal
          id="process-title"
          text={process.title}
          className="max-w-5xl font-display text-[clamp(2.6rem,6vw,6.6rem)] leading-[0.9]"
          wordClassName={(w) => (w === "AI" || w === "Automation" ? "text-primary" : undefined)}
        />

        <ol ref={ref} className="relative mt-20 md:mt-28">
          {/* central progress line */}
          <div aria-hidden="true" className="absolute bottom-0 left-[27px] top-0 w-px bg-border lg:left-1/2">
            <motion.div style={{ scaleY }} className="absolute inset-0 origin-top bg-gradient-to-b from-primary to-primary-glow" />
            <motion.span
              style={{ top: dotTop }}
              className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-glow"
            />
          </div>

          {process.steps.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative grid pb-20 last:pb-0 lg:grid-cols-2 lg:gap-24 lg:pb-28">
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute left-[27px] top-3 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-background bg-primary ring-1 ring-primary lg:left-1/2"
                />
                <motion.div
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className={`pl-16 lg:pl-0 ${right ? "lg:col-start-2" : "lg:text-right"}`}
                >
                  <div className={`flex items-end gap-5 ${right ? "" : "lg:flex-row-reverse"}`}>
                    <span className="font-display text-[clamp(4.5rem,9vw,9rem)] leading-[0.8] text-outline text-primary transition-colors duration-700 hover:text-primary">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl leading-none md:text-5xl">{step.title}</h3>
                  <p className={`mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground ${right ? "" : "lg:ml-auto"}`}>
                    {step.body}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
