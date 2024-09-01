'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function NotesContainer() {
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
      const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;
      if (newWidth > 225 && newWidth < 300) {
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
      className="relative h-full box-border border-r border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#212121] flex flex-col overflow-y-scroll scrollbar-hide"
      style={{ width: `${width}px` }}
    >
      <div className="flex-grow space-y-2 p-2 overflow-y-scroll scrollbar-hide">
        
      </div>

      <div className="h-16 border-t border-[#2b2b2bd9] p-2 bottom-0">
        {/* Footer content here */}
      </div>

      <div 
        ref={resizerRef}
        className="absolute top-0 right-0 w-[2px] h-full cursor-col-resize opacity-0 hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(to right, transparent, #2b2b2bd9, transparent)' }}
      />
    </div>
  );
}