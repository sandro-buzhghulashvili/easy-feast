import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const FlashMessage: React.FC<{
  success: boolean;
  message: string;
  onClose: () => void;
}> = ({ success, message, onClose }) => {
  useEffect(() => {
    const exitTimeout = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(exitTimeout);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      className={`fixed z-20 right-0 left-0 top-20 mx-auto w-4/5 ${
        success ? 'bg-green_color' : 'bg-red_color'
      } p-5`}
    >
      <span
        onClick={onClose}
        className="w-7 h-7 absolute top-0 bottom-0 my-auto right-5"
      >
        <X className="stroke-white_color" />
      </span>
      <h1 className="text-xl text-white_color">{message}</h1>
    </motion.div>
  );
};

export default FlashMessage;
