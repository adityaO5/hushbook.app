/* ============================================================
   HushBook landing — public runtime config (TEMPLATE)
   ------------------------------------------------------------
   Copy this file to config.js and fill in your real values.

   ONLY the Supabase project URL and the ANON PUBLIC key go here.
   The anon key is *designed* to be public and is protected by
   Row Level Security: with our policy it can INSERT a waitlist
   signup but can NEVER read the email list back.

   NEVER put the database password, the service_role key, or any
   JWT secret in this file (or any client-side file / the repo).
   Those are admin-only and belong in server-side env vars.

   Fill these in from Supabase Dashboard -> Settings -> API.
   ============================================================ */
window.HB_SUPABASE = {
  url: "https://YOUR-PROJECT.supabase.co",
  anonKey: "YOUR_ANON_PUBLIC_KEY"
};
