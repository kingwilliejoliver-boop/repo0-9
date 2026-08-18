import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; tw: number };

export default function StarsGalaxy({
  stars = 1000,
  speed = 2,
  spread = 5,
  focal = 2,
  twinkle = 0.35,
  trail = 0.75,
  size = 2,
  fadeInRange = 5,
  reverseFly = true,
  followCursor = false,
  background = "#000000",
  starColor = "#ffffff",
  edgeFade = "none",
  className,
}: {
  stars?: number;
  speed?: number;
  spread?: number;
  focal?: number;
  twinkle?: number;
  trail?: number;
  size?: number;
  fadeInRange?: number;
  reverseFly?: boolean;
  followCursor?: boolean;
  background?: string;
  starColor?: string;
  edgeFade?: "none" | "top" | "bottom";
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const createStar = (): Star => ({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      z: Math.random(),
      tw: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    starsRef.current = Array.from({ length: stars }, createStar);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      mouse.current.y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    };
    window.addEventListener("mousemove", onMouseMove);
    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    let raf = 0;
    const animate = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.globalAlpha = 1;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);
      if (trail < 1) {
        ctx.globalAlpha = 1 - trail;
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = starColor;
      const cx = followCursor ? mouse.current.x * w : w / 2;
      const cy = followCursor ? mouse.current.y * h : h / 2;
      for (const s of starsRef.current) {
        const depth = s.z * clamp(focal, 0.01, 10) + 0.001;
        const px = cx + (s.x / depth) * w;
        const py = cy + (s.y / depth) * h;
        s.z += reverseFly ? clamp(speed, 0, 10) * 0.002 : -clamp(speed, 0, 10) * 0.002;
        if (s.z <= 0 || s.z > 1) Object.assign(s, createStar());
        s.tw += clamp(twinkle, 0, 1) * 0.05;
        const alpha = Math.max(0, 1 - s.z / clamp(fadeInRange, 0.1, 10));
        const radius = clamp(size, 0.1, 5) * (1 - s.z) * (1 + Math.sin(s.tw) * clamp(twinkle, 0, 1));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (edgeFade === "bottom" || edgeFade === "top") {
        const fadeH = Math.min(340, h * 0.48);
        const fade = ctx.createLinearGradient(
          0,
          edgeFade === "bottom" ? h - fadeH : 0,
          0,
          edgeFade === "bottom" ? h : fadeH,
        );
        if (edgeFade === "bottom") {
          fade.addColorStop(0, "rgba(0,0,0,1)");
          fade.addColorStop(0.35, "rgba(0,0,0,0.85)");
          fade.addColorStop(0.7, "rgba(0,0,0,0.28)");
          fade.addColorStop(1, "rgba(0,0,0,0)");
        } else {
          fade.addColorStop(0, "rgba(0,0,0,0)");
          fade.addColorStop(0.3, "rgba(0,0,0,0.28)");
          fade.addColorStop(0.65, "rgba(0,0,0,0.85)");
          fade.addColorStop(1, "rgba(0,0,0,1)");
        }
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = fade;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [stars, speed, spread, focal, twinkle, trail, size, fadeInRange, reverseFly, followCursor, background, starColor, edgeFade]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        background: edgeFade === "none" ? background : "transparent",
      }}
    />
  );
}
