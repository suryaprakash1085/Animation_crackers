import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; color: string; size: number;
  type: "spark" | "trail" | "ring" | "glitter" | "ember";
  rot?: number; vr?: number;
}

interface Rocket {
  x: number; y: number; vx: number; vy: number;
  targetY: number; color: string;
  trail: { x: number; y: number; a: number }[];
  shape: "burst" | "ring" | "willow" | "chrysanthemum" | "heart" | "double";
}

interface Shockwave {
  x: number; y: number; r: number; maxR: number; color: string; life: number;
}

const COLORS = [
  "255, 80, 80",    // red
  "255, 180, 60",   // gold
  "255, 120, 200",  // pink
  "120, 200, 255",  // sky
  "255, 220, 120",  // yellow
  "180, 120, 255",  // violet
  "120, 255, 180",  // mint
  "255, 140, 60",   // orange
];

const SHAPES: Rocket["shape"][] = ["burst", "ring", "willow", "chrysanthemum", "heart", "double"];

interface Props {
  intensity?: number; // bursts per second
  className?: string;
}

export const Fireworks = ({ intensity = 0.9, className = "" }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const waves: Shockwave[] = [];

    const launch = () => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.random() * rect.width * 0.85 + rect.width * 0.075;
      const targetY = Math.random() * rect.height * 0.45 + 50;
      const drift = (Math.random() - 0.5) * 0.6;
      rockets.push({
        x, y: rect.height + 10,
        vx: drift,
        vy: -8 - Math.random() * 3,
        targetY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: [],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      });
    };

    const heartPoint = (t: number, scale: number) => {
      const x = scale * 16 * Math.pow(Math.sin(t), 3);
      const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return { x, y };
    };

    const explode = (x: number, y: number, color: string, shape: Rocket["shape"]) => {
      // shockwave
      waves.push({ x, y, r: 0, maxR: 90 + Math.random() * 40, color, life: 0 });

      // central flash
      for (let i = 0; i < 12; i++) {
        particles.push({
          x, y, vx: 0, vy: 0,
          life: 0, maxLife: 12,
          color: "255, 255, 240",
          size: 6 + Math.random() * 4,
          type: "glitter",
        });
      }

      if (shape === "ring") {
        const count = 80;
        const speed = 4.2;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0, maxLife: 80 + Math.random() * 30,
            color, size: 2.2,
            type: "spark",
          });
        }
      } else if (shape === "willow") {
        const count = 70;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.5 + Math.random() * 2;
          particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1,
            life: 0, maxLife: 110 + Math.random() * 50,
            color, size: 1.8 + Math.random() * 1.2,
            type: "trail",
          });
        }
      } else if (shape === "chrysanthemum") {
        // double-layer
        for (let layer = 0; layer < 2; layer++) {
          const count = 50;
          const baseSpeed = layer === 0 ? 2.5 : 4.5;
          for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (layer * 0.05);
            const speed = baseSpeed + Math.random() * 1.2;
            particles.push({
              x, y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 0, maxLife: 70 + Math.random() * 40,
              color, size: 2 + Math.random() * 1.5,
              type: "spark",
            });
          }
        }
        // glitter
        for (let i = 0; i < 30; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3;
          particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0, maxLife: 40 + Math.random() * 20,
            color: "255, 255, 220",
            size: 1.2,
            type: "glitter",
          });
        }
      } else if (shape === "heart") {
        const count = 70;
        const scale = 0.18;
        for (let i = 0; i < count; i++) {
          const t = (Math.PI * 2 * i) / count;
          const p = heartPoint(t, scale);
          particles.push({
            x, y,
            vx: p.x,
            vy: p.y,
            life: 0, maxLife: 90 + Math.random() * 30,
            color, size: 2.4,
            type: "spark",
          });
        }
      } else if (shape === "double") {
        const c2 = COLORS[Math.floor(Math.random() * COLORS.length)];
        const cols = [color, c2];
        for (let layer = 0; layer < 2; layer++) {
          const count = 45;
          const speed = layer === 0 ? 2.2 : 4;
          for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            particles.push({
              x, y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 0, maxLife: 70 + Math.random() * 30,
              color: cols[layer],
              size: 2,
              type: "spark",
            });
          }
        }
      } else {
        // burst (default — rich)
        const count = 80 + Math.floor(Math.random() * 30);
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + Math.random() * 0.1;
          const speed = 1.2 + Math.random() * 4.5;
          particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0, maxLife: 60 + Math.random() * 50,
            color, size: 2 + Math.random() * 2,
            type: Math.random() > 0.7 ? "ember" : "spark",
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.2,
          });
        }
      }
    };

    let lastLaunch = 0;
    const draw = (t: number) => {
      const rect = canvas.getBoundingClientRect();
      // soft warm trail fade
      ctx.fillStyle = "rgba(255, 248, 235, 0.16)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      if (t - lastLaunch > 1000 / intensity) {
        launch();
        // occasional double launch
        if (Math.random() > 0.7) setTimeout(() => launch(), 180);
        lastLaunch = t;
      }

      // shockwaves
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.r += 3.5;
        w.life++;
        const alpha = Math.max(0, 1 - w.r / w.maxR);
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${w.color}, ${alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        if (w.r >= w.maxR) waves.splice(i, 1);
      }

      // rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // ribbon trail
        r.trail.push({ x: r.x, y: r.y, a: 1 });
        if (r.trail.length > 14) r.trail.shift();
        for (let j = 0; j < r.trail.length; j++) {
          const tp = r.trail[j];
          const a = (j / r.trail.length) * 0.7;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, 1.6 + j * 0.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r.color}, ${a})`;
          ctx.fill();
        }

        // glowing head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.shadowBlur = 18;
        ctx.shadowColor = `rgba(${r.color}, 0.9)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // crackling sparks during ascent
        if (Math.random() > 0.5) {
          particles.push({
            x: r.x + (Math.random() - 0.5) * 3,
            y: r.y + 4,
            vx: (Math.random() - 0.5) * 0.6,
            vy: 0.6 + Math.random() * 0.8,
            life: 0, maxLife: 18,
            color: r.color, size: 1,
            type: "ember",
          });
        }

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color, r.shape);
          rockets.splice(i, 1);
        }
      }

      // particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.type === "trail") {
          p.vy += 0.06;
          p.vx *= 0.985;
          p.vy *= 0.985;
        } else if (p.type === "glitter") {
          p.vx *= 0.92;
          p.vy *= 0.92;
        } else {
          p.vy += 0.045;
          p.vx *= 0.99;
          p.vy *= 0.99;
        }
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - lifeRatio);
        const flicker = p.type === "ember" ? 0.6 + Math.random() * 0.4 : 1;

        if (p.type === "trail") {
          // willow long streak
          ctx.beginPath();
          ctx.moveTo(p.x - p.vx * 2, p.y - p.vy * 2);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${p.color}, ${alpha * 0.9})`;
          ctx.lineWidth = p.size;
          ctx.lineCap = "round";
          ctx.stroke();
        } else if (p.type === "glitter") {
          // sparkly star
          const s = p.size * (1 - lifeRatio * 0.5);
          ctx.fillStyle = `rgba(255, 255, 220, ${alpha})`;
          ctx.shadowBlur = 14;
          ctx.shadowColor = `rgba(255, 240, 180, ${alpha})`;
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - lifeRatio * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${alpha * flicker})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${p.color}, ${alpha * 0.8})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      style={{ mixBlendMode: "multiply" }}
    />
  );
};
