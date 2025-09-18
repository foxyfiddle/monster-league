"use client";
import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateMonster() {
  const supabase = createClient();
  const router = useRouter();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.from("monsters").insert({ name }); // owner_id defaults to auth.uid()
    setBusy(false);
    if (error) setError(error.message);
    else {
      setName("");
      router.refresh(); // refresh server component list
    }
  }

  return (
    <form onSubmit={onCreate} className="flex items-end gap-2">
      <label className="form-control">
        <span className="label-text">Monster Name</span>
        <input
          className="input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Vine Drake"
          required
        />
      </label>
      <button className={`btn btn-primary ${busy ? "loading" : ""}`} disabled={busy}>
        Create
      </button>
      {error && <div className="alert alert-error py-1 px-2 text-sm">{error}</div>}
    </form>
  );
}
