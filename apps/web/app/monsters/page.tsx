import { createClient } from "../../lib/supabase/server";
import CreateMonster from "../../components/CreateMonster";

export default async function MonstersPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="prose">
        <h2>Please sign in to manage monsters.</h2>
      </div>
    );
  }

  const { data: monsters, error } = await supabase
    .from("monsters")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Monsters</h1>

      <CreateMonster />

      {error && (
        <div className="alert alert-error">
          <span>{error.message}</span>
        </div>
      )}

      <ul className="space-y-2">
        {(monsters ?? []).map((m) => (
          <li key={m.id} className="card bg-base-100 border">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-xs opacity-70">Tier {m.tier}</div>
                </div>
                <div className="text-xs opacity-60">{new Date(m.created_at).toLocaleString()}</div>
              </div>
            </div>
          </li>
        ))}
        {(!monsters || monsters.length === 0) && (
          <div className="opacity-70">No monsters yet—create one!</div>
        )}
      </ul>
    </div>
  );
}
