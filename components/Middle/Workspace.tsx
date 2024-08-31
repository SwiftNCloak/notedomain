'use client'

import React, { useState, useRef, useCallback } from 'react';
import { useDrag } from 'react-use-gesture';

interface Position {
  x: number;
  y: number;
}

export default function Workspace() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const bind = useDrag(({ delta: [dx, dy], memo = { x: position.x, y: position.y } }) => {
    setPosition({
      x: memo.x + dx,
      y: memo.y + dy,
    });
    return memo;
  });

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setScale(current => Math.min(Math.max(current - e.deltaY * 0.001, 0.1), 5));
  }, []);

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div
        {...bind()}
        ref={workspaceRef}
        onWheel={handleWheel}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          width: '10000px',
          height: '10000px',
          touchAction: 'none',
        }}
        className="absolute b cursor-grab origin-center"
        onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
        onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
      >
        
      </div>
    </div>
  );
};
