import Tag from "./Tag";

interface TagGroupProps {
  duration?: string | null;
  price?: string | null;
  className?: string;
}

export default function TagGroup({ duration, price, className }: TagGroupProps) {
  return (
    <div className={`flex flex-wrap ${className ?? ""}`}>
      {duration && <Tag text={duration} className="border-r-0" />}
      {price && <Tag text={price} />}
    </div>
  );
}
