import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles } from "lucide-react";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-hero pt-32">
      <motion.div
        style={{ y }}
        className="absolute inset-0 grid-lines opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="container relative">
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
          className="font-display mt-8 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] font-700 leading-[0.95] tracking-tight"
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
    </section>
  );
};

export default Hero;
