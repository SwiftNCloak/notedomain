// components/Modal/DomainModal.tsx
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { uploadImage } from "@/utils/uploadImage";

interface DomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, iconUrl: string) => void;
}

export default function DomainModal({ isOpen, onClose, onSubmit }: DomainModalProps) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !file) {
      alert("Please provide both a name and an image.");
      return;
    }

    setIsUploading(true);

    try {
      const iconUrl = await uploadImage(file);
      onSubmit(name, iconUrl);
      onClose();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create New Domain
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Domain Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={handleSubmit}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    {isUploading ? "Uploading..." : "Create Domain"}
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                  >
                    Cancel
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
