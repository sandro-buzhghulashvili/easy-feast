import React, { useEffect } from 'react';

import { motion } from 'framer-motion';

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
      className={`absolute right-0 left-0 top-20 mx-auto w-3/4 ${
        success ? 'bg-green_color' : 'bg-red_color'
      } p-5`}
    >
      <h1 className="text-xl text-white_color">{message}</h1>
    </motion.div>
  );
};

export default FlashMessage;
