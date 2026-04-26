import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | Custom Vehicle Wraps Columbus Georgia" },
      { name: "description", content: "Recent vehicle wraps, ceramic coatings, and PPF projects in Columbus, GA." },
      { property: "og:title", content: "Portfolio | Thatz a Wrap" },
      { property: "og:description", content: "Recent custom wrap and detail work from Columbus, Georgia." },
    ],
  }),
  component: PortfolioPage,
});

type Project = { src: string; brand: string; type: string; effect: string; title: string };

const projects: Project[] = [
  { src: p1, brand: "Tesla", type: "Color Change", effect: "Gloss", title: "Gloss Black Chrome Delete on a Tesla Model 3" },
  { src: p2, brand: "Lamborghini", type: "Full Wrap", effect: "Gloss", title: "Cyan Blue Full Wrap on a Lamborghini Huracán" },
  { src: p3, brand: "Ford", type: "Color Change", effect: "Satin", title: "Electric Lime Satin Wrap on a Mustang GT" },
  { src: p4, brand: "Ford", type: "Fleet", effect: "Matte", title: "Commercial Fleet Branding — Local Columbus Business" },
  { src: p5, brand: "Porsche", type: "PPF", effect: "Gloss", title: "Full-Front PPF on a Porsche 911" },
  { src: p6, brand: "BMW", type: "Ceramic", effect: "Gloss", title: "9H Ceramic Coating on a BMW M4" },
];

const filters = {
  brand: ["All", "Tesla", "Lamborghini", "Ford", "Porsche", "BMW"],
  type: ["All", "Color Change", "Full Wrap", "Fleet", "PPF", "Ceramic"],
  effect: ["All", "Matte", "Gloss", "Satin"],
};

function PortfolioPage() {
  const [brand, setBrand] = useState("All");
  const [type, setType] = useState("All");
  const [effect, setEffect] = useState("All");

  const filtered = projects.filter((p) =>
    (brand === "All" || p.brand === brand) &&
    (type === "All" || p.type === type) &&
    (effect === "All" || p.effect === effect)
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center">
          <div className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[var(--lime)]">Portfolio</div>
          <h1 className="text-4xl font-black md:text-6xl">Recent <span className="brand-text">Builds</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Filterable gallery of custom wraps, PPF installs, and ceramic coatings from
            our Columbus, Georgia shop.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <SectionHeading title="Filter the Garage" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <FilterRow label="Brand" value={brand} options={filters.brand} onChange={setBrand} />
          <FilterRow label="Type" value={type} options={filters.type} onChange={setType} />
          <FilterRow label="Effect" value={effect} options={filters.effect} onChange={setEffect} />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.title} className="group relative overflow-hidden border border-border bg-[var(--surface)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.src} alt={p.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="border border-[var(--cyan)]/40 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--cyan)]">{p.brand}</span>
                  <span className="border border-border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-foreground/80">{p.type}</span>
                  <span className="border border-[var(--lime)]/40 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[var(--lime)]">{p.effect}</span>
                </div>
                <h3 className="mt-3 text-base font-black">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Columbus, Georgia</p>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No projects match those filters.</p>
        )}
      </section>
    </>
  );
}

function FilterRow({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${
                active
                  ? "bg-[var(--cyan)] text-[var(--primary-foreground)] shadow-[var(--glow-cyan)]"
                  : "border border-border text-foreground/80 hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
