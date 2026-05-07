"use client";

import type { ReactNode } from "react";

export function ModalShell({
  children,
  labelledBy,
  maxWidth = "max-w-5xl",
  onClose
}: {
  children: ReactNode;
  labelledBy: string;
  maxWidth?: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-night/70 p-0 backdrop-blur-[2px] motion-safe:animate-fade-up sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        aria-labelledby={labelledBy}
        aria-modal="true"
        className={`panel-gradient flex h-[100dvh] w-full min-w-0 flex-col overflow-hidden rounded-none border border-clay/20 shadow-2xl transition duration-300 sm:h-auto sm:max-h-[96dvh] sm:rounded-lg ${maxWidth}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        {children}
      </div>
    </div>
  );
}
