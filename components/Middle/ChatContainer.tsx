'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function ChatContainer() {
  const [width, setWidth] = useState<number>(240);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedWidth = localStorage.getItem('notesContainerWidth');
    if (savedWidth) {
      setWidth(parseInt(savedWidth, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notesContainerWidth', width.toString());
  }, [width]);

  const handleResize = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const newWidth = containerRef.current.getBoundingClientRect().right - e.clientX;
      if (newWidth > 280 && newWidth < 400) {
        setWidth(newWidth);
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleResize]);

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleResize, handleMouseUp]);

  useEffect(() => {
    const resizer = resizerRef.current;
    resizer?.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizer?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseDown]);

  return (
    <div 
      ref={containerRef}
      className="relative h-full box-border border-l border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#212121] backdrop-flex flex-col"
      style={{ width: `${width}px` }}
    >
      <div className="flex-grow overflow-y-auto">
        {/* Content here */}
      </div>

      <div 
        ref={resizerRef}
        className="absolute top-0 left-[-2px] w-[4px] h-full cursor-col-resize opacity-0 hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(to left, transparent, #2b2b2bd9, transparent)' }}
      />
    </div>
  );
}