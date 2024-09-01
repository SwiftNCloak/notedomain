"use client"

import { NotebookText } from "lucide-react";

export default function Notebook() {
  return (
    <div className="w-full box-border h-9 max-h-9 hover:bg-[#2b2b2bd9] rounded-lg overflow-y-auto px-3 items-center justify-start flex space-x-2 font-semibold">
      <NotebookText size={17} className="text-[#9f9f9fd9]"/>
      <p className="text-[#9f9f9fd9] text-sm">Notebook</p>
    </div>
  );
}
