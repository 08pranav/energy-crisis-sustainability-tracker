import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.15,
      dark: 1,       // Dark mode globe
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 4,
      baseColor: [0.05, 0.05, 0.05],   // Nearly black base
      markerColor: [0.1, 0.8, 0.4],    // Emerald markers
      glowColor: [0.05, 0.05, 0.1],     // Subtle dark glow
      markers: [
        // Simulated global energy hot zones
        { location: [48.8566, 2.3522], size: 0.04 }, // Europe
        { location: [35.6762, 139.6503], size: 0.05 }, // Japan
        { location: [40.7128, -74.0060], size: 0.06 }, // NY
        { location: [25.2048, 55.2708], size: 0.08 }, // Middle East
        { location: [39.9042, 116.4074], size: 0.07 }, // China
      ],
      // @ts-expect-error onRender is valid but might be missing from TS declarations
      onRender: (state: any) => {
        // Slow continuous rotation
        state.phi = phi;
        phi += 0.002;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-full pointer-events-none opacity-80 mix-blend-screen scale-110">
      <canvas
        ref={canvasRef}
        style={{
          width: 500,
          height: 500,
          maxWidth: "100%",
          aspectRatio: 1,
        }}
      />
    </div>
  );
}
