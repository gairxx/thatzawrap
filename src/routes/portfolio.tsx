import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getGoogleReviews } from "@/utils/google-reviews";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | Custom Vehicle Wraps Columbus Georgia" },
      { name: "description", content: "Recent vehicle wraps, ceramic coatings, and PPF projects in Columbus, GA — straight from our Google Business profile." },
      { property: "og:title", content: "Portfolio | Thatz a Wrap" },
      { property: "og:description", content: "Recent custom wrap and detail work from Columbus, Georgia." },
    ],
  }),
  loader: () => getGoogleReviews(),
  staleTime: 1000 * 60 * 60,
  component: PortfolioPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center">
      <p className="text-muted-foreground">Something went wrong: {error.message}</p>
    </div>
  ),
});

function PortfolioPage() {
  const { photos, error } = Route.useLoaderData();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center">
          <div className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[var(--lime)]">Portfolio</div>
          <h1 className="text-4xl font-black md:text-6xl">Recent <span className="brand-text">Builds</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Live gallery pulled straight from our Google Business profile —
            wraps, PPF, and ceramic work from the Columbus, Georgia shop.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <SectionHeading eyebrow="From Our Google Profile" title="Straight From the Shop" />

        {photos.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo, i) => (
              <article
                key={photo.id}
                className="group relative aspect-square overflow-hidden border border-border bg-[var(--surface)]"
              >
                <img
                  src={`/api/places-photo/${photo.id}?w=900`}
                  alt={`Thatz a Wrap shop photo ${i + 1}`}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--cyan)]">Columbus, GA</div>
                  <div className="mt-1 text-sm font-bold">From Our Shop</div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid place-items-center border border-border bg-[var(--surface)] py-16 text-center">
            <p className="text-sm text-muted-foreground">
              {error ? "Unable to load photos right now. Please check back soon." : "Loading shop photos from Google…"}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
