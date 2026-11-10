-- One row per installer download started through /dl/<platform> (src/downloads.mjs).
CREATE TABLE downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,                   -- ISO 8601 UTC
  platform TEXT NOT NULL,             -- windows
  src TEXT NOT NULL,                  -- utm_source, ref, external referrer host, or direct
  medium TEXT NOT NULL DEFAULT '',    -- utm_medium
  campaign TEXT NOT NULL DEFAULT '',  -- utm_campaign
  referrer TEXT NOT NULL DEFAULT '',  -- external page that sent the visitor
  page TEXT NOT NULL DEFAULT '',      -- site page holding the download button
  prev TEXT NOT NULL DEFAULT '',      -- site page visited before it
  country TEXT NOT NULL DEFAULT '',
  ua TEXT NOT NULL DEFAULT '',
  bot INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX downloads_ts ON downloads (ts);
CREATE INDEX downloads_src ON downloads (src);
