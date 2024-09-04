// components/Middle/NoteContainer.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Notebook from './Notebook';
import Note from './Note';
import UserLogin from '../Authentication/UserLogin';

import { Settings, CircleChevronDown } from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  icon_url: string;
  created_by: string;
}

interface NotesContainerProps {
  selectedDomain: Domain | null;
}

const NotesContainer: React.FC<NotesContainerProps> = ({ selectedDomain }) => {
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
      className="relative h-full box-border border-r border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#212121] flex flex-col"
      style={{ width: `${width}px` }}
    >
      <div className="h-16 border-b border-[#2b2b2bd9] p-5 flex-shrink-0 items-center justify-between flex">
        <div className='items-start justify-start flex flex-col truncate'>
          <h1 className='font-semibold text-sm'>{selectedDomain ? selectedDomain.name : '[Domain Name]'}</h1>
          <p className='font-semibold text-xs text-[#c8c8c8d9]'>
            {selectedDomain ? `${selectedDomain.created_by}` : '[Created by]'}
          </p>
        </div>

        <div className='items-end justify-end flex'>
          <CircleChevronDown size={17} className="text-[#9f9f9fd9]"/>
        </div>
      </div>

      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto scrollbar-hide p-2">
          <Notebook />
          <Note />
          <Note />
        </div>
      </div>

      <div className="h-13 border-t border-[#2b2b2bd9] p-2 flex-shrink-0 items-center justify-center flex flex-col">
        <UserLogin />
      </div>

      <div 
        ref={resizerRef}
        className="absolute top-0 right-0 w-[2px] h-full cursor-col-resize opacity-0 hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(to right, transparent, #00D166d9, transparent)' }}
      />
    </div>
  );
};

export default NotesContainer;