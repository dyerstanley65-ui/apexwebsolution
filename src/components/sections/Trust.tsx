import { motion } from "framer-motion";
import { UserCheck, Banknote, RefreshCcw, Timer } from "lucide-react";

const points = [
  {
    icon: UserCheck,
    title: "One direct line",
    desc: "You talk to the person building your site — never an account manager.",
  },
  {
    icon: Banknote,
    title: "Flat-fee pricing",
    desc: "The price you're quoted is the price you pay. No hourly surprises.",
  },
  {
    icon: RefreshCcw,
    title: "Revisions included",
    desc: "Every package ships with rounds of revisions baked into the scope.",
  },
  {
    icon: Timer,
    title: "Fixed turnaround",
    desc: "7–14 day delivery windows, agreed upfront before work begins.",
  },
];

const Trust = () => (
  <section className="border-y border-hairline bg-card/20 py-16">
    <div className="container">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-start gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <p.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Trust;
