// components/Middle/DomainContainer.tsx

import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import supabase from "@/utils/supabase";
import CreateDomain from "../Create/CreateDomain";
import DomainIcon from "./DomainIcon";
import JoinDomain from "../Join/JoinDomain";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import NoteDomainLogo from "./NoteDomainLogo";

interface Domain {
  id: string;
  name: string;
  icon_url: string;
  created_by: string;
}

interface DomainContainerProps {
  onDomainSelect: (domain: Domain) => void;
}

const DomainContainer: React.FC<DomainContainerProps> = ({ onDomainSelect }) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUserDomains();
    }
  }, [user]);

  const fetchUserDomains = async () => {
    try {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_user_id", user?.id)
        .single();

      if (userError) throw userError;

      const { data: domainsData, error: domainsError } = await supabase
        .from("domains")
        .select(`
          id,
          name,
          icon_url,
          users (id, username, first_name, last_name)
        `)
        .eq("user_id", userData.id);

      if (domainsError) throw domainsError;

      const formattedDomains: Domain[] = domainsData?.map(domain => ({
        id: domain.id,
        name: domain.name,
        icon_url: domain.icon_url,
        created_by: `${domain.users.first_name} ${domain.users.last_name}`
      })) || [];

      setDomains(formattedDomains);
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  };

  const handleAddDomain = (name: string, iconUrl: string) => {
    fetchUserDomains();
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedDomains = Array.from(domains);
    const [movedDomain] = reorderedDomains.splice(result.source.index, 1);
    reorderedDomains.splice(result.destination.index, 0, movedDomain);

    setDomains(reorderedDomains);
  };

  return (
    <div className="w-[70px] max-w-[70px] border-box border-r border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#1f1f1f] flex flex-col px-2 py-2 h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide items-center space-y-2">
      <NoteDomainLogo />
      <hr className="border-2 border-[#2b2b2bd9] rounded-2xl w-1/2" />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="domains">
          {(provided) => (
            <div
              className="flex flex-col items-center space-y-2 w-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {domains.length > 0 ? (
                domains.map((domain, index) => (
                  <Draggable key={domain.id} draggableId={domain.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DomainIcon
                          name={domain.name}
                          iconUrl={domain.icon_url}
                          onClick={() => onDomainSelect(domain)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="space-y-2">
                  <CreateDomain onAddDomain={handleAddDomain} />
                  <JoinDomain />
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {domains.length !== 0 && (
        <>
          <hr className="border-2 border-[#2b2b2bd9] rounded-2xl w-1/2" />
          <CreateDomain onAddDomain={handleAddDomain} />
          <JoinDomain />
        </>
      )}
    </div>
  );
};

export default DomainContainer;