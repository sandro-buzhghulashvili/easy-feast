import { X } from 'lucide-react';
import React, { ReactNode } from 'react';

import { motion } from 'framer-motion';

const Modal: React.FC<{ onClose: () => void; children: ReactNode }> = ({
  onClose,
  children,
}) => {
  const backDropStyles = {
    background: 'rgba(0, 0, 0, 0.7)',
  };
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={backDropStyles}
      className="fixed top-0 left-0 h-screen w-full z-10"
      onClick={onClose}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: '100%' },
          visible: { opacity: 1, y: 0 },
        }}
        className="absolute h-fit w-3/4 md:w-1/2 lg:w-1/3 p-10 z-20 top-0 left-0 right-0 bottom-0 m-auto bg-light_orange"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          onClick={onClose}
          className="absolute md:hover:scale-110 duration-300 -top-6 -right-6 cursor-pointer p-3 bg-white_color rounded-full"
        >
          <X className="w-7 h-7 stroke-primary_orange" />
        </span>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
