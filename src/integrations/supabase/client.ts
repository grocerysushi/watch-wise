// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://niyaqdwrresmxthvfrcs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5peWFxZHdycmVzbXh0aHZmcmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDkzODEsImV4cCI6MjA0ODcyNTM4MX0.eKRfzvpOJ-JV7MGlv7pN7i52fdCo4WJ1NhK8-sEwTVA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);