"use client";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function AuthButtons() {
  const supabase = createClient();
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setName(user?.user_metadata?.name || user?.email || null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const user = session?.user ?? null;
      setName(user?.user_metadata?.name || user?.email || null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (loading) return <button className="btn btn-ghost btn-sm">…</button>;

  if (!name) {
    return (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => supabase.auth.signInWithOAuth({ provider: "github" })}
      >
        Sign in with GitHub
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm opacity-70">Hi, {name}</span>
      <button className="btn btn-ghost btn-sm" onClick={() => supabase.auth.signOut()}>
        Sign out
      </button>
    </div>
  );
}
