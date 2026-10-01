# Design system options – shared brief for the five builders

| | |
|---|---|
| Document | Shared brief for building five design directions |
| Owner | ux-designer |
| Date | 01/10/2026 |
| Status | Ready for the five builds |
| Requirements | BO-04, C-01, NFR-01, NFR-02, NFR-03, NFR-04, NFR-12, NFR-14, NFR-18, FR-02, FR-03, FR-04, FR-05, FR-06, FR-07, FR-09, FR-19, FR-25, FR-26, FR-29, FR-49, FR-54, FR-55, FR-58, FR-61, FR-65, FR-67, BRL-06, BRL-11, BRL-13, BRL-21, US-01, US-02, US-03, US-05, US-16, US-22, US-26, US-52, US-58, US-60, D-09 |
| Evidence | [research.md](research.md) |

The owner asked for "5 different designs in plain html and JS so that the user
can decide which will be used as the system theme", carrying the logo's
branding colours, built on award-winning thinking and not feeling
AI-generated. Five builders will each build **one** direction from this brief,
in parallel, without seeing each other's work. Everything you need is here or
in [research.md](research.md).

Contents

1. How to work
2. The deliverable for each direction
3. Shared rules
4. Shared content
5. Page specifications (the same for every direction)
6. The five directions
7. Self-check before you report

---

## 1. How to work

1. Read `CLAUDE.md` first. Its "Rules for every agent", "Code documentation"
   and "Using installed skills" bind you. Do not commit, branch or change git
   state.
2. Read [research.md](research.md) sections 1, 3 and 4.
3. Read section 2 to 5 of this brief, then **only your own direction** in
   section 6. Do not borrow ideas from the other four: the owner needs five
   genuinely different options.
4. Write only inside your direction's folder,
   `docs/design/system-options/<n>-<slug>/`. Use the shared assets in
   `docs/design/system-options/assets/` through relative links
   (`../assets/crest.png`). Do not copy or change them.
5. Skills to load before the work (from the ux-designer Skills table):
   `ui-design:design-screen`, `interaction-design:design-form`,
   `accessible-content:form-labelling`, `interaction-design:map-states`,
   `design-systems:component-spec`, `design-systems:design-token`,
   `adaptive-interfaces:colour-independence`, `inclusive-interaction:touch-target-design`,
   `inclusive-interaction:keyboard-navigation`, `accessible-content:table-accessibility`,
   `design-systems:localization-design`, `ui-design:responsive-design`,
   `interaction-design:feedback-patterns`, `designer-toolkit:design-rationale`
   (for your README), and `visual-critique:critique-screen` to critique your own
   pages before you report. Name every skill used in your report.
6. End with the standard report from `CLAUDE.md` (outcome, files, requirement
   IDs, skills, checks with results, questions).

---

## 2. The deliverable for each direction

Folder names (fixed, so the gallery links work):

| n | Direction | Folder |
|---|---|---|
| 1 | Stop by Stop | `1-stop-by-stop/` |
| 2 | Inscription | `2-inscription/` |
| 3 | Plain Words | `3-plain-words/` |
| 4 | Departures | `4-departures/` |
| 5 | Ticket | `5-ticket/` |

Files in each folder:

| File | What it is |
|---|---|
| `index.html` | The design-system foundations page (section 5.1). |
| `request.html` | The public request form at phone width, with the English/සිංහල switch, cutoff message, inline errors and the confirmation state (section 5.2). |
| `dashboard.html` | The coordinator dashboard at desktop width (section 5.3). |
| `driver.html` | The driver's route link at phone width (section 5.4). |
| `tokens.css` | Design tokens as CSS custom properties: global tokens, then semantic aliases. Components never use raw values. |
| `components.css` | Every component and its states. |
| `pages.css` (optional) | Page layouts, if you need them. |
| `script.js` | The only script: language switch, form behaviour, dashboard and driver interactions. |
| `README.md` | The direction's rationale (section 6, "README contents"). |

Technical rules:

- **Plain HTML, CSS and JavaScript only.** No frameworks, no build step, no
  package manager, no CDN JavaScript, no icon fonts, no images other than the
  shared logo assets and inline SVG.
- **Google Fonts `<link>` is allowed**, with `display=swap`, a `preconnect`, and
  full fallback stacks (section 3.6). Request only the weights you use.
- **Opens from the file system.** Every page must work when opened directly
  (`file://`) in Chrome, Edge, Firefox and Safari. So: relative links only, no
  `fetch()` of local files, no ES modules (`type="module"` is blocked on
  `file://`). Use one classic `script.js` wrapped in an IIFE with
  `'use strict'`, loaded with `defer`.
- **Works without JavaScript.** With scripts off, every page still shows its
  content and the form can still be read and filled in (section 5.2 says what
  changes). Scripts only enhance.
- **Code documentation** (CLAUDE.md, "Code documentation"):
  - Every HTML file starts with a comment block naming its purpose, the
    direction, the requirement IDs it shows, the files it depends on and its
    main sections. Mark each main section with a comment.
  - Every CSS file starts with a header comment saying what it is for and
    lists its sections; each section starts with a marked comment, for example
    `/* === Section: Buttons === */`.
  - `script.js` starts with a `@file` JSDoc header. **Every function** has a
    JSDoc comment (`@param`, `@returns`). Mark sections
    (`// === Section: Language switch ===`). Inline comments explain why, not
    what, and cite rule IDs where a rule is shown (for example
    `// BRL-13: cutoff for a Monday is 7:00 am on the day`).
- **Weight budget (NFR-18).** `request.html` and `driver.html` must each load
  500 KB or less in total (HTML, CSS, JS, images and fonts, with the Sinhala
  font loaded). Aim for 300 KB. Report the measured total.
- **Prototype controls.** Some states only appear after interaction. Put a
  small, clearly separate "Prototype controls" bar at the very bottom of
  `request.html`, `dashboard.html` and `driver.html`, styled plainly (system
  font, dashed grey border) so it is not mistaken for the design. Controls
  listed per page in section 5.

---

## 3. Shared rules

### 3.1 Brand

- The crest purple **`#722A82`** is the brand colour in every direction. It
  leads: primary actions, the product's identity, and the direction's signature
  element.
- The wordmark grey **`#63666B`** and the tagline black **`#000000`** are
  available in every direction.
- The purple scale and neutral scale in research.md (1.4, 1.5) are the
  only source for tints and shades.
- Logo use: follow research.md 1.7. Use `../assets/crest.png` on light
  backgrounds and `../assets/crest-keyline.png` on dark or purple ones;
  `../assets/logo.png` (the full logo) at 240 px wide or more, at least on
  `index.html`. Never recolour, distort, animate or redraw the logo. Never set
  the words "Polymath College" in a typeface as if it were the logo.
- The product name is **PolymathTransit** (one word). Set it in your direction's
  type.

### 3.2 Colour

- Any colour other than the brand purple, the logo grey, black, white and the
  neutrals must **have a job** (a status or a signal) and must pass WCAG 2.2
  AA: 4.5:1 for text, 3:1 for UI parts and large text. Your direction's colour
  table in section 6 gives verified values; use those. If you add a pair,
  calculate and report its ratio.
- **Colour is never the only signal.** Every status and flag has a word, plus
  an icon or shape. Errors have a message and an icon as well as a red border.
  Links in text are underlined. Timeline blocks carry their status word or
  shape, not only a fill. Your pages must pass a greyscale check.
- No gradients for colour, no transparency over content, no glow, no
  glassmorphism.

### 3.3 Accessibility (NFR-03, WCAG 2.2 AA)

- Visible focus on every interactive element, defined in your direction (never
  `outline: none` without a replacement). The focus indicator must contrast at
  least 3:1 with its surroundings.
- Touch targets **44 × 44 px or more** on phone pages (`request.html`,
  `driver.html`); 24 × 24 px or more on the desktop dashboard. At least 8 px
  between adjacent targets.
- Real `<label>` for every field; `<fieldset>` and `<legend>` for radio and
  checkbox groups; hints and errors tied to fields with `aria-describedby`;
  `aria-invalid="true"` on fields in error.
- Headings in order, one `<h1>` per page, landmarks (`header`, `nav`, `main`,
  `footer`), a "Skip to main content" link.
- Every page sets `<html lang="en">`; Sinhala text carries `lang="si"` (the
  switch changes `<html lang>` to `si`).
- Respect `prefers-reduced-motion: reduce` (no movement at all, only instant
  changes) and support 200% zoom and 320 px reflow without loss of content.
- Status messages that appear without a page load use `role="status"` or
  `aria-live="polite"`; the error summary takes focus.
- Data tables are real `<table>` elements with `<caption>` and `<th scope>`.
- The day timeline has a text alternative: every block is a button whose
  accessible name gives van, times, reference, places and status, and a
  "Show as list" toggle shows the same bookings as a table (FR-29 list view).

### 3.4 Phones and screens (NFR-04)

- `request.html` and `driver.html` are designed for **360 px wide** first, and
  must still work from 320 px to desktop. Show them inside a centred column of
  at most 480 px on wider screens; do not draw a fake phone frame.
- `dashboard.html` is designed for **1280 px to 1440 px** wide. Below 1024 px
  it must still be usable (stacked), but it does not need to be polished.
- Phone pages are used outdoors in sunlight: light backgrounds, strong
  contrast, large type (body 16 px minimum; 17 to 19 px recommended).

### 3.5 Language (FR-65, NFR-12, D-09)

- `request.html` and `driver.html` have an **English / සිංහල** switch at the
  top. Each option is labelled in its own language and script. The current
  language is marked with more than colour (for example `aria-pressed="true"`
  and a visible underline or fill with a tick).
- The switch swaps every label, option, hint, help text, error message and
  button using the strings in section 4.9, sets `<html lang>`, and remembers the
  choice in `localStorage` (key `pt-lang`; wrap in `try`/`catch`, because some
  browsers block storage on `file://`).
- Show a small note under the switch: "This Sinhala text is a draft for
  review by native speakers (D-09)." in English, on both languages' views. This
  note is for the prototype only.
- `dashboard.html` is English only (FR-65).
- Place names, people's names and notes are data and are shown as entered
  (English), in both languages (research.md, question 6.2).
- Times: English "10:30 am" (lower case, a space, no leading zero). Sinhala
  "පෙ.ව. 10:30" and "ප.ව. 5:00" (research.md, question 6.1). Dates
  DD/MM/YYYY in both. All times are Sri Lanka time; never show a time zone.
- Layout for Sinhala: let every label and button wrap; never fix a height that
  holds text; line-height 1.6 or more for Sinhala body text; set a Sinhala
  size factor under `:lang(si)` from your direction's type table so both
  scripts look the same size; `font-synthesis: none`. Short Sinhala labels can
  be up to three times wider than English (research.md 3.2): test every
  button and option at 360 px in Sinhala.

### 3.6 Fonts and fallbacks

Load fonts from Google Fonts with `&display=swap`. Every stack ends with
system fallbacks:

- Latin sans fallback: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- Latin serif fallback: `Georgia, "Times New Roman", serif`
- Monospace fallback: `ui-monospace, "Cascadia Mono", Consolas, monospace`
- Sinhala fallback (always last before the generic family):
  `"Noto Sans Sinhala", "Nirmala UI", "Iskoola Pota", "Sinhala Sangam MN", sans-serif`

Order: your Latin face first, then your Sinhala face, then the fallbacks.
Browsers pick the Sinhala face for Sinhala characters because the Latin face
has none.

### 3.7 Motion

- Motion only explains a change (something appeared, moved or was done). 200 ms
  or less, ease-out. No looping animation, no scroll-triggered effects, no
  parallax, no loading spinners longer than needed.
- Under `prefers-reduced-motion: reduce`, every transition and animation is off.

### 3.8 What every direction must avoid

The full list with reasons is in research.md section 4. In short: no
purple-to-blue gradients, no glassmorphism, no emoji as icons, no hero
sections or feature grids, no Inter, Poppins, DM Sans, Manrope, Plus Jakarta
Sans, Space Grotesk or Fraunces, no rounded-card-and-soft-shadow-everywhere
look, no lorem ipsum or invented content, no illustrations, no decoration
without a job, no colour-only signals, no religious, national or stereotyped
Sri Lankan imagery.

### 3.9 Originality

Your direction names its references (section 6). Take their **principles**
only. Do not reproduce any other product's layout, typeface, colour scheme,
pictograms, icons, logos, names, wording or screenshots. In particular: no
transit operator's line colours, roundels or route bullets; no split-flap tile
imagery or yellow-on-black airport board styling; no GOV.UK yellow focus
colour (`#FFDD00`), crown or typeface; no railway or airline marks. Draw your
own icons from scratch as inline SVG.

---

## 4. Shared content

Use this content exactly, so the owner compares design and not content. All
names and phone numbers are invented samples; the numbers use the pattern
`077 000 0nnn` so they cannot be mistaken for real people.

### 4.1 Setting

