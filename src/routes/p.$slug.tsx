import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getOrCreateAiPage } from "@/server/ai-pages.functions";

export const Route = createFileRoute("/p/$slug")({
  loader: ({ params }) => getOrCreateAiPage({ data: { slug: params.slug } }),
  staleTime: 1000 * 60 * 60,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Thatz a Wrap` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
        ]
      : [],
  }),
  component: AiPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="brand-text text-4xl">Couldn't generate that page</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center bg-[var(--cyan)] px-5 py-2.5 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)]"
        >
          Try again
        </button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <h1 className="brand-text text-4xl">Page not found</h1>
      <Link to="/" className="mt-6 inline-block text-[var(--cyan)] underline">
        Go home
      </Link>
    </div>
  ),
});

function AiPage() {
  const page = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="brand-text text-4xl md:text-5xl">{page.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{page.description}</p>
      <div className="prose prose-invert mt-10 max-w-none prose-headings:brand-text prose-a:text-[var(--cyan)]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content_md}</ReactMarkdown>
      </div>
      <div className="mt-12 border-t border-border pt-8 text-center">
        <Link
          to="/contact"
          className="clip-arrow inline-flex items-center bg-[var(--lime)] px-6 py-3 text-sm font-black uppercase tracking-widest text-[var(--primary-foreground)]"
        >
          Get a free quote
        </Link>
      </div>
    </article>
  );
}
