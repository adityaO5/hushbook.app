# Supabase waitlist setup

The landing page is fully static. Waitlist emails are stored in a single
Supabase table, `public.waitlist_signups`. The page POSTs new signups
directly to the Supabase REST API using the **anon public** key, which is
protected by Row Level Security (it can INSERT a signup but can never read
the email list back).

---

## 1. Apply the database migration

You can either use the Supabase CLI or paste the SQL by hand.

### Option A — Supabase CLI (recommended)

```bash
# a) Log in (opens a browser to authorize the CLI)
supabase login

# b) Link this folder to your Supabase project.
#    Find <ref> in Dashboard -> Settings -> General -> "Reference ID",
#    or in your project URL: https://<ref>.supabase.co
supabase link --project-ref <ref>

# c) Push the migration in supabase/migrations/ to the linked project
supabase db push
```

### Option B — SQL editor (no CLI)

Open **Dashboard -> SQL Editor -> New query**, paste the entire contents of
`supabase/migrations/0001_create_waitlist.sql`, and click **Run**.

Either path creates the `waitlist_signups` table, enables Row Level
Security, adds the anon INSERT policy, and creates a case-insensitive
unique index on the email so duplicates are de-duped.

---

## 2. Wire up the front end

1. In Supabase, open **Dashboard -> Settings -> API**.
2. Copy the **Project URL** and the **anon `public`** key.
3. Paste them into `assets/js/config.js`:

   ```js
   window.HB_SUPABASE = {
     url: "https://YOUR-PROJECT.supabase.co",
     anonKey: "YOUR_ANON_PUBLIC_KEY"
   };
   ```

`assets/js/config.example.js` is the committed template — copy it to
`config.js` if `config.js` doesn't exist yet.

---

## 3. How the signup request works

The page sends an HTTPS `POST` to the table's REST endpoint:

```
POST {SUPABASE_URL}/rest/v1/waitlist_signups
Headers:
  apikey: <anonKey>
  Authorization: Bearer <anonKey>
  Content-Type: application/json
  Prefer: return=minimal
Body:
  { "email": "...", "source": "...", "user_agent": "...", "referrer": "..." }
```

The unique constraint on email means a repeat signup returns **HTTP 409**.
The UI treats a 409 as a friendly "you're already on the list" success, not
an error.

---

## 4. Where the emails land & how to export

All signups are rows in the **`waitlist_signups`** table.

- **View:** Dashboard -> Table Editor -> `waitlist_signups`.
- **Export to CSV:** in the Table Editor, open the table and use the
  **Export -> Export as CSV** menu, or run a query in the SQL editor:

  ```sql
  select email, created_at, source, referrer
  from public.waitlist_signups
  order by created_at desc;
  ```

The anon public key in `config.js` **cannot** run that SELECT — reads only
work in the dashboard or with the service_role key (server-side), which is
exactly what keeps the email list private.

---

## 5. SECURITY — read this

- Only **two** values are safe to embed in the static client: the **Project
  URL** and the **anon public** key. The anon key is meant to be public and
  is gated by Row Level Security — with the policy above it can INSERT a
  signup but can never SELECT the email list back.
- **NEVER** place the Supabase **database password**, the **service_role**
  key, or any **JWT secret** in HTML/JS/static files, and never commit them
  to the repo. Those are admin-only and belong in server-side env vars.
- The **database password is admin-only** — never ship it client-side. **If
  it was ever shared or pasted anywhere public, rotate it** in
  Dashboard -> Settings -> Database -> Reset database password.
