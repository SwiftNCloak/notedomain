"use client"

import { useState } from 'react';

interface DomainIconProps {
  name: string;
  iconUrl: string;
}

export default function DomainIcon({ name, iconUrl }: DomainIconProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error("Failed to load image:", iconUrl);
    setImageError(true);
  };

  return (
    <div className="w-12 h-12 flex items-center justify-center box-border bg-gray-200 rounded-2xl overflow-hidden border border-[#2b2b2bd9]">
      {!imageError ? (
        <img
          src={iconUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center bg-gray-300 text-gray-600 font-bold text-lg">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}