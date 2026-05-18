import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

function toSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

export function AiPageSearch() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = toSlug(q);
    if (!slug) return;
    setLoading(true);
    navigate({ to: "/p/$slug", params: { slug } });
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-xl items-center gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a vehicle, city, or service…"
          className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--cyan)] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !q.trim()}
        className="clip-arrow inline-flex items-center bg-[var(--cyan)] px-5 py-3 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] disabled:opacity-50"
      >
        {loading ? "Generating…" : "Generate"}
      </button>
    </form>
  );
}
