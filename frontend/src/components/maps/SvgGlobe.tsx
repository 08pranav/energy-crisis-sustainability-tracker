import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";


const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function SvgGlobe() {
  const [rotation, setRotation] = useState<[number, number, number]>([0, -10, 0]);

  useEffect(() => {
    let frameId: number;
    const rotate = () => {
      setRotation((r) => [r[0] + 0.3, r[1], r[2]]);
      frameId = requestAnimationFrame(rotate);
    };
    frameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="w-[900px] h-[900px] flex items-center justify-center opacity-80 mix-blend-screen mix-blend-lighten pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{
          rotate: rotation,
          scale: 350,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Wireframe background grid */}
        <Graticule stroke="#ffffff" strokeWidth={0.5} strokeOpacity={0.2} />
        
        {/* Globe Base */}
        <Sphere id="base-sphere" stroke="#222222" strokeWidth={1} fill="transparent" />

        {/* Continents rendered as wireframes */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="transparent"
                stroke="#ffffff"
                strokeWidth={0.5}
                strokeOpacity={0.6}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>


      </ComposableMap>
    </div>
  );
}
