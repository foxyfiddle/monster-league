import { createClient } from "../lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">It lives! 🐲</h1>
      <div className="alert alert-info">
        <span>If DaisyUI is loaded, this is styled.</span>
      </div>
      <p className="opacity-70">
        {user ? `Signed in as ${user.email}` : "You’re not signed in."}
      </p>
      <button className="btn btn-primary">Sample Button</button>
    </div>
  );
}


