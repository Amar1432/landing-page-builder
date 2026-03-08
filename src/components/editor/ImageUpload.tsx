"use client";

import { useState } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label = "Image", className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  // In a real app with UploadThing, we'd use their useUploadThing hook here.
  // For this implementation, we'll simulate the upload and use a placeholder 
  // or accept a direct URL input, as setting up UploadThing requires a real config/secrets.
  
  const handleSimulatedUpload = () => {
    setIsUploading(true);
    // Simulate network delay
    setTimeout(() => {
      // Pick a random Unsplash placeholder for demo purposes
      const randomIds = ["1498050108023-c5249f4df085", "1483058712412-4248e222cc5b", "1551288049-bebda4e38f71"];
      const randomId = randomIds[Math.floor(Math.random() * randomIds.length)];
      onChange(`https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&q=80&w=800`);
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-900 aspect-video flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
            <button
              onClick={() => onChange("")}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
              title="Remove image"
            >
              <X size={16} />
            </button>
            <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">Remove</span>
          </div>
        </div>
      ) : (
        <div 
          onClick={handleSimulatedUpload}
          className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-900/50 hover:bg-slate-800/50 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-slate-400 hover:text-blue-400 min-h-[120px]"
        >
          {isUploading ? (
            <>
              <Loader2 size={24} className="animate-spin text-blue-500" />
              <span className="text-xs font-medium">Uploading...</span>
            </>
          ) : (
            <>
              <UploadCloud size={24} />
              <span className="text-xs font-medium text-center">Click to upload<br/><span className="text-[10px] text-slate-500">(Simulated demo)</span></span>
            </>
          )}
        </div>
      )}

      {/* Manual URL Input Fallback */}
      <div className="flex items-center gap-2 mt-2">
        <ImageIcon size={14} className="text-slate-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste an image URL..."
          className="flex-1 bg-transparent border-none text-xs text-slate-300 focus:outline-none focus:ring-0 placeholder:text-slate-600"
        />
      </div>
      <div className="h-px w-full bg-slate-800"></div>
    </div>
  );
}
