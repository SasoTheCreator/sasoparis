import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "solid" | "outline";
  href?: string;
}

const VARIANT_CLASSES = {
  solid: "bg-orangebrand text-yellowbrand text-lg",
  outline: "border border-yellowbrand text-yellowbrand",
};

const BASE_CLASSES =
  "tracking-[-0.05em] rounded-full font-sans font-medium text-base px-[20px] py-[10px]";

export default function Button({
  className,
  children,
  variant = "solid",
  href,
  ...props
}: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
