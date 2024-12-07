import { useState, useEffect, useCallback } from "react";
import { TextItem } from "../types/text";
import { fetchUserTexts, saveNewText } from "../services/textService";
import { getUserId } from "../lib/storage";

export const useTexts = () => {
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = getUserId();

  const loadTexts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchUserTexts(userId);
      setTexts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error loading texts:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const saveText = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      try {
        const newText = {
          text: text.trim(),
          user_id: userId,
          created_at: new Date().toISOString(),
          id: crypto.randomUUID(),
        };

        // Optimistically update UI
        setTexts((prevTexts) => [newText, ...prevTexts]);

        // Save to database
        await saveNewText({ text: newText.text, user_id: userId });

        // Refresh the list to ensure consistency
        await loadTexts();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred while saving";
        setError(errorMessage);
        console.error("Error saving text:", err);
        // Revert optimistic update on error
        await loadTexts();
        throw new Error(errorMessage);
      }
    },
    [userId, loadTexts]
  );

  useEffect(() => {
    loadTexts();
  }, [loadTexts]);

  return { texts, isLoading, error, saveText };
};
