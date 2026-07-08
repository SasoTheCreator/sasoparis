import { notFound } from "next/navigation";
import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import VisiteHeroSection from "@/components/sections/VisiteHeroSection";
import VisiteVideoSection from "@/components/sections/VisiteVideoSection";
import FaqHome from "@/components/sections/FaqHome";
import VisiteGrid from "@/components/sections/VisiteGrid";

const VISITE_QUERY = defineQuery(
  `*[_type == "visite" && slug.current == $slug][0] {
    title,
    longDescription,
    duration,
    price,
    bookingUrl,
    cover,
    imageGrid,
    Video{
      "url": asset->url,
      "mimeType": asset->mimeType
    },
  }`,
);

const ALL_SLUGS_QUERY = defineQuery(
  `*[_type == "visite" && defined(slug.current)] { "slug": slug.current }`,
);

// Bounds how stale published content can get — SanityLive alone only
// guarantees updates to sessions already connected when a change is published.
export const revalidate = 30;

export async function generateStaticParams() {
  // Build-time only: no request context here, so use the plain client
  // instead of sanityFetch (which resolves draftMode() and needs one).
  const data = await client.fetch(ALL_SLUGS_QUERY);
  return data.map((v: { slug: string }) => ({ slug: v.slug }));
}

export default async function VisiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: visite } = await sanityFetch({
    query: VISITE_QUERY,
    params: { slug },
  });

  if (!visite) notFound();

  return (
    <main className="bg-bluebrand">
      <VisiteHeroSection
        title={visite.title ?? ""}
        longDescription={visite.longDescription}
        duration={visite.duration}
        price={visite.price}
        cover={visite.cover}
        bookingUrl={visite.bookingUrl}
      />
      <VisiteVideoSection video={visite.Video} />
      <FaqHome />
      <VisiteGrid imageGrid={visite.imageGrid} />
    </main>
  );
}
