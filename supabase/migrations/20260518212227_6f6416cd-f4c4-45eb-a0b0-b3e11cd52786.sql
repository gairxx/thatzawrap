CREATE TABLE public.ai_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_md TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.ai_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read ai_pages" ON public.ai_pages FOR SELECT USING (true);
CREATE INDEX ai_pages_slug_idx ON public.ai_pages(slug);