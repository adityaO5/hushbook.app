"""Local static server with Vercel-style clean URL resolution.

This is only for local preview. Production routing remains configured in
vercel.json. Static assets and unknown paths are served normally; known page
paths resolve to their checked-in .html files.
"""

from __future__ import annotations

import argparse
import posixpath
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


PAGES = {
    "about": "about.html",
    "download": "download.html",
    "privacy-policy": "privacy-policy.html",
    "terms-conditions": "terms-conditions.html",
    "refund-policy": "refund-policy.html",
    "licenses": "licenses.html",
    "terms": "terms-conditions.html",
    "privacy": "privacy-policy.html",
}
LOCALES = {
    "de", "fr", "es-ES", "es-419", "pt-BR", "pt-PT", "it", "ja", "ko",
    "nl", "pl", "tr", "ru", "uk", "ar", "id", "th", "vi", "sv", "da",
}


class CleanURLHandler(SimpleHTTPRequestHandler):
    server_version = "HushBookDev/1.0"

    def translate_path(self, path: str) -> str:
        parsed = urlsplit(path)
        clean = unquote(parsed.path)
        clean = posixpath.normpath(clean)
        if clean == ".":
            clean = "/"
        parts = [part for part in clean.split("/") if part]

        if not parts:
            relative = Path("index.html")
        elif parts[0] in LOCALES:
            locale = parts[0]
            if len(parts) == 1:
                relative = Path(locale) / "index.html"
            elif len(parts) == 2 and parts[1] in PAGES:
                relative = Path(locale) / PAGES[parts[1]]
            else:
                relative = Path(*parts)
        elif len(parts) == 1 and parts[0] in PAGES:
            relative = Path(PAGES[parts[0]])
        else:
            relative = Path(*parts)

        # Match SimpleHTTPRequestHandler's safe, root-relative resolution.
        return str((Path(self.directory) / relative).resolve())


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--bind", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--directory", type=Path, default=Path.cwd())
    args = parser.parse_args()
    directory = args.directory.resolve()
    handler = lambda *a, **kw: CleanURLHandler(*a, directory=str(directory), **kw)
    server = ThreadingHTTPServer((args.bind, args.port), handler)
    print(f"HushBook dev server: http://{args.bind}:{args.port}/ (root: {directory})", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
