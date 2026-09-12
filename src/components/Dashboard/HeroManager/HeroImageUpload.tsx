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
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 font-['Bai_Jamjuree']">
        Profile Image
      </label>
      <div className="relative group w-full h-[280px] rounded-2xl overflow-hidden glass-card-compact border border-slate-200/90 hover:border-[#FF6014]/60 transition-all duration-300">
        {image ? (
          <>
            <img src={image} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer p-3 bg-[#FF6014] rounded-xl hover:bg-[#FF6014]/90 transition-all shadow-lg text-white font-medium flex items-center gap-2 text-xs font-['Bai_Jamjuree']">
                <Upload size={16} />
                Change Image
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
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center">
              <Upload size={20} className="text-[#FF6014]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 font-['Bai_Jamjuree']">
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="animate-spin w-6 h-6 text-[#FF6014]" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