| Item | Value |
|---|---|
| College | Polymath College, Sri Lanka (three branches) |
| Product | PolymathTransit |
| Transport office | 011 000 0100 |
| Operating hours | Monday to Friday, 7:00 am to 6:00 pm (BRL-13) |
| Cutoff | 5:00 pm the day before; 7:00 am on the day for Mondays and the first school day after a break (BRL-13) |
| Plan approval deadline | 7:10 am on the trip day; early trips are those before 7:40 am (BRL-21) |
| Coordinators | Anoma Jayawardena, Ravi Gunasekara |
| Hire supplier | City Van Hire (sample supplier) |

### 4.2 Places

| Name | Type | Notes |
|---|---|---|
| Branch A | Branch, **main branch** (every van starts and ends here) | Show as "Branch A (main branch)" in lists |
| Branch B | Branch | |
| Branch C | Branch | |
| Aquatic Centre | Venue | Swimming |
| Sports Centre | Venue | Basketball, badminton |
| Stationery supplier | Other saved place | Errands |

Order in pickers: "Our branches" first, then "Venues", then other saved places,
then "Another address" (US-02 AC-1).

### 4.3 Vans and drivers

| Van | Seats (excluding driver) | Driver | Driver phone | Hours |
|---|---|---|---|---|
| Van 1 | 12 | Sunil Rathnayake | 077 000 0201 | 7:00 am – 6:00 pm |
| Van 2 | 8 | Nuwan Dissanayake | 077 000 0202 | 7:00 am – 6:00 pm |

### 4.4 The trip day

The dashboard and driver pages show **Tuesday 13/10/2026**. Optimise day ran at
the cutoff, **5:00 pm on Monday 12/10/2026**. The dashboard's "now" is
**7:05 am on Tuesday 13/10/2026** (US-22 AC-1). The driver page's "now" is
**9:40 am on Tuesday 13/10/2026**.

The request form's "now" is **2:40 pm on Monday 12/10/2026**, so tomorrow
(Tuesday) is still open and the cutoff message reads "Requests for tomorrow
close at 5:00 pm today." The person filling in the sample form is the requester
of PT-2026-0142.

### 4.5 Bookings for Tuesday 13/10/2026

Taken from the worked example in the specification (section 8) and extended.
Travel times are illustrative.

| Ref | Requester (phone) | Purpose | From → to | Pickup | Pax | Return | Van | Status | Flags |
|---|---|---|---|---|---|---|---|---|---|
| PT-2026-0131 | Dilini Fernando (077 000 0131) | Staff errand | Branch A → Branch C | 7:30 am (arrives 7:55 am) | 2 | No | Van 1 | Confirmed (confirmed individually on 12/10/2026) | Early trip |
| PT-2026-0119 | Ruwan Silva (077 000 0119), series contact | Sport: Grade 7 Swimming | Branch A → Aquatic Centre | 9:05 am (arrives 9:30 am) | 11 | Yes, 11:30 am from Aquatic Centre, back 11:55 am; van need not stay | Van 1 | Proposed | Fixed trip |
| PT-2026-0145 | Shamila Rodrigo (077 000 0145) | Staff errand | Branch B → Stationery supplier → Branch B | 10:00 am (back 10:50 am) | 1 | (round trip with a wait) | Van 1 | Proposed | Gap job |
| PT-2026-0140 | Nimal Perera (077 000 0140) | Meeting or event | Branch A → Branch C | 8:25 am (arrives 8:55 am) | 3 | No | Van 2 | Proposed | Shared |
| **PT-2026-0142** | **Kasun Jayasinghe (077 000 0142)** | **Sport** | **Branch B → Sports Centre** | **8:45 am ± 10 min; planned 8:40 am (arrives 9:10 am)** | **4** | **Yes, 10:45 am from Sports Centre (back 11:05 am)** | **Van 2** | **Proposed** | **Shared** |
| PT-2026-0147 | Sanduni Herath (077 000 0147) | Staff errand | Branch C → pin "Opposite the temple, 2nd lane" | 11:20 am (arrives 11:40 am) | 3 | No | Van 2 (route found) | Needs attention | New requester |
| PT-2026-0149 | Mahesh Kumara (077 000 0149) | Sport: Grade 9 inter-house practice | Branch A → Sports Centre | 1:00 pm | 20 | Yes, 3:00 pm | Not placed | Needs attention | (group larger than any van) |
| PT-2026-0150 | Priyanka Wijesekara (077 000 0150) | Meeting or event | Branch A → Branch B | 1:30 pm (arrives 1:45 pm) | 6 | Yes, 3:30 pm from Branch B (back 3:45 pm) | Van 1 | Proposed | |
| PT-2026-0153 | Tharindu Bandara (077 000 0153), by phone | Staff errand | Branch C → Branch A | 2:15 pm (arrives 2:40 pm) | 2 | No | Van 2 | Proposed | Late (exception) |
| PT-2026-0151 | Chathurika de Alwis (077 000 0151) | Class trip: drama rehearsal | Branch B → Branch A | 5:45 pm (arrives 6:05 pm) | 7 | No | Van 2 | Proposed | Out of hours |
| PT-2026-0138 | Gayani Ratnayake (077 000 0138) | Meeting or event | Branch A → Branch B | 12:30 pm | 3 | No | – | Cancelled (by the requester at 6:40 am today) | |
| PT-2026-0136 | Isuru Weerasinghe (077 000 0136) | Class trip | Branch A → Aquatic Centre | 3:00 pm | 10 | No | – | Declined | |

Extra examples for the badge set on `index.html` only (not on the trip day):
PT-2026-0155 "Submitted" (a request for Wednesday, being planned now);
PT-2026-0121 "Completed" (12/10/2026); PT-2026-0124 "No-show" (12/10/2026);
PT-2026-0126 "Completion not confirmed" (12/10/2026).

Details that the pages need:

- **Late exception (PT-2026-0153):** added by Ravi Gunasekara at 6:55 am today.
  Source: Phone. Reason: "Exam papers must reach the main office."
- **Declined (PT-2026-0136):** reason "No van is free at 3:00 pm. An extra hire
  van would be needed."
- **Cancelled (PT-2026-0138):** "Cancelled by the requester at 6:40 am. Van
  released."
- **Fixed trip series:** "Grade 7 Swimming – every Tuesday this term".

### 4.6 Each van's day (for the timeline and the driver page)

**Van 1** (12 seats), driver Sunil Rathnayake:

| # | Time | Place | Action | Pax | Booking | Contact | Note |
|---|---|---|---|---|---|---|---|
| 1 | 7:30 am | Branch A (main branch) | Pick up | 2 | PT-2026-0131 | Dilini Fernando, 077 000 0131 | Early trip |
| 2 | 7:55 am | Branch C | Drop off | 2 | PT-2026-0131 | | |
| 3 | 9:05 am | Branch A (main branch) | Pick up | 11 | PT-2026-0119, Grade 7 Swimming | Ruwan Silva, 077 000 0119 | Swimming bags go in the back. |
| 4 | 9:30 am | Aquatic Centre | Drop off | 11 | PT-2026-0119 | | Return pickup here at 11:30 am. |
| 5 | 10:00 am | Branch B | Pick up | 1 | PT-2026-0145 | Shamila Rodrigo, 077 000 0145 | Gap job |
| 6 | 10:20 am | Stationery supplier | Drop off | 1 | PT-2026-0145 | | Wait about 15 minutes. |
| 7 | 10:35 am | Stationery supplier | Pick up | 1 | PT-2026-0145 | Shamila Rodrigo, 077 000 0145 | She returns with boxes. |
| 8 | 10:50 am | Branch B | Drop off | 1 | PT-2026-0145 | | Then go to the Aquatic Centre (arrive by 11:10 am). |
| 9 | 11:30 am | Aquatic Centre | Pick up | 11 | PT-2026-0119 | Ruwan Silva, 077 000 0119 | |
| 10 | 11:55 am | Branch A (main branch) | Drop off | 11 | PT-2026-0119 | | |
| 11 | 1:30 pm | Branch A (main branch) | Pick up | 6 | PT-2026-0150 | Priyanka Wijesekara, 077 000 0150 | |
| 12 | 1:45 pm | Branch B | Drop off | 6 | PT-2026-0150 | | |
| 13 | 3:30 pm | Branch B | Pick up | 6 | PT-2026-0150 | Priyanka Wijesekara, 077 000 0150 | |
| 14 | 3:45 pm | Branch A (main branch) | Drop off | 6 | PT-2026-0150 | | End of day at Branch A. |

**Van 2** (8 seats), driver Nuwan Dissanayake:

| # | Time | Place | Action | Pax on board after | Booking |
|---|---|---|---|---|---|
| 1 | 8:25 am | Branch A (main branch) | Pick up 3 | 3 | PT-2026-0140 |
| 2 | 8:40 am | Branch B | Pick up 4 | 7 of 8 (busiest point) | PT-2026-0142 |
| 3 | 8:55 am | Branch C | Drop off 3 | 4 | PT-2026-0140 |
| 4 | 9:10 am | Sports Centre | Drop off 4 | 0 | PT-2026-0142 |
| 5 | 10:45 am | Sports Centre | Pick up 4 | 4 | PT-2026-0142 (return) |
| 6 | 11:05 am | Branch B | Drop off 4 | 0 | PT-2026-0142 (return) |
| 7 | 11:20 am | Branch C | Pick up 3 | 3 | PT-2026-0147 (needs attention) |
| 8 | 11:40 am | Pin: "Opposite the temple, 2nd lane" | Drop off 3 | 0 | PT-2026-0147 |
| 9 | 2:15 pm | Branch C | Pick up 2 | 2 | PT-2026-0153 (late exception) |
| 10 | 2:40 pm | Branch A (main branch) | Drop off 2 | 0 | PT-2026-0153 |
| 11 | 5:45 pm | Branch B | Pick up 7 | 7 | PT-2026-0151 |
| 12 | 6:05 pm | Branch A (main branch) | Drop off 7 | 0 | PT-2026-0151 (out of hours: ends after 6:00 pm) |

### 4.7 Explanations (FR-19, US-16)

Show these word for word.

**PT-2026-0142 (the proposal opened on the dashboard):**

> Van 2: added to the 8:25 am run from Branch A, shared with PT-2026-0140.
> Pickup at Branch B at 8:40 am, within the requested 8:45 am ± 10 min.
> 7 of 8 seats used at the busiest point.
> The 3 passengers from Branch A ride 6 minutes longer, within their limit.
> Saves a separate 35-minute van run.
> Van 1 not used: it must leave Branch A at 9:05 am for Grade 7 Swimming.

Run summary for the same proposal: Branch A 8:25 am (pick up 3, on board 3) →
Branch B 8:40 am (pick up 4, on board 7 of 8) → Branch C 8:55 am (drop off 3,
on board 4) → Sports Centre 9:10 am (drop off 4, on board 0). Planned by the
system at 5:00 pm on 12/10/2026 (Optimise day). Actions: Approve, Change,
Decline.

**PT-2026-0145 (gap job):**

> Van 1: gap job while Grade 7 Swimming is at the Aquatic Centre.
> Leaves the Aquatic Centre at 9:35 am and is back at 11:10 am,
> 20 minutes before the 11:30 am return pickup (the safety buffer is 15 minutes).
> No second van needed.

**PT-2026-0149 (needs attention, no fit; BRL-09, BRL-10):**

> No single van fits: the group of 20 is larger than the largest van (12 seats).
> At 1:00 pm, Van 1 cannot help: it must be back at Branch A for 1:30 pm (PT-2026-0150).
> Van 2 alone has 8 seats.
> Alternatives:
> 1. Split across Van 1 (12) and Van 2 (8), both leaving Branch A at 12:15 pm (45 minutes earlier).
> 2. Extra hire van needed for 1:00 pm.

**PT-2026-0147 (needs attention, new requester; BRL-15):**

> New requester: this phone number has not been used before. Check before approving.
> Route found: Van 2, pickup at Branch C at 11:20 am.
> The drop-off was placed with a map pin and the note "Opposite the temple, 2nd lane".

### 4.8 Dashboard numbers at 7:05 am

| Tile | Content |
|---|---|
| Today's plan – ready to approve | Tuesday 13/10/2026 · 2 vans · 8 trips · optimised at 5:00 pm yesterday · early trip at 7:30 am already confirmed · approve by 7:10 am · 2 requests that need attention are not in the plan |
| Needs attention | 2 (PT-2026-0147, PT-2026-0149) |
| Awaiting approval | 7 (PT-2026-0119, 0140, 0142, 0145, 0150, 0151, 0153) |
| Late exceptions | 1 (PT-2026-0153) |
| Today's trips | 10 (all of section 4.5 except the cancelled and declined ones) |

After "Approve today's plan" is confirmed: "Plan approved at 7:06 am. Final
details are going to 8 requesters and route links to 2 drivers." (FR-34, FR-61,
BRL-21). Before that, a confirmation step: "Approve the plan for Tuesday
13/10/2026? This confirms 7 trips and sends final details to 8 requesters and
route links to 2 drivers. The 2 requests that need attention stay open." Buttons:
"Approve and send" and "Not now".

(8 requesters: the 7 proposals plus the already confirmed early trip, which
also gets its final details.)

### 4.9 Strings for the public pages (English and Sinhala)

All Sinhala is a draft by the ux-designer and must be reviewed by native
speakers before real use (D-09). The strings contain zero-width joiners
(U+200D) inside conjuncts such as ප්‍ර; copy them exactly (copy from the code
block, which is identical to the table).

