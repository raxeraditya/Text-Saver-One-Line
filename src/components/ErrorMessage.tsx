import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
    >
      <div className="flex items-center gap-2 text-red-700">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
    </motion.div>
  );
};