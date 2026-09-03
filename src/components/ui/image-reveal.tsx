import React, { useRef, useState, useEffect } from 'react';

type ImageHoverProps = {
  src: string;
  alt?: string;
  className?: string;
};

export const ImageHover = ({ src, alt = 'Image', className = '' }: ImageHoverProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [lerped, setLerped] = useState<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Smoothly follow the cursor
  useEffect(() => {
    if (!active || !pos) {
      setLerped(null);
      return;
    }
    let frame: number;
    const animate = () => {
      setLerped((prev) => {
        if (!prev) return pos;
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.5) return pos;
        return { x: prev.x + dx * 0.18, y: prev.y + dy * 0.18 };
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, pos]);

  const updatePos = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    setActive(true);
    updatePos(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setActive(false);
    setPos(null);
    setLerped(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      setActive(true);
      updatePos(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchStart = handleTouchMove;
  const handleTouchEnd = handleMouseLeave;

  const showGlow = active && lerped;

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video max-w-4xl rounded-xl overflow-hidden border border-white/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setActive(true)}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={src}
        alt={alt}
        className="block h-full w-full object-cover"
        draggable={false}
      />

      {/* Subtle darkening + glow that follows cursor */}
      <div className="pointer-events-none absolute inset-0 bg-[#05070a]/25" />

      {showGlow && (
        <>
          {/* Soft spotlight glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle 320px at ${lerped.x}px ${lerped.y}px, rgba(255,255,255,0.22), transparent 60%)`,
              mixBlendMode: 'screen',
            }}
          />
          {/* Sharp lens ring */}
          <div
            className="pointer-events-none absolute top-0 left-0"
            style={{
              width: '180px',
              height: '180px',
              transform: `translate(${lerped.x - 90}px, ${lerped.y - 90}px)`,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.10) 0, rgba(255,255,255,0.06) 55%, transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />
        </>
      )}
    </div>
  );
};