| Key | English | Sinhala (draft, D-09) |
|---|---|---|
| `form.title` | Request a van | වෑන් රථයක් ඉල්ලන්න |
| `form.intro` | It takes about 2 minutes. We'll send you a text when a coordinator confirms your trip. | මිනිත්තු 2ක් පමණ ගත වේ. සම්බන්ධීකාරකවරයෙක් ඔබේ ගමන තහවුරු කළ විට අපි ඔබට කෙටි පණිවිඩයක් එවන්නෙමු. |
| `lang.label` | Language | භාෂාව |
| `section.you` | About you | ඔබ ගැන |
| `section.trip` | Your trip | ඔබේ ගමන |
| `section.extra` | Anything special? | විශේෂ අවශ්‍යතා තිබේද? |
| `name.label` | Your name | ඔබේ නම |
| `phone.label` | Your phone number | ඔබේ දුරකථන අංකය |
| `phone.hint` | For example, 077 123 4567 | උදාහරණය: 077 123 4567 |
| `whatsapp.label` | Send my updates on WhatsApp instead of SMS | මගේ යාවත්කාලීන තොරතුරු SMS වෙනුවට WhatsApp මඟින් එවන්න |
| `email.label` | Email (optional) | ඊමේල් (අවශ්‍ය නම් පමණක්) |
| `email.hint` | We'll send a copy of your updates here. | ඔබේ යාවත්කාලීන තොරතුරුවල පිටපතක් මෙයට එවන්නෙමු. |
| `purpose.legend` | What is the trip for? | ගමන කුමක් සඳහාද? |
| `purpose.class` | Class trip | පන්ති චාරිකාව |
| `purpose.sport` | Sport | ක්‍රීඩා |
| `purpose.errand` | Staff errand | කාර්ය මණ්ඩල රාජකාරි ගමන |
| `purpose.event` | Meeting or event | රැස්වීම හෝ උත්සවය |
| `purpose.other` | Other | වෙනත් |
| `date.label` | Date of trip | ගමනේ දිනය |
| `date.hint` | For example, 13/10/2026 | උදාහරණය: 13/10/2026 |
| `cutoff.open` | Requests for tomorrow close at 5:00 pm today. | හෙට දිනයේ ගමන් සඳහා ඉල්ලීම් අද ප.ව. 5:00ට අවසන් වේ. |
| `cutoff.closed` | Requests for tomorrow are closed. For urgent transport, call the transport office on 011 000 0100. | හෙට දිනයේ ගමන් සඳහා ඉල්ලීම් අවසන්. හදිසි ප්‍රවාහනය සඳහා ප්‍රවාහන කාර්යාලයට 011 000 0100 අමතන්න. |
| `from.label` | Pick up from | ගමන ආරම්භ වන ස්ථානය |
| `to.label` | Going to | යන ස්ථානය |
| `place.branches` | Our branches | අපේ ශාඛා |
| `place.venues` | Venues | ක්‍රියාකාරකම් ස්ථාන |
| `place.address` | Type another address | වෙනත් ලිපිනයක් ලියන්න |
| `place.map` | Choose on map | සිතියමෙන් තෝරන්න |
| `stop.add` | + Add a stop | + නැවතුමක් එක් කරන්න |
| `time.label` | Pickup time | පිටත් වන වේලාව |
| `flex.legend` | How flexible is your pickup time? | පිටත් වන වේලාව කොපමණ වෙනස් විය හැකිද? |
| `flex.exact` | Exact time | නියමිත වේලාවටම |
| `flex.10` | ± 10 min | ± විනාඩි 10 |
| `flex.20` | ± 20 min | ± විනාඩි 20 |
| `flex.30` | ± 30 min | ± විනාඩි 30 |
| `arrive.label` | Must arrive by (optional) | පැමිණිය යුතු අවසන් වේලාව (අවශ්‍ය නම් පමණක්) |
| `pax.label` | How many passengers (not counting the driver)? | මගීන් කී දෙනෙක්ද? (රියදුරු හැර) |
| `pax.decrease` | One fewer passenger | මගීන් එක් අයෙකු අඩු කරන්න |
| `pax.increase` | One more passenger | මගීන් එක් අයෙකු වැඩි කරන්න |
| `pax.split` | This group needs more than one van – we'll arrange this. | මෙම කණ්ඩායමට වෑන් රථ එකකට වඩා අවශ්‍යයි – අපි එය සකස් කරන්නෙමු. |
| `return.legend` | Do you need a return trip? | ආපසු ගමනක් අවශ්‍යද? |
| `yes` | Yes | ඔව් |
| `no` | No | නැත |
| `return.time` | Return pickup time | ආපසු පිටත් වන වේලාව |
| `return.stay` | Van must stay with us (for example, for equipment or safety) | වෑන් රථය අප සමඟ රැඳී සිටිය යුතුයි (උදා: උපකරණ හෝ ආරක්ෂාව සඳහා) |
| `special.wheelchair` | Wheelchair access needed | රෝද පුටු පහසුකම අවශ්‍යයි |
| `special.equipment` | Large equipment | විශාල උපකරණ |
| `special.notes` | Anything else we should know? | අප දැනගත යුතු වෙනත් යමක් තිබේද? |
| `submit` | Send request | ඉල්ලීම යවන්න |
| `privacy` | We use your name and phone number only to plan this trip. Transport coordinators and the van driver will see them. We keep them for 24 months. | ඔබේ නම සහ දුරකථන අංකය මෙම ගමන සැලසුම් කිරීමට පමණක් භාවිත කරමු. ප්‍රවාහන සම්බන්ධීකාරකවරුන්ට සහ වෑන් රියදුරුට ඒවා පෙනේ. අපි ඒවා මාස 24ක් තබා ගනිමු. |
| `privacy.link` | How we use your details | ඔබේ තොරතුරු භාවිත කරන ආකාරය |
| `err.summary` | There is a problem | ගැටලුවක් ඇත |
| `err.name` | Please enter your name | කරුණාකර ඔබේ නම ඇතුළත් කරන්න |
| `err.phone.empty` | Please enter a phone number | කරුණාකර දුරකථන අංකයක් ඇතුළත් කරන්න |
| `err.phone.format` | Enter a phone number like 077 123 4567 | දුරකථන අංකය 077 123 4567 ආකාරයට ඇතුළත් කරන්න |
| `err.purpose` | Choose what the trip is for | ගමන කුමක් සඳහාද යන්න තෝරන්න |
| `err.date.past` | The date of the trip must be today or later | ගමනේ දිනය අද හෝ ඊට පසු දිනයක් විය යුතුයි |
| `err.from` | Choose where to pick you up | ගමන ආරම්භ වන ස්ථානය තෝරන්න |
| `err.to` | Choose where you are going | යන ස්ථානය තෝරන්න |
| `err.time` | Enter a pickup time | පිටත් වන වේලාව ඇතුළත් කරන්න |
| `err.pax` | Please enter a number between 1 and 99 | කරුණාකර 1 සිට 99 දක්වා අංකයක් ඇතුළත් කරන්න |
| `err.return` | Choose Yes or No | ඔව් හෝ නැත තෝරන්න |
| `err.return.time` | The return pickup time must be after the pickup time | ආපසු පිටත් වන වේලාව පිටත් වන වේලාවට පසුව විය යුතුයි |
| `done.title` | Request received | ඉල්ලීම ලැබුණා |
| `done.ref` | Your reference is | ඔබේ යොමු අංකය |
| `done.next` | We'll send you a text when a coordinator confirms your trip. Final pickup details come on the morning of the trip. | සම්බන්ධීකාරකවරයෙක් ඔබේ ගමන තහවුරු කළ විට අපි ඔබට කෙටි පණිවිඩයක් එවන්නෙමු. අවසන් ගමන් විස්තර ගමන් දිනයේ උදෑසන ලැබේ. |
| `done.another` | Request another trip | තවත් ගමනක් ඉල්ලන්න |
| `driver.title` | Today's route | අද ගමන් මාර්‍ගය |
| `driver.stop` | Stop | නැවතුම |
| `driver.pickup` | Pick up | මගීන් නංවා ගන්න |
| `driver.dropoff` | Drop off | මගීන් බස්සන්න |
| `driver.passengers` | passengers | මගීන් |
| `driver.navigate` | Navigate | මඟ පෙන්වන්න |
| `driver.call` | Call | අමතන්න |
| `driver.done` | Done | නිම කළා |
| `driver.noshow` | No-show | මගීන් පැමිණියේ නැත |
| `driver.next` | Next stop | ඊළඟ නැවතුම |
| `driver.offline` | You are offline. This is the route as last loaded at 9:38 am. | ඔබ අන්තර්ජාලයට සම්බන්ධ නැත. මෙය පෙ.ව. 9:38ට අවසන් වරට ලබාගත් ගමන් මාර්‍ගයයි. |
| `driver.gap` | Gap job | අතරමැදි ගමන |
| `driver.end` | End of day at Branch A | දවස A ශාඛාවෙන් අවසන් |
| `lang.note` | Your language choice is remembered on this phone. | ඔබේ භාෂා තේරීම මෙම දුරකථනයේ මතක තබා ගනී. |
| `day.today` | Today | අද |
| `day.tomorrow` | Tomorrow | හෙට |
| `day.monday` | Monday | සඳුදා |
| `day.tuesday` | Tuesday | අඟහරුවාදා |
| `day.wednesday` | Wednesday | බදාදා |
| `day.thursday` | Thursday | බ්‍රහස්පතින්දා |
| `day.friday` | Friday | සිකුරාදා |
| `date.closed` | Closed | වසා ඇත |
| `date.other` | Another date | වෙනත් දිනයක් |
| `cutoff.monday` | Requests for Monday close at 7:00 am on Monday. | සඳුදා දිනයේ ගමන් සඳහා ඉල්ලීම් සඳුදා පෙ.ව. 7:00ට අවසන් වේ. |
| `cutoff.today.closed` | Requests for today closed at 7:00 am. For urgent transport, call the transport office on 011 000 0100. | අද දිනයේ ගමන් සඳහා ඉල්ලීම් පෙ.ව. 7:00ට අවසන් විය. හදිසි ප්‍රවාහනය සඳහා ප්‍රවාහන කාර්යාලයට 011 000 0100 අමතන්න. |
| `time.choose` | Choose a time | වේලාවක් තෝරන්න |
| `time.morning` | Morning | උදෑසන |
| `time.afternoon` | Afternoon | පස්වරුව |
| `time.am` | am | පෙ.ව. |
| `time.pm` | pm | ප.ව. |
| `hours.warning` | Trips after 6:00 pm are outside our normal hours. A coordinator will check your request. | ප.ව. 6:00ට පසු ගමන් අපගේ සාමාන්‍ය වේලාවෙන් පිටතය. සම්බන්ධීකාරකවරයෙක් ඔබේ ඉල්ලීම පරීක්ෂා කරනු ඇත. |
| `place.choose` | Choose a place | ස්ථානයක් තෝරන්න |
| `place.other` | Another address | වෙනත් ලිපිනයක් |
| `place.landmark` | Landmark or directions (optional) | සලකුණක් හෝ මඟ විස්තර (අවශ්‍ය නම් පමණක්) |
| `stop.label` | Extra stop | අමතර නැවතුම |
| `stop.remove` | Remove this stop | මෙම නැවතුම ඉවත් කරන්න |
| `arrive.add` | Add a time you must arrive by | පැමිණිය යුතු වේලාවක් එක් කරන්න |
| `err.date` | Choose the date of the trip | ගමනේ දිනය තෝරන්න |
| `err.date.format` | Enter a date like 13/10/2026 | දිනය 13/10/2026 ආකාරයට ඇතුළත් කරන්න |
| `err.return.empty` | Choose a return pickup time | ආපසු පිටත් වන වේලාව තෝරන්න |
| `summary.title` | Check your request | ඔබේ ඉල්ලීම පරීක්ෂා කරන්න |
| `done.what` | What happens next | ඊළඟට සිදු වන්නේ |
| `label.purpose` | Trip for | ගමනේ අරමුණ |
| `label.date` | Date | දිනය |
| `label.pickup` | Pick up | පිටත් වීම |
| `label.goingto` | Going to | යන ස්ථානය |
| `label.passengers` | Passengers | මගීන් |
| `label.return` | Return | ආපසු ගමන |
| `driver.driver` | Driver | රියදුරු |
| `driver.van` | Van | වෑන් |
| `driver.in` | in {min} min | විනාඩි {min}කින් |
| `driver.doneat` | Done at {time} | {time}ට නිම කළා |
| `driver.noshowat` | No-show at {time} | {time}ට මගීන් පැමිණියේ නැත |
| `driver.undo` | Undo | ආපසු හරවන්න |
| `driver.noshow.confirm` | Mark as no-show? We will tell the transport coordinators. | මගීන් පැමිණියේ නැති බව සටහන් කරන්නද? අපි ප්‍රවාහන සම්බන්ධීකාරකවරුන්ට දැනුම් දෙන්නෙමු. |
| `driver.noshow.yes` | Yes, mark no-show | ඔව්, සටහන් කරන්න |
| `driver.goback` | Go back | ආපසු යන්න |
| `driver.contact` | Contact | සම්බන්ධ කරගන්න |
| `driver.progress` | {done} of {total} stops done | නැවතුම් {total}න් {done}ක් නිම කළා |
| `driver.updated` | Route updated at {time} | ගමන් මාර්‍ගය {time}ට යාවත්කාලීන කළා |
| `driver.navnote` | Opens your map app | ඔබේ සිතියම් යෙදුම විවෘත කරයි |

