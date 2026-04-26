import { createServerFn } from "@tanstack/react-start";

export type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
};

export type GoogleReviewsData = {
  rating: number | null;
  total: number | null;
  reviews: GoogleReview[];
  error: string | null;
};

const PLACE_ID = "ChIJUXSXqmXNjIgRGdlisSfa5Z8";

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsData> => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return { rating: null, total: null, reviews: [], error: "Missing GOOGLE_PLACES_API_KEY" };
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&reviews_sort=newest&key=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) {
        return { rating: null, total: null, reviews: [], error: `HTTP ${res.status}` };
      }
      const json = (await res.json()) as {
        status: string;
        error_message?: string;
        result?: {
          rating?: number;
          user_ratings_total?: number;
          reviews?: GoogleReview[];
        };
      };

      if (json.status !== "OK") {
        return {
          rating: null,
          total: null,
          reviews: [],
          error: json.error_message || json.status,
        };
      }

      return {
        rating: json.result?.rating ?? null,
        total: json.result?.user_ratings_total ?? null,
        reviews: json.result?.reviews ?? [],
        error: null,
      };
    } catch (e) {
      console.error("Google Places fetch failed", e);
      return { rating: null, total: null, reviews: [], error: "Request failed" };
    }
  },
);
