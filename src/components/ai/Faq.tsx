import { AnimatePresence, motion } from "motion/react";
import { Bot, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { faqs } from "@/content/ai-automation";
import { cn } from "@/lib/utils";
import { EASE, Reveal } from "./motion";

function Answer({ text }: { text: string }) {
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setTyping(false), 650);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="flex items-end gap-3 pb-6 pt-2">
      <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
        <Bot className="h-5 w-5" />
      </span>
      <div className="max-w-2xl rounded-3xl rounded-bl-md bg-secondary px-6 py-5 text-base leading-relaxed text-foreground md:text-lg">
        <AnimatePresence mode="wait" initial={false}>
          {typing ? (
            <motion.span key="dots" exit={{ opacity: 0 }} className="flex gap-1.5 py-1.5" aria-hidden="true">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.12 }}
                />
              ))}
            </motion.span>
          ) : (
            <motion.p key="text" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
              {text}
            </motion.p>
          )}
        </AnimatePresence>
        {typing && <span className="sr-only">{text}</span>}
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-label="FAQs" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        {/* decorative conversation art */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <div aria-hidden="true" className="relative aspect-square w-full max-w-[360px]">
                <motion.span
                  className="absolute inset-0 grid place-items-center font-display text-[22rem] leading-none text-primary"
                  animate={{ rotate: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  ?
                </motion.span>
                <div className="absolute right-0 top-10 h-12 w-28 animate-float rounded-3xl rounded-br-md bg-ink" />
                <div className="absolute bottom-16 left-0 h-12 w-36 animate-float-slow rounded-3xl rounded-bl-md bg-secondary" />
                <div className="absolute bottom-6 right-10 grid h-14 w-14 animate-float place-items-center rounded-full bg-spark text-ink">
                  <Bot className="h-6 w-6" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="space-y-3 lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={cn(
                    "group ml-auto flex w-full items-center justify-between gap-6 rounded-[1.75rem] px-6 py-5 text-left transition-all duration-500 ease-expo md:w-[92%] md:px-8 md:py-6",
                    isOpen ? "rounded-br-md bg-ink text-ink-foreground" : "bg-muted text-foreground hover:bg-accent",
                  )}
                >
                  <span className="text-lg font-medium leading-snug md:text-2xl">{f.q}</span>
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-expo",
                      isOpen ? "rotate-45 bg-primary text-primary-foreground" : "bg-background text-foreground group-hover:bg-primary group-hover:text-primary-foreground",
                    )}
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <Answer text={f.a} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
