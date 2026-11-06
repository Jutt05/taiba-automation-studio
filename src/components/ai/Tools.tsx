import { motion } from "motion/react";
import { Asterisk } from "lucide-react";
import { LINKS, midCta, tools } from "@/content/ai-automation";
import { AiCore, CtaButton, StarGlyph } from "./brand";
import { EASE, Magnetic, Reveal, SplitReveal } from "./motion";

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div aria-hidden="true" className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex w-max shrink-0 items-center gap-10 pr-10 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {row.map((name, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className={`font-display text-5xl leading-none md:text-7xl ${i % 3 === 1 ? "text-primary-glow" : i % 3 === 2 ? "text-outline text-ink-foreground/60" : "text-ink-foreground"}`}>
              {name}
            </span>
            <Asterisk className="h-8 w-8 text-spark" strokeWidth={3} />
          </span>
        ))}
      </div>
    </div>
  );
}

function ToolItem({ item, i, side }: { item: (typeof tools.items)[number]; i: number; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay: (i % 3) * 0.12 }}
      className={`group relative ${side === "left" ? "lg:text-right" : ""}`}
    >
      <div className={`flex items-center gap-4 ${side === "left" ? "lg:flex-row-reverse" : ""}`}>
        <span aria-hidden="true" className="relative grid h-4 w-4 place-items-center">
          <span className="absolute inset-0 rounded-full bg-primary/40 transition-transform duration-500 group-hover:scale-[2.2]" />
          <span className="h-2 w-2 rounded-full bg-primary-glow" />
        </span>
        <h3 className="font-display text-3xl leading-none transition-colors duration-500 group-hover:text-primary-glow md:text-4xl">{item.title}</h3>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-ink-line to-transparent lg:block" />
      </div>
      <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{item.body}</p>
    </motion.div>
  );
}

export function Tools() {
  const left = tools.items.slice(0, 3);
  const right = tools.items.slice(3);
  return (
    <section aria-labelledby="tools-title" className="noise relative overflow-hidden bg-gradient-ink pt-28 text-ink-foreground md:pt-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SplitReveal
            id="tools-title"
            text={tools.title}
            className="font-display text-[clamp(2.5rem,5.6vw,6rem)] leading-[0.92] lg:col-span-8"
            wordClassName={(w) => (w === "Tools" ? "text-primary-glow" : undefined)}
          />
          <Reveal delay={0.3} className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-ink-muted md:text-xl">{tools.body}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 space-y-6 md:mt-24">
        <Marquee items={tools.names.slice(0, 11)} />
        <Marquee items={tools.names.slice(11)} reverse />
      </div>

      <div className="mx-auto mt-20 grid max-w-[1500px] items-center gap-14 px-5 md:mt-28 md:px-10 lg:grid-cols-[1fr_minmax(260px,380px)_1fr] lg:gap-16">
        <div className="order-2 space-y-14 lg:order-1">
          {left.map((item, i) => (
            <ToolItem key={item.title} item={item} i={i} side="left" />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
          className="order-1 mx-auto w-[64vw] max-w-[380px] lg:order-2 lg:w-full"
        >
          <AiCore />
        </motion.div>
        <div className="order-3 space-y-14">
          {right.map((item, i) => (
            <ToolItem key={item.title} item={item} i={i} side="right" />
          ))}
        </div>
      </div>

      {/* Mid-page CTA */}
      <div className="relative mt-28 md:mt-40">
        <div className="relative overflow-hidden rounded-t-[3rem] bg-gradient-primary px-5 py-24 text-primary-foreground md:rounded-t-[5rem] md:px-10 md:py-32">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-dots text-primary-foreground opacity-30" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-10 top-10 animate-float text-primary-foreground/20">
            <StarGlyph className="text-[9rem] text-primary-foreground/20" />
          </div>
          <div className="relative mx-auto flex max-w-[1500px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <SplitReveal
                text={midCta.title}
                className="font-display text-[clamp(2.6rem,6vw,6.8rem)] leading-[0.9]"
              />
              <Reveal delay={0.3}>
                <p className="mt-6 text-xl md:text-2xl">{midCta.body}</p>
              </Reveal>
            </div>
            <Reveal delay={0.45}>
              <Magnetic>
                <CtaButton href={LINKS.booking} variant="light" className="px-9 py-5 text-lg md:text-xl">
                  {midCta.button}
                </CtaButton>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
