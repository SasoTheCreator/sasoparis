import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

interface VisiteGridProps {
  imageGrid?: SanityImageSource | null;
}

export default function VisiteGrid({ imageGrid }: VisiteGridProps) {
  return (
    <section>
      <div className="md:px-16 py-16 px-4">
        <div className="grid grid-cols-3 grid-rows-2">
          <div className="aspect-square flex items-center justify-center p-0 md:p-4">
            <p className="font-sans font-medium text-orangebrand text-center tracking-[-0.1em] text-md md:text-3xl lg:text-7xl">
              Penser à...
            </p>
          </div>

          <div className="aspect-square overflow-hidden">
            <Image
              src="/bottle.png"
              alt=""
              width={612}
              height={612}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="aspect-square overflow-hidden">
            <Image
              src="/girlcamera.png"
              alt=""
              width={612}
              height={612}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="aspect-square overflow-hidden">
            <Image
              src="/shoes.png"
              alt=""
              width={612}
              height={612}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="aspect-square relative overflow-hidden">
            {imageGrid && (
              <Image
                src={urlFor(imageGrid).width(600).height(600).url()}
                alt=""
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="aspect-square overflow-hidden">
            <Image
              src="/ticket.png"
              alt=""
              width={612}
              height={612}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
