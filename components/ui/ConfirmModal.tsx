"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = true,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#111827] border border-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full mb-4 ${isDanger ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"}`}>
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 mb-6 text-sm">{message}</p>
          </div>
          
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl text-gray-300 font-medium hover:bg-white/5 transition border border-gray-700"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-2.5 rounded-xl text-white font-medium transition ${
                isDanger 
                  ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20" 
                  : "bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
