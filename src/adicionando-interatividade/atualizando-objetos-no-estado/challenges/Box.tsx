import React, { useRef, useState } from "react";
import { Position } from "./position";

type PropsBox = {
  children: React.ReactNode;
  color: string;
  position: Position;
  onMove: (dx: number, dy: number) => void;
};

export default function Box({ children, color, position, onMove } : PropsBox) {
  const [lastCoordinates, setLastCoordinates] = useState<Position | null>(null);
  const refDiv = useRef<HTMLDivElement | null>(null);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    //e.target.setPointerCapture(e.pointerId);
    if(refDiv.current) {
        refDiv.current.setPointerCapture(e.pointerId);
    }
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: "grab",
        backgroundColor: color,
        position: "absolute",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
      ref={refDiv}
    >
      {children}
    </div>
  );
}
