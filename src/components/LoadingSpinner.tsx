import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center p-8"
    >
      <Loader2 className="animate-spin text-blue-500" size={32} />
    </motion.div>
  );
};