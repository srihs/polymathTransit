# Direction 1 – Stop by Stop

| | |
|---|---|
| Document | Design rationale for design-system direction 1 |
| Owner | ux-designer |
| Date | 01/10/2026 |
| Status | Option for the owner's choice (not chosen) |
| Brief | [../brief.md](../brief.md) sections 1 to 5, 6.1 and 7 |
| Evidence | [../research.md](../research.md) |
| Pages | [index.html](index.html) (foundations), [request.html](request.html), [dashboard.html](dashboard.html), [driver.html](driver.html) |

## Decision

Every journey in PolymathTransit is drawn as a line with stops, and the same
grammar runs through every screen. On the public form the trip is a purple
**route spine** you build stop by stop; on the coordinator's dashboard each
van's day is a line along the clock with bookings as thick sections; on the
driver's phone the route is a vertical strip where travelled sections turn
black and the next stop is the largest mark on the screen. Structure is
carried by black signage bands and numbered plates, status by shapes that
always mean the same thing, and type by one road-sign typeface (Overpass,
with Noto Sans Sinhala) in five sizes and two weights. No cards, no shadows,
no decoration without a job.

## Context

- **Users.** Most users are non-technical school staff on phones (C-01). The
  form must be done unaided in 2 minutes or less (BO-04, NFR-01) on one
  scrolling page with at most 12 visible fields (NFR-02). Drivers use the
  route link at walking pace, often outdoors in sunlight. Coordinators make
  one high-stakes decision before 7:10 am: approve the day's plan (BRL-21).
- **Brand.** The crest purple `#722A82` leads; the logo's grey `#63666B` and
  black are available. The purple and neutral scales in research.md 1.4 and
  1.5 are the only tints.
- **Devices and data.** Phones from 360 px (and 320 px reflow), desktops at
  1280 to 1440 px (NFR-04); the form page must weigh 500 KB or less on slow
  mobile data (NFR-18).
- **Two languages.** English and Sinhala on the public pages (FR-65), with
  Sinhala labels up to three times wider than English (research.md 3.2). All
  Sinhala is a draft for native-speaker review (D-09).
- **Accessibility.** WCAG 2.2 AA (NFR-03); colour is never the only signal.

## Principles

1. **Draw the route, then label it.** Order and connection come first.
2. **A shape means one thing everywhere.** A crossbar is a stop, a wide bar
   ends a route, a purple arrow plate is the next stop; a ring is
   "Proposed", a diamond is "Needs attention", a filled square is
   "Completed".
3. **One typeface, five sizes, two weights.** Overpass 400 and 700 with Noto
   Sans Sinhala; Display, Heading, Subhead, Body, Small.
4. **Read it at walking pace: the next thing is always the biggest thing.**
   The driver's next stop time, the coordinator's approval time, the form's
   current question.

## Options considered (choices the brief left open)

