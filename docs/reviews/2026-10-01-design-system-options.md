# Review: the five design-system directions

| | |
|---|---|
| Date | 01/10/2026 |
| Reviewer | code-reviewer |
| Branch | `design/design-system-options` |
| Scope | `git diff PROD...HEAD -- docs/design/system-options/`: `research.md`, `brief.md`, `assets/`, the gallery `index.html`, and the folders `1-stop-by-stop/` to `5-ticket/` (four pages, CSS, `script.js` and `README.md` each). The untracked `screenshots/` folders were viewed as reference only. |
| Measured against | `brief.md` sections 2 to 6; `CLAUDE.md` "Code documentation"; NFR-01, NFR-02, NFR-03 (WCAG 2.2 AA), NFR-04, NFR-12, NFR-18, FR-07, FR-65, BRL-13, US-01, US-05, US-22, US-26, US-60 |
| Method | All 20 pages were run from `file://` in headless Microsoft Edge 154, using the same scripted scenarios for every direction (details under "What was checked"). Code was read where a result needed explaining. |

## Summary

No direction has a high-severity finding, and none throws a console error. The
shared content is identical across all five: all 128 shared strings match
brief 4.9 in both languages, as do the four explanations, the dialog text, the
success messages and the confirmation summaries. Each direction can serve as
the base once its medium findings are fixed. This review does not rank them;
the choice is the owner's.

| Direction | High | Medium | Low | Cross-cutting findings that also apply | Fit to be chosen as the base as it stands? |
|---|---|---|---|---|---|
| 1 Stop by Stop | 0 | 0 | 0 | C1 (medium), C2, C3, C4, C5, C6 | Yes, once C1 is fixed |
| 2 Inscription | 0 | 1 | 1 | C1 (medium), C2, C3, C4, C5, C6 | Yes, once 2.1 (weight) and C1 are fixed |
| 3 Plain Words | 0 | 1 | 1 | C1 (medium), C2, C3, C4, C6 | Yes, once 3.1 (touch targets) and C1 are fixed |
| 4 Departures | 0 | 2 | 2 | C1 (medium), C2, C3, C4, C6 | Yes, once 4.1, 4.2 and C1 are fixed |
| 5 Ticket | 0 | 1 | 4 | C2, C3, C4, C6 | Yes, once the owner settles 5.1 |

Cross-cutting: C1 is medium; C2 to C7 are low.

---

## Direction 1 – Stop by Stop

No direction-specific findings. Direction 1 passed every scripted check:
validation, error summary and focus, confirmation in both languages, closed
date on focus, stops, stepper, Approve with Undo, the plan dialog, list view,
Done, Undo, No-show and offline. Its open items are cross-cutting: C1, C3,
C4 (two undocumented function-valued properties) and C5 (no footer landmark on
`dashboard.html`).

---

## Direction 2 – Inscription

### 2.1 The Sinhala request form is at the 500 KB limit

- **Severity:** medium
- **Location:** `2-inscription/request.html:31-35` (font links); `2-inscription/README.md:103-112`
- **What is wrong:** In Sinhala, `request.html` loads 502,491 bytes and
  `driver.html` 491,627 bytes. That is 490.7 KiB and 480.1 KiB, which is how the
  README reports it. In decimal kilobytes the form is over 500 KB, and with
  either unit there is no headroom.
- **Failure scenario:** A requester on slow mobile data switches to සිංහල. The
  page loads Abhaya Libre (89 KB plus a 22 KB Latin file pulled in by the
  zero-width joiner) and Noto Serif Sinhala (87 KB, served as `.woff` to this
  Edge build, plus 30 KB). Any production growth breaks NFR-18: a CSRF field,
  real place lists, or a browser that is served `.woff` instead of `.woff2`.
- **Requirement or rule:** NFR-18; brief section 2 ("500 KB or less … Aim for
  300 KB").
- **Confidence:** verified (measured; file breakdown below).
- **Suggested direction:** Take the README's own option: on the phone pages,
  use Noto Serif Sinhala 600 for Sinhala headings and drop Abhaya Libre. That
  saves about 109 KB. Separately, ask the requirements-analyst to state the
  unit NFR-18 means (1,000 or 1,024 bytes), so every page is measured the
  same way.
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). Direction 5, Ticket, is the base; direction 2 is kept as a
  record and will not be developed further, so its font weight will not be
  reduced. The question this finding raises, which unit NFR-18's 500 KB means
  (1,000 or 1,024 bytes), still goes to the requirements-analyst, because it
  decides how Ticket's pages are measured too. (2026-10-01)

### 2.2 Two swatch labels on the foundations page fail text contrast

- **Severity:** low
- **Location:** `2-inscription/index.html:196`, `2-inscription/index.html:209`
- **What is wrong:** Two swatch labels fail the 4.5:1 text minimum. The
  purple-500 swatch is labelled in `#1C181B` on `#AA61BB` (4.30:1), and the
  grey-450 swatch in white on `#7D8086` (3.96:1). Both are small text.
- **Failure scenario:** A reader with low vision cannot read the hex value on
  the very page that documents contrast.
