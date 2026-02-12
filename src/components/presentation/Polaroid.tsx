import type { PolaroidPhoto } from "@/types/trip";

const SIZE_MAP = { sm: 260, md: 320, lg: 380 };

const POSITION_SLOTS = [
  { top: "5%", left: "10%" },
  { top: "30%", left: "35%" },
  { top: "55%", left: "5%" },
];

export function Polaroid({ photo, delay, index = 0 }: { photo: PolaroidPhoto; delay?: string; index?: number }) {
  const w = SIZE_MAP[photo.size] || 200;
  const padding = 10;
  const totalW = w + padding * 2;

  const slot = POSITION_SLOTS[index % POSITION_SLOTS.length];

  const style: Record<string, string | number> = {
    position: "absolute",
    width: `${totalW}px`,
    zIndex: 2 + index,
    cursor: "pointer",
    opacity: 0,
    transform: `scale(0) rotate(${photo.rotation}deg)`,
    "--rot": `${photo.rotation}deg`,
    "--pop-delay": delay || "0.4s",
    top: slot.top,
    left: slot.left,
  };

  return (
    <div className="polaroid" style={style as React.CSSProperties}>
      <div className="polaroid-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={photo.caption} loading="lazy" />
        <span className="polaroid-caption">{photo.caption}</span>
      </div>
    </div>
  );
}
