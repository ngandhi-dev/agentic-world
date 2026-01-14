import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nokustzcyvjrzvfblshh.supabase.co";
const supabaseAnonKey = "sb_publishable_763rYqcOXf62GGQTYFCLhw_qPICkVFV";
console.log("Supabase URL loaded:", true);
console.log("Supabase Key loaded:", true);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