- **Requirement or rule:** NFR-03 (WCAG 1.4.3); brief 3.2.
- **Confidence:** verified (computed from rendered styles).
- **Suggested direction:** Put the label below the chip, on the page ground, as
  the other swatches do.
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). Direction 2's foundations page is kept as a record and will not
  be developed further. (2026-10-01)

Also applies: C1, C3, C4 (one undocumented function-valued property), C5
(no footer landmark on `request.html`, `dashboard.html` or `driver.html`).

---

## Direction 3 – Plain Words

### 3.1 Radio and checkbox targets are 32 px tall on the phone form

- **Severity:** medium
- **Location:** `3-plain-words/components.css:687-689` (`.choice__input`, 32 px),
  `3-plain-words/components.css:737-740` (`.check`, 32 px); used across
  `request.html`
- **What is wrong:** The radio and its label sit side by side. The label does
  not wrap the radio and is 31 px tall, so the whole tappable area is 32 px
  high. This applies to trip purpose, date, flexibility, return Yes/No, and the
  WhatsApp, wheelchair and equipment checkboxes. The header phone link
  (`tel:+94110000100`) is 21 px tall.
- **Failure scenario:** A member of staff standing outdoors taps just below
  "Sport" and nothing is selected, or the next option is. The rows are 24 px
  apart, so this passes WCAG 2.5.8 (AA, 24 px), but it misses the project's
  44 px rule for phone pages. The other four directions meet that rule.
- **Requirement or rule:** brief 3.3 ("Touch targets 44 × 44 px or more on
  phone pages"); NFR-03; NFR-04.
- **Confidence:** verified (measured: 32 × 32 radio, 280 × 31 label, 328 × 32
  union).
- **Suggested direction:** Make the whole row the label, with padding that
  gives at least 44 px of height. Keep the 32 px circle as the drawing.
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). Direction 3 is kept as a record and will not be developed
  further. (2026-10-01)

### 3.2 The return leg of PT-2026-0142 is announced as "shared"

- **Severity:** low
- **Location:** `3-plain-words/script.js:1818` (booking flags),
  `3-plain-words/script.js:2255-2260` (block name built from the booking's flags)
- **What is wrong:** Every timeline block takes all of its booking's flags.
  The 10:45 am return block is therefore named "…return, Sports Centre to
  Branch B, Proposed, shared". Only the 8:25 am run is shared.
- **Failure scenario:** A coordinator using a screen reader is told the return
  trip is pooled with another booking, and they plan around a constraint that
  does not exist.
- **Requirement or rule:** FR-29, US-26 AC-1 (the timeline must show bookings
  correctly); brief 3.3 (accessible names give status).
- **Confidence:** verified (accessible names read from the DOM).
- **Suggested direction:** Hold flags per leg, or leave "shared" off blocks
  that are not part of a shared run.
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). Direction 3 is kept as a record and will not be developed
  further. (2026-10-01)

Also applies: C1, C3 (the skip link stays English in Sinhala), C6.
Direction 3 already gives its inline callbacks their own JSDoc, so C4 hardly
touches it.

---

## Direction 4 – Departures

### 4.1 The shared-run block still says "Proposed" after PT-2026-0142 is approved

- **Severity:** medium
- **Location:** `4-departures/script.js:1652-1656`
- **What is wrong:** The 8:25 am run is one button for PT-2026-0140 and
  PT-2026-0142. The run's status rolls up to "Proposed" unless every booking in
  it is confirmed, and that rolled-up word is the only status in the button's
  accessible name. The visible label shows a separate glyph for each booking.
- **Failure scenario:** The coordinator approves PT-2026-0142. Its glyph turns
  to a filled disc. A screen-reader user tabbing the timeline still hears
  "8:25 am to 9:10 am, one shared run: PT-2026-0140 … and PT-2026-0142 …,
  Proposed". The sighted user and the screen-reader user now see different
  states.
- **Requirement or rule:** NFR-03 (WCAG 1.3.1, 4.1.2); brief 3.3 ("every
  block is a button whose accessible name gives … status"); brief 5.3
  ("Approve … changes its status … in the timeline block").
- **Confidence:** verified (name read before and after Approve).
- **Suggested direction:** Put each booking's own status in the name, for
  example "PT-2026-0140 Proposed, PT-2026-0142 Confirmed".
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). Direction 4 is kept as a record and will not be developed
  further. (2026-10-01)

### 4.2 Board times still read "7: 10 am" and "10: 00 am"

- **Severity:** medium
- **Location:** `4-departures/components.css:544-546` (`.colon { margin-inline: -0.04em -0.16em; }`); `4-departures/README.md:53`
- **What is wrong:** B612 Mono gives the colon a full character cell. The fix,
  which pulls the cell in by 0.2 em, still leaves a clear gap after the colon.
  This shows on the dashboard's "Approve by 7:10 am", in the drawer, and on the
  driver's next-stop time, which is the largest text on that screen. The
  README says the gap "read as a typo to non-technical users" and that the
  colon was narrowed. That claim overstates the result.
