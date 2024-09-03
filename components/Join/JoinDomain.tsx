"use client"

import { Cable, SquareArrowOutUpRight } from "lucide-react";

export default function JoinDomain() {
  return (
    <div className="flex items-center justify-center p-2 w-12 max-w-12 box-border h-12 max-h-12 border border-[#2b2b2bd9] bg-[#e8e8e829] dark:bg-[#2b2b2bd9] text-[#00D166] hover:bg-[#00D166] hover:text-[#e8e8e8] rounded-2xl cursor-pointer transition ease-in-out">
        <Cable size={25} />
    </div>
  );
}
