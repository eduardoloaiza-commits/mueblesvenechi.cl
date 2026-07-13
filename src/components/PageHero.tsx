import Image from "next/image";

// Cabecera editorial de página interior: kicker dorado, H1 y bajada,
// con imagen de fondo atenuada opcional.
export function PageHero({
  kicker,
  title,
  lede,
  image,
}: {
  kicker: string;
  title: string;
  lede: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      {image && (
        <>
          <Image src={image} alt="" fill priority className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        </>
      )}
      <div className="rule-gold relative" />
      <div className="container-page relative py-16 sm:py-20">
        <p className="kicker text-gold">{kicker}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl font-medium leading-[1.08] text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{lede}</p>
      </div>
    </section>
  );
}
