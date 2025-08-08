'use client';
import { cn } from "@/utils/cn";
import React from "react";
// import { motion } from "framer-motion"; // Currently unused

const Vortex = (props: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}) => {
  const {
    children,
    className,
    containerClassName,
    particleCount = 700,
    rangeY = 100,
    baseHue = 220,
    baseSpeed = 0.0,
    rangeSpeed = 1.5,
    baseRadius = 1,
    rangeRadius = 2,
    backgroundColor = "black",
  } = props;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const particlePool = React.useRef<Particle[]>([]);
  const particleCountRef = React.useRef<number>(particleCount);
  const baseHueRef = React.useRef<number>(baseHue);
  const baseSpeedRef = React.useRef<number>(baseSpeed);
  const rangeSpeedRef = React.useRef<number>(rangeSpeed);
  const baseRadiusRef = React.useRef<number>(baseRadius);
  const rangeRadiusRef = React.useRef<number>(rangeRadius);
  const rangeYRef = React.useRef<number>(rangeY);
  const backgroundColorRef = React.useRef<string>(backgroundColor);
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  React.useEffect(() => {
    particleCountRef.current = particleCount;
  }, [particleCount]);

  React.useEffect(() => {
    baseHueRef.current = baseHue;
  }, [baseHue]);

  React.useEffect(() => {
    baseSpeedRef.current = baseSpeed;
  }, [baseSpeed]);

  React.useEffect(() => {
    rangeSpeedRef.current = rangeSpeed;
  }, [rangeSpeed]);

  React.useEffect(() => {
    baseRadiusRef.current = baseRadius;
  }, [baseRadius]);

  React.useEffect(() => {
    rangeRadiusRef.current = rangeRadius;
  }, [rangeRadius]);

  React.useEffect(() => {
    rangeYRef.current = rangeY;
  }, [rangeY]);

  React.useEffect(() => {
    backgroundColorRef.current = backgroundColor;
  }, [backgroundColor]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        const half_w = w / 2;
        const half_h = h / 2;

        const init = () => {
          particlePool.current = [];
          for (let i = 0; i < particleCountRef.current; i++) {
            particlePool.current.push(
              new Particle(
                w,
                h,
                half_w,
                half_h,
                baseHueRef.current,
                baseSpeedRef.current,
                rangeSpeedRef.current,
                baseRadiusRef.current,
                rangeRadiusRef.current,
                rangeYRef.current
              )
            );
          }
        };

        const resize = () => {
          const w = container.offsetWidth;
          const h = container.offsetHeight;
          canvas.width = w;
          canvas.height = h;
          init();
        };

        window.addEventListener("resize", resize);

        const tick = () => {
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = backgroundColorRef.current;
          ctx.fillRect(0, 0, w, h);

          particlePool.current.forEach((particle) => {
            particle.update(ctx);
          });

          requestAnimationFrame(tick);
        };

        if (isFirstRender) {
          init();
          setIsFirstRender(false);
        }

        tick();

        return () => {
          window.removeEventListener("resize", resize);
        };
      }
    }
  }, [isFirstRender]);

  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
      <div
        ref={containerRef}
        className="absolute h-full w-full inset-0 z-0 bg-transparent"
      >
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

class Particle {
  private w: number;
  private h: number;
  private half_w: number;
  private half_h: number;
  private baseHue: number;
  private baseSpeed: number;
  private rangeSpeed: number;
  private baseRadius: number;
  private rangeRadius: number;
  private rangeY: number;

  private x: number;
  private y: number;
  private speed: number;
  private angle: number;
  private radius: number;
  private hue: number;
  private lightness: number;

  constructor(
    w: number,
    h: number,
    half_w: number,
    half_h: number,
    baseHue: number,
    baseSpeed: number,
    rangeSpeed: number,
    baseRadius: number,
    rangeRadius: number,
    rangeY: number
  ) {
    this.w = w;
    this.h = h;
    this.half_w = half_w;
    this.half_h = half_h;
    this.baseHue = baseHue;
    this.baseSpeed = baseSpeed;
    this.rangeSpeed = rangeSpeed;
    this.baseRadius = baseRadius;
    this.rangeRadius = rangeRadius;
    this.rangeY = rangeY;

    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.angle = 0;
    this.radius = 0;
    this.hue = 0;
    this.lightness = 0;

    this.reset();
  }

  private reset() {
    this.x = Math.random() * this.w;
    this.y = Math.random() * this.h;
    this.speed = this.baseSpeed + Math.random() * this.rangeSpeed;
    this.angle = Math.random() * 360;
    this.radius = this.baseRadius + Math.random() * this.rangeRadius;
    this.hue = this.baseHue + Math.random() * 100;
    this.lightness = 50 + Math.random() * 20;
  }

  public update(ctx: CanvasRenderingContext2D) {
    this.angle += this.speed;
    this.x += Math.cos((this.angle * Math.PI) / 180) * 2;
    this.y += Math.sin((this.angle * Math.PI) / 180) * 2;

    if (this.x > this.w || this.x < 0 || this.y > this.h || this.y < 0) {
      this.reset();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.lightness}%, 1)`;
    ctx.fill();
  }
}

export { Vortex };