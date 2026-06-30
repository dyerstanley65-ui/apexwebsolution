import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Mail, Trash2 } from "lucide-react";

interface BriefingRequest {
  id: string;
  email: string;
  message: string | null;
  status: string;
  created_at: string;
}

interface Review {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  approved: boolean;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<BriefingRequest[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [{ data: reqData, error: reqErr }, { data: revData, error: revErr }] = await Promise.all([
      supabase.from("briefing_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
    ]);
    if (reqErr) {
      toast({ title: "Couldn't load requests", description: reqErr.message, variant: "destructive" });
      setRequests([]);
    } else {
      setRequests(reqData ?? []);
    }
    if (revErr) {
      toast({ title: "Couldn't load reviews", description: revErr.message, variant: "destructive" });
      setReviews([]);
    } else {
      setReviews(revData ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      load();
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  const deleteRequest = async (id: string) => {
    const { error } = await supabase.from("briefing_requests").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setRequests((r) => r.filter((x) => x.id !== id));
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setReviews((r) => r.filter((x) => x.id !== id));
    toast({ title: "Review deleted" });
  };

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {loading ? "Loading…" : `${requests.length} requests · ${reviews.length} reviews`}
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </header>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Briefing requests</h2>
          <div className="mt-4 space-y-4">
            {!loading && requests.length === 0 && (
              <div className="rounded-2xl border border-hairline bg-card p-10 text-center text-muted-foreground">
                No requests yet.
              </div>
            )}
            {requests.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl border border-hairline bg-card p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <a
                      href={`mailto:${r.email}`}
                      className="inline-flex items-center gap-2 font-medium text-foreground hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {r.email}
                    </a>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </p>
                    {r.message && (
                      <p className="mt-4 whitespace-pre-wrap text-sm text-foreground/90">
                        {r.message}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteRequest(r.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Reviews</h2>
          <div className="mt-4 space-y-4">
            {!loading && reviews.length === 0 && (
              <div className="rounded-2xl border border-hairline bg-card p-10 text-center text-muted-foreground">
                No reviews yet.
              </div>
            )}
            {reviews.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl border border-hairline bg-card p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{r.name}</p>
                    {r.role && (
                      <p className="text-xs text-muted-foreground">{r.role}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </p>
                    <blockquote className="mt-4 whitespace-pre-wrap text-sm text-foreground/90">
                      "{r.quote}"
                    </blockquote>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteReview(r.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;
