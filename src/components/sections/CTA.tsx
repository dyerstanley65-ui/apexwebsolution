import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const CTA = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase
      .from("briefing_requests")
      .insert({ email: email.trim(), message: message.trim() || null });
    setLoading(false);
    if (error) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "We'll be in touch",
      description: "Thanks — we received your brief and will reply within one business day.",
    });
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-hero opacity-80" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 shadow-elevated sm:p-16"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">— Let's build</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Have a project<br />in mind?
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Drop your email and a quick note about what you're building. We'll
              reply within one business day with next steps.
            </p>

            <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="h-14 w-full rounded-lg border border-hairline bg-background/60 pl-11 pr-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button type="submit" variant="hero" size="xl" disabled={loading}>
                  {loading ? "Sending…" : "Request brief"} <ArrowUpRight className="h-5 w-5" />
                </Button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us briefly what you're building (optional)"
                rows={3}
                maxLength={1000}
                className="w-full rounded-lg border border-hairline bg-background/60 p-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </form>

            <p className="mt-6 text-xs text-muted-foreground">
              Or email us directly at{" "}
              <a href="mailto:apexwebsolutions23@outlook.com" className="text-foreground underline-offset-4 hover:underline">
                apexwebsolutions23@outlook.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
