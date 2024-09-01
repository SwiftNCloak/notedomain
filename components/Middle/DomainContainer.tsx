"use client"

import DomainIcon from "./DomainIcon";

export default function DomainContainer() {
  return (
    <div className="w-16 max-w-16 border-box border-r border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#1f1f1f] 
                    flex flex-col px-5 py-2 h-screen overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col items-center space-y-2">
        <DomainIcon />
        <DomainIcon />
        <DomainIcon />
      </div>
    </div>
  );
}