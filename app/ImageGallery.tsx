"use client";
import { useState } from "react";
import Image from "next/image";

export function ImageGallery({ images }: { images: string[] }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-orange-200">Project Screenshots</h3>
        <button 
          onClick={() => images.length > 0 && setSelectedImg(images[0])}
          className="text-sm font-bold text-orange-400 hover:underline"
        >
          View images
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src, idx) => (
          <button 
            key={idx} 
            onClick={() => setSelectedImg(src)}
            className="relative aspect-video overflow-hidden rounded-lg border border-white/10 hover:opacity-90 transition-opacity"
          >
            <Image 
              src={src} 
              alt={`Screenshot ${idx + 1}`} 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all animate-in fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-2xl font-bold text-white transition-colors hover:text-orange-400"
            aria-label="Close image"
          >
            X
          </button>
          <div className="relative h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={selectedImg} 
              alt="Expanded view" 
              fill 
              className="object-contain" 
              priority 
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
