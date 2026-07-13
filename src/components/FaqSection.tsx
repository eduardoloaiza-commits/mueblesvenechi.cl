import { JsonLd } from "./JsonLd";
import { faqJsonLd, type FaqItem } from "@/lib/seo";

// Preguntas frecuentes con <details> nativo (sin JS) + schema FAQPage.
export function FaqSection({ items, title = "Preguntas frecuentes" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="container-page py-20">
      <JsonLd data={faqJsonLd(items)} />
      <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">{title}</h2>
      <div className="mt-3 h-px w-16 bg-gold" />
      <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden className="text-gold transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
