# Direction 2 – Inscription

| | |
|---|---|
| Owner | ux-designer |
| Date | 01/10/2026 |
| Status | Option for the owner's choice of system theme |
| Brief | [../brief.md](../brief.md), sections 2 to 5 and 6.2 |
| Evidence | [../research.md](../research.md) |
| Pages | [Foundations](index.html) · [Request a van](request.html) · [Dashboard](dashboard.html) · [Driver's route](driver.html) · [Gallery](../index.html) |

## Decision

PolymathTransit should feel like the college, not like software. Inscription
takes its whole grammar from the college's own logo: Roman inscriptional
capitals (Marcellus) **name** things in four words or fewer, as the
"POLYMATH COLLEGE" wordmark does; a humanist italic (Ysabeau Office) is the
**voice** that guides and explains, as "Learn to Live" does; and a plain roman
(Ysabeau Office) does the **work**. Pages sit on a lime-washed ground with one
deep purple band, the verandah, framing what matters most: the form's title on
the phone, the next stop for the driver, today's plan for the coordinator. The
signature is the **step ladder**: the crest's stepped top becomes four joined,
rising steps (Submitted, Proposed, Confirmed, Completed) that show any person
where a request stands and what happens next.

## Context

- **People.** Most users are non-technical school staff on phones (C-01). The
  public form must be done in two minutes, unaided (BO-04, NFR-01), on one
  page with at most 12 visible fields (NFR-02).
- **Brand.** Crest purple `#722A82` leads; the wordmark grey `#63666B` and the
  tagline black are available (brief 3.1). The logo has two type voices,
  capitals and an italic, which this direction turns into a system.
- **Phones outdoors.** Phone pages are light, with large type (body 19 px) and
  44 px targets or more (NFR-04, brief 3.4).
- **Two languages.** English and Sinhala on the public pages (FR-65). Sinhala
  has no capitals and no italic, and its fonts draw it at very different sizes
  (research.md 3.1, 3.2), so every typographic rule has a Sinhala twin.
- **Weight.** Form page 500 KB or less (NFR-18).

## Options considered

Choices the brief left open, and how I resolved them:

| Question | Options | Chosen, and why |
|---|---|---|
| Where the dashboard's navigation goes | (a) in the 300 px rail, below the plan; (b) in a top arm of the band | **(b)**. The band becomes an L: a top arm (header and navigation) and the rail (date and plan). This keeps "header and navigation" first in reading and focus order (US-22 AC-1) and keeps the plan inside `<main>`, while it is still one band. The brief's rail holds the date and the plan with its ladder. |
| How "one deep band" works on the driver page | (a) band for the header only; (b) band frames the next stop | **(b)**. The next stop sits in a white **opening** set into the band, as a verandah frames the view. The buttons stay on white, light and high-contrast for sunlight. |
| Where the ladder appears on the public form | (a) on the form itself; (b) on the confirmation only | **(b)**, as the brief says. On the form it would describe a request that does not exist yet. |
| The ladder's drawing | (a) four separate bars; (b) four joined steps | **(b)**. The first build used separate bars; at 16 px they read as a phone's signal-strength icon. Joined steps read as stairs and stay closer to the crest's stepped outline. |
| The large ladder: SVG or HTML | (a) one SVG; (b) an ordered list whose steps are CSS rectangles | **(b)**. Labels are real text that wraps in Sinhala, the list is announced as a list with `aria-current="step"`, and the drawing is still "simple rectangles" (brief 6.2). The 16 px glyph is SVG. |
| Telling statuses apart without colour | glyph position, fill, tint | Each status has its own glyph: steps filled to its stage; off-ladder outcomes drop a step below the line at a different place (Needs attention at step 2, Declined at 3, No-show at 4, Cancelled at 3 and 4). Every badge also carries the word. |
| Timeline blocks too short for words | (a) wider timeline; (b) glyph inside, reference below | **(b)**. 15-minute legs are about 21 px wide. Every block shows its glyph; its short reference and flag icons sit under it; the full description is the button's name; "Show as list" gives the table. |
| A booking's wait between legs | (a) one long block; (b) two blocks with a dashed line | **(b)**. The van is free in the wait (that is where the gap job goes), so the dashed line shows "same booking, van free", and PT-2026-0145 sits on it. |
| The closed date (today) | (a) focusable but not selectable; (b) natively disabled with its reason shown | **(b)**. It works the same without JavaScript, and the reason ("Requests for today closed at 7:00 am…") is visible under "Closed" rather than only on focus. |
| Sinhala section names | Abhaya Libre 700 at 17 px literal, or 17 px with the 1.35 factor | **17 px × 1.35**, so they match the visual size of the 15 px Marcellus capitals. At a literal 17 px, Abhaya's Sinhala is about 7 px tall. |
| Sinhala field labels | Abhaya Libre (heading face) or Noto Serif Sinhala | **Noto Serif Sinhala 600**. Labels are read, not displayed, and Abhaya is for headings and short names (research.md 3.1). |
| Dialog backdrop | translucent dim, or solid | **Solid band colour.** No transparency over content (brief 3.2), and the dialog becomes the lit opening in the band. |
| The driver's Undo | fixed snackbar, or in the page flow | **In the flow**, above the next stop, so it never hides a focused button (WCAG 2.4.11). |

## Evidence (principles taken, nothing copied)

- **The college's logo** (research.md 1.1, 1.6): two type voices (classical
  capitals, humanist italic) and the crest's stepped top. These are the
  system's grammar and its signature. The logo itself is used only as the
  supplied artwork; "Polymath College" is never set in a font.
