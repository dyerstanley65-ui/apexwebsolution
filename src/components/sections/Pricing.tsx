import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Launch",
    price: "$1,490",
    blurb: "A polished one-pager to get you online — fast.",
    features: ["Custom single-page design", "Mobile-perfect responsive build", "Contact form & analytics", "2 rounds of revisions", "7-day delivery"],
    cta: "Start with Launch",
  },
  {
    name: "Studio",
    price: "$3,890",
    blurb: "A full multi-page site with a CMS your team can run.",
    features: ["Up to 6 custom pages", "CMS / blog integration", "SEO foundation & on-page copy help", "Unlimited revisions during build", "14-day delivery"],
    cta: "Choose Studio",
    featured: true,
  },
  {
    name: "Apex",
    price: "Custom",
    blurb: "E-commerce, web apps, or anything beyond the standard scope.",
    features: ["Discovery workshop", "Custom features & integrations", "Auth, payments, dashboards", "Dedicated project lead", "Post-launch support retainer"],
    cta: "Book a call",
  },
];

const Pricing = () => (
  <section id="pricing" className="relative py-32">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">— Pricing</p>
        <h2 className="font-display mt-4 text-5xl font-semibold leading-[1] tracking-tight sm:text-6xl">
          Honest pricing.<br />Built around your scope.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Flat-fee packages with no surprises. Pay securely in milestones — 50% to start, 50% on launch.
        </p>
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              t.featured
                ? "border-primary/50 bg-gradient-to-b from-primary/[0.08] to-transparent shadow-glow"
                : "border-hairline bg-card"
            }`}
          >
            {t.featured && (
              <div className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most popular
              </div>
            )}
            <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold tracking-tight">{t.price}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t.blurb}</p>

            <ul className="mt-8 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${t.featured ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-6 border-t border-hairline">
              <Button
                variant={t.featured ? "hero" : "outlineGlow"}
                size="lg"
                className="w-full"
                asChild
              >
                <a href="#contact">{t.cta}</a>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
