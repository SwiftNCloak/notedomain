"use client"

interface DomainIconProps {
  name: string;
  iconUrl: string;
}

export default function DomainIcon({ name, iconUrl }: DomainIconProps) {
  return (
    <div className="w-12 h-12 flex items-center justify-center box-border bg-gray-200 rounded-2xl border border-gray-300">
      <img src={iconUrl} alt={name} className="w-full h-full rounded-full object-cover" />
    </div>
  );
}
