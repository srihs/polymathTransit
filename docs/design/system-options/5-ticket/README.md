# Direction 5 – Ticket: design rationale

| | |
|---|---|
| Document | Design rationale for design direction 5, "Ticket" |
| Owner | ux-designer |
| Date | 01/10/2026 |
| Status | Option for the owner's choice; not yet chosen |
| Brief | [../brief.md](../brief.md) sections 1 to 5, 6.5 and 7 |
| Evidence | [../research.md](../research.md) |
| Pages | [index.html](index.html) (foundations), [request.html](request.html), [dashboard.html](dashboard.html), [driver.html](driver.html) |
| Screenshots | [screenshots/](screenshots/) (360 px, 320 px and 1440 px; English and Sinhala; key states) |

## 1. Decision

Every trip is a ticket. A trip always appears as the same object, a card
whose facts sit in fixed slots: date, pick up, going to, passengers, trip
for, and the return below a perforation. The reference (PT-2026-0142) is
the ticket's name and its serial (0142) is printed largest, because that
is the part people read aloud. The purple strip across the top of a
ticket means one thing only: the ticket is issued (confirmed). Staff
check their request on a live ticket before sending it; sending gives it
its reference and a neutral "Not confirmed yet" stamp, with the strip
still unfilled; a coordinator's confirmation issues it; the coordinator's day is a rack of small tickets hanging from
each van's line, and approving the plan turns every strip on the rack
purple; the driver's route is a column of stubs, and Done punches a hole
and folds the stub away. One typographic rule runs through all of it:
**the system prints in the stencil (Stick No Bills); people write and
read in IBM Plex Sans Condensed and Yaldevi.**

## 2. Context

- **Users (C-01).** Most users are non-technical school staff on phones,
  often outdoors. Coordinators work at a desk under time pressure (plan
  approval by 7:10 am, BRL-21). Drivers read the route while working.
- **Speed (BO-04, NFR-01, NFR-02).** The form is one page, 12 visible
  fields, about 2 minutes.
- **Brand.** The crest purple `#722A82` leads; the wordmark grey
  `#63666B` and black are available. Only the brief's verified colours are
  used.
- **Two languages (FR-65, D-09).** English and Sinhala on the form and the
  driver page; short Sinhala labels can be three times as wide.
- **Weight (NFR-18).** The form must load in 500 KB or less on slow data.

## 3. Options considered (choices the brief left open)

| Question | Options | Chosen, and why |
|---|---|---|
| Where the live ticket sits on the form | (a) at the very top of the page, as section 6.5 describes; (b) heading the "Your trip" section; (c) just above "Send request", titled "Check your request" | **(c)**. The research "avoid" list asks pages to open straight on the first question; a full ticket at the top pushes "Your name" below the fold at 360 px and is off screen while the trip fields are filled. Above the button it becomes a check-before-send step, uses the shared string `summary.title`, and is exactly where the eye is when sending. On a valid send the same ticket moves to the top of the confirmation with its reference and a "Not confirmed yet" stamp; it is not issued until a coordinator confirms it (review 5.1). **This departs from the wording of brief 6.5; the owner may prefer (a) – see question 1.** |
| What the confirmation's heading is | A separate "Request received" heading above the ticket, or the ticket's own stamp | The `<h1>` "Request received" sits on the ticket as plain title text, and under it the status stamp shows the status the request really has. Focus moves to the heading (US-01 AC-5). (Revised for review 5.1: the heading used to be printed as a stamp in the Confirmed style.) |
| What a just-sent request looks like (review 5.1) | (a) the strip means "issued" for every request and the stamp carries the status; (b) the strip means "Confirmed" only, and a sent request keeps an unfilled strip | **(b)**. One meaning per mark: the purple strip and the tick mean Confirmed everywhere (dashboard legend, panel, driver). A just-sent request is Submitted (specification 6.2), so it keeps the unfilled strip with the dashed foot, its reference in black, and the neutral Submitted stamp: grey (`#63666B`, 5.76:1 on white), a tray icon, and the words "Not confirmed yet" / "තවම තහවුරු කර නැත" (`done.status`, draft for D-09). No tick, no green, no purple. In greyscale and without colour the difference is still the filled versus dashed strip, the tray versus the tick, and the words. The strip is issued (fills purple) later, when a coordinator confirms the trip. |
| Where the stencil face is used | Everywhere numbers appear, or only where it reads well | Only for printed references, big times and counts, at **20 px or more**. Below 20 px the stencil's breaks eat the figures, so small references (timeline, tables) use Plex 600 with tabular figures. |
| How a time sits on the driver's stub | One string, or figures and am/pm apart | Figures in the stencil, the am/pm word on its own line in Plex. English puts the word after ("10:00 / am"), Sinhala before ("පෙ.ව. / 10:00"), so both fit an 84 px column. |
| How timeline labels avoid colliding | Labels inside the bars, tooltips, or tickets hanging from the line | Small tickets hang **above or below** each van's line on a stem, so a 15-minute run still has a readable label; the bar on the line shows the real duration. |
| How "Pick up" shows its count without "1 passengers" | Plural rules, or a slot | A labelled count ("Passengers 1"), so no plural rule is needed in either language. |
| How the driver's page is headed (review 5.2) | (a) group headings "Next stop" and "Later stops" over the stops; (b) one `h2` per stop | **(b)**. The next stop moves down the list as stops are done and undone, and done stubs stay in place, folded, so group headings would need stubs moved between lists. One `h2` per stop keeps the levels in order in every state, with or without JavaScript. The next stop's `h2` begins "Next stop:" for screen readers (from `driver.next`), so it can be found in the headings list, and the visible strip title is hidden from them so it is not read twice. No new string, no visual change. |
| How strong Done is on later stops | Every stop's Done filled purple, or only the next | Only the **next** stop's Done is filled; later stops have an outline Done. One strong button per screen, and the wrong stop is less likely to be marked. |
| How quiet No-show is | Red outline, or quieter | Thin grey edge, regular weight, red only in the word and icon: always quieter than Done (brief 5.4). |
| Choice layout at 320 px | Always two columns, or let them fall to one | Two columns while each is at least 140 px, one column below: the Sinhala "Thursday" (බ්‍රහස්පතින්දා) cannot wrap and would hit the edge. |
| Errors | Red left bar on the field group, or not | No left bar (it echoes a well-known government pattern); an error has its icon, its words in bold red and a 3 px red edge. |
| Modal backdrop | Dimmed translucent page, or solid | Solid desk colour: the brief bans translucency over content. |
| Times splitting across lines | Accept, or keep together | A no-break space joins a time to its am/pm word at render time ("5:00 pm", "ප.ව. 5:00"); the shared strings themselves are unchanged. |