- **Failure scenario:** A driver at walking pace reads "10: 00 am" at 40 px.
  NFR-12's "10:30 am" format is correct in the text, but it does not look
  right on screen.
- **Requirement or rule:** NFR-12 (time format as people read it); brief 6.4
  ("Board time"); "Code documentation" (no misleading documentation).
- **Confidence:** verified (rendered at 1440 px and 360 px and inspected).
- **Suggested direction:** Tighten the colon cell further (about 0.3 em on each
  side) or set the colon in B612 rather than B612 Mono. Then correct the
  README.
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). Direction 4 is kept as a record and will not be developed
  further, so neither the colon nor its README will be corrected.
  (2026-10-01)

### 4.3 Passenger counts on the driver page are an icon and a number only

- **Severity:** low
- **Location:** `4-departures/driver.html:85`, `:124` and every stop
  (`<span class="vh">passengers</span>`)
- **What is wrong:** The word for passengers is visually hidden, so a sighted
  driver sees "Pick up [icon] 1". A screen reader hears "1 passengers".
- **Failure scenario:** A new driver does not know what the bare "11" next to a
  people icon means. A screen-reader user hears ungrammatical text.
- **Requirement or rule:** brief 5.4 ("Pick up 1 passenger"); research.md 4
  ("icons always sit next to words").
- **Confidence:** verified.
- **Suggested direction:** Show the word, with a singular form (see C3).
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). Direction 4 is kept as a record and will not be developed
  further. The singular passenger string itself is covered for Ticket by C3.
  (2026-10-01)

### 4.4 The No-show button's edge is 2.62:1 on the next-stop card

- **Severity:** low
- **Location:** `4-departures/pages.css:257` (`.btn--noshow` uses `--c-edge-quiet` `#8F9298`), on the purple-100 next-stop card (`pages.css:200`)
- **What is wrong:** The No-show button's edge is `#8F9298` on `#F7E6FB`,
  which is 2.62:1. That is below 3:1 for a UI part, and the pair is not in the
  colour table. Making No-show quieter than Done was intended (brief 5.4),
  but the edge is what shows where the button is.
- **Failure scenario:** In sunlight, the boundary of the No-show button on the
  next stop is hard to see.
- **Requirement or rule:** NFR-03 (WCAG 1.4.11); brief 3.2 ("If you add a
  pair, calculate and report its ratio").
- **Confidence:** verified (computed).
- **Suggested direction:** Use `--c-edge` (grey-450 or darker) on the purple
  card, and report the pair.
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). Direction 4 is kept as a record and will not be developed
  further. (2026-10-01)

Also applies: C1, C3 (skip link and map note stay English in Sinhala), C4
(14 undocumented `check`/`when` functions in the validation table), C6.

---

## Direction 5 – Ticket

### 5.1 The requester's confirmation uses the same mark as "Confirmed"

- **Severity:** medium
- **Location:** `5-ticket/script.js:1356-1360` (`stamp--confirmed` with a tick for "Request received", inside the purple strip); `5-ticket/dashboard.html:274` (legend: "Purple strip and tick: confirmed (the ticket is issued)"); `5-ticket/README.md:20-21`
- **What is wrong:** The direction defines the purple strip with a tick as
  "Confirmed". The confirmation shown to a requester right after sending
  draws exactly that: the purple strip and a green tick stamp in the Confirmed
  colour. At that point the request is only Submitted.
- **Failure scenario:** A teacher sends a request at 2:40 pm, sees a purple
  ticket with a green tick, and tells the class the trip is booked. A
  coordinator later declines it (as with PT-2026-0136). `done.next` says a text
  will follow, but the strongest signal on the screen says the opposite.
- **Requirement or rule:** US-01 AC-5 and FR-04 (received, not confirmed);
  specification 6.2 status model (Submitted ≠ Confirmed); brief 6.5 (issue the
  ticket "with … the status stamp", meaning the status the request actually
  has).
- **Confidence:** verified (rendered; code and legend read).
- **Suggested direction:** Choose one meaning for the strip. Either the strip
  means "issued" for every request, with the stamp carrying the status, or it
  means "Confirmed" and the submitted ticket shows an unfilled strip. Either
  way, give the received stamp a neutral treatment: no Confirmed colour and no
  tick. The brief's wording ("on submit the ticket is issued") contributes;
  the ux-designer should settle it in the brief.
- **Owner's decision:** Accept. Direction 5, Ticket, is the base, and a
  requester must not be shown the Confirmed mark for a request that is only
  Submitted. To be fixed in the Ticket design. (2026-10-01)

### 5.2 The driver page jumps from h1 to h3

- **Severity:** low
- **Location:** `5-ticket/driver.html:137` and every stop (`<h3 class="stub__place">`); "Next stop" is a `<p>` (`driver.html:132`)
- **What is wrong:** Each stop is an `h3` with no `h2` above it.
- **Failure scenario:** A screen-reader user lists the headings and finds 14
  third-level headings under the page title, with no "Next stop" or "Later
  stops" groups.
- **Requirement or rule:** brief 3.3 ("Headings in order"); NFR-03 (WCAG
  1.3.1).
