export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <div className={`mb-3 flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-[var(--cyan)]" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--cyan)]">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl font-black md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base text-muted-foreground md:text-lg">{description}</p>}
    </div>
  );
}
