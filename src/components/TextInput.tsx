import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface TextInputProps {
  onSave: (text: string) => Promise<void>;
}

export const TextInput: React.FC<TextInputProps> = ({ onSave }) => {
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    try {
      setIsSaving(true);
      await onSave(trimmedText);
      setText("");
    } catch (error) {
      console.error("Failed to save text:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col sm:flex sm:flex-row items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your text..."
          disabled={isSaving}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
          type="submit"
          disabled={isSaving || !text.trim()}
        >
          <Send size={20} />
          {isSaving ? "Saving..." : "Save"}
        </motion.button>
      </div>
    </motion.form>
  );
};
