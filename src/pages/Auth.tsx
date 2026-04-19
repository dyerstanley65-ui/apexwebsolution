import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "apexwebsolutions23@outlook.com";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
        toast({
          title: "Not allowed",
          description: "Only the admin email can register.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Account created", description: "You're signed in." });
      navigate("/admin", { replace: true });
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      setLoading(false);
      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
        return;
      }
      navigate("/admin", { replace: true });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-hairline bg-card p-8 shadow-elevated">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Admin access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin" ? "Sign in to view briefing requests." : "Create the admin account."}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "First time? Create the admin account" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
};

export default Auth;
