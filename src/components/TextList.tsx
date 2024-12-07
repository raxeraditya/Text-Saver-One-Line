import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface TextItem {
  id: string;
  text: string;
  created_at: string;
}

interface TextListProps {
  items: TextItem[];
}

export const TextList: React.FC<TextListProps> = ({ items }) => {
  return (
    <div className="w-full max-w-lg mt-8">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="text-blue-500 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-gray-800">{item.text}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};