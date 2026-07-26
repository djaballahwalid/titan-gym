import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a 
      href="https://wa.me/213555123456" 
      target="_blank" 
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
      {/* Notification Pulse */}
      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full"></span>
    </motion.a>
  );
}