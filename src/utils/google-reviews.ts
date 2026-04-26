import { createServerFn } from "@tanstack/react-start";

export type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
};

export type GooglePhoto = {
  id: string; // last segment of the photo "name"
  width: number;
  height: number;
};

export type GoogleReviewsData = {
  rating: number | null;
  total: number | null;
  reviews: GoogleReview[];
  photos: GooglePhoto[];
  error: string | null;
};

const PLACE_ID = "ChIJUXSXqmXNjIgRGdlisSfa5Z8";

type NewPlaceReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
};

type NewPlacePhoto = {
  name?: string;
  widthPx?: number;
  heightPx?: number;
};

type NewPlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: NewPlaceReview[];
  photos?: NewPlacePhoto[];
  error?: { code: number; message: string; status: string };
};

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsData> => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_PLACES_API_KEY is not set");
      return { rating: null, total: null, reviews: [], photos: [], error: "Missing API key" };
    }

    try {
      const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount,reviews,photos`;
      const res = await fetch(url, {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "Accept-Language": "en",
        },
      });

      const json = (await res.json()) as NewPlaceResponse;

      if (!res.ok || json.error) {
        const msg = json.error?.message || `HTTP ${res.status}`;
        console.error("Google Places API error:", msg);
        return { rating: null, total: null, reviews: [], photos: [], error: msg };
      }

      const reviews: GoogleReview[] = (json.reviews ?? []).map((r) => ({
        author_name: r.authorAttribution?.displayName ?? "Google User",
        rating: r.rating ?? 5,
        text: r.text?.text ?? r.originalText?.text ?? "",
        relative_time_description: r.relativePublishTimeDescription ?? "",
        profile_photo_url: r.authorAttribution?.photoUri,
      }));

      const photos: GooglePhoto[] = (json.photos ?? [])
        .map((p) => {
          // name is like "places/<placeId>/photos/<photoId>"
          const id = p.name?.split("/photos/")[1] ?? "";
          return id
            ? {
                id,
                width: p.widthPx ?? 1200,
                height: p.heightPx ?? 800,
              }
            : null;
        })
        .filter((p): p is GooglePhoto => p !== null);

      return {
        rating: json.rating ?? null,
        total: json.userRatingCount ?? null,
        reviews,
        photos,
        error: null,
      };
    } catch (e) {
      console.error("Google Places fetch failed", e);
      return { rating: null, total: null, reviews: [], photos: [], error: "Request failed" };
    }
  },
);

export const PLACE_ID_EXPORT = PLACE_ID;
