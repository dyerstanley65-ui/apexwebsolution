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

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<BriefingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data, error } = await supabase
      .from("briefing_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Couldn't load requests", description: error.message, variant: "destructive" });
      setRequests([]);
    } else {
      setRequests(data ?? []);
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

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Briefing requests</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {loading ? "Loading…" : `${requests.length} total`}
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </header>

        <div className="mt-10 space-y-4">
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
      </div>
    </main>
  );
};

export default Admin;
