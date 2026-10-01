# AI in Prosecution — companion website

Static site for the NCCDA CLE. No build step, no server-side code. Upload the whole folder to any static host (Netlify, GitHub Pages, Cloudflare Pages, an S3 bucket, or a plain web server) and point visitors at `index.html`.

## Pages

| File | Part |
|---|---|
| `index.html` | Landing page: six-part map, show-of-hands questions, the plea, about the presenter |
| `other-side.html` | 1 · The Other Side |
| `landscape.html` | 2 · The Landscape |
| `what-it-can-do.html` | 3 · What It Can Do |
| `what-you-can-do-now.html` | 4 · What You Can Do Now |
| `what-can-go-wrong.html` | 5 · What Can Go Wrong (hub) |
| `renfer-ai-warning.html` | 5a · Don't Be the Headline (original page, nav added) |
| `ai-slop.html` | 5b · Spot the Slop (original page, nav added) |
| `your-turn.html` | 6 · Your Turn: recap, resources, contact |

Shared files: `site.css` (styles for the new pages), `nav.css` (navigation, pager, footer, shared by every page including the two originals), `site.js` (builds the nav and prev/next pager from the part list, progress bar, scroll reveals, arrow-key navigation).

## Editing

- To rename or reorder parts, edit the `PARTS` array at the top of `site.js`; the nav, menu, and pagers update everywhere.
- Fonts load from Google Fonts (Public Sans, Libre Caslon Text, Courier Prime) with system fallbacks.
- The model lineups and valuations on the Landscape page are labeled "as of September 2026" and will need refreshing.
- The screening-room section on Part 3 is intentionally generic: method and patterns only, no case numbers, facts, or bottom lines from the CMPD files.
