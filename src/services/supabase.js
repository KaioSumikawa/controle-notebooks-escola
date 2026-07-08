import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Variáveis de ambiente do Supabase não configuradas. ' +
    'Certifique-se de criar um arquivo .env com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
  );
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };