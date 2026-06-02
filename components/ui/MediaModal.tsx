"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string | null;
  isVideo: boolean;
  title: string;
}

export default function MediaModal({ isOpen, onClose, mediaUrl, isVideo, title }: MediaModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !mediaUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition z-[101]"
        >
          <X size={24} />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-2xl shadow-[var(--green-glow)]"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <div className="w-full aspect-video bg-black">
              <iframe
                src={`${mediaUrl}?autoplay=1`}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img
              src={mediaUrl}
              alt={title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <h3 className="text-white text-xl font-bold">{title}</h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
