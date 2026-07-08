interface VisiteVideoSectionProps {
  video?: {
    url: string | null;
    mimeType: string | null;
  } | null;
}

export default function VisiteVideoSection({ video }: VisiteVideoSectionProps) {
  if (!video?.url) return null;

  if (video.mimeType === "image/gif") {
    return (
      <section>
        <img src={video.url} alt="" className="w-full block" />
      </section>
    );
  }

  return (
    <section>
      <video autoPlay muted loop playsInline className="w-full block">
        <source src={video.url} type={video.mimeType ?? undefined} />
      </video>
    </section>
  );
}
