import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)

export default supabase
