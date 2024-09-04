import React from 'react';
import { BookOpenText } from "lucide-react";

interface NoteDomainLogoProps {
  onClick: () => void;
  isActive: boolean;
}

const NoteDomainLogo: React.FC<NoteDomainLogoProps> = ({ onClick, isActive }) => {
  return (
    <div 
      className={`
        flex items-center justify-center p-2 w-12 max-w-12 box-border h-12 max-h-12 
        border border-[#2b2b2bd9] 
        ${isActive 
          ? 'bg-[#00D166] text-[#e8e8e8]' 
          : 'bg-[#e8e8e829] dark:bg-[#2b2b2bd9] text-[#b7b7b7ee] hover:bg-[#00D166] hover:text-[#e8e8e8]'
        }
        rounded-2xl cursor-pointer transition ease-in-out
      `}
      onClick={onClick}
    >
      <BookOpenText size={25} />
    </div>
  );
};

export default NoteDomainLogo;