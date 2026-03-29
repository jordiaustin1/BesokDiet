// ===== SUPABASE CONFIG =====
const SUPABASE_URL = 'https://jbpdqdozcpqdwyfqzwyk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpicGRxZG96Y3BxZHd5ZnF6d3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTQzMzYsImV4cCI6MjA5MDA5MDMzNn0.N3LqpKwx8gqouw0gLfRT_VYSvdx7yED6wBUQyWQcAoA';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