Copy this object into your `script.js` (it is the same content as the table):

```js
/**
 * Shared English and Sinhala strings for the public pages (brief section 4.9).
 * All Sinhala is a draft for native-speaker review (D-09). Placeholders in braces
 * ({time}, {min}, {done}, {total}) are replaced by the script.
 * @type {{en: Object<string, string>, si: Object<string, string>}}
 */
const STRINGS = {
  en: {
    "form.title": "Request a van",
    "form.intro": "It takes about 2 minutes. We'll send you a text when a coordinator confirms your trip.",
    "lang.label": "Language",
    "section.you": "About you",
    "section.trip": "Your trip",
    "section.extra": "Anything special?",
    "name.label": "Your name",
    "phone.label": "Your phone number",
    "phone.hint": "For example, 077 123 4567",
    "whatsapp.label": "Send my updates on WhatsApp instead of SMS",
    "email.label": "Email (optional)",
    "email.hint": "We'll send a copy of your updates here.",
    "purpose.legend": "What is the trip for?",
    "purpose.class": "Class trip",
    "purpose.sport": "Sport",
    "purpose.errand": "Staff errand",
    "purpose.event": "Meeting or event",
    "purpose.other": "Other",
    "date.label": "Date of trip",
    "date.hint": "For example, 13/10/2026",
    "cutoff.open": "Requests for tomorrow close at 5:00 pm today.",
    "cutoff.closed": "Requests for tomorrow are closed. For urgent transport, call the transport office on 011 000 0100.",
    "from.label": "Pick up from",
    "to.label": "Going to",
    "place.branches": "Our branches",
    "place.venues": "Venues",
    "place.address": "Type another address",
    "place.map": "Choose on map",
    "stop.add": "+ Add a stop",
    "time.label": "Pickup time",
    "flex.legend": "How flexible is your pickup time?",
    "flex.exact": "Exact time",
    "flex.10": "± 10 min",
    "flex.20": "± 20 min",
    "flex.30": "± 30 min",
    "arrive.label": "Must arrive by (optional)",
    "pax.label": "How many passengers (not counting the driver)?",
    "pax.decrease": "One fewer passenger",
    "pax.increase": "One more passenger",
    "pax.split": "This group needs more than one van – we'll arrange this.",
    "return.legend": "Do you need a return trip?",
    "yes": "Yes",
    "no": "No",
    "return.time": "Return pickup time",
    "return.stay": "Van must stay with us (for example, for equipment or safety)",
    "special.wheelchair": "Wheelchair access needed",
    "special.equipment": "Large equipment",
    "special.notes": "Anything else we should know?",
    "submit": "Send request",
    "privacy": "We use your name and phone number only to plan this trip. Transport coordinators and the van driver will see them. We keep them for 24 months.",
    "privacy.link": "How we use your details",
    "err.summary": "There is a problem",
    "err.name": "Please enter your name",
    "err.phone.empty": "Please enter a phone number",
    "err.phone.format": "Enter a phone number like 077 123 4567",
    "err.purpose": "Choose what the trip is for",
    "err.date.past": "The date of the trip must be today or later",
    "err.from": "Choose where to pick you up",
    "err.to": "Choose where you are going",
    "err.time": "Enter a pickup time",
    "err.pax": "Please enter a number between 1 and 99",
    "err.return": "Choose Yes or No",
    "err.return.time": "The return pickup time must be after the pickup time",
    "done.title": "Request received",
    "done.ref": "Your reference is",
    "done.next": "We'll send you a text when a coordinator confirms your trip. Final pickup details come on the morning of the trip.",
    "done.another": "Request another trip",
    "driver.title": "Today's route",
    "driver.stop": "Stop",
    "driver.pickup": "Pick up",
    "driver.dropoff": "Drop off",
    "driver.passengers": "passengers",
    "driver.navigate": "Navigate",
    "driver.call": "Call",
    "driver.done": "Done",
    "driver.noshow": "No-show",
    "driver.next": "Next stop",
    "driver.offline": "You are offline. This is the route as last loaded at 9:38 am.",
    "driver.gap": "Gap job",
    "driver.end": "End of day at Branch A",
    "lang.note": "Your language choice is remembered on this phone.",
    "day.today": "Today",
    "day.tomorrow": "Tomorrow",
    "day.monday": "Monday",
    "day.tuesday": "Tuesday",
    "day.wednesday": "Wednesday",
    "day.thursday": "Thursday",
    "day.friday": "Friday",
    "date.closed": "Closed",
    "date.other": "Another date",
    "cutoff.monday": "Requests for Monday close at 7:00 am on Monday.",
    "cutoff.today.closed": "Requests for today closed at 7:00 am. For urgent transport, call the transport office on 011 000 0100.",
    "time.choose": "Choose a time",
    "time.morning": "Morning",
    "time.afternoon": "Afternoon",
    "time.am": "am",
    "time.pm": "pm",
    "hours.warning": "Trips after 6:00 pm are outside our normal hours. A coordinator will check your request.",
    "place.choose": "Choose a place",
    "place.other": "Another address",
    "place.landmark": "Landmark or directions (optional)",
    "stop.label": "Extra stop",
    "stop.remove": "Remove this stop",
    "arrive.add": "Add a time you must arrive by",
    "err.date": "Choose the date of the trip",
    "err.date.format": "Enter a date like 13/10/2026",
    "err.return.empty": "Choose a return pickup time",
    "summary.title": "Check your request",
    "done.what": "What happens next",
    "label.purpose": "Trip for",
    "label.date": "Date",
    "label.pickup": "Pick up",
    "label.goingto": "Going to",
    "label.passengers": "Passengers",
    "label.return": "Return",
    "driver.driver": "Driver",
    "driver.van": "Van",
    "driver.in": "in {min} min",
    "driver.doneat": "Done at {time}",
    "driver.noshowat": "No-show at {time}",
    "driver.undo": "Undo",
    "driver.noshow.confirm": "Mark as no-show? We will tell the transport coordinators.",
    "driver.noshow.yes": "Yes, mark no-show",
    "driver.goback": "Go back",
    "driver.contact": "Contact",
    "driver.progress": "{done} of {total} stops done",
    "driver.updated": "Route updated at {time}",
    "driver.navnote": "Opens your map app"
  },
  si: {
    "form.title": "වෑන් රථයක් ඉල්ලන්න",
    "form.intro": "මිනිත්තු 2ක් පමණ ගත වේ. සම්බන්ධීකාරකවරයෙක් ඔබේ ගමන තහවුරු කළ විට අපි ඔබට කෙටි පණිවිඩයක් එවන්නෙමු.",
    "lang.label": "භාෂාව",
    "section.you": "ඔබ ගැන",
    "section.trip": "ඔබේ ගමන",
    "section.extra": "විශේෂ අවශ්‍යතා තිබේද?",
    "name.label": "ඔබේ නම",
    "phone.label": "ඔබේ දුරකථන අංකය",
    "phone.hint": "උදාහරණය: 077 123 4567",
    "whatsapp.label": "මගේ යාවත්කාලීන තොරතුරු SMS වෙනුවට WhatsApp මඟින් එවන්න",
    "email.label": "ඊමේල් (අවශ්‍ය නම් පමණක්)",
    "email.hint": "ඔබේ යාවත්කාලීන තොරතුරුවල පිටපතක් මෙයට එවන්නෙමු.",
    "purpose.legend": "ගමන කුමක් සඳහාද?",
    "purpose.class": "පන්ති චාරිකාව",
    "purpose.sport": "ක්‍රීඩා",
    "purpose.errand": "කාර්ය මණ්ඩල රාජකාරි ගමන",
    "purpose.event": "රැස්වීම හෝ උත්සවය",
    "purpose.other": "වෙනත්",
    "date.label": "ගමනේ දිනය",
    "date.hint": "උදාහරණය: 13/10/2026",
    "cutoff.open": "හෙට දිනයේ ගමන් සඳහා ඉල්ලීම් අද ප.ව. 5:00ට අවසන් වේ.",
    "cutoff.closed": "හෙට දිනයේ ගමන් සඳහා ඉල්ලීම් අවසන්. හදිසි ප්‍රවාහනය සඳහා ප්‍රවාහන කාර්යාලයට 011 000 0100 අමතන්න.",
    "from.label": "ගමන ආරම්භ වන ස්ථානය",
    "to.label": "යන ස්ථානය",
    "place.branches": "අපේ ශාඛා",
    "place.venues": "ක්‍රියාකාරකම් ස්ථාන",
    "place.address": "වෙනත් ලිපිනයක් ලියන්න",
    "place.map": "සිතියමෙන් තෝරන්න",
    "stop.add": "+ නැවතුමක් එක් කරන්න",
    "time.label": "පිටත් වන වේලාව",
    "flex.legend": "පිටත් වන වේලාව කොපමණ වෙනස් විය හැකිද?",
    "flex.exact": "නියමිත වේලාවටම",
    "flex.10": "± විනාඩි 10",
    "flex.20": "± විනාඩි 20",
    "flex.30": "± විනාඩි 30",
    "arrive.label": "පැමිණිය යුතු අවසන් වේලාව (අවශ්‍ය නම් පමණක්)",
    "pax.label": "මගීන් කී දෙනෙක්ද? (රියදුරු හැර)",
    "pax.decrease": "මගීන් එක් අයෙකු අඩු කරන්න",
    "pax.increase": "මගීන් එක් අයෙකු වැඩි කරන්න",
    "pax.split": "මෙම කණ්ඩායමට වෑන් රථ එකකට වඩා අවශ්‍යයි – අපි එය සකස් කරන්නෙමු.",
    "return.legend": "ආපසු ගමනක් අවශ්‍යද?",
    "yes": "ඔව්",
    "no": "නැත",
    "return.time": "ආපසු පිටත් වන වේලාව",
    "return.stay": "වෑන් රථය අප සමඟ රැඳී සිටිය යුතුයි (උදා: උපකරණ හෝ ආරක්ෂාව සඳහා)",
    "special.wheelchair": "රෝද පුටු පහසුකම අවශ්‍යයි",
    "special.equipment": "විශාල උපකරණ",
    "special.notes": "අප දැනගත යුතු වෙනත් යමක් තිබේද?",
    "submit": "ඉල්ලීම යවන්න",
    "privacy": "ඔබේ නම සහ දුරකථන අංකය මෙම ගමන සැලසුම් කිරීමට පමණක් භාවිත කරමු. ප්‍රවාහන සම්බන්ධීකාරකවරුන්ට සහ වෑන් රියදුරුට ඒවා පෙනේ. අපි ඒවා මාස 24ක් තබා ගනිමු.",
    "privacy.link": "ඔබේ තොරතුරු භාවිත කරන ආකාරය",
    "err.summary": "ගැටලුවක් ඇත",
    "err.name": "කරුණාකර ඔබේ නම ඇතුළත් කරන්න",
    "err.phone.empty": "කරුණාකර දුරකථන අංකයක් ඇතුළත් කරන්න",
    "err.phone.format": "දුරකථන අංකය 077 123 4567 ආකාරයට ඇතුළත් කරන්න",
    "err.purpose": "ගමන කුමක් සඳහාද යන්න තෝරන්න",
    "err.date.past": "ගමනේ දිනය අද හෝ ඊට පසු දිනයක් විය යුතුයි",
    "err.from": "ගමන ආරම්භ වන ස්ථානය තෝරන්න",
    "err.to": "යන ස්ථානය තෝරන්න",
    "err.time": "පිටත් වන වේලාව ඇතුළත් කරන්න",
    "err.pax": "කරුණාකර 1 සිට 99 දක්වා අංකයක් ඇතුළත් කරන්න",
    "err.return": "ඔව් හෝ නැත තෝරන්න",
    "err.return.time": "ආපසු පිටත් වන වේලාව පිටත් වන වේලාවට පසුව විය යුතුයි",
    "done.title": "ඉල්ලීම ලැබුණා",
    "done.ref": "ඔබේ යොමු අංකය",
    "done.next": "සම්බන්ධීකාරකවරයෙක් ඔබේ ගමන තහවුරු කළ විට අපි ඔබට කෙටි පණිවිඩයක් එවන්නෙමු. අවසන් ගමන් විස්තර ගමන් දිනයේ උදෑසන ලැබේ.",
    "done.another": "තවත් ගමනක් ඉල්ලන්න",
    "driver.title": "අද ගමන් මාර්‍ගය",
    "driver.stop": "නැවතුම",
    "driver.pickup": "මගීන් නංවා ගන්න",
    "driver.dropoff": "මගීන් බස්සන්න",
    "driver.passengers": "මගීන්",
    "driver.navigate": "මඟ පෙන්වන්න",
    "driver.call": "අමතන්න",
    "driver.done": "නිම කළා",
    "driver.noshow": "මගීන් පැමිණියේ නැත",
    "driver.next": "ඊළඟ නැවතුම",
    "driver.offline": "ඔබ අන්තර්ජාලයට සම්බන්ධ නැත. මෙය පෙ.ව. 9:38ට අවසන් වරට ලබාගත් ගමන් මාර්‍ගයයි.",
    "driver.gap": "අතරමැදි ගමන",
    "driver.end": "දවස A ශාඛාවෙන් අවසන්",
    "lang.note": "ඔබේ භාෂා තේරීම මෙම දුරකථනයේ මතක තබා ගනී.",
    "day.today": "අද",
    "day.tomorrow": "හෙට",
    "day.monday": "සඳුදා",
    "day.tuesday": "අඟහරුවාදා",
    "day.wednesday": "බදාදා",
    "day.thursday": "බ්‍රහස්පතින්දා",
    "day.friday": "සිකුරාදා",
    "date.closed": "වසා ඇත",
    "date.other": "වෙනත් දිනයක්",
    "cutoff.monday": "සඳුදා දිනයේ ගමන් සඳහා ඉල්ලීම් සඳුදා පෙ.ව. 7:00ට අවසන් වේ.",
    "cutoff.today.closed": "අද දිනයේ ගමන් සඳහා ඉල්ලීම් පෙ.ව. 7:00ට අවසන් විය. හදිසි ප්‍රවාහනය සඳහා ප්‍රවාහන කාර්යාලයට 011 000 0100 අමතන්න.",
    "time.choose": "වේලාවක් තෝරන්න",
    "time.morning": "උදෑසන",
    "time.afternoon": "පස්වරුව",
    "time.am": "පෙ.ව.",
    "time.pm": "ප.ව.",
    "hours.warning": "ප.ව. 6:00ට පසු ගමන් අපගේ සාමාන්‍ය වේලාවෙන් පිටතය. සම්බන්ධීකාරකවරයෙක් ඔබේ ඉල්ලීම පරීක්ෂා කරනු ඇත.",
    "place.choose": "ස්ථානයක් තෝරන්න",
    "place.other": "වෙනත් ලිපිනයක්",
    "place.landmark": "සලකුණක් හෝ මඟ විස්තර (අවශ්‍ය නම් පමණක්)",
    "stop.label": "අමතර නැවතුම",
    "stop.remove": "මෙම නැවතුම ඉවත් කරන්න",
    "arrive.add": "පැමිණිය යුතු වේලාවක් එක් කරන්න",
    "err.date": "ගමනේ දිනය තෝරන්න",
    "err.date.format": "දිනය 13/10/2026 ආකාරයට ඇතුළත් කරන්න",
    "err.return.empty": "ආපසු පිටත් වන වේලාව තෝරන්න",
    "summary.title": "ඔබේ ඉල්ලීම පරීක්ෂා කරන්න",
    "done.what": "ඊළඟට සිදු වන්නේ",
    "label.purpose": "ගමනේ අරමුණ",
    "label.date": "දිනය",
    "label.pickup": "පිටත් වීම",
    "label.goingto": "යන ස්ථානය",
    "label.passengers": "මගීන්",
    "label.return": "ආපසු ගමන",
    "driver.driver": "රියදුරු",
    "driver.van": "වෑන්",
    "driver.in": "විනාඩි {min}කින්",
    "driver.doneat": "{time}ට නිම කළා",
    "driver.noshowat": "{time}ට මගීන් පැමිණියේ නැත",
    "driver.undo": "ආපසු හරවන්න",
    "driver.noshow.confirm": "මගීන් පැමිණියේ නැති බව සටහන් කරන්නද? අපි ප්‍රවාහන සම්බන්ධීකාරකවරුන්ට දැනුම් දෙන්නෙමු.",
    "driver.noshow.yes": "ඔව්, සටහන් කරන්න",
    "driver.goback": "ආපසු යන්න",
    "driver.contact": "සම්බන්ධ කරගන්න",
    "driver.progress": "නැවතුම් {total}න් {done}ක් නිම කළා",
    "driver.updated": "ගමන් මාර්‍ගය {time}ට යාවත්කාලීන කළා",
    "driver.navnote": "ඔබේ සිතියම් යෙදුම විවෘත කරයි"
  }
};
```

