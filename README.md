# R&S Cleaning Services

Homepage for R&S Cleaning Services, a family-run home cleaning business in Rockville, Maryland.

It's a plain static site: no build step, no framework. Open `index.html` in a browser to see it.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page, all its text and the drawings (the hidden `<svg class="sprite">` at the top) |
| `styles.css` | Colors, fonts and layout (colors are taken from the logo) |
| `script.js` | The schedule picker, the standard/deep clean switch, the quote form and the scroll effects |
| `assets/rs-logo.webp`, `rs-logo-220.webp`, `rs-logo.png` | Logo with a clear background, in sizes for phones and desktop (the PNG is a fallback for old browsers) |
| `assets/favicon-32.png`, `apple-touch-icon.png` | Browser tab icon, and the icon an iPhone uses if someone adds the site to their home screen |
| `assets/fonts/` | The two fonts, served from this site so phones don't wait on Google Fonts |
| `DESIGN.md` | Design rules for this site, including what not to do (give it to any AI tool you use to edit the site) |

## Before it goes live

Use find and replace in `index.html` for each placeholder. Replace every match, not just the visible ones: `[EMAIL]` also sits inside the email links.

The phone number, (301) 525-1949, is already in. To change it, search `index.html` for `525-1949` (what people see) and `+13015251949` (the Call and Text links), and `script.js` for `525-1949` (form messages).

- `[EMAIL]`: quote section and footer
- `[NUMBER]`: hero, how many days until the first visit after a quote

Then:

1. **Quote form:** already connected to Formspree. Send a test request once the site is live (see below).
2. **Check the details:** the service area towns, the room checklist and the "What happens after you send it" steps should match how you actually work.

Before changing the design or copy, read `DESIGN.md`.

## The quote form (Formspree)

The site has no prices. People fill out the quote form and you text them a quote. The site can't send email by itself, so the form goes to Formspree, which emails each request to you. It's already connected to the Formspree form `mqpqzpaa` (the form's `action` in `index.html`). The free plan covers 50 requests a month.

Each request comes in with the service, how often, preferred day, ZIP, bedrooms, bathrooms, notes, name and phone, with the subject "Quote request from (name)". If the customer gave an email, you can hit Reply.

How it works: `script.js` sends the form in the background (Ajax), so the customer stays on the page and sees "Quote request sent". If JavaScript doesn't load, the form still posts to the same address as a plain HTML form and Formspree shows its own thank-you page.

In the Formspree dashboard:

- **Keep CAPTCHA off** for this form (Settings, under spam protection). The form sends in the background, and a CAPTCHA would block it. A hidden spam trap field (`_gotcha`) is built in instead.
- **Notifications:** you can add a second email so you both get every request.
- **Test it:** after the site is live, send one request yourself and check it lands in your inbox (it counts toward the 50).

To use a different Formspree form, change the `action` on `<form id="quote-form">` in `index.html`.

## Drawings and effects

The cleaning drawings are part of the page, not image files, so they load instantly and stay sharp at any size.

- **The spray bottle** on the schedule card puffs when someone picks a schedule
- **The vacuum** under the hero crosses the page as you scroll and leaves sparkles where the dust was
- **The three service drawings** pop in, drift a little as you scroll, and tilt toward the mouse on a computer
- **The bubbles** along the top of the quote section float at different speeds

People who turn off motion on their phone or computer see everything standing still.

**Use a real photo for a service:** put the photo in `assets/` (under 200 KB, about 1200px wide). In `index.html`, find the service's `<div class="service__art" …>`, replace the whole `<svg>…</svg>` inside it with `<img src="assets/your-photo.jpg" alt="what the photo shows">`, and delete `aria-hidden="true"` from that div. Only use photos of your own jobs.

**Change how far something moves:** each moving part has `data-fx-y` (up and down), `data-fx-x` (sideways) or `data-fx-rot` (degrees of turn). Bigger numbers move more; delete the attribute to keep that part still.

## Check it on a real phone

Most people find the business on their phone, so after each change open the live site on an iPhone and an Android phone and check:

- The first screen shows what you do, where, how to get a free quote and the Call / Text / Get a quote bar at the bottom
- Tapping **Call** opens the dialer and **Text** opens messages, with your number filled in
- **Menu** opens and closes, and the links jump to the right section
- Tapping a room in "What every clean covers" opens and closes it
- Scrolling feels smooth: the vacuum crosses under the schedule card, and the bottle puffs when you pick a schedule
- Typing in the quote form brings up the number pad for phone and ZIP, and the bottom bar gets out of the way
- Sending a test quote request shows "Quote request sent" and the request lands in your inbox
- Nothing makes you scroll sideways or pinch to read

For a speed and accessibility report, open the live site in Chrome on a computer, then **More tools → Developer tools → Lighthouse**, pick **Mobile** and run it.

## Put it online with GitHub Pages

On a free GitHub account the repo has to be public for Pages to work (private repos need GitHub Pro).

1. In this repo, go to **Settings → Pages**.
2. Under **Build and deployment**, pick **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. After a minute or two the site is live at `https://rodriseer.github.io/R-S/`.
