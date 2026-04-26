import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/thatz-a-wrap-logo.png";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-[var(--surface)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-[image:var(--gradient-brand)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Thatz a Wrap" className="h-14 w-auto" width={200} height={56} />
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Premium custom vehicle wraps, paint protection film, and ceramic coating in
            Columbus, Georgia. Custom Car Graphics for Columbus, Phenix City, Fort Moore
            and surrounding areas.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]">
              <Facebook size={16} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-[var(--lime)]">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground/80">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-[var(--cyan)]" /> 4838 Hamilton Rd<br />Columbus, GA 31904</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-[var(--cyan)]" /> <a href="tel:+17069872484" className="hover:text-[var(--cyan)]">(706) 987-2484</a></li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-[var(--cyan)]" /> <a href="mailto:hello@thatzawrap.com" className="hover:text-[var(--cyan)]">hello@thatzawrap.com</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-[var(--lime)]">Site</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-foreground/80 hover:text-[var(--cyan)]">Home</Link></li>
            <li><Link to="/services" className="text-foreground/80 hover:text-[var(--cyan)]">Services</Link></li>
            <li><Link to="/portfolio" className="text-foreground/80 hover:text-[var(--cyan)]">Portfolio</Link></li>
            <li><Link to="/contact" className="text-foreground/80 hover:text-[var(--cyan)]">Get a Quote</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Thatz a Wrap · Vehicle Wraps Columbus Georgia · All rights reserved.
      </div>
    </footer>
  );
}
