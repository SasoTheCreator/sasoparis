import Image from "next/image";
import TagGroup from "@/components/ui/TagGroup";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

interface VisiteHeroSectionProps {
  title: string;
  longDescription?: string | null;
  duration?: string | null;
  price?: string | null;
  cover?: SanityImageSource | null;
  bookingUrl?: string | null;
}

export default function VisiteHeroSection({
  title,
  longDescription,
  duration,
  price,
  cover,
  bookingUrl,
}: VisiteHeroSectionProps) {
  return (
    <section>
      <div className="px-6 md:px-12 py-16 grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Texte — gauche */}
        <div className="flex flex-col gap-6">
          <TagGroup duration={duration} price={price} />

          <h1 className="font-instrument-serif text-4xl lg:text-7xl text-orangebrand tracking-[-0.05em]">
            {title}
          </h1>
          {longDescription && (
            <p className="text-lg lg:text-xl whitespace-pre-line leading-relaxed">
              {longDescription}
            </p>
          )}

          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-orangebrand text-orangebrand px-8 py-3 text-lg font-semibold hover:bg-orangebrand hover:text-graybrand transition-colors w-fit mt-2"
            >
              Réserver cette visite
            </a>
          )}
        </div>

        {/* Image — droite */}
        {cover && (
          <Image
            src={urlFor(cover).width(900).height(1200).url()}
            alt={title}
            width={900}
            height={1200}
            className="w-full h-auto object-cover"
            priority
          />
        )}
      </div>
    </section>
  );
}
