import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/utils/supabase";
import CreateDomain from "../Create/CreateDomain";
import DomainIcon from "./DomainIcon";
import JoinDomain from "../Join/JoinDomain";
import dynamic from 'next/dynamic';

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface Domain {
  id: string;
  name: string;
  icon_url: string;
}

export default function DomainContainer() {
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
        .select("*")
        .eq("user_id", userData.id);

      if (domainsError) throw domainsError;

      setDomains(domainsData || []);
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

  if (typeof window === "undefined") {
    return null; // Ensure SSR does not render anything
  }

  return (
    <div
      className="w-[73px] max-w-[73px] border-box border-r border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#1f1f1f] 
                 flex flex-col px-2 py-2 h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide items-center space-y-2"
    >
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
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="h-10" /> // Placeholder div to ensure Droppable has content
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <hr className="border border-[#2b2b2bd9] w-full" />
      <CreateDomain onAddDomain={handleAddDomain} />
      <JoinDomain />
    </div>
  );
}
