// components/Modal/JoinModal.tsx
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/utils/supabase";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (domainId: string) => void;
}

export default function JoinModal({ isOpen, onClose, onJoin }: JoinModalProps) {
  const [inviteCode, setInviteCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!inviteCode) {
      setError("Please enter an invite code.");
      return;
    }

    setIsJoining(true);
    setError("");

    try {
      // Find the domain with the given invite code
      const { data: domainData, error: domainError } = await supabase
        .from("domains")
        .select("id")
        .eq("invite_code", inviteCode)
        .single();

      if (domainError) {
        throw new Error("Invalid invite code.");
      }

      // Get the user's Supabase ID
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_user_id", user?.id)
        .single();

      if (userError) {
        throw new Error("Error fetching user data.");
      }

      // Add the user as a member of the domain
      const { error: memberError } = await supabase
        .from("domain_members")
        .insert({
          domain_id: domainData.id,
          user_id: userData.id,
          role: "member"
        });

      if (memberError) {
        throw new Error("Error joining the domain.");
      }

      onJoin(domainData.id);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-[#e8e8e8] dark:bg-[#212121] shadow-xl rounded-lg border border-[#2b2b2bd9]">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-gray-100"
                >
                  Join Domain
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter Invite Code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="text-sm w-full p-2 mt-2 border border-[#2b2b2bd9] focus:border-[#00D166] outline-0 rounded-md bg-white dark:bg-[#333] text-gray-900 dark:text-gray-100"
                  />
                </div>

                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}

                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#333] border border-gray-300 dark:border-[#555] rounded-md hover:bg-gray-100 dark:hover:bg-[#444] focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isJoining}
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#00D166] rounded-md hover:bg-[#00c060] focus:outline-none"
                  >
                    {isJoining ? "Joining..." : "Join Domain"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}