import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutSection() {
  return (
    <section>
      <div className="bg-bluebrand px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-6 lg:w-2/3">
            <SectionHeading lines={["Bonjour"]} />
            <p className="mt-6 lg:text-xl max-w-xl">
              {`Paris m'a appris ses secrets au fil des années, rue après rue. Elle offre une richesse culturelle méconnue qui est à mon sens plus intéressante que l'offre des circuits touristiques convenus.`}
            </p>
            <p className="lg:text-xl max-w-xl">
              {`C'est cette richesse que je souhaite vous transmettre, en construisant chaque visite autour de récits peu connus mais qui méritent largement qu'on s'y arrête.`}
            </p>
          </div>

          <div className="lg:w-1/3">
            <Image
              src="/saosred.png"
              alt="Saso"
              width={269}
              height={292}
              className="w-full h-auto lg:h-full lg:object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
