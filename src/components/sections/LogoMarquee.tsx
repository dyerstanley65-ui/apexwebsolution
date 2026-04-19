import { motion } from "framer-motion";

const logos = ["NORTHWIND", "OBELISK", "LUMEN&CO", "STRATA", "FIELDNOTES", "MERIDIAN", "KINETIC", "ATLAS/9"];

const LogoMarquee = () => (
  <section className="border-y border-hairline bg-card/40 py-10">
    <div className="container mb-6 flex items-center justify-between">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by founders & teams
      </p>
      <div className="hidden h-px flex-1 mx-8 bg-hairline sm:block" />
    </div>
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap"
      >
        {[...logos, ...logos].map((l, i) => (
          <span
            key={i}
            className="font-display text-2xl font-medium tracking-[0.15em] text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            {l}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default LogoMarquee;
