# R&S Cleaning Services: design rules

Read this before changing the site, and give it to any AI tool (Claude, Cursor, Copilot) you use to edit it.

The site should only be able to belong to R&S. Every change gets checked against the rules below.

## Colors

Taken from the logo. Don't add new ones.

| Name | Hex | Use |
| --- | --- | --- |
| Navy | `#0A2B4E` | Text, headings, top bar, schedule panel, quote section |
| Blue | `#0B6CB8` | Main buttons and links |
| Sky | `#12A2DC` | The star from the logo only (calendar, deep clean items). Never for text or big areas |
| Mist | `#EDF3F8` | Every other section background |
| White | `#FFFFFF` | Page background |
| Muted | `#4A5D72` | Secondary text |

No gradients anywhere.

## Type

- **Libre Caslon Text** (bold) for headings. It matches the serif letters in the logo.
- **Libre Franklin** for body text, buttons and forms.
- Sentence case everywhere. No ALL CAPS labels, no small tracked-out text above headings.

## Layout

- Text is left-aligned. Don't center the hero.
- One main action on the page: **Get a free quote**. Every big button leads to the quote form.
- Sections alternate white and mist. Lists are separated by thin rules, not put in cards.
- The only decoration is the star from the logo.

## Never add

- Purple or blue gradients, glow effects, glassmorphism, blurred blobs
- Rows of 3 cards with an icon in a rounded square
- Big 01 / 02 / 03 step numbers
- A "Why choose us?" section
- Numbers without a source (500+ happy clients, 10+ years, 24/7)
- Testimonials or reviews that aren't real, word for word, from a real customer who agreed to it
- Stock photos, AI-generated people, bubbles or sparkle clip art
- Emoji
- Floating badges, fake chat bubbles, pop-ups

## Copy test

Before adding any sentence, ask: **could a competitor put this on their site without changing a word?** If yes, rewrite it with a fact, or delete it.

Good facts are a name, a price, a town, a day, a number of days, a language you speak or something you actually do. If a fact is missing, leave a `[PLACEHOLDER]` and ask. Never invent one.

## Phones first

Most people find R&S on their phone. Design and check every change at 375px wide before looking at desktop.

- Text: body at least 16px, form fields at least 16px (smaller makes iPhones zoom in when you tap a field)
- Tap targets: at least 44px tall, 48px for anything in the bottom bar or menu
- The phone number is always a tap-to-call link (`tel:`), and the Call / Text / Get a quote bar stays at the bottom on phones
- No pop-ups, cookie walls or chat bubbles covering the page
- Keep it light: fonts stay self-hosted, logos stay WebP, and any photo you add should be under 200 KB and no wider than 1600px
- Long lists fold up on phones (like the room checklists) instead of making people scroll past them

## What the first screen must show

1. Who runs it (Rodrigo and Sabrina)
2. Where (Rockville and nearby towns)
3. What it costs (from $X a visit)
4. How soon you can start (first visit within X days)
5. How to reach you (phone in the top bar, and the Call / Text bar on phones)
