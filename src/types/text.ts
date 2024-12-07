export interface TextItem {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
}

export interface SaveTextData {
  text: string;
  user_id: string;
}