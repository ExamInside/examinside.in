import { useEffect, useRef } from "react";

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

export default function AdBanner320x50() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    window.atOptions = {
      key: "806c28d8f53fb0f13eb7e6bf3e95941a",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://bicea.org/22/806c28d8f53fb3f13eb7e6bf3e95941a";
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-3 flex min-h-[50px] w-full items-center justify-center overflow-hidden md:hidden"
    />
  );
}
