# Team-Executioners.exe---Manya-

## AI Study Tools (Summary / Flashcards / Quiz)

These are now live:

- `GET/POST /documents/{id}/summary`
- `GET/POST /documents/{id}/flashcards`
- `GET/POST /documents/{id}/quiz`

`POST` generates (or returns the cached version — pass `{"regenerate": true}` to force a
fresh one). `GET` returns whatever's already been generated, 404 if nothing exists yet.

By default these use Google Gemini (`GEMINI_API_KEY` in `.env`, model set via `AI_MODEL`,
default `gemini-2.5-flash`). If no key is set, or the Gemini call fails for any reason, the
backend automatically falls back to a built-in offline generator so the endpoints still work
without an API key — just with lower-quality output. Set `GEMINI_API_KEY` in `backend/.env`
to get real AI-generated results.

## PDF Preview

Uploaded PDFs are now served as static files at `/static/documents/<filename>`. Each
document response includes a ready-to-use `file_url` field for this. The Viewer page embeds
the PDF directly via an `<iframe>`, with a toggle to switch to the extracted-text view.
