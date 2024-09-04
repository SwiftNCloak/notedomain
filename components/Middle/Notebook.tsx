"use client"

import { NotebookText, FilePlus } from "lucide-react";

export default function Notebook() {
  return (
    <div className="group w-full box-border h-9 max-h-9 hover:bg-[#2b2b2bd9] rounded-lg overflow-y-auto px-3 items-center justify-between flex space-x-2 font-semibold">
      <div className="flex space-x-2 items-center justify-start">
        <NotebookText size={17} className="text-[#9f9f9fd9]"/>
        <p className="text-[#9f9f9fd9] text-sm">Notebook</p>
      </div>
      <FilePlus size={17} className="text-[#9f9f9fd9] opacity-0 group-hover:opacity-100 cursor-pointer"/>
    </div>
  );
}
