"use client";

import { useEffect, useState } from "react";

const images = [
  "/cardbeta01.png", "/cardbeta02.png", "/cardbeta03.png", "/cardbeta04.png", "/cardbeta05.png",
  "/cardbeta06.png", "/cardbeta07.png", "/cardbeta08.png", "/cardbeta09.png", "/cardbeta10.png",
];

export default function PhotosSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <img src={images[index]} alt="" className="w-full h-auto block" />
    </section>
  );
}