Time and date helpers your script needs (write them yourself, with JSDoc):
English time `formatTime(hours, minutes)` returns "8:45 am", "12:30 pm";
Sinhala returns "පෙ.ව. 8:45", "ප.ව. 12:30". Dates are always "13/10/2026".
Weekday plus date: "Tuesday 13/10/2026" or "අඟහරුවාදා 13/10/2026".

---

## 5. Page specifications (the same for every direction)

Your direction (section 6) decides how things look. This section decides what
is on each page and how it behaves.

### 5.1 `index.html` – foundations

Sections, in this order, each with a heading:

1. **About this direction.** Name, the concept in two or three sentences, the
   principles, and links to the other three pages of this direction and back to
   the gallery (`../index.html`).
2. **Logo.** The full logo on its intended background; the crest and the
   keyline crest on light, dark and purple backgrounds; clear space and
   minimum sizes; two "don't" examples described in words (do not draw a
   distorted logo).
3. **Colour.** Every token in your colour table: swatch, token name, hex, role,
   and its contrast ratio against the background it is used on (text it with
   "AA" or "AAA" and the ratio). Show the purple scale and neutral scale with
   their ratios on white.
4. **Type.** The type scale with each style's name, size, line height and use.
   A real English sample and the same sample in Sinhala, using the shared
   strings (for example the form title, a label, a hint and an error). Show the
   Sinhala size factor at work.
5. **Spacing and grid.** The spacing scale drawn as bars with values; the phone
   and desktop grids.
6. **Icons.** Your full icon set (section 6, "Icons") at 24 px, each with its
   name. Note the drawing rules (grid, stroke, corners).
