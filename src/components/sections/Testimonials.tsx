import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "Founder, Bloom Studio",
    quote:
      "Apex delivered a portfolio site that perfectly captured our brand. Communication was clear, turnaround was fast, and the result looks stunning on every device.",
  },
  {
    name: "James Carter",
    role: "Owner, Carter & Co.",
    quote:
      "Best web investment we've made. The team listened to every detail and built a site that immediately boosted our inquiries. Highly recommend.",
  },
  {
    name: "Priya Shah",
    role: "Director, Northwind Retail",
    quote:
      "Our e-commerce store launched ahead of schedule and sales doubled in the first month. Genuinely impressed by the craftsmanship and support.",
  },
  {
    name: "Marcus Lee",
    role: "Co-founder, Vault Fitness",
    quote:
      "Sleek, fast, and exactly what we envisioned. They made the whole process feel effortless — and the revisions were handled with zero friction.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Loved by founders & teams
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real words from clients who trusted Apex with their digital presence.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <Card
              key={r.name}
              className="border-hairline bg-card/50 backdrop-blur transition-colors hover:border-primary/40"
            >
              <CardContent className="p-8">
                <blockquote className="text-lg leading-relaxed text-foreground">
                  "{r.quote}"
                </blockquote>
                <div className="mt-6">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
