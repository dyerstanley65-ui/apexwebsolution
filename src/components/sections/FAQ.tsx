import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who actually builds my site?",
    a: "Me — directly. Apex Web Solutions is a one-person studio, so the same person who scopes your project designs it, codes it, and ships it. There's no handoff between a salesperson, a designer and a developer.",
  },
  {
    q: "How does pricing and payment work?",
    a: "Every package is a flat fee agreed before work starts. Payment is split into two milestones: 50% to begin, 50% on launch. There are no hourly rates and no surprise invoices.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Each package includes a set number of revision rounds during the build. After launch, the Apex package includes a support retainer, and Launch/Studio clients can add revisions or maintenance as a one-off.",
  },
  {
    q: "Do I own the code and domain?",
    a: "Yes. Once the final milestone is paid, the codebase and all assets are handed over to you in full. Your domain and hosting stay in your name throughout — I never lock you into my accounts.",
  },
  {
    q: "How long does a project take?",
    a: "Launch sites ship in about 7 days, Studio sites in about 14. Larger Apex-tier builds are scoped individually with a timeline agreed at kickoff, before any payment is made.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-24 sm:py-32">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">— FAQ</p>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Questions, answered.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Anything not covered here, ask directly in the brief below.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-hairline">
              <AccordionTrigger className="text-left font-display text-lg font-medium tracking-tight hover:text-primary hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQ;
