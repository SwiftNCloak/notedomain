"use client"

import { useState } from "react";
import CreateDomain from "../Create/CreateDomain";
import DomainIcon from "./DomainIcon";

export default function DomainContainer() {
  const [domains, setDomains] = useState<{ name: string; iconUrl: string }[]>([]);

  const handleAddDomain = (name: string, iconUrl: string) => {
    setDomains([...domains, { name, iconUrl }]);
  };

  return (
    <div className="w-16 max-w-16 border-box border-r border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#1f1f1f] 
                    flex flex-col px-5 py-2 h-screen overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col items-center space-y-2">
        {domains.map((domain, index) => (
          <DomainIcon key={index} name={domain.name} iconUrl={domain.iconUrl} />
        ))}
        <CreateDomain onAddDomain={handleAddDomain} />
      </div>
    </div>
  );
}