- **Geoffrey Bawa's tropical modernism** (research.md 2.5): composed light and
  shade; deep overhangs framing calm, open space; honest materials. Here: a
  lime-wash ground, one deep band, a white opening, and colours named after
  materials (leaf, laterite, brick, slate), each with one job.
- **Abhaya Libre and 1960s Sinhala letterpress** (research.md 2.5, 3.1):
  Sinhala headings use a living local printing tradition, not a generic UI
  face.
- **Mooniak's "reducing dissonance"** (research.md 2.5): scripts are paired by
  size, weight and rhythm through per-face size factors (Abhaya 1.35, Noto
  Serif Sinhala 0.95), not forced into one look.
- **V&A Wayfinding** (research.md 2.1): restricted, purposeful colour that
  respects a heritage setting; purple is the only loud colour.
- **Marcellus** (research.md 3.3): "inspired by classic Roman inscription
  letterforms", echoing the wordmark without imitating it.
- **GOV.UK error pattern** (research.md 2.4): summary at the top with links in
  page order, message beside the field, keep what was typed.

## Reasoning

- **Trust through familiarity.** Staff already know the crest and its type.
  An interface that speaks in that voice feels official and safe to use,
  which matters for people who are not confident with software (C-01).
- **Hierarchy without extra devices.** Capitals, italic and roman give three
  clear levels with no boxes, icons or colours added. Capitals are rare (four
  words at most), so they stay legible.
- **The ladder answers the first question.** "Where is my request, and what
  happens next?" is answered by a shape the college already owns, in words, on
  the confirmation, in the coordinator's panel and in the day's plan.
- **One band, one focus.** Each page has exactly one framed thing; everything
  else is calm, which reduces the load of a long single-page form.
- **Status never depends on colour.** Glyph shape, word, a rule and a tint;
  the timeline adds dashed edges for "not in the plan yet". The greyscale
  captures in `screenshots/` show it still reads.

## Trade-offs

- **Heavier fonts.** Two Sinhala faces (Abhaya Libre for headings, Noto Serif
  Sinhala for text) cost about 223 KB when Sinhala is shown, partly because
  the zero-width joiner in Sinhala headings also pulls each face's Latin file.
  Measured: `request.html` 490.7 KB and `driver.html` 480.1 KB in Sinhala
  (over the wire, with local files at full size); English 369.8 KB and
  342.4 KB. With normal server compression of the HTML, CSS and JS, Sinhala
  is about 332 KB and 346 KB. It is under 500 KB but well above the 300 KB
  aim; the other directions with one Sinhala face will be lighter. Option:
  use Noto Serif Sinhala 600 for Sinhala headings on phone pages and save
  about 109 KB.
- **Italic for explanations.** The italic voice is beautiful but slower to
  read in long passages. It is kept to hints and short lines; the six-line
  explanation on the dashboard is the longest use.
- **Long phone form.** Heading-size questions (22 px) and one-column cards
  for Sinhala make the form taller than a denser direction would.
- **Dashboard density.** Short legs on the timeline carry only a glyph and a
  reference beneath; coordinators must learn the glyphs (the legend explains
  them) or use the list view.