- **Confidence:** verified.
- **Suggested direction:** Make "Next stop" and "Later stops" `h2` headings, as
  direction 3 does.
- **Owner's decision:** Accept. Ticket is the base, and its driver page needs
  headings in order. To be fixed in the Ticket design. (2026-10-01)

### 5.3 The list toggle changes its label and its pressed state together

- **Severity:** low
- **Location:** `5-ticket/script.js:1751-1752`
- **What is wrong:** When the list is shown, the button reads "Show as
  timeline" and also carries `aria-pressed="true"`.
- **Failure scenario:** A screen reader announces "Show as timeline, toggle
  button, pressed", which suggests the timeline is already showing.
- **Requirement or rule:** NFR-03 (WCAG 4.1.2); brief 5.3 ("Show as list"
  toggles).
- **Confidence:** verified.
- **Suggested direction:** Keep the label "Show as list" with `aria-pressed`,
  as directions 1 to 4 do, or change the label and drop `aria-pressed`.
- **Owner's decision:** Accept. Ticket is the base, and the toggle must not
  announce a contradictory state. To be fixed in the Ticket design.
  (2026-10-01)

### 5.4 Driver: Escape does not dismiss the no-show question, and Undo leaves stale status text

- **Severity:** low
- **Location:** `5-ticket/script.js`, section 8 (driver's route)
- **What is wrong:** With focus in the inline "Mark as no-show?" question,
  Escape does nothing. In directions 1 to 4 it closes the question and returns
  focus to No-show. After Done and then Undo, the hidden status region still
  holds "Done at 9:41 am".
- **Failure scenario:** A keyboard user who opened the question by mistake has
  to find "Go back". A screen-reader user reading the page after Undo meets
  "Done at 9:41 am" under "4 of 14 stops done".
- **Requirement or rule:** brief 5.3 and 7 ("Escape closes dialogs"); brief
  3.3 (status messages).
- **Confidence:** verified.
- **Suggested direction:** Handle Escape as "Go back". Clear or replace the
  status text when Undo runs.
- **Owner's decision:** Accept. Ticket is the base, and its driver page must
  close the no-show question on Escape and clear stale status text on Undo.
  To be fixed in the Ticket design. (2026-10-01)

### 5.5 The busy spinner turns for 1.4 seconds

- **Severity:** low
- **Location:** `5-ticket/components.css:576` (`animation: busy-turn 700ms linear 2`)
- **What is wrong:** The busy mark rotates twice at 700 ms per turn. The motion
  rule allows 200 ms or less, and no spinner longer than needed.
- **Failure scenario:** The spinner becomes the system's busy component, and
  real waits on slow data show a rotating mark that stops after 1.4 seconds,
  whether or not the wait has ended.
- **Requirement or rule:** brief 3.7.
- **Confidence:** verified (reduced motion turns it off correctly).
- **Suggested direction:** Use a static busy mark with the word "Sending…".
- **Owner's decision:** Accept. Ticket is the base, and its busy spinner would
  become the system's busy component. To be fixed in the Ticket design.
  (2026-10-01)

Also applies: C3 ("transport office" in the footer and the skip link stay
English in Sinhala; no busy state on the form), C4, C6. Direction 5 is the only
one that rejects a typed date of today (see C1).

---

## Cross-cutting

### C1 A typed "Another date" of today is accepted in directions 1 to 4

- **Severity:** medium
- **Location:** `1-stop-by-stop/script.js:603`, `2-inscription/script.js:810`,
  `3-plain-words/script.js:771`, `4-departures/script.js:1010`; correct in
  `5-ticket/script.js:710-712`
- **What is wrong:** The past-date check rejects only dates before today. Today
  (12/10/2026), which closed at 7:00 am, passes. Directions 1 to 4 then show
  "Request received".
- **Failure scenario:** At 2:40 pm on Monday 12/10/2026 a requester picks
  "Another date" and types 12/10/2026. They get PT-2026-0142 for a day whose
  requests closed at 7:00 am, and they never see the transport office number.
  Direction 5 shows the `cutoff.today.closed` message instead. The owner
  comparing the forms sees different rules, not different designs.
- **Requirement or rule:** BRL-13, FR-07, US-05; brief 5.2 (today is
  "Closed").
- **Confidence:** verified (scripted in all five).
- **Suggested direction:** Apply the cutoff to typed dates as direction 5 does,
  with the shared `cutoff.today.closed` string. The brief's validation table
  should gain this row.
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). The defect is only in directions 1 to 4, which are kept as a
  record and will not be developed further. Direction 5, Ticket, the chosen
  base, already applies the cutoff to typed dates. (2026-10-01)

### C2 Weekend dates are accepted (question for the requirements)

- **Severity:** low
- **Location:** every `request.html` ("Another date"); brief 5.2 validation table
- **What is wrong:** A typed Saturday (17/10/2026) is accepted by all five. The
  operating hours are Monday to Friday (brief 4.1, BRL-13). The brief has no
  rule or string for this.
- **Failure scenario:** A requester books a Saturday trip that no van can run,
  and nobody tells them until a coordinator acts.
