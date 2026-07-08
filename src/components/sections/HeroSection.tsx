import SectionHeading from "@/components/ui/SectionHeading";

export default function HeroSection() {
  return (
    <section>
      <div className="lg:min-h-screen bg-bluebrand flex flex-row justify-start py-12 lg:pb-8 w-full  ">
        <div className="flex flex-col gap-8 w-full">
          <div className="px-6 md:px-12 w-full">
            <SectionHeading lines={["Paris", "autrement"]} />
            <p className="mt-6 lg:text-xl max-w-xl text-orangebrand ">
              Des visites à pied pour celles et ceux que les monuments laissent
              sur leur faim.
            </p>
          </div>

          <div className="w-full">
            <video autoPlay muted loop playsInline className="w-full block">
              <source src="/0624.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
