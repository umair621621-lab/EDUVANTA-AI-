import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/923002489911?text=Hi%20EduVanta%20Karachi,%20I%20am%20interested%20in%20studying%20abroad%20and%20would%20like%20a%20free%20consultation"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-xs font-bold hidden sm:inline">WhatsApp Us</span>
    </a>
  );
};
