import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Free Quote | Thatz a Wrap Columbus GA" },
      { name: "description", content: "Request a free quote for vehicle wraps, PPF, or ceramic coating in Columbus, Georgia. Call (706) 987-2484." },
      { property: "og:title", content: "Get a Free Quote | Thatz a Wrap" },
      { property: "og:description", content: "Free quotes for custom vehicle wraps in Columbus, Georgia." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Required").max(30),
  vehicle: z.string().trim().min(1, "Required").max(120),
  service: z.string().min(1, "Pick a service"),
  message: z.string().trim().max(1000).optional(),
});

const services = ["Vehicle Wrap", "Paint Protection Film", "Ceramic Coating", "Fleet Branding", "Other"];

const areas = ["Columbus", "Phenix City", "Fort Moore", "Midland", "Smiths Station", "Cataula", "Fortson", "Upatoi"];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center">
          <div className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[var(--cyan)]">Free Quote</div>
          <h1 className="text-4xl font-black md:text-6xl">
            Let's <span className="brand-text">Wrap It Up</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Tell us about your vehicle and what you're looking for. We respond fast — usually same day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.5fr_1fr]">
        {/* FORM */}
        <div className="border border-border bg-[var(--surface)] p-6 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--lime)] text-[var(--primary-foreground)]">
                <Check size={28} />
              </div>
              <h3 className="text-2xl font-black">Quote Request Sent</h3>
              <p className="max-w-sm text-sm text-muted-foreground">Thanks! We'll be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5" noValidate>
              <Field label="Full Name" name="name" error={errors.name} />
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Email" name="email" type="email" error={errors.email} />
                <Field label="Phone" name="phone" type="tel" error={errors.phone} />
              </div>
              <Field label="Year / Make / Model" name="vehicle" placeholder="2023 Tesla Model 3" error={errors.vehicle} />
              <div>
                <Label>Service Desired</Label>
                <select
                  name="service"
                  defaultValue=""
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-[var(--cyan)]"
                >
                  <option value="" disabled>Select a service…</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
              </div>
              <div>
                <Label>Project Details</Label>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={1000}
                  placeholder="Tell us about colors, finishes, timing, photos to share, etc."
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-[var(--cyan)]"
                />
              </div>
              <button
                type="submit"
                className="clip-arrow inline-flex items-center justify-center gap-2 bg-[var(--cyan)] px-7 py-4 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] transition-all hover:shadow-[var(--glow-cyan)]"
              >
                Send Quote Request <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <InfoCard icon={MapPin} title="Visit the Shop">
            4838 Hamilton Rd<br />Columbus, GA 31904
          </InfoCard>
          <InfoCard icon={Phone} title="Call Us">
            <a href="tel:+17069872484" className="hover:text-[var(--cyan)]">(706) 987-2484</a>
          </InfoCard>
          <InfoCard icon={Mail} title="Email">
            <a href="mailto:hello@thatzawrap.com" className="hover:text-[var(--cyan)]">hello@thatzawrap.com</a>
          </InfoCard>
          <InfoCard icon={Clock} title="Hours">
            Mon–Fri 9am–6pm<br />Sat 10am–3pm
          </InfoCard>

          <div className="border border-border bg-[var(--surface)] p-5">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-[var(--lime)]">Areas We Serve</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {areas.map((a) => (
                <span key={a} className="border border-border px-2 py-1 text-xs text-foreground/80">{a}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="overflow-hidden border border-border">
          <iframe
            title="Thatz a Wrap location map"
            src="https://www.google.com/maps?q=4838+Hamilton+Rd,+Columbus,+GA+31904&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full grayscale-[20%]"
          />
        </div>
      </section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">{children}</label>;
}

function Field({ label, name, type = "text", placeholder, error }: { label: string; name: string; type?: string; placeholder?: string; error?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-[var(--cyan)]"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border border-border bg-[var(--surface)] p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center clip-arrow bg-[var(--cyan)] text-[var(--primary-foreground)]">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xs font-black uppercase tracking-[0.25em] text-muted-foreground">{title}</div>
        <div className="mt-1 text-sm text-foreground/90">{children}</div>
      </div>
    </div>
  );
}
