import { motion } from "framer-motion";
import { Briefcase, ShoppingBag, User, Layers, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: User,
    title: "Portfolio",
    desc: "A signature site for creatives, freelancers and personal brands. Distinctive, fast, and built to convert visitors into work.",
    tags: ["Custom design", "CMS-ready", "Animations"],
  },
  {
    icon: Briefcase,
    title: "Business",
    desc: "Marketing sites for startups and SMBs. Sharp messaging, lead capture, and a CMS your team will actually use.",
    tags: ["Lead forms", "Analytics", "SEO"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    desc: "Storefronts that feel premium and check out fast. Stripe, Shopify or custom — whatever fits your catalog.",
    tags: ["Stripe / Shopify", "Cart & Checkout", "Inventory"],
  },
  {
    icon: Layers,
    title: "Web App",
    desc: "Dashboards, portals and SaaS MVPs. Auth, databases, and serverless functions wired up end-to-end.",
    tags: ["Auth", "Database", "Realtime"],
  },
];

const Services = () => (
  <section id="services" className="relative py-32">
    <div className="container">
      <div className="grid items-end gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">— What we build</p>
          <h2 className="font-display mt-4 text-5xl font-semibold leading-[1] tracking-tight sm:text-6xl">
            Four packages.<br />Zero compromises.
          </h2>
        </div>
        <p className="text-lg text-muted-foreground md:text-right">
          Pick the package closest to your vision. We tailor scope, design and
          tech stack around your goals — never the other way around.
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-hairline sm:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative bg-card p-8 transition-colors duration-500 hover:bg-surface-elevated sm:p-10"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-[-6deg]">
                <s.icon className="h-6 w-6" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
            <h3 className="font-display mt-8 text-3xl font-semibold tracking-tight">
              {s.title}
            </h3>
            <p className="mt-3 max-w-md text-muted-foreground">{s.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-hairline px-3 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
