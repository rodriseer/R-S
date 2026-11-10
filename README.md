# R&S Cleaning Services

Homepage for R&S Cleaning Services, a home cleaning business in Rockville, Maryland, run by Rodrigo and Sabrina.

It's a plain static site: no build step, no framework. Open `index.html` in a browser to see it.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page and all its text |
| `styles.css` | Colors, fonts and layout (colors are taken from the logo) |
| `script.js` | The schedule picker, the standard/deep clean switch and the quote form |
| `assets/rs-logo.png` | Logo with a clear background |
| `assets/favicon.png` | Small square icon for the browser tab |

## Before it goes live

Search `index.html` for `class="placeholder"` and replace each one:

- `[PHONE]`: 3 spots (hero, quote section, footer)
- `[EMAIL]`: 2 spots (quote section, footer)
- `[PRICE]`: 3 spots (Ways to book)

Then:

1. **Photo:** put a photo in `assets/` (for example `owners.jpg`) and swap the `<div class="photo-slot">` in the About section for
   `<img class="about__photo" src="assets/owners.jpg" alt="Rodrigo and Sabrina">`
2. **Quote form:** open `script.js` and set `QUOTE_EMAIL` at the top to your business email. When someone sends the form, their email app opens with the request filled in, addressed to you. Until it's set, the form asks people to call or text.
3. **Check the details:** service area towns, the room checklist and the "How it works" steps should match how you actually work.

## Put it online with GitHub Pages

On a free GitHub account the repo has to be public for Pages to work (private repos need GitHub Pro).

1. In this repo, go to **Settings → Pages**.
2. Under **Build and deployment**, pick **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. After a minute or two the site is live at `https://rodriseer.github.io/R-S/`.
