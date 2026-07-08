import Link from "next/link";
import TagGroup from "./TagGroup";

interface CardProps {
  title: string;
  description: string;
  duration: string;
  price: string;
  slug: string;
}

export default function Card({
  title,
  description,
  duration,
  price,
  slug,
}: CardProps) {
  return (
    <Link href={`/visites/${slug}`} className="block">
      <div className="flex flex-col border-t-1 border-dashed md:px-12 py-12 px-6">
        <TagGroup duration={duration} price={price} className="pt-4" />
        <h3 className="font-instrument-serif text-4xl lg:text-7xl text-orangebrand tracking-[-0.05em] mt-6">
          {title}
        </h3>
        <p className="text-lg lg:text-xl pb-4 max-w-2xl pt-6 ">{description}</p>
      </div>
    </Link>
  );
}
