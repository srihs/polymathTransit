# Direction 4 – Departures

| | |
|---|---|
| Document | Design rationale for design-system option 4 |
| Owner | ux-designer |
| Date | 01/10/2026 |
| Status | Option for the owner's choice (not chosen) |
| Brief | [../brief.md](../brief.md) sections 1 to 5 and 6.4 |
| Pages | [index.html](index.html) (foundations), [request.html](request.html), [dashboard.html](dashboard.html), [driver.html](driver.html) |

## Decision

Treat time as the backbone of PolymathTransit and show every trip as one
line of a departure board: the time first in a mono face, then the places,
the van, the passengers, and the status as a short remark in its own framed
slot. The same row runs through every screen. On the request form the date
choice is a departures list whose remarks carry the cutoff ("Closes 5:00 pm
today", "Closed", "Open"). On the driver's phone a single dark board strip
shows the next stop with its time large and "in 20 min". On the coordinator's
desktop the whole dashboard is a dark board: tiles as its header strip, a
Marey-style day chart with a "now" line at 7:05 am, and a detail drawer. Phone
pages stay light for sunlight.

## Context

- **Users (C-01).** Most users are non-technical school staff on phones. The
  public form must be done in two minutes unaided (BO-04, NFR-01), on one page
  with at most 12 visible fields (NFR-02).
- **Two languages (FR-65, D-09).** The form, messages and driver link are in
  English and Sinhala. Sinhala labels can be up to three times wider.
- **Phones and data (NFR-04, NFR-18).** From 320 px wide, outdoors, on slow
  data, with a form page of 500 KB or less.
- **Brand.** The crest purple `#722A82` leads; the wordmark grey `#63666B` and
  the tagline black are available. No visual style had been chosen.
- **The coordinator's moment (US-22, BRL-21).** At 7:05 am the plan for the day
  must be checked and approved by 7:10 am. That is a glance-and-decide task
  against the clock, which is where a board earns its place.

## Options considered

How the choices that the brief left open were resolved:

| Question | Options | Chosen | Why |
|---|---|---|---|
| Dark surface on phones | Dark phone pages; light pages with one board strip | Light pages, one strip | Sunlight (brief 3.4); the strip carries only the line that matters (the next stop, or the reference). |
| Day chart encoding | Diagonal Marey lines (place on the vertical axis); van rows with bars | Van rows, bars at true length, stop ticks inside each bar | Coordinators ask "which van, when", not "where is it between stops". The ticks keep Marey's stations; bars never stretch to fit a label. |
| Short runs too narrow for text | Stretch the bar; label beside the bar; label under the bar | Label under the bar, flag icons inside the bar, a second label row for crowded runs (PT-2026-0147) | Time stays honest at 1280 px. |
| Shared run (PT-2026-0140 and 0142) | One bar with one status; two bars | One bar for the run, one status glyph per booking in its label | Approving 0142 alone visibly flips only its glyph, while the run stays one run (brief 5.3). |
| Closed date (today) | `disabled`; focusable with `aria-disabled` | `disabled` without JS; `aria-disabled` with JS | Brief 5.2 asks that focusing it explains the cutoff. |
| Remarks for the date list | Reuse the cutoff sentences; short remarks | Short remarks, cutoff sentence under the legend as well | The brief asks for both (6.4 and 5.2). Three short remark strings were added (see Known gaps). |
| Sinhala size factor | Scale everything by 1.2; `size-adjust` on a self-hosted font | 1.2 under `:lang(si)` as the brief says, with Latin runs inside Sinhala strings set back to English size | Measured: B612's x-height is 0.56 em, Gemunu Libre's Sinhala letter body 0.50 em, so 1.2 is right for Sinhala letters, but it made "SMS", "WhatsApp" and phone numbers inside Sinhala strings tower over them. |
| B612 Mono's wide colon ("10: 30") | Accept; switch times to proportional B612 | Keep mono, narrow the colon (static spans for board times, a small script for the rest) | Mono columns are the concept; the gap read as a typo to non-technical users. |
| Dialog backdrop | Dimmed page; solid board | Solid board | Brief 3.2 forbids transparency over content. |

## Evidence (principles taken, nothing copied)

- **Solari di Udine, Cifra 5 with Gino Valle (Compasso d'Oro 1956):** one line
  per departure, fixed columns, status as a short word in a remarks slot. Taken
  as the board row and the remark slot. Not taken: split-flap tiles, flap sound,
  yellow-on-black palette. The "flip" is a single 150 ms turn of one word.
- **Flighty (Apple Design Award 2023):** borrow a proven convention, keep key
  facts always visible, be "boringly obvious". Taken as: the same columns on
  every screen, and the reference and time always visible.
- **E. J. Marey's Paris–Lyon schedule (1878):** time on one axis and vehicles
  on the other, so gaps, waits and clashes show as shapes. Taken as the day
  chart, with stop ticks inside each run and the gap job drawn inside Van 1's
  free time.
- **SBB Mobile (Best of Swiss Apps 2022):** reuse the board's own format for
  messages. Taken as alerts built as board cells: a fixed icon column ruled off
  from the text, framed in the signal colour.
- **B612 (Airbus, ENAC, Université de Toulouse III):** type for time-critical
  reading, tested in degraded conditions, with distinct capitals and figures.
  Used as the typeface (open licence), with B612 Mono for times, references
  and counts.
- **Kinneir and Calvert:** shape coding. Every status has its own shape
  (dotted ring, ring, triangle, disc, cross, bar, square, open square), drawn
  as SVG, as well as a word and a colour.

## Reasoning

- **Time leads every line** because the questions people ask are all about
  time: "Can I still book for tomorrow?", "What do I approve before 7:10?",
  "Where do I go next, and when?".
- **One row format** means one thing to learn. Staff see their date as a
  board row, coordinators approve board rows, drivers work through board rows.
- **Status as a remark** puts the status in the same place every time, framed
  and with a shape, so it passes a greyscale check and colour-blind use
  (amber against green is only ΔE 6.8 for protanopia, so the dashed edge and
  the triangle carry Needs attention as well).
- **The dark board only where it earns its place.** The dashboard is used
  indoors at a desk at 7:05 am, often alongside a phone call; a dark board
  keeps the colour signals vivid and the eye on the data. Phones stay light.
- **Brand.** The board is a purple-tinted near-black (`#140C17`), not airport
  black; the brand purple is the primary action on light pages, the fill of
  the selected trip on the board, and the rule under every board strip. The
  crest appears in its keyline form on the board.

## Trade-offs (what this direction is worse at)

- **Mono type is wide.** Phone numbers and references take more room; long
  place names wrap sooner in board columns.
- **Dark dashboard.** Some coordinators may prefer a light screen in a bright
  office; a light dashboard theme would be needed (the tokens already support
  it: remove `class="board"`).
- **Day chart at 1280 px.** Fifteen-minute runs are about 18 px wide. Labels
  sit under the bars and one label needs a second row; a busier day (more
  vans, more runs) will need horizontal zoom or a narrower drawer.
- **Weight.** The phone pages load 341 to 377 KB (see below): inside 500 KB
  but above the 300 KB aim, mostly because the one shared script carries the
  strings for every page and the dashboard data.
- **Sinhala in mono slots.** Sinhala has no mono face; remarks and summary
  times switch to the text face in Sinhala and keep only their digits in mono.
- **Draft Sinhala** throughout (D-09).

## Validation plan (the five-person BO-04 test)

1. **Time to request** (NFR-01): each participant books the sample trip
   (Sport, tomorrow, Branch B to Sports Centre, 8:45 am, 4 people, back
   10:45 am) on a 360 px phone. Target: 2 minutes or less, unaided.
2. **Cutoff understanding** (FR-07): "Can you still book for tomorrow, and
   until when?" Success: they read it from the date row's remark without
   prompting.
3. **Closed date**: "Book for today." Success: they understand why they cannot
   and find the phone number in the message.
4. **Errors**: submit empty, then fix. Success: every error fixed from the
   summary links without help.
5. **Sinhala**: two participants use Sinhala. Ask which words they did not
   understand (D-09), and whether the size of Sinhala and English text looks
   even.
6. **Driver** (US-60): mark the next stop done, undo it, then mark a no-show.
   Success: no accidental No-show; Undo found within 10 seconds.
7. **Coordinator** (US-22, US-26): "Is anything not in the plan? Which van does
   the gap job?" Success: answered from the day chart in under 30 seconds;
   then approve the plan.

## Principles

1. Time leads every line.
2. One line per trip; the same columns everywhere.
3. Status is a remark: one or two words in its own slot, with a shape.
4. Glance first, read second.

## Requirement IDs shown

BO-04, C-01, NFR-01, NFR-02, NFR-03, NFR-04, NFR-12, NFR-18, FR-01, FR-02,
FR-03, FR-04, FR-05, FR-06, FR-07, FR-09, FR-19, FR-20, FR-25, FR-26, FR-27,
FR-28, FR-29, FR-30, FR-34, FR-49, FR-52, FR-54, FR-55, FR-57, FR-58, FR-61,
FR-62, FR-65, FR-67, BRL-06, BRL-09, BRL-10, BRL-11, BRL-13, BRL-15, BRL-21,
US-01, US-02, US-03, US-05, US-16, US-17, US-22, US-23, US-26, US-44, US-46,
US-47, US-52, US-54, US-58, US-60, D-09, Q-17.

## System summary

- **Type.** B612 400/700 (text), B612 Mono 400/700 (times, references,
  counts, remarks), Gemunu Libre 400/700 (Sinhala, factor 1.2). Scale: board
  time 40/32, title 26/28, row 18/16, body 17/15, remark 14/13, small 14/13 px
  (phone/desktop).
- **Colour.** The verified tables in brief 6.4, plus these pairs, calculated
  with the WCAG formula: ink-2 `#63666B` on `#F5F7F9` 5.37:1 and on `#EEF0F3`
  5.05:1; focus `#140C17` on `#F7E6FB` 16.14:1; danger `#B01E25` on `#F7E6FB`
  5.78:1; board text `#140C17` on purple-400 `#C586D4` (pressed) 7.07:1; board
  ok, attention and info on the purple selection 5.00, 5.33 and 4.48:1; purple
  `#722A82` on the board panel only 1.99:1, so the selection always has a white
  edge (17.65:1); board edge on a lighter hover panel would be 2.86:1, so hover
  brightens edges instead of panels.
- **Space.** 8 px base: 4, 8, 12, 16, 24, 32, 48. Board rows 40 px desktop,
  56 px phone. Corners 2 px. No shadows.
- **Icons.** 32 inline SVG icons drawn for this direction (24 px grid, 2 px
  stroke, square ends, mitred joins) and 8 status glyphs.
- **Motion.** The remark flip (150 ms, ease-out) and disclosure chevrons
  (150 ms). Nothing under `prefers-reduced-motion: reduce`.

## Measured

- Weight with a cold cache, all fonts loaded (local files counted
  uncompressed, fonts as transferred): request.html 340.7 KB (English) and
  376.8 KB (Sinhala); driver.html 340.3 KB and 357.1 KB.
- W3C Nu HTML checker: 0 errors on all four pages.

## Known gaps

- **Strings added beyond brief 4.9** (needed for the date remarks in brief
  6.4; Sinhala drafted from the shared cutoff strings, for D-09 review):
  `remark.open` "Open" / "විවෘතයි", `remark.closes.today` "Closes 5:00 pm
  today" / "අද ප.ව. 5:00ට අවසන් වේ", `remark.closes.monday` "Closes 7:00 am on
  Monday" / "සඳුදා පෙ.ව. 7:00ට අවසන් වේ". If the owner keeps this direction,
  they belong in the shared string table.
- **English-only prototype text on phone pages:** "Skip to main content", the
  map-button note ("Prototype: the map is not built yet…") and the footer.
  Production needs Sinhala for the skip link.
- **Other saved places** (Stationery supplier) appear in the place pickers
  after the venues without a group heading, because no shared string names
  that group.
- **Map, Change and Decline** are not built (Q-17; brief scope). Filters are
  visible but do not filter.
- **Explanations** exist word for word for PT-2026-0142, 0145, 0147 and 0149
  only (brief 4.7); other trips show their facts and run.
- The confirmation's "Your trip" is a key-value board rather than the single
  line in brief 5.2, so the time leads each row; the content is the same.
