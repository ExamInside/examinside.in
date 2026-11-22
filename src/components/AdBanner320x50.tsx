import { useEffect, useRef } from "react";

export default function AdBanner320x50() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    (window as unknown as { atOptions?: Record<string, unknown> }).atOptions = {
      key: "606c26df53f6bf3d67e6bf3e95941a",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://bicea.org/22/606c26df53f6bf3d67e6bf3e95941a.js";
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-3 flex min-h-[50px] w-full items-center justify-center overflow-hidden"
    />
  );
}