7. **Components, each with all of its states:**
   - Buttons: primary, secondary, quiet/text, destructive; states default,
     hover, focus, pressed, disabled, busy ("Sending…").
   - Text field: default, focus, filled, with hint, error (with the message
     "Please enter your name"), disabled.
   - Radio cards for trip purpose (Class trip, Sport, Staff errand, Meeting or
     event, Other): default, hover, focus, selected, error ("Choose what the
     trip is for").
   - Date choice and time choice (as in 5.2): default, selected, closed date,
     error.
   - Passenger stepper: default, at minimum (1), above 12 (shows "This group
     needs more than one van – we'll arrange this."), error.
   - Checkboxes: unchecked, checked, focus, disabled.
   - Status badges for all eight statuses (Submitted, Proposed, Needs attention,
     Confirmed, Declined, Cancelled, Completed, No-show) and the flags (Late
     (exception), Shared, Gap job, Out of hours, New requester, Fixed trip,
     Early trip, Completion not confirmed). Show them in colour and in a
     greyscale copy (CSS `filter: grayscale(1)` on a duplicate row) to prove
     they still read.
   - Alerts: information (cutoff), success (request received), warning (out of
     hours), error (error summary with two linked errors).
   - Data table: "Today's trips" (section 4.5, 10 rows) with caption, sortable
     look on the Time column (sorting need not work), status column using
     badges.
   - Navigation: the coordinator navigation (Dashboard, Calendar, Requests,
     Fixed trips, Vans and drivers, Places, Reports, Settings) with the current
     page marked by more than colour; and the phone header with the language
     switch.
8. **Your signature element**, shown on its own with a one-paragraph
   explanation of the job it does.
9. **Motion.** What moves, how long, and what happens with reduced motion.

### 5.2 `request.html` – the public form (phone, 360 px)

Requirements: FR-01 to FR-07, FR-09, FR-49, FR-54, FR-55, FR-65, NFR-01,
NFR-02, US-01, US-02, US-03, US-05, US-46, US-47, US-58.

**Layout.** One scrolling page (NFR-02). Order, following section 6.3 of the
specification:

| # | Element | Control | Required | Notes |
|---|---|---|---|---|
| 0 | Header: crest, "PolymathTransit", English / සිංහල switch | Two buttons | – | Choice remembered (FR-65). |
| – | `<h1>` "Request a van" and the intro sentence | – | – | |
| 1 | Your name | Text input, `autocomplete="name"` | Yes | |
| 2 | Your phone number | `type="tel"`, `inputmode="tel"`, `autocomplete="tel"`; hint "For example, 077 123 4567" | Yes | Accept 07X XXX XXXX, 0XX XXX XXXX and +94… (FR-03). |
| 2a | Send my updates on WhatsApp instead of SMS | Checkbox | No | |
| 3 | Email (optional) | `type="email"`, `autocomplete="email"`; hint | No | |
| 4 | What is the trip for? | Radio group of 5 options (FR-02) | Yes | One tap. On 360 px use one column, or two columns that let Sinhala wrap (research.md 3.2). |
| 5 | Date of trip | Radio group of the next school days, plus "Another date" | Yes | See "Date choice" below. The cutoff message sits right under the legend (FR-07). |
| 6 | Pick up from | `<select>` with `<optgroup>`s; "Another address" reveals a text field, a "Choose on map" button and "Landmark or directions (optional)" | Yes | FR-05, FR-52. Map is not built: the button shows a short note. |
| 7 | Going to | Same as 6; under it a "+ Add a stop" button (up to 3 extra stops) | Yes | FR-54. Each stop: place, Pick up / Drop off, passengers on or off, and "Remove this stop". |
| 8 | Pickup time | `<select>` of times every 5 minutes from 7:00 am to 6:00 pm, in two `<optgroup>`s (Morning, Afternoon), labelled "8:45 am" style | Yes | Native selects give phones a wheel picker and guarantee the "10:30 am" format. Times after 6:00 pm are not offered; if a builder shows the out-of-hours warning, use the shared string. |
| 9 | How flexible is your pickup time? | Radio group: Exact time, ± 10 min (selected by default), ± 20 min, ± 30 min | No (default ± 10) | FR-55. "Add a time you must arrive by" is a `<details>` disclosure holding the optional "Must arrive by" time. |
| 10 | How many passengers (not counting the driver)? | Number input with − and + buttons (44 px), `inputmode="numeric"`, 1 to 99, starts empty | Yes | Above 12 shows the split message (US-03 AC-3) as information, not an error. |
| 11 | Do you need a return trip? | Radio group Yes / No (no default) | Yes | "Yes" reveals "Return pickup time" (required) and "Van must stay with us …" (optional) (FR-06). |
| 12 | Anything special? | `<details>` disclosure holding two checkboxes (Wheelchair access needed, Large equipment) and the text area "Anything else we should know?" | No | FR-09. |
| – | Send request | Primary button, full width | – | |
| – | Privacy notice | Short paragraph and a "How we use your details" link, below the button (FR-49, US-44 AC-1) | – | |

This shows 12 fields by default (NFR-02): items 1, 2, 2a, 3, 4, 5, 6, 7, 8, 9,
10 and 11. "Must arrive by" and "Anything special?" stay closed until opened.

**Date choice (FR-07, BRL-13, US-05).** The form's "now" is Monday 12/10/2026,
2:40 pm. Show these options:

| Option | State | Message when chosen |
|---|---|---|
| Today, Monday 12/10/2026 | **Closed** (shown, disabled, with the word "Closed") | – (if focused, the cutoff text explains: "Requests for today closed at 7:00 am. For urgent transport, call the transport office on 011 000 0100.") |
| Tomorrow, Tuesday 13/10/2026 | Open | "Requests for tomorrow close at 5:00 pm today." |
| Wednesday 14/10/2026 | Open | – |
| Thursday 15/10/2026 | Open | – |
| Friday 16/10/2026 | Open | – |
| Monday 19/10/2026 | Open | "Requests for Monday close at 7:00 am on Monday." |
| Another date | Reveals a text field "DD/MM/YYYY" with the hint "For example, 13/10/2026" | – |

The cutoff message for tomorrow shows by default (it is the most likely
choice) and changes when another date is chosen. Use `role="status"` so screen
readers hear the change.

**Validation (FR-03, US-01 AC-2 to AC-4, US-03 AC-4).**

- Validate a field when the person leaves it (on blur) only after they have
  typed in it; validate everything on "Send request". Never validate on each
  keystroke.
- On submit with errors: do not send; show the error summary at the top (title
  "There is a problem", one link per error, in page order), move focus to it,
  and show each message next to its field. Keep everything the person typed.
- Error messages (use the shared strings, both languages):

| Field | Problem | Message |
|---|---|---|
| Your name | Empty | Please enter your name |
| Your phone number | Empty | Please enter a phone number |
| Your phone number | Not a Sri Lankan number | Enter a phone number like 077 123 4567 |
| What is the trip for? | None chosen | Choose what the trip is for |
| Date of trip | None chosen | Choose the date of the trip |
| Date of trip (another date) | Wrong format | Enter a date like 13/10/2026 |
| Date of trip (another date) | In the past | The date of the trip must be today or later |
| Pick up from | None chosen | Choose where to pick you up |
| Going to | None chosen | Choose where you are going |
| Pickup time | None chosen | Enter a pickup time |
| Passengers | Empty, 0 or above 99 | Please enter a number between 1 and 99 |
| Return trip | None chosen | Choose Yes or No |
| Return pickup time | Empty when Yes | Choose a return pickup time |
| Return pickup time | Not after the pickup time | The return pickup time must be after the pickup time |

**Confirmation state (FR-04, US-01 AC-5).** On a valid submit, replace the form
with:

- Heading "Request received" and the reference **PT-2026-0142**, large and
  easy to read aloud or copy.
- A summary under "Your trip": Trip for: Sport · Date: Tuesday 13/10/2026 ·
  Pick up: 8:45 am (± 10 min) from Branch B · Going to: Sports Centre ·
  Passengers: 4 · Return: 10:45 am from Sports Centre. (Build the summary from
  what was entered; the sample answers produce exactly this.)
- "What happens next": the shared `done.next` string.
- A "Request another trip" link back to an empty form.
- Move focus to the heading. Use the current language.

**Without JavaScript.** The form shows every field, including the return-trip
fields (with "(only if you need a return trip)" added to their labels), the
"Another date" and "Another address" fields, and three empty extra-stop rows
inside a closed "Add a stop" `<details>`. The language switch appears as two
links to the same page; note in a comment that in production the server
renders the chosen language. The form `action` is `#`.

**Prototype controls** (bottom bar): "Fill with sample answers" (the answers
for PT-2026-0142 from section 4.5), "Show errors" (submits the empty form),
"Show confirmation" (fills and submits), "Reset".

### 5.3 `dashboard.html` – the coordinator dashboard (desktop)

Requirements: FR-19, FR-20, FR-25, FR-26, FR-27, FR-28, FR-29, FR-30, FR-57,
FR-58, FR-62, BRL-06, BRL-11, BRL-21, US-16, US-17, US-22, US-23, US-26,
US-54. English only.

**Regions, in priority order (US-22 AC-1):**

1. **Header and navigation**: crest, "PolymathTransit", the coordinator
   navigation (Dashboard current), the signed-in user "Anoma Jayawardena,
   Coordinator", and "Sign out".
2. **Tiles**, first to last: "Today's plan – ready to approve" (the largest,
   with the "Approve today's plan" action), "Needs attention (2)", "Awaiting
   approval (7)", "Late exceptions (1)", "Today's trips (10)". Content from
   section 4.8. Each tile is a link or button that would open its list.
   Show "Updated 7:05 am" with `aria-live="polite"`; the counts would refresh
   every 30 seconds (US-22 AC-4).
3. **Day timeline** for Tuesday 13/10/2026 (FR-29, US-26 AC-1):
   - A time axis from **7:00 am to 6:00 pm** with an hour scale.
   - One row per van (Van 1 – 12 seats, Van 2 – 8 seats), with the van's
     available hours shown.
   - Bookings as blocks at their times (section 4.6), marked by status (colour
     **and** word or shape), with fixed trips marked with your repeat icon,
     the gap job (PT-2026-0145) marked as a gap job and drawn inside Van 1's
     wait at the Aquatic Centre, shared runs (PT-2026-0140 and 0142) shown as
     one run, the early trip, the late exception, and PT-2026-0151 running past
     6:00 pm (out of hours, drawn beyond the edge marker).
   - PT-2026-0147 sits on Van 2's row at 11:20 am as a tentative block marked
     Needs attention (a route was found, but it is not in the plan until a
     coordinator checks it).
   - A third row "Not placed" holding PT-2026-0149 (needs attention).
   - A "now" marker at 7:05 am.
   - A legend that explains every mark in words.
   - "Show as list" toggles a table of the same bookings (FR-29 list view).
   - Every block is a button; choosing one opens it in the detail panel.
4. **Detail panel**, opened on **PT-2026-0142** when the page loads: status
   Proposed, flag Shared, requester and phone, trip details, the explanation
   (section 4.7) as plain text, the run summary with seats on board at each
   stop, actions Approve (primary), Change, Decline (destructive, separated),
   and the audit line "Planned by the system at 5:00 pm on 12/10/2026 (Optimise
   day)."
5. **Filters** above the list (status, van, date, place): visible controls, no
   need to work.

**Behaviour:**

- Choosing another block (for example PT-2026-0145 or PT-2026-0149) shows its
  details and explanation in the panel.
- "Approve" on a proposal changes its status to Confirmed in the panel, the
  timeline block and the counts, with a status message "PT-2026-0142
  confirmed. Kasun Jayasinghe will get a text." and an Undo for 10 seconds.
- "Approve today's plan" opens the confirmation step (section 4.8), then the
  success state.
- Keyboard: every block reachable with Tab in time order per van; Enter or
  Space opens it; Escape closes any dialog and returns focus.

**Prototype controls:** "Approve the plan", "Open PT-2026-0149", "Show list
view", "Reset".

### 5.4 `driver.html` – the driver's route link (phone, 360 px)

Requirements: FR-61, FR-65, FR-67, NFR-18, US-52, US-60.

**Content:** Van 1, Tuesday 13/10/2026, driver Sunil Rathnayake, "Route
updated at 7:06 am", progress "4 of 14 stops done", now 9:40 am.

- **Next stop**, prominent: stop 5, 10:00 am, Branch B, Pick up 1 passenger,
  PT-2026-0145, contact Shamila Rodrigo with a Call link
  (`tel:+94770000145`), a **Navigate** button, the note "Gap job", and the
  actions **Done** and **No-show**. Show "in 20 min".
- **Stops 1 to 4** done, shown compact with their actual times (7:31 am, 7:56
  am, 9:06 am, 9:29 am) and collapsed by default.
- **Stops 6 to 14** upcoming, each with time, place, Pick up or Drop off,
  passengers, booking, contact (with Call), note, Navigate, Done and No-show.
- End of the list: "End of day at Branch A".

**Behaviour (US-60):**

- **Done** marks the stop with the time ("Done at 9:41 am"), moves "Next stop"
  to the following stop, updates the progress, and offers **Undo** for 10
  seconds.
- **No-show** asks first: "Mark as no-show? We will tell the transport
  coordinators." with "Yes, mark no-show" and "Go back". After yes: "No-show at 9:41
  am".
- **Navigate** shows a short note "Opens your map app" (the map service is
  not chosen yet, Q-17).
- **Language switch** as on the form; the route stays the same.
- **Offline (NFR-18):** a prototype control shows the banner "You are offline.
  This is the route as last loaded at 9:38 am." and keeps the route visible.
- Done and No-show must be hard to hit by mistake: 48 px tall or more, at least
  8 px apart, No-show visually quieter than Done. Sinhala "No-show" is long
  (research.md 3.2): stack the two buttons or let them wrap.

**Prototype controls:** "Simulate offline", "Mark next stop done", "Reset".

---

## 6. The five directions

Each direction below gives: concept, research, principles, colour roles
(verified), type, layout and grid, signature element, status treatment,
iconography, motion, and what keeps it from feeling generic. Build only your
own.

**README contents (every direction).** Write `README.md` as a design
rationale: Decision (this direction in one paragraph), Context (C-01, BO-04,
the brand, phones, two languages), Options considered (how you resolved the
choices this brief left open), Evidence (the references, by principle),
Reasoning, Trade-offs (what this direction is worse at), Validation plan (what
to test with the five staff in the BO-04 usability test), the principles, a
list of every requirement ID shown, and known gaps.

---

### 6.1 Direction 1 – Stop by Stop

**Concept.** Every journey is drawn as a line with stops. The same diagram
grammar runs through the whole system: on the form your trip appears as a line
you build stop by stop, on the dashboard each van's day is a line along the
clock, and on the driver's phone the route is a vertical strip of stops. It is
signage discipline applied to software: one typeface, few sizes, heavy rules,
shapes that mean something.

**Research it draws on.** Beck's diagram (order and connection over geography);
the NYCTA Graphics Standards Manual (a system of rules, a fixed module, identity
carried by more than colour); Kinneir and Calvert (shape coding, mixed case,
"what do I want to know … at speed?"); SL Stockholm (several ways to navigate
at once); the MTA Live Subway Map (live state on a diagram); Legible London
(progressive disclosure); V&A Wayfinding (restricted, purposeful colour).

**Principles.**

1. Draw the route, then label it. Order and connection come first.
2. A shape means one thing everywhere.
3. One typeface, five sizes, two weights.
4. Read it at walking pace: the next thing is always the biggest thing.

**Colour roles (verified).**

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--c-brand` | `#722A82` | The route line, primary buttons, selected states, links | 8.86:1 on white; white on it 8.86:1 |
| `--c-brand-strong` | `#581D65` | Pressed, visited | 11.81:1 on white |
| `--c-brand-tint` | `#F7E6FB` | Selected option background | brand on it 7.46:1; black on it 17.67:1 |
| `--c-ink` | `#000000` | Text; the signage band behind headers and section plates | white on it 21:1 |
| `--c-ink-2` | `#63666B` | Secondary text | 5.76:1 on white; 5.15:1 on panel |
| `--c-ground` | `#FFFFFF` | Page | |
| `--c-panel` | `#F2F2F3` | Quiet panels | |
| `--c-line-inactive` | `#8F9298` | Not-yet-confirmed route sections (dashed), input borders are black instead | 3.12:1 on white |
| `--c-ok` / `--c-ok-tint` | `#006E30` / `#E7F7E9` | Confirmed, Completed accents | 6.42:1 on white; 5.77:1 on tint |
| `--c-attention` | `#F3B01D` | Needs attention: a fill **always** with black text and a 2 px black border | black on it 11.04:1 (the fill alone is 1.90:1 on white, so the border is required) |
| `--c-danger` / `--c-danger-tint` | `#B7191C` / `#FFEDEB` | Errors, Declined, No-show | 6.63:1 on white; 5.86:1 on tint |
| `--c-info` / `--c-info-tint` | `#015F98` / `#E8F4FE` | Proposed, information | 6.79:1 on white; 6.08:1 on tint |
| Focus | 3 px `#722A82` outline, 2 px offset; on the black band 3 px `#FFFFFF` | | 8.86:1; 21:1 |

**Type.** Latin **Overpass** (400, 700); Sinhala **Noto Sans Sinhala** (400,
700); figures `font-variant-numeric: tabular-nums` for all times. Google Fonts
families: `Overpass:wght@400;700` and `Noto+Sans+Sinhala:wght@400;700`.

| Style | Phone | Desktop | Line height | Weight | Use |
|---|---|---|---|---|---|
| Display | 32 px | 40 px | 1.1 | 700 | Page title, the next stop's time |
| Heading | 24 px | 28 px | 1.2 | 700 | Section plates |
| Subhead | 20 px | 20 px | 1.3 | 700 | Field labels on the form, tile titles |
| Body | 17 px | 16 px | 1.45 (Sinhala 1.65) | 400 | Text, inputs |
| Small | 14 px | 14 px | 1.4 | 400 | Hints, legends, metadata |

Sinhala size factor: 0.95 (Noto Sans Sinhala draws Sinhala larger than
Overpass's x-height). Letter-spacing 0 everywhere; no capitals-only text
except reference codes.

**Layout and grid.** 8 px base unit; spacing scale 4, 8, 16, 24, 32, 48, 64.
Phone: 4 columns, 16 px margins and gutters. Desktop: 12 columns, 24 px
gutters, 1280 px maximum. Corners square (0 px) on plates and panels, 4 px on
inputs and buttons; no shadows. Headers are full-width black bands (56 px on
phones) with the keyline crest and "PolymathTransit" in white. Each form
section opens with a black "plate" carrying a number and title ("1 About
you", "2 Your trip", "3 Anything special?").

**Signature element: the route spine.** A 6 px purple line with stop markers
runs down the left of "Your trip" on the form: a marker at "Pick up from", a
marker at each extra stop, and a terminal marker at "Going to". "+ Add a stop"
inserts a new marker on the line, so the order of stops is visible before
anything is sent (FR-54, BRL-18). The same spine appears in the dashboard's
run summary (with seats on board beside each stop) and as the backbone of the
driver's route, where done sections turn solid black and the next stop's
marker is the largest thing on the screen. It does a job: it shows order,
which is the one thing a multi-stop request can get wrong.

**Status treatment: shape-coded markers** (Kinneir and Calvert's principle,
our own shapes). Each status has a marker shape used on badges, timeline
blocks and the spine, always followed by the word:

| Status | Marker | Colour |
|---|---|---|
| Submitted | dotted ring | ink-2 |
| Proposed | open ring | info |
| Needs attention | diamond, filled | attention fill, black edge |
| Confirmed | filled disc | ok |
| Declined | disc with a cross cut out | danger |
| Cancelled | ring with a diagonal stroke | ink-2 (do not strike through the word: keep it readable) |
| Completed | filled square | ink |
| No-show | open square with a diagonal stroke | danger |

Flags are rectangular "plates" with an icon and a word, in black outline.
Timeline: each van row is a thin grey line; bookings are thick line sections
(solid for Confirmed, dashed for Proposed) with markers at each stop.

**Icons.** Pictograms on a 24 px grid, **filled** solid shapes (signage
style), square-ended, 2 px minimum detail; arrows are solid, 45° and 90° only.
Set: van, passengers, clock, calendar, pick up, drop off, map pin, phone,
navigate, check, cross, warning, repeat (fixed trip), shared, gap job, out of
hours, new requester, late, wheelchair (your own drawing of an accessible
symbol), large equipment, information, undo, offline, plus, minus, chevron,
menu.

**Motion.** When a stop is added, the spine extends to the new marker (150 ms,
`stroke-dashoffset` or height); when a driver taps Done, the section to that
stop fills black (150 ms). Reduced motion: instant.

**What keeps it from feeling generic.** No cards at all: content sits on
plates and lines. Black signage bands carry structure. Shapes, not colour,
carry status. One typeface with a road-sign lineage.

---

### 6.2 Direction 2 – Inscription

**Concept.** The college speaks in its own voice. Classical inscriptional
capitals, taken from the wordmark, name things briefly; the humanist italic of
"Learn to Live" becomes the voice that guides and explains; and the calm of Sri
Lankan tropical modernism (lime-washed light grounds, one deep shaded band that
frames what matters) gives the pages their space. It should feel like the
college, not like software.

**Research it draws on.** The logo itself (research.md 1.6); Geoffrey Bawa's
tropical modernism (composed light and shade, honest local materials); Abhaya
Libre and the 1960s Sinhala letterpress tradition; Mooniak's "reducing
dissonance" between scripts; V&A Wayfinding (respect the heritage, guide
clearly); Marcellus (Roman inscription letterforms).

**Principles.**

1. Speak as the college: courteous, brief, never chatty.
2. Capitals name; italic guides; roman does the work.
3. One deep band frames what matters most on each page; everything else is
   calm.
4. Every colour comes from a material and has a job.

**Colour roles (verified).**

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--c-brand` | `#722A82` | Primary buttons, links, the active ladder step | 8.30:1 on lime-wash; white on it 8.86:1 |
| `--c-band` | `#3F1448` | The verandah band (purple-900): header, form title area, dashboard rail | white on it 14.95:1 |
| `--c-band-note` | `#EDCEF4` | Italic notes on the band | 10.49:1 on band |
| `--c-ground` | `#FAF7F2` | Lime-wash page ground | |
| `--c-surface` | `#FFFFFF` | Fields, panels | |
| `--c-ink` | `#1C181B` | Text (warm black) | 16.43:1 on lime-wash |
| `--c-ink-2` | `#63666B` | Logo grey: italic hints, metadata | 5.39:1 on lime-wash |
| `--c-rule` | `#D9CFC0` | Decorative hairlines only (never a component edge) | |
| `--c-edge` | `#8C8378` | Input and control borders | 3.73:1 on white; 3.49:1 on lime-wash |
| `--c-leaf` / tint | `#335C2A` / `#E9F6E6` | Confirmed, Completed (leaf green) | 7.26:1; 6.95:1 on tint |
| `--c-laterite` / tint | `#A34D16` / `#FFEEE6` | Needs attention, warnings (laterite) | 5.41:1; 5.13:1 on tint |
| `--c-brick` / tint | `#972527` / `#FFEDEB` | Errors, Declined, No-show (brick) | 7.53:1; 7.11:1 on tint |
| `--c-slate` / tint | `#285F78` / `#E3F5FF` | Proposed, information (slate) | 6.55:1; 6.26:1 on tint |
| Focus | 3 px `#3F1448` outline, 2 px offset; on the band 3 px `#FFFFFF` | | 13.99:1; 14.95:1 |

**Type.** Latin capitals **Marcellus** (400) for short labels only; Latin text
**Ysabeau Office** (400, 600, and italic 400); Sinhala headings **Abhaya
Libre** (600, 700); Sinhala text **Noto Serif Sinhala** (400, 600). Google
Fonts families: `Marcellus`, `Ysabeau+Office:ital,wght@0,400;0,600;1,400`,
`Abhaya+Libre:wght@600;700`, `Noto+Serif+Sinhala:wght@400;600`. On
`request.html` and `driver.html` load Abhaya Libre at one weight (700) only, to
stay in budget.

| Style | Phone | Desktop | Line height | Face | Use |
|---|---|---|---|---|---|
| Inscription | 15 px, capitals, letter-spacing 0.12 em | 15 px | 1.3 | Marcellus | Section names ("ABOUT YOU"), tile names, the product name. Never more than four words. |
| Title | 30 px | 36 px | 1.15 | Ysabeau Office 600 (Sinhala: Abhaya Libre 700) | Page titles |
| Heading | 22 px | 24 px | 1.25 | Ysabeau Office 600 (Sinhala: Abhaya Libre 700) | Questions as headings, panel titles |
| Body | 19 px | 17 px | 1.5 (Sinhala 1.7) | Ysabeau Office 400 (Sinhala: Noto Serif Sinhala 400) | Text, inputs |
| Voice | 18 px italic | 16 px italic | 1.45 | Ysabeau Office italic | Hints, explanations, the system's notes. Sinhala uses Noto Serif Sinhala regular in `--c-ink-2` (Sinhala has no italic). |
| Small | 15 px | 14 px | 1.4 | Ysabeau Office 400 | Metadata |

Sinhala size factors: Abhaya Libre 1.35 (its Sinhala is drawn small; research.md
3.1); Noto Serif Sinhala 0.95. Marcellus capitals are never used for Sinhala:
Sinhala section names use Abhaya Libre 700 at 17 px.

**Layout and grid.** 4 px base unit; a calm scale 4, 8, 12, 20, 32, 52, 84
(close to the golden ratio, used for vertical rhythm). Phone: single column,
20 px margins. Desktop dashboard: a 300 px **verandah rail** in `--c-band` on
the left (date, the day's plan and its ladder, navigation), and a courtyard
area of 12 columns with 24 px gutters. Corners 2 px; no shadows; thin
`--c-rule` hairlines separate sections like ruled pages. On phones the band
holds the header, the title and the intro; the form sits on lime-wash below
it.

**Signature element: the step ladder.** The crest's stepped top becomes the
booking's progress mark: four rising steps (Submitted, Proposed, Confirmed,
Completed), each filled as the booking reaches it, labelled in words. It
appears on the confirmation screen ("Request received" with step 1 filled and
a line in the voice style: "Next, a coordinator checks your trip."), in the
dashboard detail panel, and in the rail for the day's plan (Optimised →
Approved → Details sent). Off-ladder outcomes (Needs attention, Declined,
Cancelled, No-show) show as a step that drops away, with the word. Its job:
tell a non-technical person where their request stands and what happens
next, using a shape that already belongs to the college. Draw it in SVG from
simple rectangles; do not trace the crest.

**Status treatment.** A badge is the ladder glyph (16 px, filled to the
status's step) plus the word in Ysabeau Office 600, with a 3 px rule on the
left in the status colour and the tint behind. Needs attention uses laterite,
Declined and No-show brick, Cancelled ink-2 with the dropped-step glyph,
Proposed slate, Confirmed and Completed leaf. Flags are italic words with a
small icon, in ink-2, with no box (for example *Shared*, *Gap job*).

**Icons.** Fine line icons on a 24 px grid, 1.5 px stroke, round joins, flat
(not rounded) ends, drawn to sit with Marcellus's flared strokes. Same set as
direction 1 (section 6.1 list).

**Motion.** The ladder step fills over 200 ms when a status changes; the
detail panel fades in (150 ms). Reduced motion: instant.

**What keeps it from feeling generic.** Inscriptional capitals and a
calligraphic italic voice, a letterpress-era Sinhala face, lime-wash and a
deep verandah band instead of white cards on grey, colours named after
materials and each tied to a status, and a signature drawn from the college's
own crest.

---

### 6.3 Direction 3 – Plain Words

**Concept.** The interface reads like a clear note from the transport office.
One column, large type, no decoration: every screen answers "what do I do
now?" in words first. Its signature is a sentence: as you fill in the form,
PolymathTransit writes your request back to you in one plain sentence, the same
sentence the coordinator reads and the text message repeats.

**Research it draws on.** GOV.UK (Design of the Year 2013; "do the hard work
to make it simple"; "this is for everyone"); GOV.UK error message and question
page guidance; Fantastical 2 (Apple Design Award 2015: a booking read back as a
sentence); Atkinson Hyperlegible (letters and numbers that cannot be confused).

**Principles.**

1. Words first: if a sentence can do it, use a sentence.
2. One column, one thing at a time, in the order people think.
3. Big enough to read without glasses, in sunlight.
4. Nothing on the page without a job.

**Colour roles (verified).**

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--c-text` | `#000000` | Text, input borders (2 px) | 21:1 |
| `--c-text-2` | `#63666B` | Hint text | 5.76:1 |
| `--c-brand` | `#722A82` | Links (underlined), primary buttons, the sentence's left rule | 8.86:1 |
| `--c-brand-visited` | `#581D65` | Visited links | 11.81:1 |
| `--c-ground` | `#FFFFFF` | Page | |
| `--c-panel` | `#F3F2F4` | The sentence box, inset text | black on it 18.82:1 |
| `--c-ok` / tint | `#197037` / `#E7F7E9` | Confirmed, success | 6.15:1; 5.53:1 on tint |
| `--c-attention` | `#FFBD59` | Needs attention: fill with black text and 2 px black border | black on it 12.68:1 (border required: the fill alone is 1.66:1 on white) |
| `--c-danger` / tint | `#B32228` / `#FFEDEB` | Errors, Declined, No-show | 6.61:1; 5.85:1 on tint |
| `--c-info` / tint | `#1A609E` / `#E9F3FF` | Proposed, information | 6.54:1; 5.83:1 on tint |
| Focus | 4 px `#722A82` outline with 2 px white offset; fields also thicken their border to 3 px black | | 8.86:1 |

**Type.** Latin **Atkinson Hyperlegible Next** (400, 700) and **Atkinson
Hyperlegible Mono** (400) for references and phone numbers; Sinhala **Noto Sans
Sinhala** (400, 700). Google Fonts families:
`Atkinson+Hyperlegible+Next:wght@400;700`,
`Atkinson+Hyperlegible+Mono:wght@400`, `Noto+Sans+Sinhala:wght@400;700`.

| Style | Phone | Desktop | Line height | Weight | Use |
|---|---|---|---|---|---|
| Page title | 32 px | 40 px | 1.15 | 700 | `<h1>` |
| Question | 21 px | 21 px | 1.3 | 700 | Field labels and legends (the question is the label) |
| Body | 19 px | 19 px | 1.5 (Sinhala 1.7) | 400 | Text, inputs, the sentence |
| Small | 16 px | 16 px | 1.45 | 400 | Hints, metadata (never smaller) |
| Reference | 24 px | 24 px | 1.2 | Mono 400 | PT-2026-0142, phone numbers on the driver page |

Sinhala size factor: 0.92 (Noto Sans Sinhala's letters are larger than
Atkinson's x-height). Measure: at most 34 em per line on the dashboard text.

**Layout and grid.** 4 px base; spacing 4, 8, 16, 24, 32, 48, 64. Phone:
single column, 16 px margins, generous 32 px between questions. Desktop:
content column of 640 px for text, dashboard 1200 px with a 2:1 split (main
"What needs you now" list and a narrower "Today at a glance" column), timeline
full width below. Corners 0 px; no shadows; no containers except the sentence box,
the error summary, the panel for a selected booking and the status badges.

**Signature element: the plain sentence.** Above "Send request", a box headed
"Check your request" shows the request as one sentence that updates as fields
are answered (debounced, `aria-live="polite"`, announced only after a pause),
for example: "A van for 4 people from Branch B to the Sports Centre on Tuesday
13/10/2026, picking up at 8:45 am (± 10 min), coming back at 10:45 am."
Unanswered parts show as bracketed gaps ("[pickup time]") so the gaps are
visible. Write the Sinhala version with the same parts (you may build it from
the shared strings; note it for review, D-09). On the dashboard every list row
and the detail panel lead with the same kind of sentence, and the explanation
(section 4.7) is set as plain paragraphs. On the driver page the next stop is
a sentence: "Next: pick up 1 passenger at Branch B at 10:00 am." Without
JavaScript the box is not shown. Its job: one last check before sending, which
supports BO-04 and reduces wrong requests.

**Status treatment.** Words in a box: the status word in bold, a 2 px border in
the status colour, an icon before the word, the tint behind; Needs attention is
the amber fill with black text. Flags are plain words in ink with an icon and no
box, separated by " · ". On the dashboard each row says the status in its
sentence too ("Proposed for Van 2").

**Icons.** Few. Only where a word alone is slower: phone (Call), navigate, the
status icons, plus, minus, chevron, wheelchair, warning. Outline, 2 px stroke,
24 px grid, round ends. Icons are never alone.

**Motion.** None, except focus moving to the error summary and to the
confirmation heading (no animation). Reduced motion changes nothing.

**What keeps it from feeling generic.** It refuses the generic dashboard:
no cards, no tiles with big numbers and icons; counts are written as
sentences ("2 requests need your attention"). Large hyperlegible type, black
borders, underlined links, and a live sentence as the one memorable idea.

---

### 6.4 Direction 4 – Departures

**Concept.** Time is the backbone. Every list reads like a departure board:
one line per trip, fixed columns, the status as a short word in the "remarks"
slot. The coordinator's dashboard is a dark board for the early-morning
approval at 7:05 am, with a Marey-style day chart; the phone pages stay light
for sunlight, with a single dark board strip for the most important line.

**Research it draws on.** Solari and Gino Valle's Cifra 5 (one line per
departure, fixed columns, remarks; Compasso d'Oro 1956); Flighty (Apple
Design Award 2023: "one line per flight", always-visible facts, "boringly
obvious"); E. J. Marey's train schedule (time across, vehicles down); the
SBB Mobile app (the network's own board format for messages); B612 (type
tested for cockpit screens).

**Principles.**

1. Time leads every line.
2. One line per trip; the same columns everywhere.
3. Status is a remark: one or two words in its own slot.
4. Glance first, read second.

**Colour roles (verified).** Board (dark, dashboard and board strips):

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--c-board` | `#140C17` | Board background (near-black, purple-tinted) | white on it 19.18:1 |
| `--c-board-panel` | `#1F1523` | Rows, panels on the board | |
| `--c-board-edge` | `#6F6574` | Cell and control borders on the board | 3.46:1 on board |
| `--c-board-text` | `#FFFFFF` | Text | 19.18:1 |
| `--c-board-text-2` | `#B9AFBC` | Secondary text | 9.06:1; 8.34:1 on panel |
| `--c-board-accent` | `#DBA9E6` | Brand on dark: links, selection, primary button fill (with `#140C17` text) | 9.89:1; text on it 9.89:1 |
| `--c-board-ok` | `#6ED889` | Confirmed, Completed | 9.96:1 on panel |
| `--c-board-attention` | `#FDBE45` | Needs attention, Late | 10.61:1 on panel |
| `--c-board-danger` | `#F97770` | Declined, No-show, errors | 6.64:1 on panel |
| `--c-board-info` | `#79C0F1` | Proposed | 8.93:1 on panel |
| Focus on board | 3 px `#FFFFFF` outline, 2 px offset | | 19.18:1 |

Light (phone pages and light areas):

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--c-brand` | `#722A82` | Primary buttons, links, selected | 8.86:1 |
| `--c-ink` / `--c-ink-2` | `#000000` / `#63666B` | Text, secondary | 21:1; 5.76:1 |
| `--c-ok` | `#0F6A31` | Confirmed, Done | 6.72:1 |
| `--c-attention` | `#915B02` | Needs attention, warnings | 5.67:1 |
| `--c-danger` | `#B01E25` | Errors, No-show | 6.87:1 |
| `--c-info` | `#005E8D` | Proposed, information | 7.03:1 |
| Focus (light) | 3 px `#140C17` outline, 2 px offset | | 19.18:1 |

The brand purple `#722A82` appears on the board only as a fill behind white
text (8.86:1), never as text on the board (2.16:1 fails).

**Type.** Latin **B612** (400, 700) for text and **B612 Mono** (400, 700) for
times, references and counts; Sinhala **Gemunu Libre** (400, 700). Google
Fonts families: `B612:wght@400;700`, `B612+Mono:wght@400;700`,
`Gemunu+Libre:wght@400;700`.

| Style | Phone | Desktop | Line height | Face | Use |
|---|---|---|---|---|---|
| Board time | 40 px | 32 px | 1.0 | B612 Mono 700 | The next stop's time; tile counts |
| Title | 26 px | 28 px | 1.2 | B612 700 | `<h1>` |
| Row | 18 px | 16 px | 1.35 (Sinhala 1.6) | B612 400; times in B612 Mono | Board rows, list rows |
| Body | 17 px | 15 px | 1.5 (Sinhala 1.65) | B612 400 | Text, inputs |
| Remark | 14 px, capitals via CSS, letter-spacing 0.06 em | 13 px | 1.2 | B612 Mono 700 | Status remarks (the text in the HTML stays in sentence case) |
| Small | 14 px | 13 px | 1.4 | B612 400 | Metadata |

Sinhala size factor: 1.2 for Gemunu Libre (research.md 3.1). Sinhala remarks
are not set in capitals (Sinhala has no case); use Gemunu Libre 700.

**Layout and grid.** 8 px base; spacing 4, 8, 12, 16, 24, 32, 48. Board rows
40 px tall on desktop and 56 px or more on phones. Fixed board columns on the
dashboard list: Time (7 ch) · Ref (12 ch) · From → To (flexible) · Van (6 ch) ·
Pax (4 ch) · Remarks (14 ch) · Flags. Desktop: full width up to 1440 px; the
tile strip is the top row of the board; the day chart below it; the detail
panel is a right-hand drawer (420 px). Corners 2 px; no shadows (the board is
flat). Phone: light page, 16 px margins, one dark board strip at the top.

**Signature element: the board row and the now line.** One row format is used
everywhere a trip appears: time first in mono, then places, van, passengers,
and the remark slot (CONFIRMED, PROPOSED, NEEDS ATTENTION …). On the
dashboard the day chart has a vertical "now" line at 7:05 am that the rows read
against, and the tiles form the board's header strip. On `request.html` the
date choice is a small departures list: each date is a row with its remark
("Closed", "Closes 5:00 pm today", "Open", "Closes 7:00 am on Monday"), so the
cutoff is part of the choice itself (FR-07). On `driver.html` the dark strip at
the top is the next stop's board row with the time large and "in 20 min".
Its job: make time and status readable at a glance, in the same place, on
every screen.

**Status treatment.** The remark slot: the status word in B612 Mono capitals
(through CSS), in the status colour, inside a 1 px framed cell, preceded by a
small glyph (Confirmed ●, Proposed ○, Needs attention ▲, Declined ✕, Cancelled
—, Completed ■, No-show □, Submitted ◌), drawn as inline SVG, not typed
characters. Flags sit after the remark as short words with icons. On light
pages the same slot uses the light signal colours with a 2 px border.

**Icons.** Geometric, 24 px grid, 2 px stroke, **square** ends and mitred
joins, like instrument symbols. Same set as direction 1 (section 6.1 list).

**Motion.** When a status changes, the remark slot swaps its word with a
150 ms vertical flip (`rotateX` on the slot only). The now line does not
animate. Reduced motion: the word changes instantly.

**What keeps it from feeling generic.** A real dark board where it earns its
place (and only there), mono time columns, remarks instead of coloured pills,
a cockpit-tested typeface, and a Marey-style chart instead of a stock
calendar component.

---

### 6.5 Direction 5 – Ticket

**Concept.** Every trip is a ticket: a compact card where each fact always
sits in the same place (from, to, date, time, seats, reference). The form
fills a ticket, the confirmation issues it, the coordinator's day is a rack of
tickets along each van's line, and the driver tears off stubs as the day goes.
It draws on the card tickets that Sri Lanka Railways still issues and on the
best thinking about travel documents.

**Research it draws on.** Edmondson card tickets, still issued by Sri Lanka
Railways (every fact in a fixed place, identified by a serial number); Tyler
Thompson's "Boarding Pass / Fail" (order by what the traveller needs; time
in its own place); Stick No Bills (a Mooniak stencil face made for a Galle
poster gallery, with Sinhala and Latin); IBM Plex Sans Condensed (compact,
engineered text for narrow slots).

**Principles.**

1. Every fact has a fixed place.
2. The reference is the ticket's name: always visible, easy to say aloud.
3. Outbound and return are two parts of one ticket, divided by a perforation.
4. Done is a punch, not a page.

**Colour roles (verified).**

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--c-brand` | `#722A82` | The ticket's header strip (with the reference in white), primary buttons, links | white on it 8.86:1 |
| `--c-desk` | `#F3F1F4` | Page ground (the desk the tickets lie on) | ink-2 on it 5.13:1 |
| `--c-ticket` | `#FFFFFF` | Ticket and form surface | |
| `--c-ticket-edge` | `#7D8086` | Ticket edges, perforations, input borders | 3.96:1 on white; 3.53:1 on desk |
| `--c-slot-label` | `#63666B` | Slot labels ("FROM", "TIME") | 5.76:1 on white |
| `--c-value` | `#000000` | Slot values, text | 21:1 |
| `--c-ok` / tint | `#02684A` / `#E3F8EE` | Confirmed, Completed stamps | 6.81:1; 6.14:1 on tint |
| `--c-attention` / tint | `#9A5A00` / `#FEEFE1` | Needs attention stamps, warnings | 5.47:1; 4.86:1 on tint |
| `--c-danger` / tint | `#A82133` / `#FFEDEC` | Declined, No-show, errors | 7.17:1; 6.34:1 on tint |
| `--c-info` / tint | `#1E4B8D` / `#EAF3FF` | Proposed, information | 8.58:1; 7.67:1 on tint |
| Focus | 3 px `#722A82` outline, 2 px offset; on the header strip 3 px `#FFFFFF` | | 7.89:1 on desk; 8.86:1 |

**Type.** Latin text **IBM Plex Sans Condensed** (400, 600); Sinhala text
**Yaldevi** (400, 600); numbers and references **Stick No Bills** (600) in both
scripts. Google Fonts families: `IBM+Plex+Sans+Condensed:wght@400;600`,
`Yaldevi:wght@400;600`, `Stick+No+Bills:wght@600`.

| Style | Phone | Desktop | Line height | Face | Use |
|---|---|---|---|---|---|
| Ticket number | 34 px | 28 px | 1.0 | Stick No Bills 600 | References (PT-2026-0142), big times |
| Title | 26 px | 30 px | 1.15 | Plex Sans Condensed 600 | `<h1>` |
| Slot value | 19 px | 16 px | 1.3 (Sinhala 1.6) | Plex Sans Condensed 600 | Values in ticket slots |
| Body | 17 px | 15 px | 1.5 (Sinhala 1.7) | Plex Sans Condensed 400 | Text, inputs |
| Slot label | 13 px, capitals via CSS, letter-spacing 0.08 em | 12 px | 1.2 | Plex Sans Condensed 600 | Slot labels (Sinhala: Yaldevi 600 at 14 px, no capitals) |

Never set slot labels below 12 px. Sinhala size factor: Yaldevi 0.9 (it draws
Sinhala large); Stick No Bills only for numbers and the reference, never for
words.

**Layout and grid.** 4 px base; spacing 4, 8, 12, 16, 24, 32, 48. The ticket
is a modular grid of slots: 2 columns × n rows on phones (each slot a label
over a value), 6 columns on desktop. Phone: 12 px margins, tickets full width
with 4 px corners and semicircular notches (8 px radius) at the perforation.
Desktop: 12 columns, 24 px gutters, 1360 px maximum. Shadows: none; tickets are
separated from the desk by their edge colour only.

**Signature element: the ticket.** The same ticket layout appears everywhere a
trip appears. On the form, a live ticket at the top fills its slots as you
answer (empty slots show the slot label and a dash); on submit the ticket is
"issued": its header strip turns on with the reference in Stick No Bills and
the status stamp. Outbound and return are separated by a perforation line with
notches. On the dashboard the detail panel shows the opened proposal as a full
ticket with the explanation printed on its stub, and the timeline blocks are
small tickets along each van's line. On the driver page each stop is a stub;
Done punches a round hole in the stub's corner, writes "Done at 9:41 am" and
folds the stub away. Its job: one consistent object that staff, coordinators
and drivers all recognise, with every fact in the same place.

**Status treatment.** A stamp: the status word in Plex Sans Condensed 600
capitals (through CSS), in the status colour, inside a 2 px rectangular
border with 2 px corners and an icon, never rotated (rotated text is harder to
read). Flags are smaller outline stamps in ink.

**Icons.** Outline, 24 px grid, 1.75 px stroke, round ends, drawn like
rubber-stamp marks (simple, closed shapes). Same set as direction 1 (section
6.1 list), plus a punched-hole mark for Done.

**Motion.** Issuing the ticket: the header strip fills from left (180 ms).
Punch: the hole scales in (120 ms), then the stub folds closed (180 ms).
Reduced motion: instant.

**What keeps it from feeling generic.** A physical object with a purpose
(the ticket) replaces generic cards; a stencil numbering face from a Sri
Lankan foundry; perforations that separate real parts of a trip; stamps instead
of pills; a desk ground instead of grey app chrome.

---

## 7. Self-check before you report

Run these and report the results exactly.

- [ ] All four pages and the README exist in your folder; every link works
      from the file system, including `../index.html` and `../assets/…`.
- [ ] Every HTML, CSS and JS file has its header comment and marked sections;
      every JS function has JSDoc.
- [ ] `request.html` and `driver.html` total 500 KB or less (state the number
      and how you measured it).
- [ ] Every colour pair used is in your table or calculated and reported.
- [ ] Greyscale check: statuses, errors and the timeline still read.
- [ ] Keyboard only: every control reachable, focus always visible, order
      logical, Escape closes dialogs.
- [ ] 360 px and 320 px wide in English and in Sinhala: nothing clipped or
      overlapping; every target 44 px or more.
- [ ] JavaScript off: every page readable; the form can be filled in.
- [ ] Reduced motion: no movement.
- [ ] Sinhala strings copied exactly (spot-check that ප්‍ර renders as a
      conjunct).
- [ ] No banned pattern from research.md section 4; no element copied from a
      reference (section 3.9).
- [ ] Self-critique with `visual-critique:critique-screen` on each page;
      list what you fixed and what you left.
