"use client";

import React from "react";
import { Loader2, Upload } from "lucide-react";

export default function HeroImageUpload({
  image,
  isUploading,
  onUpload,
}: {
  image: string;
  isUploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
        Profile Image
      </label>
      <div className="relative group w-full h-[350px] rounded-xl overflow-hidden border border-dashed border-white/[0.08] hover:border-white/20 transition-all bg-white/[0.02]">
        {image ? (
          <>
            <img src={image} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                <Upload size={16} className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  onChange={onUpload}
                  accept="image/*"
                />
              </label>
            </div>
          </>
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-1.5">
            <Upload size={20} className="text-white/20" />
            <span className="text-[10px] text-white/25 uppercase tracking-wider">
              Upload Photo
            </span>
            <input
              type="file"
              className="hidden"
              onChange={onUpload}
              accept="image/*"
            />
          </label>
        )}

        {isUploading ? (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="animate-spin w-5 h-5 text-white/60" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