- **Requirement or rule:** BRL-13 (operating hours). The requirements do not
  say whether a weekend request is invalid or allowed as an exception.
- **Confidence:** verified (behaviour); the rule itself is a question.
- **Suggested direction:** The requirements-analyst decides between three
  options. (a) Reject weekend dates with a new shared message. (b) Accept them
  and flag the request for the coordinator, as the out-of-hours warning does.
  (c) Leave it. Recommendation: (b), because it matches how out-of-hours
  times are treated (`hours.warning`) and does not block real exceptions.
- **Owner's decision:** Accept. Ticket accepts weekend dates too, and the
  requirements do not settle the rule. It goes to the requirements-analyst as
  a requirements question. (2026-10-01)

### C3 Shared strings are missing, and builders filled the gaps differently

- **Severity:** low
- **Location:** brief 4.9; `3-plain-words/script.js:317-378` (`EXTRA`),
  `2-inscription/script.js:298-333`, `4-departures/script.js:305-319`;
  `<optgroup>` blocks in each `request.html` (for example `5-ticket/request.html:222`)
- **What is wrong:** Brief 4.9 has no keys for several strings the pages need,
  so each builder solved it alone:
  - **"Other places" group label.** Direction 3 added one. Directions 1, 2, 4
    and 5 leave "Stationery supplier" ungrouped after "Venues".
  - **Singular "1 passenger".** Each direction does this differently (see 4.3).
  - **"Submitted".** Direction 5 used `done.title` instead, which feeds 5.1.
  - **"Sending…".** Direction 5 shows no busy state on the form.
  - **Skip link in Sinhala.** Only direction 2 translates it. Directions 1, 3,
    4 and 5 leave "Skip to main content" in English on Sinhala pages.
    Direction 5's footer also leaves "transport office" in English.
  - **Direction 4's date remarks** ("Open", "Closes 5:00 pm today", "Closes
    7:00 am on Monday"). Brief 6.4 requires them but 4.9 has no keys.

  Directions 2, 3 and 4 also add new Sinhala drafts (ladder steps, sentence
  parts, remarks) that are outside the D-09 review list.
- **Failure scenario:** On some phone pickers an ungrouped option after a group
  appears to belong to "Venues" (suspected; not tested on iOS). A Sinhala
  reader meets an English skip link. Unlisted Sinhala drafts reach production
  without native review.
- **Requirement or rule:** US-02 AC-1 (other saved places as their own group);
  FR-65; D-09; brief 4 ("use this content exactly").
- **Confidence:** verified (rendered Sinhala views scanned for English UI words).
- **Suggested direction:** The ux-designer adds the missing keys to brief 4.9,
  with Sinhala drafts: `place.saved`, `driver.passenger`, `status.submitted`,
  `busy.sending`, `skip`, and `remark.*`. Every extra Sinhala string in the
  chosen direction then goes onto the D-09 review list. The builders'
  workarounds are sound as stopgaps.
- **Owner's decision:** Accept. The missing shared strings are to be added to
  the brief, and Ticket then uses them. (2026-10-01)

### C4 "Every JavaScript function has a JSDoc comment": a ruling is needed for callbacks

- **Severity:** low
- **Location:** each `script.js`. Function-valued properties without JSDoc:
  `1-stop-by-stop/script.js:645`, `:844`; `2-inscription/script.js:965`;
  `4-departures/script.js:990-1037` (14 `check`/`when` functions)
- **What is wrong:** Every named function in all five scripts has JSDoc
  (70, 59, 127, 61 and 71). Undocumented inline callbacks number 106 in
  direction 1, 88 in 2, 107 in 4 and 84 in 5. Direction 3 documents its
  callbacks inline. In direction 4, the validation functions that encode FR-03
  and the date rules sit under one table comment, with no `@returns` each.
- **Failure scenario:** When ruff/ESLint docstring checks are switched on for
  the chosen direction, the build fails or passes depending on how the linter
  is configured, not on a decision the owner made.