| Choice | Options | Chosen, and why |
|---|---|---|
| Where "+ Add a stop" sits | Under "Going to" (brief 5.2 table) or on the spine between the last stop and "Going to" | **On the spine, just above "Going to".** A new stop is inserted before the destination, so the button sits where the stop will appear. This puts the order on screen before anything is sent (FR-54, BRL-18), which is the spine's whole job. It is a small deviation from the table's "under it"; the behaviour is unchanged. |
| Stop markers on the spine | Circles (the usual transit dot) or crossbars | **Crossbars.** Circles are taken by status shapes (ring = Proposed, disc = Confirmed). A crossbar is a stop, a wider bar is the end of the route, and the next stop gets its own purple arrow plate with the stop number. |
| The driver's done stops | Hidden, or shown compact | **Folded behind the progress strip, except the most recent one.** The progress control ("4 of 14 stops done") is itself a small horizontal spine and unfolds them. A black lead-in above the first visible stop shows the road already travelled. |
| Today's closed date | Native `disabled` (skipped by keyboard and screen readers) or focusable with `aria-disabled` | **Disabled without JavaScript; `aria-disabled` with it.** Brief 5.2 asks that focusing "Today" explains why it is closed. With the script, Today can be focused and shows the 7:00 am message; choosing it puts the previous date back. |
| Dialog backdrop | Translucent wash (common), opaque wash, or none | **None.** Brief 3.2 rules out transparency over content, and an opaque wash would hide the plan being approved. The dialog sits on the visible (inert) page in a 3 px black frame with an 8 px white ring. |
| Choice rows | Separate cards or ruled rows | **Ruled rows:** square-cornered bars with a 2 px black edge, 8 px apart (the brief's minimum spacing), no shadow. The radio stays a circle: it is the one circle that is not a status, because everyone already knows its shape. |
| Dashboard layout at 1280 to 1440 px | Detail panel below the timeline, or beside it | **Beside it** (timeline 8 columns, panel 4), so choosing a block updates the panel in view. The timeline runs 7:00 am to 6:30 pm at about 1 px a minute; booking tags sit above or below the line to avoid collisions. |
| Dashboard below 1024 px | Squeeze the timeline, or let it scroll | **Scroll.** Below 1100 px the regions stack, and the timeline keeps a 760 px minimum width inside a labelled, keyboard-focusable region that scrolls sideways (diagrams may scroll in two dimensions under WCAG 1.4.10). The list view is the alternative. |
| Page title on the dashboard | Display size, or one step down | **One step down (Heading).** The approval time "7:10 am" is the only Display-size text on the dashboard, and the count tiles are Heading size, so the next action is the biggest thing (principle 4). |
| Dashed "Proposed" sections | CSS dashed borders (dash length varies by browser) or a hard-stop repeating pattern | **A hard-stop pattern** (`repeating-linear-gradient` with no blending). Brief 3.2 forbids colour gradients; this draws dashes, not a blend. "Needs attention" uses short dots, so the two differ by pattern as well as tone. |
| Sinhala passenger counts | No shared string for "1 passenger" | English derives "1 passenger" from "passengers"; Sinhala shows "මගීන් 4" (word first, as in the shared strings). For D-09 review. |

## Evidence (references, by principle)

All references are from research.md section 2; principles only, nothing copied.

| Reference | Principle taken | Where it shows |
|---|---|---|
| Harry Beck's Underground diagram (1933) | Order and connection over geography; evenly spaced stops on straight lines | The spine on the form, the run summary and the driver's route ignore distance and show order |
| NYCTA Graphics Standards Manual (Vignelli and Noorda, 1970) | A sign system is a set of rules: a fixed module, one typeface, few sizes; identity carried by more than colour | 8 px module, five sizes, two weights; numbered black plates; every status has a shape |
| Kinneir and Calvert, British road signs | Shape coding; mixed case; "what do I want to know … at speed?" | Status shapes; Overpass (a Highway Gothic interpretation) in mixed case; the next stop as the biggest thing |
| SL Stockholm (Red Dot 2018) | Several ways to navigate at once | Each booking is found by time (axis), van (row), reference (tag) and status (shape and word) |
| MTA Live Subway Map (2021) | A diagram can carry live state without losing clarity | The timeline's "now" line, the driver's black travelled sections and progress strip |
| Legible London | Progressive disclosure | Done stops fold away; "Anything special?" and "Must arrive by" stay closed until needed |
| V&A Wayfinding (D&AD 2020) | Restricted, purposeful colour | Purple only for the route and primary actions; every other colour is a status with a job |
| E. J. Marey's train schedule | Time on one axis, vehicles on the other, so waits and clashes show as shapes | The dashboard timeline, the wait frame around the gap job |
| GOV.UK error message guidance | Error next to the field and in a linked summary; keep what was typed | The error summary and inline messages (our own colours, focus and type) |

## Reasoning

- **It does the one hard thing visibly.** A multi-stop request can go wrong
  only in its order. The spine shows that order while the person is still
  filling in the form, and the same picture comes back to them on the
  confirmation, to the coordinator in the run summary and to the driver on
  the road. One mental model, learned once.
- **It survives sunlight, greyscale and colour blindness.** Black on white,
  shapes and words for every status, solid versus dashed versus dotted on the
  timeline. The greyscale screenshots show nothing is lost.
- **It suits two scripts.** Overpass and Noto Sans Sinhala are both open and
  unmodulated; every label wraps, nothing has a fixed height, and two-column
  choices drop to one column when a column would be narrower than 140 px.
- **It is distinctive without decoration.** The black bands, numbered plates
  and route lines come from wayfinding, not from software templates; there
  are no cards, gradients, shadows, illustrations or rounded "soft UI".

## Trade-offs (what this direction is worse at)

- **Visual weight.** Black bands and 20 px bold labels are heavy. The form
  reads as official and firm rather than warm; some staff may find it stern.
- **Transit metaphor.** People who do not read diagrams may not see the spine
  as a route at first. The words still carry everything, so nothing depends
  on understanding the line.
- **Timeline density.** At about 1 px a minute, short trips are small and
  labels are four-digit reference endings ("0142"); the legend and the list
  view carry the full detail.
- **Weight budget.** One shared `script.js` and `components.css` serve all
  four pages, so the form carries dashboard code it does not use (see
  "Checks").
- **Bold labels at 20 px** make the form longer to scroll than a lighter
  style would.

## Validation plan (the BO-04 test with five staff)

1. **Unaided form in 2 minutes (BO-04, NFR-01).** Five staff, own phones, the
   PT-2026-0142 scenario. Measure time to "Request received"; success is all
   five under 2 minutes with no help.
2. **Multi-stop order.** Task: Branch B to the stationery supplier and back,
   with a wait. Do people use "+ Add a stop" and read the spine correctly?
   Ask them to say the order back from the confirmation.
3. **Cutoff and closed dates.** Ask for a trip today at 2:40 pm. Do they
   understand "Closed" and find the transport office number?
4. **Errors.** Submit with a wrong phone number; time to fix from the
   summary link.
5. **Sinhala.** Two of the five in Sinhala; note any label they misread and
   pass to the D-09 review.
6. **Driver (two drivers, outdoors).** Find the next stop, mark Done, undo,
   mark a No-show. Count accidental taps between Done and No-show.
7. **Coordinator.** "Is today's plan ready, and what needs you?" Time to the
   first correct answer, and whether the shapes are read without the legend.

## Requirement IDs shown

BO-04, C-01, NFR-01, NFR-02, NFR-03, NFR-04, NFR-12, NFR-18, FR-01, FR-02,
FR-03, FR-04, FR-05, FR-06, FR-07, FR-09, FR-19, FR-20, FR-25, FR-26, FR-27,
FR-28, FR-29, FR-30, FR-34, FR-49, FR-52, FR-54, FR-55, FR-57, FR-58, FR-61,
FR-62, FR-65, FR-67, BRL-06, BRL-09, BRL-10, BRL-11, BRL-13, BRL-15, BRL-18,
BRL-21, US-01, US-02, US-03, US-05, US-16, US-17, US-22, US-23, US-26,
US-46, US-47, US-52, US-54, US-58, US-60, D-09, Q-17.

## Colour pairs

Every pair used, with its contrast (WCAG 2.2), calculated with the WCAG
relative-luminance formula:

| Pair | Ratio | Use |
|---|---|---|
| White on black | 21.00 | Bands, plates, next-stop plate, undo bar |
| Black on white | 21.00 | Text, edges |
| Brand `#722A82` on white / white on brand | 8.86 | Links, route line, primary buttons |
| White on `#581D65` / on `#3F1448` | 11.81 / 14.95 | Hover / pressed primary |
| Brand on tint `#F7E6FB` / black on tint / ink-2 on tint | 7.46 / 17.67 / 4.85 | Selected options |
| Ink-2 `#63666B` on white / on panel `#F2F2F3` | 5.76 / 5.15 | Hints, metadata |
| Black on panel / brand on panel | 18.77 / 7.92 | Language bar, tiles, hover |
| Black on `#DCDEE1` | 15.58 | Pressed secondary |
| `#8F9298` on white | 3.12 | Dots, van hours, table rules (UI only; 2.79 on panel, so never used there) |
| Ok `#006E30` on white / on `#E7F7E9`; black on ok tint | 6.42 / 5.77 / 18.88 | Confirmed disc, success alert |
| Black on attention `#F3B01D` | 11.04 | Needs-attention diamond (black edge), warning alert icon block |
| Danger `#B7191C` on white / on `#FFEDEB` / white on danger; black on danger tint | 6.63 / 5.86 / 6.63 / 18.57 | Errors, Declined, No-show |
| Info `#015F98` on white / on `#E8F4FE`; black on info tint | 6.79 / 6.08 / 18.80 | Proposed ring, information alerts |
| Brand on info, danger and ok tints | 7.94 / 7.84 / 7.97 | Links inside alerts |
| Focus ring: brand against white / white against black | 8.86 / 21.00 | All focus states |

## Checks (01/10/2026)

- **Weight (NFR-18), measured** as the sum of file sizes the page loads,
  with the fonts that the Google Fonts CSS serves to Edge (Overpass Latin
  variable 39,380 bytes for both weights; Noto Sans Sinhala Sinhala subset
  129,932 bytes for both weights; the CSS 6,424 bytes):
  `request.html` 412,302 bytes (403 KB); `driver.html` 404,618 bytes
  (395 KB). Both under 500 KB; above the 300 KB aim. With gzip on the server
  the text files shrink from 221 KB to 49 KB, so about 235 KB travels. If a
  browser also fetched Noto's Latin subset (30,344 bytes), the worst case is
  432 KB.
- **Behaviour:** 55 scripted checks in headless Edge (validation messages,
  focus moves, closed date, stops, stepper, confirmation in both languages,
  Done, Undo, No-show, Escape, approve, approve plan, list view): all pass.
- **Layout:** no horizontal overflow and no target under 44 px at 320 and
  360 px, in English and Sinhala, including the error and confirmation
  states.
- **HTML:** no unclosed tags, no duplicate ids, every `aria-*` and `for`
  reference resolves, one `h1` per page, no heading jumps.
- **Screenshots:** [screenshots/](screenshots/) at 320, 360 and 1440 px,
  Sinhala, errors, confirmation, greyscale and without JavaScript.

## Known gaps

- **Sinhala is a draft** (D-09), including the word order of "මගීන් 4" and
  the use of place names as entered.
- **Map and Navigate are notes only** (Q-17): "Choose on map" and "Navigate"
  show a prototype note.
- **Change and Decline** on the dashboard show a prototype note; filters are
  visible but do not filter (brief 5.3 allows this).
- **Only the PT-2026-0142 panel works without JavaScript.**
- **Inline event callbacks in `script.js` have no JSDoc of their own;** all
  72 named functions do. If the code-reviewer reads "every function" to
  include anonymous callbacks, they need naming and documenting.
- **The "+ Add a stop" placement** differs from the brief's table (see
  "Options considered").
- **Weight:** 403 KB is under the limit but over the 300 KB aim; splitting
  the script and styles per page would bring the form near 300 KB, but the
  brief asks for one `script.js`.
- **Not tested** with a real screen reader or on physical phones; Firefox
  and Safari were not run (Edge only). `:has()` is used for row focus with
  a fallback ring on the radio itself.
