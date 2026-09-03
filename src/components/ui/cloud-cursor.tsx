"use client";

import { FC } from "react";

/**
 * Modern themed cursor for the SmoothCursor wrapper.
 * A premium layered "energy core": gradient aura + thin conic gradient ring +
 * dual orbital accents + crisp bright core. The SmoothCursor spring wrapper
 * lags, rotates and scales it as one unit, so the conic ring's bright sector
 * spins with your movement for an organic, electric feel.
 */
export const CloudCursor: FC = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: 54,
        height: 54,
        display: "grid",
        placeItems: "center",
      }}
    >
      {/* Outer soft aura */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,212,59,0.16) 0%, rgba(125,169,232,0.10) 38%, transparent 72%)",
          filter: "blur(1px)",
        }}
      />

      {/* Thin gradient ring */}
      <span
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          padding: "1.5px",
          background:
            "conic-gradient(from 0deg, #ffd43b, #7da9e8 40%, #ffd43b 75%, #7da9e8 100%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: 0.95,
        }}
      />

      {/* Orbital accent dots */}
      <span
        style={{
          position: "absolute",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#ffd43b",
          boxShadow: "0 0 8px rgba(255,212,59,0.9)",
          top: 5,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#7da9e8",
          boxShadow: "0 0 8px rgba(125,169,232,0.9)",
          bottom: 7,
          right: 8,
        }}
      />

      {/* Inner glow ring */}
      <span
        style={{
          position: "absolute",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,212,59,0.30) 0%, transparent 70%)",
        }}
      />

      {/* Bright core */}
      <span
        style={{
          position: "relative",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #fffbe0, #ffd43b 55%, #e5b400)",
          boxShadow:
            "0 0 12px rgba(255,212,59,1), 0 0 26px rgba(255,212,59,0.6)",
        }}
      />
      {/* Core highlight */}
      <span
        style={{
          position: "absolute",
          width: 3.5,
          height: 3.5,
          borderRadius: "50%",
          background: "#ffffff",
          opacity: 0.95,
          transform: "translate(-3px, -2px)",
        }}
      />
    </div>
  );
};
