import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/thatz-a-wrap-logo.png";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/" as const, label: "Home" },
  { to: "/services" as const, label: "Services" },
  { to: "/portfolio" as const, label: "Portfolio" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Thatz a Wrap logo" className="h-10 w-auto md:h-12" width={160} height={48} />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-bold uppercase tracking-widest text-foreground/80 transition-colors hover:text-[var(--cyan)]"
              activeProps={{ className: "text-[var(--cyan)]" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="clip-arrow bg-[var(--cyan)] px-6 py-2.5 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] transition-all hover:shadow-[var(--glow-cyan)]"
          >
            Free Quote
          </Link>
        </nav>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-[var(--surface)] px-5 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded py-2 text-sm font-bold uppercase tracking-widest text-foreground/80 hover:text-[var(--cyan)]"
              activeProps={{ className: "text-[var(--cyan)]" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
