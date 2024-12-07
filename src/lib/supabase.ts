import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://awxdolqaoynidobsjpbc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eGRvbHFhb3luaWRvYnNqcGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDQ3OTAsImV4cCI6MjA0ODg4MDc5MH0.7viTKJuD5l-gJ7Is175JJeSgesfw_kGeXV_r9hd7Va8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);