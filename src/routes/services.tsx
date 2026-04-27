import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Car, Shield, Sparkles, Palette, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Vehicle Wraps, PPF & Ceramic Coating Columbus GA" },
      { name: "description", content: "Vehicle wraps, paint protection film, ceramic coating, and commercial branding in Columbus, Georgia." },
      { property: "og:title", content: "Services | Thatz a Wrap Columbus GA" },
      { property: "og:description", content: "Custom vehicle wraps, PPF, ceramic coating, and commercial branding." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Car,
    accent: "cyan",
    title: "Vehicle Wraps",
    desc: "Full wraps, partial wraps, color changes, and chrome deletes using premium 3M and Avery Dennison films.",
    bullets: ["Full & partial color-change wraps", "Chrome & badge deletes", "Roof, hood & accent wraps", "Adds a layer of paint protection"],
  },
  {
    icon: Shield,
    accent: "cyan",
    title: "Paint Protection Film (PPF / Clear Bra)",
    desc: "Self-healing, virtually invisible film that shields your paint from rocks, bugs, and road debris.",
    bullets: ["Self-healing top coat", "Hydrophobic finish", "10-year warranty options", "Custom-cut for any vehicle"],
  },
  {
    icon: Sparkles,
    accent: "lime",
    title: "Ceramic Coating",
    desc: "A liquid polymer that bonds with your paint to create a deep gloss and unbeatable hydrophobic protection.",
    bullets: ["Up to 9-year protection", "Insane water beading", "UV & chemical resistance", "Easier washes, deeper shine"],
  },
  {
    icon: Palette,
    accent: "lime",
    title: "commercial Branding",
    desc: "Turn your work vehicles into rolling billboards with custom-designed commercial wraps.",
    bullets: ["In-house custom design", "Volume pricing", "Quick turnaround", "Local Columbus business specialist"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center">
          <div className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[var(--cyan)]">Our Services</div>
          <h1 className="text-4xl font-black md:text-6xl">
            Custom Car Graphics in <span className="brand-text">Columbus Georgia</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Every service is performed in-house by our certified installers using only the
            best materials in the industry.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            const isLime = s.accent === "lime";
            const color = isLime ? "var(--lime)" : "var(--cyan)";
            return (
              <article key={s.title} className="group relative overflow-hidden border border-border bg-[var(--surface)] p-8">
                <div className="absolute right-0 top-0 h-32 w-32 halftone opacity-10" style={{ color }} />
                <div className="mb-5 flex h-14 w-14 items-center justify-center clip-arrow" style={{ background: color, color: "var(--primary-foreground)" }}>
                  <Icon size={26} />
                </div>
                <h2 className="text-2xl font-black">{s.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 grid gap-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check size={16} className="mt-0.5 shrink-0" style={{ color }} /> {b}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: color }} />
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border border-border bg-[var(--surface)] p-10 text-center">
          <h3 className="text-2xl font-black md:text-3xl">Not sure which service is right for your ride?</h3>
          <p className="max-w-xl text-muted-foreground">Send us a message — we'll walk you through your options and price it out, no obligation.</p>
          <Link to="/contact" className="clip-arrow inline-flex items-center gap-2 bg-[var(--cyan)] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] transition-all hover:shadow-[var(--glow-cyan)]">
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
