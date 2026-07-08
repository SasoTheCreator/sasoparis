import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "groq";

const VISITES_QUERY = defineQuery(
  `*[_type == "visite"] | order(_createdAt asc) { _id, title, cardDescription, duration, price, "slug": slug.current }`,
);

export default async function VisitesSection() {
  const { data: visites } = await sanityFetch({ query: VISITES_QUERY });

  return (
    <section>
      <div className="bg-bluebrand pt-8 lg:pt-16">
        <SectionHeading
          lines={["Visites", "signatures"]}
          className="md:px-8 py-16 px-6"
        />
        <div>
          {visites.map((visite) => (
            <Card
              key={visite._id}
              title={visite.title ?? ""}
              description={visite.cardDescription ?? ""}
              duration={visite.duration ?? ""}
              price={visite.price ?? ""}
              slug={visite.slug ?? ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
