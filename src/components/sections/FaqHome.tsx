import SectionHeading from "@/components/ui/SectionHeading";
import FaqItem from "@/components/ui/FaqItem";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "groq";
import { type PortableTextBlock } from "@portabletext/react";

const FAQ_QUERY = defineQuery(
  `*[_type == "faq"] | order(_createdAt asc) { _id, question, answer }`,
);

export default async function FaqHome() {
  const { data: faqs } = await sanityFetch({ query: FAQ_QUERY });

  return (
    <section>
      <div className="bg-bluebrand">
        <div className="relative px-6 md:px-8 pt-16 ">
          <SectionHeading
            lines={["Foire", "aux questions"]}
            sizeClassName="text-[clamp(2rem,12vw,14rem)]"
            className="mb-8"
          />
          <img
            src="/pigeonquestion.png"
            alt=""
            className="hidden md:block absolute right-[100px] bottom-0 z-10 w-48lg:w-88 h-auto"
          />
        </div>
        <div>
          {faqs.map((faq) => (
            <FaqItem
              key={faq._id}
              question={faq.question ?? ""}
              answer={(faq.answer ?? []) as PortableTextBlock[]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
