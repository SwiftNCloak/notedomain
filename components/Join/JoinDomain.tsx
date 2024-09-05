// components/Join/JoinDomain.tsx
import React, { useState } from 'react';
import { Cable } from "lucide-react";
import JoinModal from '../Modal/JoinModal';

interface JoinDomainProps {
  onJoinDomain: (domainId: string) => void;
}

export default function JoinDomain({ onJoinDomain }: JoinDomainProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleJoinDomain = (domainId: string) => {
    onJoinDomain(domainId);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="flex items-center justify-center p-2 w-12 max-w-12 box-border h-12 max-h-12 border border-[#2b2b2bd9] bg-[#e8e8e829] dark:bg-[#2b2b2bd9] text-[#00D166] hover:bg-[#00D166] hover:text-[#e8e8e8] rounded-2xl cursor-pointer transition ease-in-out"
      >
        <Cable size={25} />
      </div>

      <JoinModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onJoin={handleJoinDomain}
      />
    </>
  );
}