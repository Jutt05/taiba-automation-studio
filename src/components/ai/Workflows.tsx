import { AnimatePresence, motion } from "motion/react";
import { BellRing, CalendarClock, Check, DatabaseZap, FileInput, Plug, Users } from "lucide-react";
import { useState } from "react";
import workflowNetwork from "@/assets/workflow-network.jpg";
import { workflows } from "@/content/ai-automation";
import { EASE, MaskImage, Parallax, Reveal, SplitReveal } from "./motion";

const icons = {
  leads: Users,
  reminders: CalendarClock,
  crm: DatabaseZap,
  forms: FileInput,
  summaries: BellRing,
  integrations: Plug,
} as const;

function FlowPulse() {
  return (
    <div aria-hidden="true" className="relative mt-8 h-10 w-full max-w-sm">
      <svg viewBox="0 0 300 40" className="h-full w-full">
        <path d="M6 20 H294" className="stroke-ink-foreground/20" strokeWidth="2" strokeDasharray="4 6" />
        {[6, 150, 294].map((cx) => (
          <circle key={cx} cx={cx} cy="20" r="6" className="fill-ink stroke-primary-glow" strokeWidth="2" />
        ))}
      </svg>
      <motion.span
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary-glow shadow-glow"
        animate={{ left: ["0%", "97%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function Workflows() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="workflows-title" className="noise relative overflow-hidden bg-ink py-28 text-ink-foreground md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitReveal
              id="workflows-title"
              text={workflows.title}
              className="font-display text-[clamp(2.6rem,6vw,6.6rem)] leading-[0.9]"
              wordClassName={(_, i) => (i === 0 || i === 1 ? "text-primary-glow" : undefined)}
            />
            <Reveal delay={0.3}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">{workflows.body}</p>
            </Reveal>
          </div>
          <Parallax speed={60} className="lg:col-span-5">
            <MaskImage
              src={workflowNetwork}
              alt="Connected automation nodes passing data between tools"
              width={1536}
              height={1024}
              className="aspect-[4/3] rounded-[2rem]"
              from="inset(0% 0% 0% 100% round 2rem)"
            />
          </Parallax>
        </div>

        {/* Expanding workflow strips (desktop) / stacked list (mobile) */}
        <div className="mt-20 flex flex-col gap-3 md:mt-28 lg:h-[600px] lg:flex-row">
          {workflows.items.map((item, i) => {
            const Icon = icons[item.key];
            const isActive = active === i;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative overflow-hidden rounded-[2rem] border border-ink-line transition-[flex-grow,background-color] duration-700 ease-expo lg:min-w-[88px] ${
                  isActive ? "bg-gradient-deep lg:flex-[6]" : "bg-ink-soft lg:flex-[1] hover:bg-ink-soft/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="flex w-full items-center gap-4 p-6 text-left lg:hidden"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-3xl leading-none">{item.title}</h3>
                </button>

                {/* collapsed vertical label (desktop) */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  aria-label={item.title}
                  className={`absolute inset-0 hidden flex-col items-center justify-between py-8 transition-opacity duration-500 lg:flex ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink-line text-primary-glow transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl leading-none [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                    {item.title}
                  </span>
                </button>

                {/* expanded content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.25 } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="px-6 pb-8 lg:absolute lg:inset-0 lg:flex lg:min-w-[560px] lg:flex-col lg:justify-between lg:p-10"
                    >
                      <div className="hidden items-center justify-between lg:flex">
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary-foreground text-primary">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span aria-hidden="true" className="font-display text-7xl leading-none text-outline text-ink-foreground/40">
                          0{i + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="hidden font-display text-5xl leading-[0.95] lg:block xl:text-6xl">{item.title}</h3>
                        <p className="mt-0 max-w-lg text-lg leading-relaxed text-ink-foreground/85 lg:mt-5">{item.body}</p>
                        <ul className="mt-6 space-y-3">
                          {item.bullets.map((b, j) => (
                            <motion.li
                              key={b}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, ease: EASE, delay: 0.4 + j * 0.1 }}
                              className="flex items-start gap-3 text-base"
                            >
                              <Check className="mt-1 h-4 w-4 shrink-0 text-spark" strokeWidth={3} />
                              {b}
                            </motion.li>
                          ))}
                        </ul>
                        <FlowPulse />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
