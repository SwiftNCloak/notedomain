"use client"

import DomainIcon from "./DomainIcon";

export default function DomainContainer() {
  return (
    <div className="w-16 max-w-16 border-box border-r border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#212121] 
                    items-center justify-start flex flex-col px-5 py-2 space-y-2">
      <DomainIcon />
      <DomainIcon />
      <DomainIcon />
      <DomainIcon />
      <DomainIcon />
    </div>
  );
}
