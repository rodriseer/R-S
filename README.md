# R&S Cleaning Services

Homepage for R&S Cleaning Services, a home cleaning business in Rockville, Maryland, run by Rodrigo and Sabrina.

It's a plain static site: no build step, no framework. Open `index.html` in a browser to see it.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page and all its text |
| `styles.css` | Colors, fonts and layout (colors are taken from the logo) |
| `script.js` | The schedule picker, the standard/deep clean switch and the quote form |
| `assets/rs-logo.webp`, `rs-logo-220.webp`, `rs-logo.png` | Logo with a clear background, in sizes for phones and desktop (the PNG is a fallback for old browsers) |
| `assets/favicon-32.png`, `apple-touch-icon.png` | Browser tab icon, and the icon an iPhone uses if someone adds the site to their home screen |
| `assets/fonts/` | The two fonts, served from this site so phones don't wait on Google Fonts |
| `DESIGN.md` | Design rules for this site, including what not to do (give it to any AI tool you use to edit the site) |

## Before it goes live

Use find and replace in `index.html` for each placeholder. Replace every match, not just the visible ones: `[PHONE]` and `[EMAIL]` also sit inside the links that make the Call, Text and email buttons work on phones.

- `[PHONE]`: write it like `301-555-0123`. It's in the top bar, hero, quote section, footer and the phone Call / Text bar
- `[EMAIL]`: quote section and footer
- `[PRICE]`: 4 spots (hero, and the 3 rows in Ways to book)
- `[DAYS AND HOURS]`: top bar, for example "Mon to Fri, 8am to 6pm"
- `[NUMBER]`: hero, how many days until the first visit after a quote

Then:

1. **Photo:** put a real photo of the two of you in `assets/` (for example `owners.jpg`, a phone photo is fine) and swap the `<div class="photo-slot">` in the About section for
   `<img class="about__photo" src="assets/owners.jpg" alt="Rodrigo and Sabrina">`
2. **Quote form:** open `script.js` and set `QUOTE_EMAIL` at the top to your business email. When someone sends the form, their email app opens with the request filled in, addressed to you. Until it's set, the form asks people to call or text.
3. **Check the details:** the service area towns, the room checklist and the "What happens after you send it" steps should match how you actually work.

Before changing the design or copy, read `DESIGN.md`.

## Check it on a real phone

Most people find the business on their phone, so after each change open the live site on an iPhone and an Android phone and check:

- The first screen shows who you are, the price and the Call / Text / Get a quote bar at the bottom
- Tapping **Call** opens the dialer and **Text** opens messages, with your number filled in
- **Menu** opens and closes, and the links jump to the right section
- Tapping a room in "What every clean covers" opens and closes it
- Typing in the quote form brings up the number pad for phone and ZIP, and the bottom bar gets out of the way
- Nothing makes you scroll sideways or pinch to read

For a speed and accessibility report, open the live site in Chrome on a computer, then **More tools → Developer tools → Lighthouse**, pick **Mobile** and run it.

## Put it online with GitHub Pages

On a free GitHub account the repo has to be public for Pages to work (private repos need GitHub Pro).

1. In this repo, go to **Settings → Pages**.
2. Under **Build and deployment**, pick **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. After a minute or two the site is live at `https://rodriseer.github.io/R-S/`.
