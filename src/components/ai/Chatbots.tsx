import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Check, Globe, MessageCircle, Mic, MousePointer2, PhoneIncoming, Send, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import voiceWave from "@/assets/voice-wave.jpg";
import { chatbots } from "@/content/ai-automation";
import { EASE } from "./motion";

function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

/* ---------- Visuals (decorative, no copy) ---------- */
function Line({ w, className = "bg-foreground/15" }: { w: string; className?: string }) {
  return <span className={`block h-2 rounded-full ${className}`} style={{ width: w }} />;
}

function WebsiteVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[560px]">
      <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-soft">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-foreground/15" />
          <span className="h-3 w-3 rounded-full bg-foreground/15" />
          <span className="h-3 w-3 rounded-full bg-primary/60" />
          <div className="ml-4 flex flex-1 items-center gap-2 rounded-full bg-muted px-3 py-1.5">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <Line w="40%" />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5 p-6">
          <div className="col-span-3 space-y-3">
            <div className="h-24 rounded-2xl bg-gradient-primary opacity-90" />
            <Line w="90%" />
            <Line w="70%" />
            <Line w="80%" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-16 rounded-xl bg-muted" />
              <div className="h-16 rounded-xl bg-muted" />
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-end gap-3 rounded-2xl bg-secondary p-3">
            {[
              { me: false, w: ["80%", "55%"], d: 0.2 },
              { me: true, w: ["70%"], d: 0.7 },
              { me: false, w: ["90%", "75%", "40%"], d: 1.2 },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE, delay: b.d }}
                className={`space-y-1.5 rounded-2xl p-2.5 ${b.me ? "ml-auto w-3/4 rounded-br-sm bg-primary" : "w-[90%] rounded-bl-sm bg-background"}`}
              >
                {b.w.map((w, j) => (
                  <Line key={j} w={w} className={b.me ? "bg-primary-foreground/70" : "bg-foreground/20"} />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        animate={{ x: [0, 40, 10, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 left-[35%] text-ink"
      >
        <MousePointer2 className="h-7 w-7 fill-ink" />
      </motion.div>
      <div className="absolute -right-4 -top-6 grid h-16 w-16 animate-float place-items-center rounded-full bg-ink text-ink-foreground shadow-soft md:-right-8">
        <MessageCircle className="h-7 w-7" />
      </div>
    </div>
  );
}

function MessagingVisual() {
  const bubbles = [
    { me: false, w: ["85%", "60%"] },
    { me: true, w: ["65%"] },
    { me: false, w: ["90%", "80%", "45%"] },
    { me: true, w: ["50%", "70%"] },
  ];
  return (
    <div aria-hidden="true" className="relative mx-auto flex w-full max-w-[520px] justify-center">
      <div className="relative w-[270px] rounded-[2.6rem] border-[10px] border-ink bg-background p-4 shadow-glow">
        <div className="mx-auto mb-4 h-5 w-24 rounded-full bg-ink" />
        <div className="mb-4 flex items-center gap-3">
          <span className="h-9 w-9 rounded-full bg-gradient-primary" />
          <div className="flex-1 space-y-1.5">
            <Line w="60%" className="bg-foreground/30" />
            <Line w="35%" className="bg-primary/50" />
          </div>
        </div>
        <div className="flex min-h-[300px] flex-col justify-end gap-3">
          {bubbles.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: b.me ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.45 }}
              className={`space-y-1.5 rounded-2xl p-3 ${b.me ? "ml-auto w-2/3 rounded-br-sm bg-primary" : "w-[85%] rounded-bl-sm bg-muted"}`}
            >
              {b.w.map((w, j) => (
                <Line key={j} w={w} className={b.me ? "bg-primary-foreground/70" : "bg-foreground/20"} />
              ))}
            </motion.div>
          ))}
          <div className="flex w-16 gap-1 rounded-2xl rounded-bl-sm bg-muted p-3">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="h-2 w-2 rounded-full bg-foreground/40"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-full bg-muted px-3 py-2">
          <Line w="70%" />
          <Send className="ml-auto h-4 w-4 text-primary" />
        </div>
      </div>
      {[
        { Icon: MessageCircle, pos: "left-0 top-10", c: "bg-primary text-primary-foreground" },
        { Icon: Smartphone, pos: "right-2 top-28", c: "bg-ink text-ink-foreground" },
        { Icon: Send, pos: "left-6 bottom-16", c: "bg-spark text-ink" },
      ].map(({ Icon, pos, c }, i) => (
        <div key={i} className={`absolute ${pos} grid h-14 w-14 animate-float place-items-center rounded-2xl ${c} shadow-soft`} style={{ animationDelay: `${-i * 2}s` }}>
          <Icon className="h-6 w-6" />
        </div>
      ))}
    </div>
  );
}

function VoiceVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[600px]">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink shadow-glow">
        <img src={voiceWave} alt="" width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full object-cover opacity-90" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1.5 p-8">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="w-1.5 origin-bottom rounded-full bg-ink-foreground/80 animate-eq"
              style={{ height: `${18 + ((i * 37) % 46)}px`, animationDelay: `${-(i % 7) * 0.13}s` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute -left-4 -top-6 grid h-20 w-20 place-items-center md:-left-8">
        {[0, 0.8].map((d) => (
          <span key={d} className="absolute inset-0 rounded-full bg-primary/50 animate-ring" style={{ animationDelay: `${d}s` }} />
        ))}
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <PhoneIncoming className="h-7 w-7" />
        </span>
      </div>
      <div className="absolute -bottom-6 right-6 grid h-14 w-14 animate-float place-items-center rounded-full bg-spark text-ink">
        <Mic className="h-6 w-6" />
      </div>
    </div>
  );
}

const visuals = { website: WebsiteVisual, messaging: MessagingVisual, voice: VoiceVisual };

function ProgressDot({ progress, i, total }: { progress: MotionValue<number>; i: number; total: number }) {
  const seg = 1 / total;
  const scaleX = useTransform(progress, [i * seg, (i + 1) * seg], [0, 1]);
  return (
    <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
      <motion.span style={{ scaleX }} className="absolute inset-0 origin-left bg-primary" />
    </span>
  );
}

export function Chatbots() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const panels = chatbots.items.length + 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `${-(panels - 1) * 100}vw`]);

  return (
    <section
      ref={ref}
      aria-labelledby="chatbots-title"
      className="relative bg-secondary"
      style={desktop ? { height: `${panels * 100}vh` } : undefined}
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <motion.div style={desktop ? { x } : {}} className="flex flex-col lg:h-full lg:w-max lg:flex-row">
          {/* Intro panel */}
          <div className="relative flex shrink-0 flex-col justify-center px-5 py-28 md:px-10 lg:h-full lg:w-screen lg:px-[6vw] lg:py-0">
            <div aria-hidden="true" className="pointer-events-none absolute right-[4vw] top-1/2 hidden -translate-y-1/2 text-primary/[0.08] lg:block">
              <MessageCircle className="h-[38vw] w-[38vw] animate-float-slow" strokeWidth={0.6} />
            </div>
            <h2 id="chatbots-title" className="relative max-w-5xl font-display text-[clamp(2.6rem,6.4vw,7rem)] leading-[0.9]">
              {chatbots.title.split(" ").map((w, i) => (
                <span key={i}>
                  <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                    <motion.span
                      className={`inline-block ${i === 1 ? "text-primary" : ""}`}
                      initial={{ y: "115%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: EASE, delay: i * 0.05 }}
                    >
                      {w}
                    </motion.span>
                  </span>{" "}
                </span>
              ))}
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.4 }}
              className="relative mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {chatbots.body}
            </motion.p>
          </div>

          {chatbots.items.map((item, idx) => {
            const Visual = visuals[item.key];
            return (
              <article
                key={item.key}
                className="relative grid shrink-0 items-center gap-12 px-5 py-20 md:px-10 lg:h-full lg:w-screen lg:grid-cols-2 lg:gap-16 lg:px-[6vw] lg:py-0"
              >
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <Visual />
                </div>
                <div className="relative">
                  <span aria-hidden="true" className="font-display text-[clamp(5rem,12vw,11rem)] leading-none text-outline text-primary/40">
                    0{idx + 1}
                  </span>
                  <h3 className="-mt-6 font-display text-[clamp(2.4rem,4.6vw,4.8rem)] leading-[0.95] md:-mt-10">{item.title}</h3>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">{item.body}</p>
                  <ul className="mt-8 space-y-4">
                    {item.bullets.map((b, j) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.2 + j * 0.12 }}
                        className="flex max-w-xl items-start gap-4 border-t border-foreground/10 pt-4 text-base md:text-lg"
                      >
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </motion.div>

        {desktop && (
          <div aria-hidden="true" className="absolute inset-x-[6vw] bottom-8 flex gap-2">
            {Array.from({ length: panels - 1 }).map((_, i) => (
              <ProgressDot key={i} progress={scrollYProgress} i={i} total={panels - 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
