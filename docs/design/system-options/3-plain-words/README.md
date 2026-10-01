# Direction 3 – Plain Words

| | |
|---|---|
| Document | Design rationale for direction 3 of the five design-system options |
| Owner | ux-designer |
| Date | 01/10/2026 |
| Status | Option for the owner's choice; not yet approved |
| Built from | [../brief.md](../brief.md) sections 1 to 5 and 6.3; [../research.md](../research.md) |
| Pages | [Foundations](index.html) · [Request form](request.html) · [Coordinator dashboard](dashboard.html) · [Driver's route](driver.html) · [All five directions](../index.html) |

## Decision

PolymathTransit should read like a clear note from the transport office. One
column, large type, black on white, and every screen answers "what do I do
now?" in words before anything else. The one memorable idea is a sentence: as
someone fills in the request form, the product writes their request back to
them in one plain sentence ("A van for 4 people from Branch B to the Sports
Centre on Tuesday 13/10/2026, picking up at 8:45 am (± 10 min), coming back at
10:45 am."), with any missing answer shown as a gap in [brackets] that links
to its question. The coordinator's rows and panel lead with the same kind of
sentence, and the driver's next stop is one ("Next: pick up 1 passenger at
Branch B at 10:00 am."). The crest purple carries actions, links, focus and
the sentence's rule; everything else is type.

## Context

- **Users (C-01).** Most users are non-technical school staff on phones. The
  form must be finished unaided in 2 minutes or less (BO-04, NFR-01) on one
  scrolling page with at most 12 visible fields (NFR-02).
- **Brand.** The logo gives a red-violet crest purple (`#722A82`), a cool
  wordmark grey (`#63666B`) and black (research.md 1.2). Purple passes AAA as
  text and as a button fill on white (8.86:1).
- **Phones outdoors.** Drivers and staff read in sunlight on 360 px screens
  over slow data (NFR-04, NFR-18): light grounds, strong contrast, big type,
  a 500 KB page budget.
- **Two languages.** The public form, the driver's route and their messages
  are in English and Sinhala (FR-65); Sinhala labels can be up to three times
  wider and need more line height (research.md 3.2).
- **Accessibility.** WCAG 2.2 AA (NFR-03); colour is never the only signal.

## Options considered

How I resolved the choices the brief left open:

| Choice | Options | Chosen, and why |
|---|---|---|
| Where the sentence sits on the form | (a) pinned at the bottom of the screen; (b) a box just above "Send request"; (c) after every question | (b), as the brief says. A pinned box covers fields on a 360 px phone and fights the keyboard; after every question is noise. Just above the button is the moment of checking. |
| How a missing answer shows in the sentence | (a) leave it out; (b) grey placeholder; (c) a [bracketed] gap that is a link | (c). Brackets show the gap without colour, and the link jumps to the question, so the sentence is also a to-do list. |
| When screen readers hear the sentence | (a) every change; (b) after a pause; (c) never | (b): the visible sentence updates at once, a hidden polite live region speaks it 1.5 s after the last change, so it is heard once, not after every keystroke. |
| The dashboard's "tiles" (brief 5.3) | (a) number tiles; (b) a list of count sentences | (b). "2 requests need your attention." is a link; the plan is a sentence box with its one action. The brief's direction refuses tiles with big numbers. |
| Where the selected booking appears | (a) a side sheet over content; (b) the narrow column of the 2:1 split; (c) inline under the row | (b). No overlay (no transparency over content), and the panel stays beside the list. From the timeline, focus moves to the panel heading and a "Back to the timeline" link returns. |
| The run summary in the panel | (a) a four-column table; (b) one sentence per stop | (b) "Branch B: pick up 4. On board: 7 of 8 (busiest point)." A table was cramped at the panel's width; sentences are on-concept and read aloud well. |
| The 7 proposals on the dashboard | (a) folded; (b) open | Open by default: folded, they left a large empty area beside the panel; open, the coordinator sees each proposal in one line before approving the plan. The disclosure can still fold them. |
| Short timeline blocks | (a) true width (a 15-minute trip is 23 px); (b) a 44 px minimum | (b), so every block is easy to choose; the key says so in words, and exact times are in the panel and the list view. |
| Later stops on the driver's route | (a) every stop's Done in purple; (b) only the next stop's Done is primary | (b). One primary action per screen; later Done buttons are outlined and No-show is a quiet text button, still 48 px tall. |
| The no-show check | (a) modal dialog; (b) the question inline in the stop | (b). It stays where the thumb is, Escape and "Go back" close it, focus returns to No-show. |
| Motion | (a) 150 ms transitions; (b) none | (b) none. Things change, and the words say so. |

## Evidence

Principles taken from the references named for this direction (brief 6.3,
research.md 2.4). Nothing was copied: no GOV.UK colours (no `#FFDD00` yellow,
no blue links, no green buttons), crown, typeface or wording beyond the
brief's shared strings.

| Reference | Principle taken | Where it shows |
|---|---|---|
| GOV.UK (Design Museum Design of the Year 2013) | "Do the hard work to make it simple"; "this is for everyone"; understated design that makes the task faster | One column, question-as-label, big type, no decoration, no hero |
| GOV.UK error message and question pages guidance | Say what to fix, next to the field and in a summary that takes focus; keep what was typed; mark optional fields "(optional)" | Error summary with links in page order, inline messages with a hidden "Error:" prefix, "(optional)" labels |
| GOV.UK focus states | A focus indicator strong enough to see at a glance | Our own: 4 px crest purple with a 2 px white gap, fields thicken to 3 px black |
| Fantastical 2 (Apple Design Award 2015) | People check a booking read back as a sentence faster than a set of fields | The "Check your request" sentence, the dashboard's lead sentences, the driver's next-stop sentence |
| Atkinson Hyperlegible (Braille Institute) | Letters and figures that cannot be mistaken (I, l, 1; O, 0) | All text in Atkinson Hyperlegible Next; references and the driver's phone numbers in Atkinson Hyperlegible Mono |

## Reasoning

- **Words are the interface.** Non-technical staff (C-01) read words faster
  than they decode icons, colour codes or tiles. Statuses are words in a box,
  counts are sentences, explanations (FR-19) are paragraphs, flags are words
  with an icon.
- **The sentence does a job.** It is the last check before sending (BO-04)
  and catches wrong requests (a wrong day, a missing return) before a
  coordinator has to call. It is the same grammar the coordinator reads and
  the text message repeats, so the request means the same thing to everyone.
- **Big and black for sunlight.** Body 19 px, questions 21 px, nothing below
  16 px; black text (21:1) and 2 px black field borders; light grounds only.
- **Purple leads, but sparingly.** Purple is the brand and the action: the
  one primary button per view, links (always underlined), focus, and the
  sentence's left rule. Signal colours appear only with a word and an icon.
- **Only four containers.** The sentence box, the error summary, the selected
  booking and the status badges. Everything else sits on rules and white
  space, which is calmer and cheaper on a small screen.
- **Two scripts, one size.** Sinhala is set at 0.92 of the English size so the
  two look the same; line height rises to 1.7 for Sinhala body text; buttons
  and options wrap between words; English data (places, names) inside a
  Sinhala sentence is marked `lang="en"` and kept at its own size.

## Trade-offs

- **Long pages.** One question per line and 32 px between questions make the
  form about 4,000 px tall at 360 px (6,500 px with every reveal open), and
  the driver's route is long. It scrolls rather than packs.
- **Quiet identity.** Restraint is the point, but it can read as a generic
  public-service form. The crest letterhead, the purple sentence rule and
  Atkinson are what make it ours; an owner wanting more visual personality
  should prefer another direction.
- **Large type costs density on the dashboard.** At 19 px, fewer bookings fit
  on screen; the coordinator scrolls more than with a dense table.
- **The timeline stretches short trips** to 44 px so they can be chosen, which
  bends the time scale slightly (the key and the list view give exact times).
- **The sentence needs care in Sinhala.** Its word order differs from
  English; the Sinhala sentence is built from shared strings plus a few new
  joining words, all a draft for native review (D-09).
- **No motion.** Nothing draws the eye to a change except focus moving and
  the words; a person who is not looking may miss a status change (the
  messages are also live regions).

## Validation plan (the 5-person usability test, BO-04)

1. **Time to request** (NFR-01): five staff, unaided, on their own phones,
   request PT-2026-0142's trip. Target: all within 2 minutes.
2. **Does the sentence catch errors?** Seed one task with a wrong day; count
   who notices it in "Check your request" before sending. Ask afterwards if
   they read the sentence.
3. **Do the [gaps] get used?** Watch whether people tap a [bracketed] gap or
   scroll back to the question.
4. **Sinhala** (D-09): two of the five use Sinhala; note any label they
   misread and any Sinhala sentence that sounds wrong.
5. **Driver at walking pace**: in daylight, can a driver find the next stop's
   time and place within 3 seconds, and mark Done without hitting No-show?
6. **Coordinator**: from the dashboard at "7:05 am", can a coordinator say
   what needs them and approve the plan before "7:10 am"?

## Principles

1. Words first: if a sentence can do it, use a sentence.
2. One column, one thing at a time, in the order people think.
3. Big enough to read without glasses, in sunlight.
4. Nothing on the page without a job.

## What is in this folder

| File | What it is |
|---|---|
| `index.html` | Foundations: concept, logo, colour with contrast, type in English and Sinhala, spacing and grids, icons, every component in all states, the signature, motion |
| `request.html` | The public form at 360 px: language switch, cutoff message, date and time choices, extra stops, errors, the live sentence, confirmation |
| `dashboard.html` | The coordinator dashboard at 1440 px: plan, what needs you now, today at a glance, the selected booking, filters, the day timeline and its list view |
| `driver.html` | The driver's route at 360 px: next stop, done stops, later stops, Done, No-show, Undo, offline |
| `tokens.css` | Global tokens, then semantic aliases; the Sinhala factor |
| `components.css` | Every component and its states |
| `pages.css` | Page layouts |
| `script.js` | The only script (shared strings, behaviour for all pages) |
| `screenshots/` | Captures at 360 px, 320 px, 1440 px, 1280 px and 900 px, in English and Sinhala, with and without JavaScript |

The dashboard's lists, panel, timeline and table and the driver's stops are
rendered by the same functions in `script.js` that redraw them after an
action, so the static HTML (used without JavaScript) matches the live state.

## Colour pairs used

Every pair is from the brief's table for this direction or calculated with the
WCAG 2.2 formula. Pairs I added:

| Pair | Ratio | Use |
|---|---|---|
| `#63666B` on `#F3F2F4` (panel) | 5.17:1 | Hint text in the sentence box |
| `#722A82` on `#F3F2F4` | 7.94:1 | Links and focus on the panel |
| `#3D4044` on `#FFFFFF` | 10.42:1 | Disabled text |
| `#3D4044` on `#DCDEE1` | 7.73:1 | Disabled button label |
| `#FFFFFF` on `#3F1448` | 14.95:1 | Pressed primary button |
| `#FFFFFF` on `#B32228` | 6.61:1 | Destructive button |
| `#FFFFFF` on `#8B1A20` | 9.27:1 | Destructive hover (a darker red added for this state) |
| `#B32228` on `#F3F2F4`, `#1A609E` on `#F3F2F4`, `#197037` on `#F3F2F4` | 5.92, 5.86, 5.51:1 | Status colours where they meet the panel |
| `#8F9298` on `#FFFFFF` | 3.12:1 | Row rules and disabled edges (UI, 3:1) |
| `#000000` on `#E7F7E9`, `#FFEDEB`, `#E9F3FF` | 18.88, 18.57, 18.73:1 | Words on status tints |

## Weight (NFR-18)

Measured on 01/10/2026: local files with `wc -c`; font files by downloading
each woff2 that the page loads (checked with `document.fonts` in Edge).

| Page | Uncompressed, English | Uncompressed, Sinhala | With gzip on HTML, CSS and JS |
|---|---|---|---|
| `request.html` | 444 KB | 474 KB | about 276 KB |
| `driver.html` | 409 KB | 439 KB | about 240 KB |

Fonts: Atkinson Hyperlegible Next (Latin, one variable file) 34 KB, Atkinson
Hyperlegible Mono (Latin) 10 KB, Noto Sans Sinhala (Sinhala) 130 KB, Noto Sans
Sinhala (Latin, used for figures inside Sinhala text) 30 KB, Google Fonts CSS
6 KB. Both pages are under 500 KB in every case; the biggest local file is
`script.js` (127 KB, 33 KB compressed), because one script serves all four
pages and is fully documented.

## Requirement IDs shown

BO-04, C-01, D-09, Q-17, NFR-01, NFR-02, NFR-03, NFR-04, NFR-12, NFR-18,
FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-07, FR-09, FR-19, FR-20, FR-25,
FR-26, FR-27, FR-28, FR-29, FR-30, FR-34, FR-49, FR-52, FR-54, FR-55, FR-57,
FR-58, FR-61, FR-62, FR-65, FR-67, BRL-06, BRL-09, BRL-10, BRL-11, BRL-13,
BRL-15, BRL-21, US-01, US-02, US-03, US-05, US-16, US-17, US-22, US-23, US-26,
US-44, US-46, US-47, US-52, US-54, US-58, US-60.

## Known gaps and open questions

- **Sinhala is a draft (D-09).** Besides the shared strings, this direction
  adds its own Sinhala (all in `EXTRA` in `script.js`): the sentence's joining
  words and gaps, "Transport office", "Other places", the map note, "Pick up
  or drop off?", "Passengers getting on or off", "Error:", the sentence help
  lines, Saturday and Sunday, "Later stops", "Booking", "Note", and the
  driver's sentence order. All need native-speaker review.
- **"Other places" optgroup.** The shared strings have no label for "other
  saved places" (US-02 AC-1 orders them third); I added "Other places" /
  "වෙනත් ස්ථාන". The brief should add a shared key.
- **Extra stops** offer saved places only, not "Another address", to keep the
  sample small; the real form would need both (FR-54).
- **Not built**: the map (Q-17), the privacy page, filters, Change and
  Decline (they show a note), the other coordinator pages, real time.
- **Shared wording close to GOV.UK.** "There is a problem" (the error summary
  title) and the "Check your request" heading follow GOV.UK's patterns; both
  are shared strings from the brief (4.9), so all five directions use them.
  This is a principle, not a copy, but the owner may want different wording.
- **The dialog.** The approve-plan dialog uses the native `<dialog>`; Tab can
  leave it to the browser's own controls, as browsers allow for modal
  dialogs. Page content behind it is inert.
