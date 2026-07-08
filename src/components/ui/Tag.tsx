interface TagProps {
  text: string;
  className?: string;
}

export default function Tag({ text, className }: TagProps) {
  return (
    <span
      className={`inline-flex items-center border px-8 py-1 text-md ${className ?? ""}`}
    >
      {text}
    </span>
  );
}
