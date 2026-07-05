import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles, Circle } from "lucide-react";

const codeLines = [
  { indent: 0, content: [{ t: "const", c: "kw" }, { t: " Apex ", c: "" }, { t: "=", c: "op" }, { t: " () => {", c: "" }] },
  { indent: 1, content: [{ t: "return", c: "kw" }, { t: " (", c: "" }] },
  { indent: 2, content: [{ t: "<Site", c: "tag" }] },
  { indent: 3, content: [{ t: "designer", c: "attr" }, { t: "=", c: "op" }, { t: '"you"', c: "str" }] },
  { indent: 3, content: [{ t: "builder", c: "attr" }, { t: "=", c: "op" }, { t: '"me"', c: "str" }] },
  { indent: 3, content: [{ t: "outsourced", c: "attr" }, { t: "=", c: "op" }, { t: "{false}", c: "num" }] },
  { indent: 2, content: [{ t: "/>", c: "tag" }] },
  { indent: 1, content: [{ t: ");", c: "" }] },
  { indent: 0, content: [{ t: "};", c: "" }] },
];

const tokenColor: Record<string, string> = {
  kw: "text-primary",
  tag: "text-primary-glow",
  attr: "text-foreground/80",
  op: "text-muted-foreground",
  str: "text-emerald-300/90",
  num: "text-sky-300/90",
  "": "text-foreground/90",
};

const CodePanel = () => (
  <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-hairline bg-card shadow-elevated">
    <div className="flex items-center gap-1.5 border-b border-hairline bg-surface-elevated px-4 py-3">
      <Circle className="h-2.5 w-2.5 fill-destructive text-destructive" />
      <Circle className="h-2.5 w-2.5 fill-primary/60 text-primary/60" />
      <Circle className="h-2.5 w-2.5 fill-emerald-500/60 text-emerald-500/60" />
      <span className="ml-3 font-mono text-[11px] text-muted-foreground">apex.tsx — written by one person</span>
    </div>
    <div className="space-y-1.5 p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.9 + i * 0.12 }}
          style={{ paddingLeft: `${line.indent * 1.1}rem` }}
          className="whitespace-pre"
        >
          {line.content.map((tok, j) => (
            <span key={j} className={tokenColor[tok.c]}>
              {tok.t}
            </span>
          ))}
        </motion.div>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 2 }}
        className="inline-block h-4 w-1.5 translate-y-0.5 bg-primary"
      />
    </div>
  </div>
);

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 100]);

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-hero pt-32 pb-20">
      <motion.div
        style={{ y }}
        className="absolute inset-0 grid-lines opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="container relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Now booking Q3 projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-8 max-w-2xl text-[clamp(2.75rem,7vw,5.5rem)] font-700 leading-[0.95] tracking-tight"
          >
            Websites that turn{" "}
            <span className="text-gradient italic">ideas</span>
            <br />
            into momentum.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            Apex Web Solutions is a one-person studio — every site you see here
            is personally designed, coded and shipped by me. No agencies, no
            handoffs, no outsourcing. Just one creator building your site from
            first sketch to launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">
                Start your project <ArrowUpRight className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outlineGlow" size="xl" asChild>
              <a href="#services">Explore packages</a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hidden lg:block"
        >
          <CodePanel />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
