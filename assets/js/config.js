/* ============================================================
   HushBook landing — public runtime config
   ------------------------------------------------------------
   ONLY the Supabase project URL and the ANON PUBLIC key go here.
   The anon key is *designed* to be public and is protected by
   Row Level Security: with our policy it can INSERT a waitlist
   signup but can NEVER read the email list back.

   NEVER put the database password, the service_role key, or any
   JWT secret in this file (or any client-side file / the repo).
   Those are admin-only and belong in server-side env vars.
   ============================================================ */
window.HB_SUPABASE = {
  url: "https://jkeueffctootcxfmwyxl.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZXVlZmZjdG9vdGN4Zm13eXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDY0OTAsImV4cCI6MjA5NjIyMjQ5MH0.pwAU5ZnXqPIzkUFLQXAMFOCpk1mOjDnT_B2Djn-8jdw"
};