## 4. Evidence (references, by principle)

From [research.md](../research.md) 2.3 and 3, principles only:

- **Edmondson card tickets, Sri Lanka Railways.** Every fact in a fixed
  place; the serial number identifies the ticket. → Principle 1 and 2: the
  fixed slot order and the reference as the ticket's name.
- **Tyler Thompson, "Boarding Pass / Fail".** Order a travel document by
  what the traveller needs first, and give the most-checked fact (the
  time) its own place. → The driver's stub gives the time its own
  torn-off column; the pick-up slot leads with the time.
- **Stick No Bills (Mooniak, for the Stick No Bills poster gallery,
  Galle).** A stencil with Sinhala and Latin. → Printed references, times
  and counts, in both scripts; a Sri Lankan foundry's face instead of a
  generic display font.
- **IBM Plex Sans Condensed.** Compact, engineered text for narrow slots,
  tabular figures by default. → All Latin text.
- **Yaldevi (Mooniak).** About 30% narrower than Noto Sans Sinhala at
  equal legibility (research.md 3.1). → All Sinhala text, size factor 0.9.
- **Mooniak, "reducing dissonance" between scripts.** → Sinhala is matched
  by size and rhythm (factor 0.9, line height 1.6 to 1.7, labels 14 px
  without capitals), not forced to look like Latin.
- **GOV.UK error guidance** (as for all directions). → Error next to the
  field and in a summary that takes focus, with links in page order.

## 5. Reasoning

- **One object for everyone.** A coordinator reading a ticket aloud on the
  phone and a requester holding theirs look in the same place for the same
  fact. This serves C-01 better than a different layout per role.
- **The strip carries the most important state.** Proposed versus confirmed
  is the coordinator's main question at 7:05 am. A dashed, empty strip
  against a filled purple one reads at a glance, in colour and in
  greyscale, and approving the plan gives instant, whole-day feedback (FR-34,
  BRL-21).
- **Perforations only where a trip really divides.** Outbound and return,
  and the driver's time column. They are never decoration, so they keep
  their meaning.
- **Done is a punch.** The driver gets a physical-feeling confirmation,
  a time, a fold, and Undo for 10 seconds, without leaving the route
  (US-60). The progress row is a strip of punched holes, readable by
  shape.
- **Restraint with purple.** Purple is reserved for the issued strip,
  primary actions, links and focus. Headers are white, so purple never
  means "decoration".

## 6. Trade-offs (what this direction is worse at)

- **Weight.** The request page loads 409.1 KB with the Sinhala font
  (387.6 KB in English): inside the 500 KB budget but above the 300 KB aim.
  Yaldevi's Sinhala file is 99 KB, Stick No Bills adds 10 to 22 KB, and the
  one shared, fully documented `script.js` is 86 KB. A production build
  would split the script per page and minify it.
- **Length on the driver's phone.** Every later stop keeps Navigate, Done
  and No-show (brief 5.4), so the route is long to scroll. The next stop is
  clearly the biggest thing, but stops far ahead could be lighter.
