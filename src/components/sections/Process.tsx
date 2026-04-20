import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Discovery", desc: "A focused call with me directly to map your goals, audience and aesthetic. You leave with a clear scope and timeline." },
  { n: "02", title: "Design", desc: "I create custom mockups built around your brand and iterate until every pixel feels right — no template-shaped boxes." },
  { n: "03", title: "Build", desc: "Every line of code is written by me. Responsive, fast, accessible, and ready for whatever you throw at it." },
  { n: "04", title: "Launch", desc: "I ship to your domain, hand over the keys, and stay on call for revisions. Your site, your rules." },
];

const Process = () => (
  <section id="process" className="relative border-y border-hairline bg-card/30 py-32">
    <div className="container">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">— The process</p>
        <h2 className="font-display mt-4 text-5xl font-semibold leading-[1] tracking-tight sm:text-6xl">
          One creator.<br />
          <span className="italic text-muted-foreground">Start to finish.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          When you hire Apex Web Solutions, you're hiring me — the same person
          who designs your site is the one writing the code and shipping it.
        </p>
      </div>

      <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <div className="flex items-baseline gap-4 border-t border-primary/40 pt-6">
              <span className="font-display text-sm font-medium text-primary">{s.n}</span>
              <div className="h-px flex-1 bg-hairline" />
            </div>
            <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-3 text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
