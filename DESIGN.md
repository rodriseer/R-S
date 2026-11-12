# Connect Cleaning: design rules

Read this before changing the site, and give it to any AI tool (Claude, Cursor, Copilot) you use to edit it.

The site should only be able to belong to Connect Cleaning. Every change gets checked against the rules below.

## Colors

Four brand colors: baby blue, light green, charcoal and white. Don't add new ones.

| Name | Hex | Use |
| --- | --- | --- |
| White | `#FFFFFF` | Page background, cards |
| Baby blue | `#48A9E6` | Big blocks (schedule card, quote section), picked choices, check marks, the underline on links |
| Light green | `#9BCB50` | Main buttons, sparkles, the rules above lists, fills in drawings |
| Charcoal | `#566166` | Text, headings, links, outlines of drawings |

Shades made from those four, each for one job:

| Name | Hex | Use |
| --- | --- | --- |
| Ink (darker charcoal) | `#2B3033` | Words that sit on the baby blue or the light green |
| Pale blue | `#EDF6FC` | Checklist section, drawing panels |
| Pale green | `#F1F8E6` | About section |
| Box edge | `#858D91` | Borders of form fields and outline buttons |

- **Words on blue or green are ink, never white or charcoal.** White on the baby blue scores 2.6 to 1 and charcoal 2.5 to 1, and white on the green 1.9 to 1. All are below the 4.5 to 1 needed to read small text, so they wash out on a phone in daylight. Ink scores 5.1 on the blue and 7.0 on the green
- **Baby blue and light green are never used for words on white.** They are too pale to read. Links are charcoal with a baby blue underline
- **Buttons:** the main button is light green with ink text
- **Blue blocks:** all text on them is ink. Cards on a blue block are white with charcoal text
- **The logo** is the one thing with its own colors (its original darker blue, green and navy). It only ever sits on white
- No gradients anywhere

## Type

- **Montserrat** (800 for big headings, 700 for small ones). It matches the lettering in the logo
- **Figtree** for body text, buttons and forms
- Sentence case everywhere. No ALL CAPS labels, no small tracked-out text above headings

## Layout

- Text is left-aligned. Don't center the hero.
- One main action on the page: **Get a free quote**. Every big button leads to the quote form.
- Sections alternate white, pale blue and pale green, and end on one blue block (the quote section). Lists sit under a green rule, not in cards.
- Decoration is the green sparkle from the logo plus the site's own cleaning drawings (next section). Nothing else.

## Illustrations and motion

The drawings (glass cleaner, degreaser, bleach, detergent, paper towels, vacuum, sponge, calendar, boxes, broom, bubbles, star) were made for this site. They live in the hidden `<svg class="sprite">` at the top of `index.html` and are reused with `<use>`.

- **Style:** flat shapes, 2px charcoal outline, filled only with white, the blue and green above, and pale blue or pale green (`#D1EAF9`, `#A4D4F2`, `#CDE5A8`). No gradients, no shadows, no other colors. A new drawing has to look like it belongs to the same set
- **No real brands:** products are generic (a bleach jug, a glass cleaner bottle). Never draw another company's logo, label or packaging, and never write a brand name on a product
- **Where they go:** in their own space (the service panels, the vacuum band, the supplies lineup, the edge of a section, on top of the schedule card, beside a room name). Never behind or over text
- **Motion follows the person:** things move only when someone scrolls or taps. The bottle sprays when a schedule is picked, the vacuum crosses at the pace of the scroll, drawings fade in as they come up. Nothing plays on a loop, and nothing races ahead of the scroll
- **Phones first:** every effect has to work on a phone, not only on desktop
- **Reduced motion:** people who turn motion off on their device see the same drawings standing still. Keep it that way
- **Photos:** only real photos of real Connect Cleaning jobs. A service panel can show a photo instead of its drawing (see README)

## Never add

- Purple or blue gradients, glow effects, glassmorphism, blurred blobs
- Rows of 3 cards with an icon in a rounded square
- Big 01 / 02 / 03 step numbers
- A "Why choose us?" section
- Numbers without a source (500+ happy clients, 10+ years, 24/7)
- Testimonials or reviews that aren't real, word for word, from a real customer who agreed to it
- Stock photos, AI-generated people, or clip art and icons from other sites
- Emoji
- Floating badges, fake chat bubbles, pop-ups

## Quotes, not prices

Never show prices, price ranges or "from $X" anywhere on the site. Every job is quoted, so point people to the free quote form instead.

## Names

Don't put the owners' names or photos of them anywhere on the site. Say "our family" or "a family business in Rockville" instead.

## Copy test

Before adding any sentence, ask: **could a competitor put this on their site without changing a word?** If yes, rewrite it with a fact, or delete it.

Good facts are a name, a town, a day, a number of days, a language you speak or something you actually do. If a fact is missing, ask for it and leave that line out until you have it. Never invent one, and never put a `[PLACEHOLDER]` on the live site.

## Phones first

Most people find Connect Cleaning on their phone. Design and check every change at 375px wide before looking at desktop.

- Text: body at least 16px, form fields at least 16px (smaller makes iPhones zoom in when you tap a field)
- Tap targets: at least 44px tall, 48px for anything in the bottom bar or menu
- The phone number is always a tap-to-call link (`tel:`). On phones the hero has real Call and Text buttons right under the quote button
- One quote button on screen at a time: the bottom Call / Text / Get a quote bar only shows after the hero buttons scroll away, and hides while the quote form is on screen
- On phones, the buttons come before the facts in the hero, so they are on the first screen even on a small phone
- Choices (how often, which day, which service) are rows of equal buttons on phones, never pills that wrap onto a second line
- No pop-ups, cookie walls or chat bubbles covering the page
- Keep it light: fonts stay self-hosted, logos stay WebP, and any photo you add should be under 200 KB and no wider than 1600px
- Long lists fold up on phones (like the room checklists) instead of making people scroll past them
- The quote form fits in about one phone screen: required fields only, choices as rows of equal buttons, optional fields folded away. Don't add a required field without removing one

## What the first screen must show

1. Who runs it (a family business in Rockville)
2. Where (Rockville and nearby towns)
3. How to get a free quote (the quote form)
4. How to reach you (the phone number, with Call and Text buttons on phones)
5. The languages you speak
