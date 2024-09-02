import { useState } from "react";
import { Plus } from "lucide-react";
import DomainModal from "../Modal/DomainModal";
import supabase from "@/utils/supabase";
import { generateInviteCode } from "@/utils/inviteCode";
import { useUser } from "@clerk/nextjs";

interface CreateDomainProps {
  onAddDomain: (name: string, iconUrl: string) => void;
}

export default function CreateDomain({ onAddDomain }: CreateDomainProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateDomain = async (name: string, iconUrl: string) => {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", user?.id)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const supabaseUserId = userData.id;
    const inviteCode = generateInviteCode();

    const { data, error } = await supabase
      .from("domains")
      .insert([
        {
          name,
          icon_url: iconUrl,
          user_id: supabaseUserId,
          invite_code: inviteCode,
        },
      ]);

    if (error) {
      console.error("Error creating domain:", error);
    } else {
      console.log("Domain Created:", data);
      onAddDomain(name, iconUrl); // Notify parent component
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="flex items-center justify-center p-2 w-12 max-w-12 box-border h-12 max-h-12 border border-[#2b2b2bd9] bg-[#00D166] rounded-2xl cursor-pointer"
      >
        <Plus size={25} className="text-[#f1f1f1]" />
      </div>

      <DomainModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateDomain}
      />
    </>
  );
}