- **Requirement or rule:** `CLAUDE.md` "Code documentation" ("Every JavaScript
  function has a JSDoc comment"); brief 2.
- **Confidence:** verified (counted by static scan).
- **Suggested direction (ruling recommendation):** JSDoc is required for every
  named function, and for every function assigned to a variable or object
  property, including validation tables. It is also required for any callback
  that holds a business rule or more than about three statements; such
  callbacks should be extracted and named. A short anonymous callback passed
  straight to `forEach`, `map` or `addEventListener` is exempt when the
  enclosing documented function describes it. If the owner agrees, the
  process-steward records the ruling in `CLAUDE.md`, and the devops-engineer
  configures the JS lint rule to match. Under this ruling, only the
  function-valued properties listed above need fixing.
- **Owner's decision:** Accept. The ruling recommended above is to be
  recorded in `CLAUDE.md` (the process-steward's change), and Ticket's
  script follows it. (2026-10-01)

### C5 Footer landmark missing on four pages

- **Severity:** low
- **Location:** `1-stop-by-stop/dashboard.html:368`; `2-inscription/request.html:487`, `2-inscription/dashboard.html:315`, `2-inscription/driver.html:154` (each `</main>` is followed by no `<footer>`)
- **What is wrong:** Brief 3.3 lists `footer` among the required landmarks.
  These four pages have none.
- **Failure scenario:** A screen-reader user jumping by landmark finds no
  contentinfo region on these pages; the other 16 pages have one.
- **Requirement or rule:** brief 3.3; NFR-03.
- **Confidence:** verified.
- **Suggested direction:** Add the footer, holding the transport office line
  and the prototype links.
- **Owner's decision:** Overrule – right but not worth acting on (direction
  not chosen). The four pages it names are all in directions 1 and 2, which
  are kept as a record and will not be developed further. Ticket's pages
  already have a footer, so Ticket needs no change. (2026-10-01)

### C6 The owner's "not AI-generated" bar: what the evidence shows

- **Severity:** low
- **Location:** `2-inscription/components.css:1053`; `5-ticket/pages.css:449-489`;
  the tile rows of `1-`, `2-`, `4-` and `5-*/dashboard.html`; `3-plain-words/request.html` (form pattern)
- **What is wrong:** Against brief 3.8, the scan found:
  - no banned typeface;
  - no colour gradient (only hard-stop dash and hatch patterns);
  - no blur, translucency or soft shadow;
  - no emoji or typed-glyph icons;
  - no hero section;
  - no vague microcopy or placeholder content;
  - no copied marks, `#FFDD00` or split-flap imagery.

  Two template patterns remain:
  - **The dashboard tile row in directions 1, 2, 4 and 5.** It is an icon,
    a capitalised label, a large numeral, and in 2 and 5 a coloured top rule
    per status. This is the common "stat card" pattern, and the brief asks for
    tiles (5.3). In direction 5 the four count tiles are plain cards, not
    tickets, so the signature stops at the plan tile. Direction 3 replaces
    tiles with count sentences.
  - **Direction 3's form follows the GOV.UK Frontend pattern set closely:**
    error summary with focus, hidden "Error:" prefix, question as label,
    2 px black fields, plain circle radios. The brief permits this as a
    principle, and the README says the direction "can read as a generic
    public-service form". There is no copied colour, typeface or crown.
- **Failure scenario:** The owner judges the directions on their dashboards and
  sees four similar tile rows, so the tiles do not tell them apart.
- **Requirement or rule:** brief 3.8, 3.9; research.md 4.
- **Confidence:** verified (rendered at 1440 px; CSS read). This is evidence,
  not taste; whether it matters is the owner's call.
- **Suggested direction:** If tiles matter in the choice, the chosen direction
  should draw them in its own grammar: plates in 1, ladder rail in 2, board
  header cells in 4, small tickets in 5. No change needed otherwise.
- **Owner's decision:** Accept. Ticket's four count tiles are to be reworked
  as tickets rather than template stat cards, so the direction's signature
  carries through the dashboard. (2026-10-01)

### C7 The gallery footer is out of date

- **Severity:** low
- **Location:** `docs/design/system-options/index.html:223`
- **What is wrong:** The footer says "Each direction's pages appear here once
  it is built". All five are built and linked.
- **Failure scenario:** The owner reads the gallery as still incomplete.
- **Requirement or rule:** `CLAUDE.md` "Code documentation" (no misleading
  documentation).
- **Confidence:** verified.
- **Suggested direction:** Remove the sentence or replace it with the build
  date.
- **Owner's decision:** Accept. The gallery footer is to be corrected so it no
  longer reads as incomplete. (2026-10-01)

---

## Deviations the builders reported

| # | Deviation | Verdict | Reason | Owner's decision |
|---|---|---|---|---|
| D-a | Direction 1 puts "+ Add a stop" on the spine above "Going to" (brief 5.2 says "under it") | Sound | A new stop goes before the destination, so the button sits where the stop will appear (FR-54). Tab order is pick up, add stop, going to, and focus moves to the new stop's place. The behaviour is unchanged, including without JavaScript. | No action. Direction 1 is not chosen and will not be developed further. (2026-10-01) |
| D-b | Direction 2 moves the navigation into a top arm of the band (brief 6.2 puts it in the rail) | Sound | It keeps header and navigation first in reading and focus order (US-22 AC-1), keeps the plan inside `<main>`, and it is still one band. | No action. Direction 2 is not chosen and will not be developed further. (2026-10-01) |
| D-c | Direction 2 puts the driver's Undo in the page flow above the next stop, not as a fixed bar | Sound | A fixed bar could cover the focused button (WCAG 2.4.11). Verified: Undo appears, focus goes to "Next stop", and Undo goes after 10 seconds. | No action. Direction 2 is not chosen and will not be developed further. (2026-10-01) |
| D-d | Direction 5 puts the live ticket above "Send request" under "Check your request" (brief 6.5 says "at the top") | Sound for use, with a side effect | The form now opens on its first question (research.md 4), and the check happens at the moment of sending. But direction 5's signature now sits in the same place, under the same heading (`summary.title`), as direction 3's sentence. The two options look more alike at the point the owner compares them. The README asks the owner (question 1). | Accept, as built. Ticket's live ticket stays above "Send request", not at the top of the form; this answers the README's question 1. (2026-10-01) |
| D-e | Sinhala strings added beyond brief 4.9 (directions 2, 3, 4) | Sound as drafts | Each is marked for D-09, and none changes a shared string. They must join the D-09 list (C3). | Handled through C3 (accepted): the extra Sinhala strings join the D-09 review list. (2026-10-01) |
| D-f | Missing shared strings reported: "Other places", "Submitted", "Sending…", "seats", the three date remarks | Reports are correct | "Other places" and the remarks are needed now (C3). "Submitted" matters because its absence led to 5.1. "Sending…" is needed in production, not for these prototypes. "seats" appears only on the English-only dashboard, so it needs no Sinhala yet. | Handled through C3 (accepted): the missing shared strings are added to the brief. (2026-10-01) |
| D-g | Direction 4's confirmation lists the trip as key-value rows, not a single line | Sound | The content is identical to brief 5.2 (verified in both languages); only the layout differs, which is the point of the comparison. | No action. Direction 4 is not chosen and will not be developed further. (2026-10-01) |
| D-h | Directions 2 and 3 disable today's date natively and show the reason; directions 1, 4 and 5 keep it focusable with `aria-disabled` | Both sound | Brief 5.2 asks for the explanation "if focused". A natively disabled option cannot take focus, so directions 2 and 3 show the reason as visible text, which every user can read. | No action. Both approaches are sound. (2026-10-01) |

---

## What was checked

All checks were scripted in headless Edge from `file://`, using identical
scenarios for all five directions. Results:

- **Console:** 0 errors and 0 exceptions on all 20 pages, including during
  every scenario.
- **Shared content:** All 128 keys in both languages match brief 4.9 exactly
  (parsed and diffed). The four explanations in 4.7, the audit line, the
  approve-plan dialog text, "Plan approved at 7:06 am…" and "PT-2026-0142
  confirmed. Kasun Jayasinghe will get a text." are present word for word in
  all five. The confirmation summary matches 5.2 in both languages in all five.
- **Request form, all five:**
  - **Fields:** 12 visible fields (NFR-02); "Must arrive by" and "Anything
    special?" are in closed disclosures.
  - **Errors:** The error summary has nine links in page order and takes
    focus. Inline messages are tied to fields with `aria-describedby` and
    `aria-invalid`; radio groups use the fieldset.
  - **Validation rules:** Blur validates only after typing. There is no
    keystroke validation.
  - **Phone numbers (FR-03):** `+94 77 123 4567`, `+94771234567`,
    `0112345678` and `011 234 5678` are accepted. `07712345`, `077 123 45678`,
    `7712345678` and `0771234567x` are rejected.
  - **Other rules:** past date, bad format, return time not after pickup, and
    passengers 0, 100 or empty all behave as specified. Above 12, the split
    notice appears as information.
  - **Behaviour:** Stops go up to 3. The return fields reveal and hide
    correctly. The stepper behaves at its edges. The confirmation takes focus.
  - **Language switch:** It sets `<html lang>` and `pt-lang`, survives a
    reload, and translates errors and the confirmation already on screen.
- **Without JavaScript, all five:** The return fields carry "(only if you need
  a return trip)". The "Another date" and "Another address" fields show. There
  are three extra-stop rows in a closed details element, the language switch
  is two links, and the form action is `#`. Driver and dashboard content
  reads.
