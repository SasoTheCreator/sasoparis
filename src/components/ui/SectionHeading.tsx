interface SectionHeadingProps {
  lines: string[];
  className?: string;
  sizeClassName?: string;
}

export default function SectionHeading({
  lines,
  className,
  sizeClassName = "text-[clamp(2rem,14vw,14rem)]",
}: SectionHeadingProps) {
  return (
    <h1
      className={`font-sans font-medium tracking-[-0.1em] flex flex-col text-orangebrand leading-none ${sizeClassName} ${className ?? ""}`}
    >
      {lines.map((line, i) => (
        <p key={line} className={i > 0 ? "-mt-[0.2em]" : ""}>
          {line}
        </p>
      ))}
    </h1>
  );
}
