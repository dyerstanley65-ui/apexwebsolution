import { useEffect, useState } from "react";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Review = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  created_at: string;
};

const reviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  role: z.string().trim().max(120).optional(),
  quote: z.string().trim().min(10, "Please write at least 10 characters").max(1000),
});

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("id,name,role,quote,created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(12);
    if (!error && data) setReviews(data as Review[]);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = reviewSchema.safeParse({ name, role: role || undefined, quote });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      name: parsed.data.name,
      role: parsed.data.role ?? null,
      quote: parsed.data.quote,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit your review. Please try again.");
      return;
    }
    toast.success("Thanks for your review!");
    setName("");
    setRole("");
    setQuote("");
    load();
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Reviews
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Share your experience
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Worked with Apex? Leave a review below — it helps other founders decide.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <Card className="border-hairline bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="r-name">Name</Label>
                    <Input
                      id="r-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={80}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-role">Role / Company (optional)</Label>
                    <Input
                      id="r-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      maxLength={120}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="r-quote">Your review</Label>
                  <Textarea
                    id="r-quote"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    rows={4}
                    maxLength={1000}
                    required
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? "Submitting..." : "Submit review"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {reviews.length > 0 && (
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {reviews.map((r) => (
              <Card
                key={r.id}
                className="border-hairline bg-card/50 backdrop-blur transition-colors hover:border-primary/40"
              >
                <CardContent className="p-8">
                  <blockquote className="text-lg leading-relaxed text-foreground">
                    "{r.quote}"
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-medium">{r.name}</p>
                    {r.role && (
                      <p className="text-sm text-muted-foreground">{r.role}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