- **Dashboard, all five:** Blocks are reachable by Tab in time order, per van
  and then "Not placed". Their names give van, time, reference, places and
  status (except 3.2 and 4.1). Choosing PT-2026-0145, PT-2026-0149 and
  PT-2026-0147 shows their explanations word for word. Approve updates the
  panel, the block and the count from 7 to 6, with Undo that disappears after
  10 seconds. The plan dialog has the exact text, Escape closes it and returns
  focus to "Approve today's plan", and the success message is exact. The list
  view is a captioned table with 10 rows. All five use a native modal
  `<dialog>`; Tab can leave it to the browser's own controls, which is
  standard and acceptable.
- **Driver, all five:**
  - **Content:** All of brief 5.4 is present.
  - **Calls:** `tel:+94770000145` and the others are in the right format.
  - **Done:** shows "Done at 9:41 am", "5 of 14 stops done" and Undo, which
    goes after 10 seconds.
  - **No-show:** the confirmation text is exact, and "No-show at 9:41 am"
    follows.
  - **Navigate:** shows "Opens your map app".
  - **Offline:** the banner text is exact and the route stays visible.
  - **Sinhala:** strings and පෙ.ව./ප.ව. times are correct.
  - **Button sizes:** Done is 56 px tall and No-show 48 px or more, 12 to
    16 px apart, and No-show is quieter in all five.
- **Accessibility:**
  - **Text contrast:** computed for every visible text node, including the
    error, confirmation and list states. The only failures are 2.2's swatch
    labels.
  - **Focus:** checked by Tab on all 20 pages. A visible indicator was found
    on every focusable element.
  - **Structure:** one `h1` per page, skip link present, no duplicate ids, and
    every `aria-*` and `for` reference resolves.
  - **Reflow:** no horizontal overflow at 320 px or 360 px in English or
    Sinhala.
  - **Motion:** with reduced motion, no transition or animation runs on any
    page.
  - **Greyscale and current language:** every foundations page has a
    greyscale copy of the badges, and the current language is marked by a
    tick and a fill.
