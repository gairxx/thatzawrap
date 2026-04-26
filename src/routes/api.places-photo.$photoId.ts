import { createFileRoute } from "@tanstack/react-router";
import { PLACE_ID_EXPORT } from "@/utils/google-reviews";

export const Route = createFileRoute("/api/places-photo/$photoId")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) return new Response("Missing API key", { status: 500 });

        const url = new URL(request.url);
        const maxWidth = Math.min(
          Math.max(parseInt(url.searchParams.get("w") ?? "1200", 10) || 1200, 100),
          1600,
        );

        const photoUrl = `https://places.googleapis.com/v1/places/${PLACE_ID_EXPORT}/photos/${params.photoId}/media?maxWidthPx=${maxWidth}&key=${apiKey}`;

        const res = await fetch(photoUrl, { redirect: "follow" });
        if (!res.ok) return new Response("Photo fetch failed", { status: res.status });

        return new Response(res.body, {
          status: 200,
          headers: {
            "Content-Type": res.headers.get("Content-Type") ?? "image/jpeg",
            "Cache-Control": "public, max-age=86400, s-maxage=604800",
          },
        });
      },
    },
  },
});
