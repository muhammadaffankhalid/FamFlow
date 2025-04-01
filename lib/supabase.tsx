import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Fetch values
const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL;
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.SUPABASE_ANON_KEY;

// Debugging: Check if values are loaded
console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Key:', SUPABASE_ANON_KEY ? 'Loaded ✅' : 'Missing ❌');

// Check if URL is valid
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase credentials. Check your app.json or environment variables.',
  );
}

// Initialize Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
