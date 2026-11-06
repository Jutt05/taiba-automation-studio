import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import clinic from "@/assets/ind-clinic.jpg";
import ecommerce from "@/assets/ind-ecommerce.jpg";
import homeservices from "@/assets/ind-homeservices.jpg";
import professional from "@/assets/ind-professional.jpg";
import realestate from "@/assets/ind-realestate.jpg";
import restaurant from "@/assets/ind-restaurant.jpg";
import saas from "@/assets/ind-saas.jpg";
import { industries } from "@/content/ai-automation";
import { EASE, Reveal, SplitReveal } from "./motion";

const images = { clinic, realestate, homeservices, ecommerce, restaurant, professional, saas } as const;

export function Industries() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 160, damping: 20, mass: 0.5 });

  return (
    <section aria-labelledby="industries-title" className="noise relative overflow-hidden bg-ink py-28 text-ink-foreground md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SplitReveal
            id="industries-title"
            text={industries.title}
            className="font-display text-[clamp(2.5rem,5.6vw,6rem)] leading-[0.92] lg:col-span-8"
            wordClassName={(w) => (w === "Industries" ? "text-primary-glow" : undefined)}
          />
          <Reveal delay={0.3} className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-ink-muted md:text-xl">{industries.body}</p>
          </Reveal>
        </div>

        <div
          ref={ref}
          className="relative mt-16 md:mt-24"
          onPointerMove={(e) => {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setHover(null)}
        >
          {/* cursor-follow image (desktop) */}
          <motion.div
            aria-hidden="true"
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
          >
            <AnimatePresence>
              {hover !== null && (
                <motion.div
                  key="frame"
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] shadow-glow"
                  style={{ width: 300, height: 375 }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={hover}
                      src={images[industries.items[hover]?.key ?? "clinic"]}
                      alt=""
                      width={896}
                      height={1120}
                      initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.2 }}
                      animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <ul>
            {industries.items.map((item, i) => (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
                onPointerEnter={() => setHover(i)}
                className="group relative border-t border-ink-line last:border-b"
              >
                <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-700 ease-expo group-hover:scale-y-100" />
                <div className="relative grid items-center gap-4 py-7 md:grid-cols-[auto_1fr] md:gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] lg:gap-12 lg:py-9">
                  <div className="flex items-center gap-5">
                    <img
                      src={images[item.key]}
                      alt=""
                      width={896}
                      height={1120}
                      loading="lazy"
                      className="h-20 w-16 shrink-0 rounded-xl object-cover lg:hidden"
                    />
                    <h3 className="font-display text-[clamp(2rem,4.2vw,4.4rem)] leading-[0.95] transition-transform duration-700 ease-expo lg:group-hover:translate-x-6">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-primary-foreground md:text-lg">
                    {item.body}
                  </p>
                  <span aria-hidden="true" className="hidden h-14 w-14 place-items-center rounded-full border border-ink-line transition-all duration-500 group-hover:rotate-45 group-hover:border-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary lg:grid">
                    <ArrowUpRight className="h-6 w-6" />
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