- **Character over neutrality.** The direction is the most "branded" of the
  set; if the college wants PolymathTransit to feel like a neutral tool, this
  is the wrong option.

## Validation plan (the five-person BO-04 test)

1. **Time and success.** Five staff each complete the form on their own phone
   in their chosen language, unaided. Target: all in 2 minutes or less.
2. **Ladder comprehension.** On the confirmation, ask "Where is your request
   now, and what happens next?" Target: 4 of 5 answer in their own words.
3. **Italic legibility.** Watch whether hints in italic are read or skipped
   (for example, the phone format hint). Note any squinting outdoors.
4. **Sinhala.** Two native readers check every Sinhala string and the size
   match between Abhaya Libre headings and Noto Serif Sinhala text (D-09).
5. **Status glyphs.** A coordinator names the status of five timeline blocks
   without the legend, then with it. Target: correct with the legend first
   time; without it after a day's use.
6. **Driver.** A driver marks a stop Done, undoes it and records a no-show
   while standing, one-handed, in daylight. Count mis-taps.

## Principles

1. Speak as the college: courteous, brief, never chatty.
2. Capitals name; italic guides; roman does the work.
3. One deep band frames what matters most on each page; everything else is
   calm.
4. Every colour comes from a material and has a job.

## Files

| File | What it is |
|---|---|
| `index.html` | Foundations: concept, logo, colour with contrast, type in both scripts, spacing and grids, icons, every component and state, the ladder, motion |
| `request.html` | The public form at 360 px, English and Sinhala, cutoff, errors, confirmation |
| `dashboard.html` | The coordinator dashboard at 1280 to 1440 px |
| `driver.html` | The driver's route at 360 px |
| `tokens.css` | Global tokens, then semantic aliases, the type-scale switch and the Sinhala factors |
| `components.css` | Every component and its states |
| `pages.css` | Phone page layout (request and driver) |
| `dashboard.css` | Dashboard layout (the verandah and courtyard) |
| `foundations.css` | Foundations page layout |
| `script.js` | The only script: language switch, form, dashboard, driver |
| `screenshots/` | 360 px, 320 px and desktop captures, English and Sinhala, errors, confirmation, greyscale, no-JavaScript |

## Requirement IDs shown

BO-04, C-01, NFR-01, NFR-02, NFR-03, NFR-04, NFR-12, NFR-14, NFR-18, FR-01,
FR-02, FR-03, FR-04, FR-05, FR-06, FR-07, FR-09, FR-19, FR-20, FR-25, FR-26,
FR-27, FR-28, FR-29, FR-30, FR-34, FR-49, FR-52, FR-54, FR-55, FR-57, FR-58,
FR-61, FR-62, FR-65, FR-67, BRL-06, BRL-09, BRL-10, BRL-11, BRL-13, BRL-15,
BRL-21, US-01, US-02, US-03, US-05, US-16, US-17, US-22, US-23, US-26, US-44,
US-46, US-47, US-52, US-54, US-58, US-60, D-09, Q-17.

## Known gaps

- **Sinhala drafts added by this direction**, not in brief 4.9, for D-09
  review: the ladder's four step names, "Next, a coordinator checks your
  trip.", the skip link, "Stops done", "Later stops", "Early trip", "Fixed
  trip", the passenger count pattern ("මගීන් 1") and the summary joins
  ("{place} සිට, {time}"). They are in `EXTRA` in `script.js`.
- **Two new icons**: Early trip and Completion not confirmed are flags without
  an icon in the brief's set; both were added.
- **Prototype only**: Change and Decline on the dashboard, the map pin, the
  filters and the privacy link do not work; Navigate shows "Opens your map
  app" (Q-17). Without JavaScript, the driver's Done and No-show do nothing
  (in production each is a form POST).
- **Raw values**: a few 1 to 3 px optical offsets, the timeline's own
  component tokens and the foundations page's diagram sizes are set in place;
  everything else uses tokens.
- **Browsers checked**: Microsoft Edge (Chromium) only, headless, at 320, 360,
  1280 and 1440 px. Firefox and Safari were not available here; the CSS uses
  `:has()` (Firefox 121+, Safari 15.4+) for selected cards and focus rings.
- **Dashboard below 1024 px** is stacked and usable, with the timeline
  scrolling sideways, but not polished (as the brief allows).
