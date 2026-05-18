import { createFileRoute, Link } from "@tanstack/react-router";
import { getGoogleReviews, type GooglePhoto, type GoogleReview } from "@/utils/google-reviews";
import logo from "@/assets/thatz-a-wrap-logo.png";
import hero from "@/assets/hero-supercar.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Car, Shield, Sparkles, Palette, Star, MapPin, ArrowRight } from "lucide-react";
import { AiPageSearch } from "@/components/site/AiPageSearch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thatz a Wrap | #1 Custom Vehicle Wraps in Columbus, Georgia" },
      { name: "description", content: "Premium vehicle wraps, paint protection film, and ceramic coating in Columbus, GA. Serving Phenix City, Fort Moore & surrounding areas." },
      { property: "og:title", content: "Thatz a Wrap | Custom Vehicle Wraps Columbus GA" },
      { property: "og:description", content: "Premium vehicle wraps, PPF & ceramic coating in Columbus, Georgia." },
    ],
  }),
  loader: () => getGoogleReviews(),
  staleTime: 1000 * 60 * 60, // 1 hour
  component: HomePage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center">
      <p className="text-muted-foreground">Something went wrong: {error.message}</p>
    </div>
  ),
});

const services = [
  { icon: Car, title: "Vehicle Wraps", desc: "Full, partial & color change wraps with 3M and Avery materials.", accent: "cyan" as const, href: "/services" as const },
  { icon: Shield, title: "Paint Protection Film", desc: "Invisible armor that keeps your paint flawless for years.", accent: "cyan" as const, href: "/services" as const },
  { icon: Sparkles, title: "Ceramic Coating", desc: "Hydrophobic, high-gloss protection that lasts.", accent: "lime" as const, href: "/services" as const },
  { icon: Palette, title: "Graphic Design", desc: "Custom commercial branding and one-of-a-kind designs.", accent: "lime" as const, href: "/services" as const },
];

