"use client";

import { motion, useSpring } from "motion/react";
import {
  FC,
  useEffect,
  useRef,
  useState,
} from "react";

const GLOW_SIZE = 820;

const DARK_SELECTOR =
  ".section-dark, .section-navy, .hero, .navbar, .footer, .announcement, .showcase-scroll, .legal-backdrop";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, select, textarea, label";

const RING_SIZE = 14;

/**
 * Ambient cursor spotlight. A wide, soft glow trails the cursor with spring
 * physics, tinted gold on dark sections and cool blue on light ones so it reads
 * naturally across the whole site. Resting over interactive elements sparks a
 * small accent ring at the pointer, hinting at clickable things without noise.
 */
export const CursorGlow: FC = () => {
  const x = useSpring(0, { stiffness: 140, damping: 28, mass: 0.5 });
  const y = useSpring(0, { stiffness: 140, damping: 28, mass: 0.5 });

  const [dark, setDark] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [reduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const rafRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el) return;
        const target = el as HTMLElement;
        setDark(!!target.closest(DARK_SELECTOR));
        setInteractive(!!target.closest(INTERACTIVE_SELECTOR));
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow"
      style={{
        x,
        y,
        marginLeft: -GLOW_SIZE / 2,
        marginTop: -GLOW_SIZE / 2,
        width: GLOW_SIZE,
        height: GLOW_SIZE,
      }}
      animate={{ scale: interactive ? 1.06 : 1, opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <span
        className="cursor-glow-layer"
        style={{
          background:
            "radial-gradient(circle, rgba(255,212,59,0.11) 0%, rgba(255,212,59,0.045) 34%, transparent 66%)",
          opacity: dark ? 1 : 0,
        }}
      />
      <span
        className="cursor-glow-layer"
        style={{
          background:
            "radial-gradient(circle, rgba(125,169,232,0.13) 0%, rgba(125,169,232,0.05) 34%, transparent 66%)",
          opacity: dark ? 0 : 1,
        }}
      />

      <motion.span
        className="cursor-glow-ring"
        animate={{
          opacity: interactive ? 1 : 0,
          scale: interactive ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
        }}
      />
    </motion.div>
  );
};