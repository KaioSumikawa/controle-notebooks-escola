import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseKey
);

const createMockClient = () => ({
  from() {
    throw new Error(
      'Supabase não configurado.'
    );
  },
});

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : createMockClient();

if (!isSupabaseConfigured) {
  console.warn(`
==========================================================
 Supabase não configurado.

 Crie um arquivo ".env" na raiz do projeto contendo:

 VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
 VITE_SUPABASE_ANON_KEY=sua_chave_publica

 Enquanto isso, o sistema utilizará os dados locais
 (arquivos da pasta /data).
==========================================================
`);
}