"use client";

import { useState } from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

interface FaqItemProps {
  question: string;
  answer: PortableTextBlock[];
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t-1 border-dashed border-orangebrand md:px-8 py-8 lg:py-12 ">
      <button
        className="flex w-full items-start justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="font-instrument-serif text-4xl lg:text-7xl text-orangebrand text-left tracking-[-0.05em] ">
          {question}
        </h3>
        <span className="text-orangebrand text-4xl lg:text-7xl font-light shrink-0 pr-6 lg:pr-0">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className=" lg:text-xl text-orangebrand mt-4 lg:mt-8 px-6 lg:pr-8 lg:max-w-2xl ">
          <PortableText value={answer} />
        </div>
      )}
    </div>
  );
}
