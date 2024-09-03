import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/utils/supabase";
import CreateDomain from "../Create/CreateDomain";
import DomainIcon from "./DomainIcon";
import JoinDomain from "../Join/JoinDomain";

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
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", user?.id)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const { data: domainsData, error: domainsError } = await supabase
      .from("domains")
      .select("*")
      .eq("user_id", userData.id);

    if (domainsError) {
      console.error("Error fetching domains:", domainsError);
    } else {
      setDomains(domainsData || []);
    }
  };

  const handleAddDomain = (name: string, iconUrl: string) => {
    // This function will be called after successfully creating a new domain
    fetchUserDomains();
  };

  return (
    <div className="w-16 max-w-16 border-box border-r border-[#2b2b2bd9] bg-[#e8e8e8] dark:bg-[#1f1f1f] 
                    flex flex-col px-5 py-2 h-screen overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col items-center space-y-2">
        {domains.map((domain) => (
          <DomainIcon key={domain.id} name={domain.name} iconUrl={domain.icon_url} />
        ))}
        <hr className="border border-[#2b2b2bd9] w-full" />
        <CreateDomain onAddDomain={handleAddDomain} />
        <JoinDomain />
      </div>
    </div>
  );
}