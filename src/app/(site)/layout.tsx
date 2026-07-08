import { SanityLive } from "@/sanity/lib/live";
import Button from "@/components/ui/Button";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Button
        href="/reservation"
        className="fixed top-0 right-0 z-[1000] m-6 md:m-8"
      >
        Je réserve
      </Button>
      {children}
      <SanityLive />
    </>
  );
}
