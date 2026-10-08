# Project content

Edit `projects.json` to update the portfolio. The homepage and every `project.html?id=...` page read from this file automatically.

## Add a project

1. Copy an existing object in the `projects` array.
2. Give it a unique lowercase `id` (for example, `new-sensor-project`).
3. Set `section` to `featured`, `hardware`, or `software`.
4. Fill in the title, tags, summary, and status.
5. Add a lead image under `assets/projects/` and set its relative path in `image`, or use `null` when there is no image yet.
6. Add page content in `sections` as `{ "heading": "…", "body": "…" }` objects.
7. Add supporting images to `gallery` as `{ "src": "…", "alt": "…", "caption": "…" }` objects.
8. Add repository or demo links in `links` as `{ "label": "…", "url": "…" }` objects.

The `accent` field accepts `gold`, `light`, `green`, or `ink`. `externalUrl` and `externalLabel` are optional.

`projects.schema.json` documents the expected fields for editors that support JSON Schema.
