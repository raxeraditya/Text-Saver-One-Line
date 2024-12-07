import { supabase } from '../lib/supabase';
import { TextItem, SaveTextData } from '../types/text';

export const fetchUserTexts = async (userId: string): Promise<TextItem[]> => {
  const { data, error } = await supabase
    .from('texts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching texts:', error);
    throw new Error(`Error fetching texts: ${error.message}`);
  }

  return data || [];
};

export const saveNewText = async (textData: SaveTextData): Promise<void> => {
  if (!textData.text.trim()) {
    throw new Error('Text cannot be empty');
  }

  const { error } = await supabase
    .from('texts')
    .insert([{
      ...textData,
      created_at: new Date().toISOString()
    }]);

  if (error) {
    console.error('Error saving text:', error);
    throw new Error(`Error saving text: ${error.message}`);
  }
};