- **NFR-12:** No time or date on any English page breaks the "10:30 am" and
  DD/MM/YYYY formats in rendered text, CSS capitals included. Sinhala pages
  carry no English "am" or "pm".
- **Code documentation:** Every HTML, CSS and JS file has a header comment and
  marked sections, and every CSS header lists its sections. Every script is an
  IIFE with `'use strict'`, loaded with `defer`, with a `@file` header. Rule
  IDs are cited 42 to 59 times per script. Outside the token files, components
  contain at most one raw colour each.
- **Foundations pages:** All nine sections are in order. All eight statuses
  and eight flags are shown, with button states including "Sending…", the
  error examples and the 10-row table. The full logo is 240 px wide or more, except direction 1's "smallest size"
  sample: it is 240 px in the markup but renders at 236 px inside its frame
  (`1-stop-by-stop/index.html:149`), too small a gap to raise as a finding.
  Each page links to its direction's other pages and the gallery.

### Weight (NFR-18), measured

Measured with a cold cache in headless Edge 154. Local files are counted at
full size; fonts are counted as transferred, including headers.

| Page | 1 Stop by Stop | 2 Inscription | 3 Plain Words | 4 Departures | 5 Ticket |
|---|---|---|---|---|---|
| `request.html`, English | 401,342 | 378,645 | 441,654 | 341,042 | 393,164 |
| `request.html`, Sinhala | 432,320 | **502,491** | 472,638 | 358,388 | 415,844 |
| `driver.html`, English | 393,652 | 350,599 | 406,126 | 340,637 | 384,109 |
| `driver.html`, Sinhala | 424,786 | 491,627 | 437,110 | 357,833 | 406,789 |

Figures are in bytes. These agree with what the builders reported, within
the differences in font files that Google serves to different browsers.
Direction 4's README gives 376.8 KB for its Sinhala form; this run loaded one
fewer Gemunu Libre weight on first view. None of the pages meets the 300 KB
aim. In every direction, one shared `script.js` carries the dashboard's code
and data onto the phone pages; that is a build question for later, not a
design difference.

### Originality (`audit-reference-originality`)

**Verdict: clear with low-risk similarities.** The references are named by
URL only, and there is no local corpus (research.md 5), so this audit compares
the built pages with the brief's guardrails, not with captured reference
images. Text, brands and numbers are all the shared content. The only
external assets are the college's logo files and Google Fonts. Images and
video: none. Low-risk overlaps:

- Direction 1's crossbar stops follow Beck's station ticks, as a principle.
- Direction 3's form uses the GOV.UK patterns noted in C6.
- Direction 4's board uses a purple near-black, not airport yellow-on-black,
  and has no split-flap imagery.

History: the six commits on this branch in scope (`f95c8e4`, `4c8d491`,
`99e93f5`, `7feccd1`, `308b936`, `0befec1`) delete or rename no files, so no
reference material was added and later hidden.

## Owner's adjudication

Recorded on 01/10/2026 from the owner's decisions, passed on by the main
session. Each finding's own "Owner's decision" line and the deviations table
carry the decision and its reason; this section summarises them.

**Base design chosen: direction 5, Ticket.** Directions 1 to 4 are kept as a
record and will not be developed further.

**Accept** (to be fixed in the Ticket design; each is recorded as its own
oversight episode):

| Finding | What follows |
|---|---|
| 5.1 | The requester's confirmation stops using the Confirmed mark for a Submitted request. |
| 5.2 | Ticket's driver page gets headings in order. |
| 5.3 | The list toggle stops announcing a contradictory state. |
| 5.4 | Escape closes the no-show question; Undo clears the stale status text. |
| 5.5 | The busy spinner is replaced. |
| C2 | Goes to the requirements-analyst as a requirements question (weekend dates). |
| C3 | The missing shared strings are added to the brief. |
| C4 | The JSDoc ruling for callbacks recommended in this review is adopted into `CLAUDE.md`. |
| C6 | Ticket's count tiles are reworked as tickets rather than template cards. |
| C7 | The gallery footer is corrected. |

**Overrule – right but not worth acting on (direction not chosen):** C1, C5,
2.1, 2.2, 3.1, 3.2, 4.1, 4.2, 4.3 and 4.4. Each concerns only directions that
were not chosen. C1 does not affect Ticket, which already applies the cutoff
to typed dates. C5 does not affect Ticket either, whose pages already have a
footer. The question 2.1 raises, which unit NFR-18's 500 KB means (1,000
or 1,024 bytes), still goes to the requirements-analyst, because it matters
for Ticket too.

**Deviations:** D-d is accepted as built: Ticket's live ticket stays above
"Send request", not at the top of the form. D-e and D-f are handled through
C3. D-h: both approaches are sound, no action. D-a, D-b, D-c and D-g concern
directions not chosen: no action.