- **A stencil is a character choice.** It is legible at 20 px and up, but
  some readers may find it less familiar than a plain face; that is why it
  never sets words.
- **Condensed text is narrower but denser.** At 15 px on the dashboard,
  Plex Condensed is at the lower edge of comfortable reading for long
  explanations.
- **The live ticket is near the button, not the top.** People do not see
  the full set of facts before they start (see question 1).
- **Timeline tickets need room.** Two tiers per van hold today's 13 legs;
  a busier day (more than two legs within about 75 minutes on one van)
  would need a third tier or the list view.

## 7. Validation plan (BO-04 usability test, five staff)

1. **Unaided completion under 2 minutes** (NFR-01): time the form on the
   participants' own phones, English and Sinhala. Watch whether anyone
   uses the "Check your request" ticket before sending, and whether any
   slot shows a mistake they then fix.
2. **Reading the reference aloud**: ask each person to read their
   reference to a "coordinator" on the phone. Do they say "0142" first?
   Is the stencil read without hesitation?
3. **Proposed versus confirmed** (coordinator task): "Which of today's
   trips are not confirmed yet?" Time to answer from the timeline, then in
   greyscale print-outs.
4. **Driver mis-taps**: one-handed, walking, mark the next stop done, undo
   it, then mark a no-show. Count wrong-stop taps and accidental No-shows.
5. **Sinhala review** (D-09): native speakers check every string, Yaldevi
   shapes the font's own notes call "experimental", and the
   පෙ.ව./ප.ව. time order.

## 8. Principles

1. Every fact has a fixed place.
2. The reference is the ticket's name: always visible, easy to say aloud.
3. Outbound and return are two parts of one ticket, divided by a perforation.
4. Done is a punch, not a page.

## 9. Colour pairs added beyond the brief's table

All calculated with the WCAG 2.2 formula (also listed on index.html).

| Pair | Ratio | Use |
|---|---|---|
| `#EDCEF4` (purple-200) on `#722A82` | 6.22:1 | Slot labels on the issued strip |
| `#722A82` on `#F7E6FB` | 7.46:1 | Selected option text |
| `#722A82` on `#FCF4FD` | 8.23:1 | Hover ground of options |
| `#581D65` on white | 11.81:1 | Hover and pressed |
| `#3D4044` on white / on desk | 10.42:1 / 9.28:1 | Secondary text, punched holes |
| `#63666B` on `#EEF0F3` | 5.05:1 | Closed date, disabled controls |
| `#7D8086` on `#F7E6FB` | 3.33:1 | Option edge on a selected ground (UI) |
| Status colours on the desk `#F3F1F4` | ok 6.07, attention 4.87, danger 6.38, info 7.64 | Stamps and tile labels on the desk |
| White on `#000000` | 21:1 | "Now 7:05 am" label |
| `#DCDEE1` on white | 1.35:1 | Hairlines only (never a control's edge) |

## 10. Requirement IDs shown

BO-04, C-01, NFR-01, NFR-02, NFR-03, NFR-04, NFR-12, NFR-18, FR-01, FR-02,
FR-03, FR-04, FR-05, FR-06, FR-07, FR-09, FR-19, FR-20, FR-25, FR-26,
FR-27, FR-28, FR-29, FR-30, FR-34, FR-49, FR-52, FR-54, FR-55, FR-57,
FR-58, FR-61, FR-62, FR-65, FR-67, BRL-06, BRL-09, BRL-10, BRL-11, BRL-13,
BRL-15, BRL-21, US-01, US-02, US-03, US-05, US-16, US-17, US-22, US-23,
US-26, US-44, US-46, US-47, US-52, US-54, US-58, US-60, D-09, Q-17.

## 11. Known gaps

- **Missing shared strings** (not invented, reported): no label for the
  "Other saved places" group (Stationery supplier sits ungrouped after
  Venues); no Sinhala for the "Submitted" badge; no Sinhala for
  "Sending…", so the request page shows no busy state (it is shown on
  index.html); no Sinhala for "seats".
- **Strings added beyond brief 4.9** (drafts by the ux-designer, on the
  D-09 review list; kept in a separate block under the copied strings in
  `script.js`): `done.status` "Not confirmed yet" / "තවම තහවුරු කර නැත",
  the status stamp on the requester's confirmation (review 5.1).
- **Extra stops** offer saved places only, not "Another address".
- **Filters, sorting, Change and Decline** are visible but do not work
  (as the brief allows).
- **The privacy link** stays on the page (the privacy page is not built).
- **Below 1024 px** the dashboard stacks and the timeline scrolls
  sideways; the list view is the narrow-screen alternative.
- **The live ticket** is not announced as it fills (it is a review, not a
  live region); it is hidden without JavaScript.
- **Hatching** outside working hours is drawn with a hard-stop
  `repeating-linear-gradient` (a pattern, no colour blend).
- **Foundations page layout** (pages.css section 10) uses literal sizes,
  because it is a specimen sheet, not part of the component system.