function HomePage() {
  const { rating, total, reviews, photos, error } = Route.useLoaderData();
  const portfolioPhotos = photos.slice(0, 8);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-40 blur-sm" width={1920} height={1088} />
          <div className="absolute inset-0 grid-bg opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>
        <div className="relative flex flex-col items-center pb-20 text-center md:pb-32">
          <img src={logo} alt="Thatz a Wrap" className="w-full drop-shadow-[0_0_40px_rgba(0,200,255,0.35)]" width={1920} height={1110} />
          <h1 className="mt-8 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            The <span className="text-[var(--cyan)]">#1 Custom Vehicle Wraps</span> in Columbus Georgia
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Precision-cut wraps, ceramic coating, and paint protection — engineered to perform.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="clip-arrow group inline-flex items-center justify-center gap-2 bg-[var(--cyan)] px-7 py-4 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] transition-all hover:shadow-[var(--glow-cyan)]"
            >
              Get a Free Quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center border border-[var(--lime)]/60 px-7 py-4 text-sm font-black uppercase tracking-widest text-[var(--lime)] transition-all hover:bg-[var(--lime)]/10 hover:shadow-[var(--glow-lime)]"
            >
              Explore Services
            </Link>
          </div>
          <div className="mt-10 w-full px-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Looking for something specific? Generate a page on the fly
            </p>
            <AiPageSearch />
          </div>
        </div>
        {/* racing stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[image:var(--gradient-brand)]" />
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="What We Do"
          title="Built for Speed. Designed to Last."
          description="From mirror-finish ceramic coatings to head-turning custom wraps, every job is dialed in by hand."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            const isLime = s.accent === "lime";
            return (
              <Link
                key={s.title}
                to={s.href}
                className="group relative overflow-hidden border border-border bg-[var(--surface)] p-6 transition-all hover:-translate-y-1"
                style={{ boxShadow: isLime ? undefined : undefined }}
              >
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 opacity-20 transition-opacity group-hover:opacity-40 halftone"
                  style={{ color: isLime ? "var(--lime)" : "var(--cyan)" }}
                />
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center clip-arrow"
                  style={{ background: isLime ? "var(--lime)" : "var(--cyan)", color: "var(--primary-foreground)" }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-black">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div
                  className="mt-5 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-all"
                  style={{ color: isLime ? "var(--lime)" : "var(--cyan)" }}
                >
                  Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: isLime ? "var(--lime)" : "var(--cyan)" }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="relative bg-[var(--surface)] py-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-5">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Our Work" title="Recent Builds" description="A look at some of the cleanest custom wraps and finishes we've put on the road in Columbus." />
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[var(--cyan)] hover:text-[var(--lime)]">
              View Portfolio <ArrowRight size={16} />
            </Link>
          </div>
          {portfolioPhotos.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {portfolioPhotos.map((photo: GooglePhoto, i: number) => (
                <div key={photo.id} className="group relative aspect-square overflow-hidden border border-border bg-[var(--surface)]">
                  <img
                    src={`/api/places-photo/${photo.id}?w=800`}
                    alt={`Thatz a Wrap project ${i + 1}`}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--cyan)]">Columbus, GA</div>
                    <div className="mt-1 text-sm font-bold">From Our Shop</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid place-items-center border border-border bg-[var(--surface)] py-16 text-center">
              <p className="text-sm text-muted-foreground">Loading shop photos from Google…</p>
            </div>
          )}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Google Reviews"
          title="Trusted by Drivers Across Columbus"
          description={
            rating && total
              ? `Rated ${rating.toFixed(1)} out of 5 across ${total.toLocaleString()} verified Google reviews.`
              : "Real reviews from real customers — see why we're the go-to wrap shop in the region."
          }
          align="center"
        />
        {rating !== null && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex gap-0.5 text-[var(--lime)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill={i < Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} />
              ))}
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-[var(--cyan)]">
              {rating.toFixed(1)} / 5.0
            </span>
          </div>
        )}
        {error && reviews.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Unable to load live reviews right now. Visit our Google Business Profile to read the latest.
          </p>
        )}
        {reviews.length > 0 && (
          <div className="mt-12 -mx-5 overflow-x-auto px-5 pb-4 [scrollbar-width:thin]">
            <div className="flex gap-5 snap-x snap-mandatory">
              {reviews.map((r: GoogleReview, idx: number) => (
                <div
                  key={`${r.author_name}-${idx}`}
                  className="relative w-[85%] flex-shrink-0 snap-start border border-border bg-[var(--surface)] p-6 sm:w-[420px]"
                >
                  <div className="absolute -top-px left-0 h-0.5 w-12 bg-[var(--lime)]" />
                  <div className="flex gap-0.5 text-[var(--lime)]">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="mt-4 line-clamp-6 text-sm text-foreground/90">"{r.text}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    {r.profile_photo_url ? (
                      <img
                        src={r.profile_photo_url}
                        alt={r.author_name}
                        loading="lazy"
                        className="h-9 w-9 object-cover"
                        width={36}
                        height={36}
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center bg-[var(--cyan)] text-sm font-black text-[var(--primary-foreground)]">
                        {r.author_name[0]}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold">{r.author_name}</div>
                      <div className="text-xs text-muted-foreground">{r.relative_time_description} · Google</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              ← Swipe / scroll →
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-y border-border bg-background py-16">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center">
          <h2 className="text-3xl font-black md:text-5xl">
            Ready to <span className="brand-text">Wrap It Up?</span>
          </h2>
          <p className="max-w-xl text-muted-foreground">Free quotes. No pressure. Premium results.</p>
          <Link
            to="/contact"
            className="clip-arrow inline-flex items-center gap-2 bg-[var(--lime)] px-8 py-4 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)] transition-all hover:shadow-[var(--glow-lime)]"
          >
            Start Your Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
