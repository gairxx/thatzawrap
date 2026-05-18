import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const slugSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
});

export type AiPage = {
  slug: string;
  title: string;
  description: string;
  content_md: string;
};

function slugToTopic(slug: string) {
  return slug.replace(/-/g, " ").trim();
}

async function generateWithLovableAi(topic: string): Promise<{
  title: string;
  description: string;
  content_md: string;
}> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

  const systemPrompt = `You write SEO landing pages for "Thatz a Wrap" — a premium vehicle wrap, paint protection film (PPF), and ceramic coating shop in Columbus, Georgia (also serving Phenix City AL and Fort Moore).
Return STRICT JSON: { "title": string (<=60 chars), "description": string (<=160 chars), "content_md": string (Markdown body, 400-700 words, with H2/H3 headings, bullet lists, a short FAQ, and a closing call-to-action mentioning Columbus, GA. No H1 — the page renders its own).`;

  const userPrompt = `Write a unique landing page for the topic: "${topic}". Tie it back to vehicle wraps / PPF / ceramic coating where relevant. If the topic is a city, treat it as a service-area page. If it's a vehicle, treat it as a vehicle-specific wrap page.`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lovable AI error ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(raw);
  return {
    title: String(parsed.title || topic).slice(0, 80),
    description: String(parsed.description || "").slice(0, 200),
    content_md: String(parsed.content_md || ""),
  };
}

export const getOrCreateAiPage = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => slugSchema.parse(data))
  .handler(async ({ data }): Promise<AiPage> => {
    const { slug } = data;

    const existing = await supabaseAdmin
      .from("ai_pages")
      .select("slug,title,description,content_md")
      .eq("slug", slug)
      .maybeSingle();

    if (existing.data) return existing.data as AiPage;

    const topic = slugToTopic(slug);
    const generated = await generateWithLovableAi(topic);

    const insert = await supabaseAdmin
      .from("ai_pages")
      .insert({ slug, ...generated })
      .select("slug,title,description,content_md")
      .single();

    if (insert.error) {
      // Race: another request may have inserted it
      const retry = await supabaseAdmin
        .from("ai_pages")
        .select("slug,title,description,content_md")
        .eq("slug", slug)
        .single();
      if (retry.data) return retry.data as AiPage;
      throw new Error(insert.error.message);
    }
    return insert.data as AiPage;
  });
