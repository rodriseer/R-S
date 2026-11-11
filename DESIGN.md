# Connect Cleaning: design rules

Read this before changing the site, and give it to any AI tool (Claude, Cursor, Copilot) you use to edit it.

The site should only be able to belong to Connect Cleaning. Every change gets checked against the rules below.

## Colors

Taken from the Connect Cleaning logo: clean green, clean blue and white, with the navy of the wordmark for text. Don't add new ones.

| Name | Hex | Use |
| --- | --- | --- |
| White | `#FFFFFF` | Page background, cards |
| Clean blue | `#0670B5` | Big blocks (schedule card, quote section), links, picked choices. Text on it is white |
| Clean green | `#5FB322` | Main buttons, sparkles, the rules above lists, fills in drawings. Text on it is navy, never white |
| Deep green | `#1B8424` | Small green marks on light backgrounds (the deep clean star) |
| Navy | `#013363` | Text, headings, outlines of drawings |
| Pale blue | `#EDF5FB` | Checklist section, drawing panels |
| Pale green | `#F0F7E9` | About section |
| Muted | `#4A5D72` | Secondary text on white or pale backgrounds |

- **Buttons:** the main button is green with navy text. White text on the green fails the contrast check, so don't use it
- **Blue blocks:** all text on them is white or `#E8F3FB`. The logo is navy, so it never goes on a blue block
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

- **Style:** flat shapes, 2px navy outline, filled only with white, the blue and green above, and pale blue or pale green (`#CFE6F5`, `#9FD0F0`, `#C6E7AC`). No gradients, no shadows, no other colors. A new drawing has to look like it belongs to the same set
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

Good facts are a name, a town, a day, a number of days, a language you speak or something you actually do. If a fact is missing, leave a `[PLACEHOLDER]` and ask. Never invent one.

## Phones first

Most people find Connect Cleaning on their phone. Design and check every change at 375px wide before looking at desktop.

- Text: body at least 16px, form fields at least 16px (smaller makes iPhones zoom in when you tap a field)
- Tap targets: at least 44px tall, 48px for anything in the bottom bar or menu
- The phone number is always a tap-to-call link (`tel:`), and the Call / Text / Get a quote bar stays at the bottom on phones
- No pop-ups, cookie walls or chat bubbles covering the page
- Keep it light: fonts stay self-hosted, logos stay WebP, and any photo you add should be under 200 KB and no wider than 1600px
- Long lists fold up on phones (like the room checklists) instead of making people scroll past them
- The quote form fits in about one phone screen: required fields only, choices as rows of equal buttons, optional fields folded away. Don't add a required field without removing one

## What the first screen must show

1. Who runs it (a family business in Rockville)
2. Where (Rockville and nearby towns)
3. How to get a free quote (the quote form)
4. How soon you can start (first visit within X days)
5. How to reach you (phone next to the main button, and the Call / Text bar on phones)
