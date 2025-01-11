import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useRegistrationStore } from "@/store/useRegistration";
import Image from "next/image";

export const ImageUpload = () => {
  const { setForm } = useRegistrationStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setForm("selfie", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-white text-sm font-medium mb-1">Upload Selfie / सेल्फी अपलोड करें</label>
      <div
        className="relative border border-gray-700 bg-gray-900/50 backdrop-blur-2xl rounded-lg px-3 py-2 hover:border-[#4CAF50] transition-colors cursor-pointer flex items-center gap-3 h-[38px]"
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        {preview ? (
          <div className="flex items-center gap-2 w-full">
            <div className="relative w-6 h-6">
              <Image src={preview} alt="Preview" fill className="object-cover rounded" />
            </div>
            <p className="text-white text-sm truncate">Click to change</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-400 w-full">
            <Camera className="w-5 h-5" />
            <p className="text-sm">Click to upload (Max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};
