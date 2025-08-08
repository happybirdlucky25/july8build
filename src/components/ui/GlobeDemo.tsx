'use client';
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "framer-motion";

export function GlobeDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const r = useSpring(0, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    if (!canvasRef.current) return;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [
        { location: [37.78, -122.412], size: 0.1 },
        { location: [52.52, 13.405], size: 0.1 },
        { location: [35.676, 139.65], size: 0.1 },
        { location: [51.507, -0.127], size: 0.1 },
        { location: [-22.906, -43.172], size: 0.1 },
        { location: [40.712, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + r.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });
    return () => globe.destroy();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>cobe</h1>
        <h2>react + typescript</h2>
      </div>
      <div className="container">
        <div className="card">
          <canvas
            ref={canvasRef}
            style={{
              width: 600,
              height: 600,
              maxWidth: "100%",
              aspectRatio: 1,
              opacity: 0,
              transition: "opacity 1s ease",
            }}
            onPointerDown={(e) => {
              pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grabbing";
              }
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
              }
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
              }
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                r.set(delta / 200);
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                r.set(delta / 100);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
