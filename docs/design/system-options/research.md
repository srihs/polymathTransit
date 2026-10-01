# Design system options – research

| | |
|---|---|
| Document | Research for the five design-system directions |
| Owner | ux-designer |
| Date | 01/10/2026 |
| Status | Draft for the owner's review |
| Requirements | BO-04, C-01, NFR-01, NFR-02, NFR-03, NFR-04, NFR-12, NFR-18, FR-19, FR-25, FR-29, FR-61, FR-65, D-09 |
| Read with | [brief.md](brief.md) (the shared brief for the five builders) |

This document gathers the evidence behind the five design directions: what the
college's logo gives us, which admired and award-winning work we learn from
(principles only, never copies), which typefaces handle English and Sinhala
well, and which patterns make an interface feel template-made or
AI-generated. The [brief](brief.md) turns this into five buildable directions.

Contents

1. Brand analysis
2. Reference research
3. Typefaces for English and Sinhala
4. The "avoid" list
5. Originality check
6. Questions raised by this research
7. Sources

---

## 1. Brand analysis

### 1.1 What the logo contains

`Logo.png` (2048 × 1448 px, RGBA, transparent background) holds three parts on
a white "sticker" shape with rounded ends:

- **The crest.** A purple shield with a stepped, gabled top and two round
  notches at the base. Inside it, a torch whose flame is drawn as interlaced
  white strokes around a small white circle, and a curved band reading
  "VIVERE DISCE" in white sans-serif capitals.
- **The wordmark.** "POLYMATH" in large classical roman capitals and
  "COLLEGE" below it in smaller, very widely letterspaced capitals, both in a
  cool mid grey.
- **The tagline.** "Vivere Disce ~ Learn to Live" in a black humanist
  sans-serif italic.

### 1.2 Colours sampled from the logo

Method: Pillow counted every fully opaque pixel (alpha 255) and ranked the
exact values; the brand colours are the most frequent non-white values in each
part of the logo.

| Role | Hex | Evidence | Where |
|---|---|---|---|
| Crest purple | `#722A82` | 37,899 pixels of exactly this value; neighbours `#712981` and `#722981` are anti-aliasing | Shield, torch, motto band |
| Wordmark grey | `#63666B` | 21,979 pixels of exactly this value; `#62656A` is anti-aliasing | "POLYMATH COLLEGE" |
| Tagline black | `#000000` | 5,897 pixels | "Vivere Disce ~ Learn to Live" |
| Sticker white | `#FFFFFF` / `#FEFEFE` | 567,574 pixels | Sticker ground, crest strokes |

In OKLCH, the purple is L 0.428, C 0.153, H 320 (a red-leaning violet, not
the blue-leaning indigo of many software defaults). The grey is L 0.509, C 0.009,
H 261: a very slightly cool neutral.

### 1.3 Contrast between the brand colours

| Pair | Ratio | Text AA (4.5:1) | Large text and UI (3:1) |
|---|---|---|---|
| Purple `#722A82` on white | 8.86:1 | Pass (also AAA) | Pass |
| Grey `#63666B` on white | 5.76:1 | Pass | Pass |
| Black `#000000` on white | 21.00:1 | Pass | Pass |
| Purple and grey | 1.54:1 | Fail | Fail |
| Purple on black | 2.37:1 | Fail | Fail |
| Grey on black | 3.64:1 | Fail | Pass |

What this means:

- Purple, grey and black all work as text on white. Purple passes AAA, so it can
  carry body text, links and button labels (white on purple is also 8.86:1).
- Purple and grey must never sit next to each other as the only difference
  between two states (1.54:1). Purple and black are also too close (2.37:1);
  on dark grounds use a light purple tint, not the brand purple.
- The grey is fine for secondary text on white and on very light neutrals, but
  not on dark grounds.

### 1.4 Purple scale

Built in OKLCH at the crest's hue (H 320), with the brand purple as step 700.
Chroma tapers towards the light end so tints stay clean, not pink.

| Step | Hex | On white | On black | White text on it | Use |
|---|---|---|---|---|---|
| 50 | `#FCF4FD` | 1.08 | 19.50 | – | Faint surface |
| 100 | `#F7E6FB` | 1.19 | 17.67 | – | Selected option background |
| 200 | `#EDCEF4` | 1.43 | 14.74 | – | Text on purple-900 or darker |
| 300 | `#DCADE7` | 1.88 | 11.17 | – | Text and accents on dark grounds |
| 400 | `#C586D4` | 2.72 | 7.73 | – | Accents on dark grounds |
| 500 | `#AA61BB` | 4.09 | 5.14 | – | UI parts on white (3:1), not text |
| 600 | `#9043A1` | 5.99 | 3.50 | 5.99 | Text on white, hover on dark |
| **700** | **`#722A82`** | **8.86** | 2.37 | **8.86** | **Brand: buttons, links, the route line** |
| 800 | `#581D65` | 11.81 | 1.78 | 11.81 | Pressed state, visited links |
| 900 | `#3F1448` | 14.95 | 1.40 | 14.95 | Deep bands, focus ring |
| 950 | `#280A2F` | 17.88 | 1.17 | 17.88 | Dark surfaces |

Rules that follow from the scale:

- **Text on white:** 600 and darker (4.5:1 or more).
- **UI parts on white** (borders, icons, focus rings, chart marks): 500 and
  darker (3:1 or more).
- **Text on black or near-black:** 500 and lighter; for body text use 300 or
  lighter.
- **Dark mode mapping:** brand 700 becomes 300 for text and accents, 400 for
  marks, 950 for surfaces, and a 300 fill with near-black text for primary
  buttons (9.89:1 on `#140C17`, see direction 4).

### 1.5 Neutral scale

Built on the wordmark grey's hue (H 261) with very low chroma, so the
neutrals sit with the logo rather than fighting it.

| Step | Hex | On white | Use |
|---|---|---|---|
| 50 | `#F5F7F9` | 1.07 | Page background (cool) |
| 100 | `#EEF0F3` | 1.15 | Panels |
| 200 | `#DCDEE1` | 1.35 | Decorative rules only |
| 400 | `#8F9298` | 3.12 | Input borders and UI lines on white (3:1) |
| 450 | `#7D8086` | 3.96 | UI lines on light grey surfaces |
| **500** | **`#63666B`** | **5.76** | **Logo grey: secondary text, hints** |
| 700 | `#3D4044` | 10.42 | Strong secondary text |
| 900 | `#181B1F` | 17.28 | Near-black surfaces |

Grey 400 is the lightest grey that may draw a component's edge (for example a
text field border) on white. Lighter greys are for decoration only.

### 1.6 Type character of the logo

- **Wordmark: classical inscriptional capitals.** "POLYMATH" has the
  proportions of Roman monumental capitals: a wide, round O, a broad M with
  splayed legs, modest stroke contrast and small, sharp serifs. "COLLEGE" is
  set much smaller and spaced very widely, the way titling capitals are spaced
  on stone. Suggestion for type: capitals are a ceremonial voice, good for short
  labels, section titles and the product name in a header, always letterspaced
  (about 0.06 em to 0.12 em), never for sentences or long labels. A flared or
  glyphic face (such as Marcellus, which its designer describes as "inspired by
  classic Roman inscription letterforms") echoes the wordmark without imitating
  it.
- **Tagline: humanist sans italic.** "Vivere Disce ~ Learn to Live" is a true
  italic of a humanist sans (calligraphic, single-storey forms, open
  apertures), not a slanted roman. Suggestion for type: a humanist sans with a
  real italic suits a warm, human "voice" for help text and explanations.
- **Do not rebuild the wordmark in a font.** The product name "PolymathTransit"
  is set in each direction's own typeface; the college's name appears only
  through the logo artwork.

### 1.7 Logo assets produced

All in [assets/](assets/), made with Pillow from `Logo.png`, transparency kept.
`Logo.png` itself is unchanged.

| File | Size | Pixels | What it is | Use it on |
|---|---|---|---|---|
| `logo.png` | 27.6 KB | 1200 × 427 | Full logo with its white sticker. The invisible margin (alpha 0 to 16) is trimmed and the image is reduced to 128 colours. | Any background: the sticker carries its own white ground. Show it at 240 px wide or more so the tagline stays readable. |
| `crest.png` | 7.9 KB | 234 × 256 | Crest only, outer sticker removed, inner white strokes and motto kept. | White and light backgrounds (purple-50 to purple-200, grey-50 to grey-200). Do not use on dark or purple grounds. |
| `crest-keyline.png` | 7.5 KB | 236 × 256 | Crest with a white keyline drawn from the sticker shape. | Black, near-black and purple backgrounds (app bars, signage bands). |

Usage rules for every direction:

- Clear space around the full logo and the crest: at least one quarter of the
  crest's height on every side.
- Smallest sizes: crest 24 px tall (the motto is not readable below about
  64 px, which is acceptable for a mark); full logo 240 px wide.
- Never recolour, stretch, rotate, outline, add shadows to or animate the logo
  or crest. Never place `crest.png` on a background darker than purple-200.
- Favicon: `crest.png` (browsers scale it); a 32 px rendering stays recognisable.

---

## 2. Reference research

Each reference gives us a principle. We do not copy any layout, typeface,
colour scheme, pictogram, name or asset from them (see section 5).

### 2.1 Transit and wayfinding

| Reference | Recognition | Principle we take | Used by |
|---|---|---|---|
| **Harry Beck's London Underground diagram**, first pocket edition January 1933 | Held by the London Transport Museum; widely called a design classic | Show the order and connections of stops, not the geography: straight lines, consistent angles and evenly spaced stops make a route readable at a glance. | 1 Stop by Stop |
| **NYC Transit Authority Graphics Standards Manual** (Unimark International: Massimo Vignelli and Bob Noorda, 1970) | Reissued by Standards Manual in 2014 under licence from the MTA | A sign system is a set of rules: a fixed module, one typeface, a small set of sizes, and route identity carried by a letter or number as well as a colour, so colour is never the only cue. | 1 Stop by Stop |
| **British road signs** (Jock Kinneir and Margaret Calvert, in use from 1 January 1965) | Primary route sign in the MoMA collection; Design Museum feature | Shape coding ("circles … give orders, triangles … warn", rectangles inform), mixed-case lettering because people "recognise words faster" than in capitals, and testing at real speed. Kinneir's question: "What do I want to know, trying to read a sign at speed?" | 1 Stop by Stop, 4 Departures |
| **SL Stockholm Public Transport identity and wayfinding** (FamiljenPangea, Stockholm) | Red Dot: Best of the Best 2018, Brands & Communication Design | Several ways to find your way at once: "by line number, by destination or simply by colour"; pictograms "easily recognisable without words". | 1 Stop by Stop |
| **MTA Live Subway Map** (MTA, Transit Innovation Partnership and Work & Co) | Fast Company Innovation by Design 2021, Cities category | A schematic diagram can carry live state (service changes, trains moving) without losing its clarity: the diagram is the interface. | 1 Stop by Stop |
| **Legible London** (Applied Information Group) | SEGD honour award; British Cartographic Society and Design Business Association awards | Progressive disclosure: show what a person needs where they stand, then more detail as they go. | 1 Stop by Stop |
| **V&A Wayfinding** | D&AD Awards 2020, Graphic Design | "Restricted use of punchy colour" directs people to what matters most, inside a heritage building that the system respects. | 1 Stop by Stop, 2 Inscription |

### 2.2 Timetables and departure boards

| Reference | Recognition | Principle we take | Used by |
|---|---|---|---|
| **Solari di Udine split-flap boards** (Cifra 5 with designer Gino Valle) | Compasso d'Oro 1956 | One line per departure, fixed columns (time, destination, platform, remarks), and status as a short word in its own slot. | 4 Departures |
| **E. J. Marey's graphical train schedule**, Paris to Lyon (1878, based on Ibry) | The cover of Edward Tufte's *The Visual Display of Quantitative Information* | Time runs along one axis and places or vehicles along the other, so gaps, waits and clashes show as shapes. This is the logic of the coordinator's day timeline (FR-29). | 4 Departures, 1 Stop by Stop |
| **Flighty** (Flighty LLC) | Apple Design Award 2023, Interaction | Borrow proven conventions ("airport boards have one line per flight … they've had 50 years of figuring out what's important"); keep key facts always visible; aim for an app that feels "almost boringly obvious". | 4 Departures |
| **SBB Mobile app redesign** (Unic for Swiss Federal Railways) | Best of Swiss Apps 2022, Gold in Usability | Reuse the network's own display-board format for in-app messages, so a status looks the same on the platform and on the phone. | 4 Departures |
| **B612 typeface** (Airbus with ENAC and Université de Toulouse III) | Open source; designed and tested for cockpit screens | Type for time-critical reading must be tested in "degraded contexts" and must keep capitals, numbers and abbreviations distinct. | 4 Departures |

### 2.3 Booking, scheduling and tickets

| Reference | Recognition | Principle we take | Used by |
|---|---|---|---|
| **Fantastical 2** (Flexibits) | Apple Design Award 2015 (Mac) | A booking can be read back as a plain sentence ("Lunch with Sarah at 1pm tomorrow"); people check a sentence faster than a set of fields. | 3 Plain Words |
| **Boarding Pass / Fail** (Tyler Thompson, 2009) and the responses it drew | Widely cited case study in information hierarchy | Order a travel document by what the traveller needs first (which trip, where, when), and give the most-checked fact (the time) its own place. | 5 Ticket |
| **Edmondson card tickets, Sri Lanka Railways** | Sri Lanka is one of the few countries still issuing them | A small card where every fact lives in a fixed place and the serial number identifies it; staff and passengers read it without thinking. | 5 Ticket |

### 2.4 Public-service forms and plain language

| Reference | Recognition | Principle we take | Used by |
|---|---|---|---|
| **GOV.UK** (Government Digital Service) | Design Museum Design of the Year 2013, the first website to win | "Do the hard work to make it simple"; "This is for everyone"; "Understand context". Understated design that makes the task "faster and easier". | 3 Plain Words, all |
| **GOV.UK error message guidance** | Part of the GOV.UK Design System | Show the error next to the field and in a summary at the top; say what happened and how to fix it; echo the question's wording; keep what the person typed. | All |
| **GOV.UK question pages pattern** | Part of the GOV.UK Design System | Mark optional fields "(optional)" rather than starring required ones; keep hints to one sentence; ask only what you need. (We keep the single scrolling page that NFR-02 requires, rather than one question per page.) | All, 3 Plain Words most |
| **Atkinson Hyperlegible** (Braille Institute) | Free font family, 2019; Next version 2025 | Letters and numbers that are easily confused (I, l, 1; O, 0) are drawn to be "distinctly different", which matters for phone numbers and references such as PT-2026-0142. | 3 Plain Words |

Note on wording: GOV.UK advises against "please" in error messages. Our
acceptance criteria (US-01 AC-2, US-03 AC-4) fix the wording "Please enter your
name", "Please enter a phone number" and "Please enter a number between 1 and
99". The builds use the approved wording; other new error messages follow the
GOV.UK pattern (see question 6.4).

### 2.5 Sri Lankan visual culture (used with respect)

| Reference | Principle we take | Used by |
|---|---|---|
| **Geoffrey Bawa's tropical modernism** (Lunuganga and his wider work, managed by the Geoffrey Bawa Trust) | Light and shade are composed: verandahs and deep overhangs frame open, calm spaces, and local materials (timber, stone, terracotta) are used honestly. In an interface: calm light grounds, a deep shaded band that frames what matters, and colours taken from real materials, each given a job. | 2 Inscription |
| **Sinhala letterpress and FM Abhaya** | Abhaya Libre is "an interpretation of the Sinhala letterpress typefaces from 1960s", redrawn for screens by Mooniak with Pushpananda Ekanayake. Using it ties the Sinhala text to a living local printing tradition. | 2 Inscription |
| **Mooniak and the Akurugraphy exhibition** (Geoffrey Bawa Space, opened 24/06/2026) | Mooniak, a Colombo type foundry, argues for "reducing dissonance" between Sinhala, Tamil and English typefaces, rather than forcing them to look the same. We pair scripts by matching size, weight and rhythm, not by forcing one look. | All |
| **Sri Lanka Railways' card tickets** | See 2.3. | 5 Ticket |

Respect rules for every direction: no religious imagery (temples, Buddha
figures, the Bo leaf or stupas), no national flag or lion, no stereotypes
(elephants, tea pickers, palm trees as decoration), and no ornament borrowed
from Kandyan or other traditional art as decoration. The college's own crest
(including its stepped outline) is the only cultural motif we use, because it
belongs to the college. Sinhala text is real text, not decoration.

### 2.6 Award platforms reviewed but not used as sources

- **Awwwards, Transport category.** The listed sites are mostly marketing
  sites for transport and logistics companies, built around animation, scroll
  effects and video. Their approach conflicts with C-01 (simplicity), NFR-18
  (500 KB form page, slow mobile data) and NFR-03 (reduced motion). We take no
  principle from them beyond "craft in the details".
- **Webby Awards, Travel apps.** Recent winners (for example Hopper and TripIt)
  are consumer travel planners; none adds a principle that the references above
  do not already give.

---

## 3. Typefaces for English and Sinhala

### 3.1 Sinhala families on Google Fonts

Checked at the source on 01/10/2026: the Google Fonts metadata
(`fonts.google.com/metadata/fonts`) lists eight families with the `sinhala`
subset. Sizes are the woff2 files that the Google Fonts CSS API serves to a
current Chrome browser. Widths and heights were measured with HarfBuzz
shaping, so Sinhala conjuncts are counted correctly.

| Family | Designer | Styles | Sinhala woff2 | Latin woff2 | Sinhala letter height (ක, em) | Size that matches Noto Sans Sinhala at 16 px | Width of the longest form label* at that size |
|---|---|---|---|---|---|---|---|
| Noto Sans Sinhala | Google | Variable: weight 100–900, width 62.5–100 | 126 KB (one file for all weights) | 29 KB | 0.612 | 16.0 px | 593 px (540 px at width 87.5) |
| Noto Serif Sinhala | Google | Variable: weight 100–900, width 62.5–100 | 84 KB | 28 KB | 0.589 | 16.6 px | 614 px |
| Abhaya Libre | Mooniak with Pushpananda Ekanayake; Latin by Sol Matas | 5 static weights (400–800) | 84–86 KB per weight | 20 KB | 0.414 | 23.6 px | 615 px |
| Yaldevi | Mooniak; Latin by Sol Matas | Variable: weight 200–700 | 99 KB | 21 KB | 0.674 | 14.5 px | 418 px |
| Gemunu Libre | Mooniak with Pushpananda Ekanayake; Latin by Sol Matas | Variable: weight 200–800 | 47 KB | 16 KB | 0.497 | 19.7 px | 469 px |
| Stick No Bills | Mooniak with the Stick No Bills poster gallery, Galle | Variable: weight 200–800 (stencil) | 55 KB | 18 KB | 0.566 | 17.3 px | 474 px |
| Maname | Pathum Egodawatta, Mooniak | Regular only | 103 KB | 24 KB | 0.475 | 20.6 px | 599 px |
| Google Sans | Google | 400–700 | not measured | – | – | – | – |

\* "Van must stay with us (for example, for equipment or safety)" in Sinhala:
වෑන් රථය අප සමඟ රැඳී සිටිය යුතුයි (උදා: උපකරණ හෝ ආරක්ෂාව සඳහා). The English
label is 454 px wide in Noto Sans at 16 px.

Verdicts:

- **Noto Sans Sinhala:** the safest body face. Large, open letters, nine
  weights, and a width axis. It is also the system Sinhala font on Android, so
  it falls back gracefully. Heaviest download (126 KB).
- **Noto Serif Sinhala:** the safest serif body face; lighter download (84 KB).
- **Abhaya Libre:** the most culturally rooted (from 1960s letterpress), with
  matching Latin. Its Sinhala is drawn small: at the same font-size it is about
  two thirds the height of Noto's, so it needs about 1.4 times the font-size.
  Best for headings and short labels at 22 px and above.
- **Yaldevi:** the narrowest at equal legibility (about 30% narrower than
  Noto). Best for **long Sinhala labels on small screens**, buttons and tight
  slots. Its own description says it is for "titles and short texts" and
  warns that some Sinhala shapes are "experimental"; native readers must check
  it (D-09).
- **Gemunu Libre:** compact, light download (47 KB), "distinctive smooth and
  square edge". Good for display and labels; acceptable for short body text at
  about 1.2 times the font-size.
- **Stick No Bills:** a stencil. Display only (references, times, large
  numbers); never for body text.
- **Maname:** one weight only, so it cannot build a hierarchy. Not used.
- **Google Sans:** added in 2025 and covers Sinhala, but it is Google's own
  product face and reads as "a Google app". Not used.

### 3.2 What the measurements say about Sinhala layout

- **Sinhala text is not uniformly longer.** Compared with English at the same
  visual size (Noto, 16 px): "Pick up" 54 px becomes 146 px (2.7 times), "No-show"
  66 px becomes 168 px (2.5 times), "Send request" 99 px becomes 118 px (1.2
  times), but the passenger question is shorter in Sinhala (365 px becomes 260 px).
  **Plan for short labels to grow up to three times**, sentences about 1.3 times.
- **Consequences on a 360 px phone** (328 px of content width after 16 px
  margins):
  - "Staff errand" in Sinhala (කාර්ය මණ්ඩල රාජකාරි ගමන) is 234 px in Noto,
    so it cannot fit a two-column option card (about 156 px each). Use a
    single-column list on phones, or two columns that allow wrapping onto two
    lines with equal heights.
  - "No-show" in Sinhala (මගීන් පැමිණියේ නැත) is 168 px, so "Done" and
    "No-show" side by side will wrap. Stack them, or let each wrap onto two
    lines inside a 44 px-plus button.
- **Line height.** Sinhala vowel signs reach far above and below the letter
  body (Noto Sans Sinhala glyphs span −0.27 em to 0.97 em). Use line-height
  1.6 or more for Sinhala body text (1.45 is enough for Latin), and never clip
  text with a fixed height or `overflow: hidden`.
- **Size matching.** Fonts draw Sinhala at very different sizes (letter height
  0.41 em to 0.67 em). Each direction sets a Sinhala font-size factor under
  `:lang(si)` so Sinhala and English look the same size.
- **Weights.** Use only weights the font actually has; never let the browser
  fake bold or italic in Sinhala (`font-synthesis: none`). Sinhala has no
  italic: where a direction uses italic for a "voice" in English, Sinhala uses
  the regular style with the same colour.
- **Conjuncts.** Sinhala conjuncts such as ප්‍ර and ත්‍ය need the zero-width
  joiner (U+200D). The shared strings in the brief were written with it and
  checked by script; keep the characters exactly as given.
- **Download cost.** Google Fonts splits each family by script with
  `unicode-range`, so English readers download no Sinhala font. But the
  "සිංහල" label on the language switch is itself Sinhala text, so it triggers
  the Sinhala download on every visit. Count it in the 500 KB budget (NFR-18):
  with the largest Sinhala file (126 KB), two Latin weights (up to 76 KB), the
  crest (8 KB) and the page's HTML, CSS and JavaScript, a form page stays well
  under 500 KB.
- **Fallback stack** when web fonts fail on slow data: Android ships Noto Sans
  Sinhala; Windows has Nirmala UI and Iskoola Pota; Apple systems have Sinhala
  Sangam MN. Every Sinhala stack ends with these.

### 3.3 Latin typefaces checked

| Family | Designer | Character | woff2 per weight | Figures | Chosen for |
|---|---|---|---|---|---|
| Overpass | Delve Withrington, Dave Bailey, Thomas Jockin | "An interpretation of the well-known Highway Gothic letterforms" from US road signs | 38 KB (variable) | Tabular via `tnum` | 1 Stop by Stop |
| Ysabeau Office | Christian Thalmann | Humanist sans from the Garamond tradition, with a calligraphic true italic that echoes the tagline | 37 KB roman (variable), 16 KB italic | Tabular via `tnum` | 2 Inscription (body) |
| Marcellus | Astigmatic | Flared serif "inspired by classic Roman inscription letterforms" | 14 KB | Proportional | 2 Inscription (capitals) |
| Atkinson Hyperlegible Next | Braille Institute | Letters and numbers drawn to be distinct for low-vision readers | 33 KB | Tabular via `tnum` | 3 Plain Words |
| B612 and B612 Mono | Airbus, ENAC, Université de Toulouse III | Cockpit-screen legibility | 12–20 KB | Tabular by default | 4 Departures |
| IBM Plex Sans Condensed | Mike Abbink, Bold Monday | Compact, engineered sans | 19 KB | Tabular by default | 5 Ticket |
| Source Serif 4 | Frank Grießhammer | Transitional serif with optical sizes | 119 KB | – | Rejected: too heavy for the form budget |
| Noto Sans | Google | Neutral, matches Noto Sans Sinhala | 34 KB | Tabular by default | Fallback only |

### 3.4 Pairings chosen (one per direction)

| Direction | Latin | Sinhala | Why the pair works |
|---|---|---|---|
| 1 Stop by Stop | Overpass | Noto Sans Sinhala | Both unmodulated and open; signage needs the most robust Sinhala; Noto's width axis can absorb long labels on the dashboard. |
| 2 Inscription | Marcellus (short capitals) and Ysabeau Office (text) | Abhaya Libre (headings) and Noto Serif Sinhala (text) | Roman inscription capitals with a letterpress-era Sinhala serif; Noto Serif Sinhala keeps body text readable at normal sizes. |
| 3 Plain Words | Atkinson Hyperlegible Next | Noto Sans Sinhala | Maximum legibility in both scripts; Sinhala is drawn slightly larger, which helps. |
| 4 Departures | B612, B612 Mono | Gemunu Libre | Instrument-like, even rhythm; Gemunu's smooth square edge and compact width suit a board. |
| 5 Ticket | IBM Plex Sans Condensed; Stick No Bills for numbers | Yaldevi; Stick No Bills for numbers | Narrow faces fit fixed ticket slots; the stencil, a Galle poster-gallery face, prints references and times like a stamped card. |

---

## 4. The "avoid" list

Writers who study AI-generated interfaces describe the same default look: the
model reaches for "the statistical default … when nobody told it to do
anything else". The Google Fonts popularity ranks (from the same metadata, 01/10/2026)
show how common the default typefaces are: Inter 5th, Poppins 8th, DM Sans 21st,
Manrope 30th, Plus Jakarta Sans 40th, Space Grotesk 59th, Fraunces 92nd. None of
the five directions uses any of them.

| Pattern to avoid | Why it reads as template-made | How the five directions avoid it |
|---|---|---|
| Purple-to-blue or indigo gradients; gradient text | The most cited tell; traced to an indigo default in a popular component kit | Flat colour only. The brand purple is a red-violet (hue 320) and is never blended into blue. No colour gradients anywhere (direction 5 may use a CSS radial gradient only as a mask to cut the ticket's perforation notches). |
| Glassmorphism, blur, frosted panels | Decoration that lowers contrast and costs performance | No `backdrop-filter`, no translucency over content. |
| Emoji as icons | Inconsistent across phones, poor with screen readers, unprofessional | Each direction draws its own small inline SVG icon set with a stated style; icons always sit next to words. |
| Generic hero section, three-column feature grid | Marketing-page structure in a working tool | The pages open straight on the task: the form's first question, the dashboard's first action, the driver's next stop. |
| Inter (or similar) with rounded cards and soft shadows on everything | The "statistical default" look | Five distinct type pairings; each direction states its own corner radius and elevation rule (most use none or one level). |
| Lorem ipsum, "John Doe", fake metrics | Hides real content problems | Shared real content (the brief, section 3), taken from the specification's worked example. |
| Meaningless illustrations, blobs, 3D shapes | Decoration with no job | No illustrations. The only images are the logo, the crest and functional diagrams (route lines, timelines). |
| Decoration with no job | Every pixel must help a non-technical user (C-01) | Each direction names one signature element, and it must do a job. |
| Colour as the only signal | Fails WCAG 1.4.1 and colour-blind users | Every status has a word, and an icon or shape, as well as a colour. |
| Gratuitous motion, scroll effects, parallax | Slow on slow data and harmful with vestibular disorders | Motion under 200 ms, only to explain a change; none when reduced motion is set. |
| Dark mode by default for everything | Poor in sunlight, where drivers and staff use phones | Only direction 4 uses a dark board, and only on the desktop dashboard. |
| Centred everything, oversized empty space | Looks designed, reads slowly | Left-aligned text; space is used to group, not to impress. |
| Vague microcopy ("Oops!", "Something went wrong") | Does not say what to fix | Error messages say exactly what to fix (brief, section 3). |

---

## 5. Originality check

Skill used: `audit-reference-originality`. At this stage nothing is built, so
the audit covers the brief: what each direction is told to take from each
reference. The built pages must be audited again before the owner chooses.

**Verdict for the checked scope (research and brief): Clear with low-risk
similarities.**

Source registry: every reference in section 2, by URL (section 7). There is
no local reference corpus (no screenshots or downloaded assets), by design:
builders work from principles in this document, not from images of other
products.

| Severity | Category | Our brief | Reference | Overlap | What differs | Guardrail written into the brief |
|---|---|---|---|---|---|---|
| Low | Structure | Direction 1 draws stop sequences as lines with stop markers | Beck's diagram; NYCTA manual | Diagram grammar (lines, stops) | No map of a network, no Tube or MTA colours, no roundel or bullets, no Johnston or Helvetica; our "line" is one van's day | Do not use any transit operator's line colours, symbols, typefaces or map layout. |
| Low | Structure | Direction 4 uses one row per trip with a remarks slot | Solari boards; Flighty | Board grammar | No split-flap imagery or flap sound, no yellow-on-black airport palette, no flight data layout | No imitation of split-flap tiles; the "flip" is a 150 ms text swap only. |
| Low | Assets | Direction 3 uses a strong focus ring | GOV.UK focus state (yellow with a thick black border) | Strong focus as a principle | Our ring is purple or black, not yellow; no GOV.UK crown, typeface or colours | Do not use `#FFDD00` or the GOV.UK Transport typeface. |
| Low | Structure | Direction 5 shows trips as fixed-slot cards | Edmondson tickets; boarding pass studies | Fixed-place facts | No railway insignia, no airline layout, no barcodes | No railway or airline marks. |
| Clear | Text | Shared content written for PolymathTransit | – | None | – | No copy from any reference. |
| Clear | Brands | Only the college's logo and crest | – | None | – | No other organisation's marks. |
| Clear | Numbers | Times, counts and references from our specification | – | None | – | – |
| Not checked | Images, video, history | No images or video exist yet | – | – | – | Audit the built pages before the owner chooses. |

---

## 6. Questions raised by this research

These do not block the five option pages, which use the recommended answer and
mark it. They need the owner's decision before the chosen system is specified.

1. **Time format in Sinhala.** NFR-12 says times show as "10:30 am". In Sinhala,
   the usual form is "පෙ.ව. 10:30" (before noon) and "ප.ව. 5:00" (after noon).
   Options: (a) Sinhala pages use පෙ.ව./ප.ව. before the time; (b) all pages
   keep "10:30 am". Recommendation: (a), confirmed by the native-speaker
   review (D-09). The option pages use (a).
2. **Place names in Sinhala.** Locations are data entered by administrators
   (FR-39) in one language. Options: (a) show place names as entered on Sinhala
   pages; (b) add a Sinhala name field to locations. Recommendation: (a) for
   Release 1. The option pages use (a).
3. **The driver's Navigate action** depends on the map service, which is not
   chosen yet (Q-17). The option pages show the button only; it does not open
   a real map.
4. **Error wording.** The acceptance criteria fix "Please enter …" for three
   messages; GOV.UK guidance drops "please". Recommendation: keep the
   approved wording; use the GOV.UK pattern ("Enter …", "Choose …") for the rest.
5. **All Sinhala text** in the option pages is a draft by the ux-designer and
   needs native-speaker review before any real use (D-09).

---

## 7. Sources

All accessed 01/10/2026.

Transit and wayfinding

- London Transport Museum, pocket Underground map by H C Beck, January 1933: https://www.ltmuseum.co.uk/collections/collections-online/maps/item/1999-321
- London Transport Museum, "Mapping London: the iconic Tube map": https://www.ltmuseum.co.uk/collections/stories/design/mapping-london-iconic-tube-map
- Standards Manual, NYCTA Graphics Standards Manual reissue: https://standardsmanual.com/products/nycta-graphics-standards-manual-full-size-edition
- Order, NYCTA Graphics Standards Manual reissue: https://order.design/project/nycta-graphics-standards-manual-reissue
- Design Museum, "British Road Signs": https://designmuseum.org/discover-design/all-stories/british-road-signs
- MoMA, Kinneir, Calvert and Morgan, primary route sign: https://www.moma.org/collection/works/407908
- Red Dot, SL (Stockholm Public Transport), Best of the Best 2018: https://www.red-dot.org/project/sl-stockholm-public-transport-25816
- MTA press release, Live Subway Map wins Fast Company Innovation by Design 2021: https://www.mta.info/press-release/mtas-groundbreaking-live-subway-map-winner-fast-companys-2021-innovation-design
- Fast Company, "MTA's Live Subway Map is a modern design masterpiece": https://www.fastcompany.com/90666883/mta-new-live-subway-map-innovation-by-design-2021
- Applied Information Group, Legible London: https://appliedinformation.group/insight/a-comprehensive-look-at-legible-london
- Dexigner, Legible London wins SEGD prize: https://www.dexigner.com/news/20818
- D&AD, V&A Wayfinding (2020): https://www.dandad.org/awards/professional/2020/233133/va-wayfinding/

Timetables and departure boards

- Wikipedia, Solari di Udine: https://en.wikipedia.org/wiki/Solari_di_Udine
- Simple Flying, history of the Solari board: https://simpleflying.com/split-flap-airport-displays-the-history-of-the-solari-board/
- Invention & Technology, "The Graphic Truth" (Marey's train schedule): https://www.inventionandtech.com/content/graphic-truth-2
- Apple Newsroom, 2023 Apple Design Award winners: https://www.apple.com/newsroom/2023/06/apple-announces-winners-of-the-2023-apple-design-awards/
- Apple Developer, "Behind the Design: Flighty": https://developer.apple.com/news/?id=970ncww4
- Unic, design principles of the new SBB Mobile app: https://www.unic.com/en/magazine/sbb-mobile-app-design-principles
- Google Fonts description, B612: https://github.com/google/fonts/tree/main/ofl/b612

Booking, scheduling and tickets

- MacRumors, 2015 Apple Design Award winners (Fantastical 2): https://www.macrumors.com/2015/06/08/2015-apple-design-award-winners-announced/
- Flexibits, Fantastical: https://flexibits.com/fantastical
- ISO50 Blog, "Boarding Pass/Fail": https://blog.iso50.com/13468/boarding-passfail/
- Wikipedia, Edmondson railway ticket: https://en.wikipedia.org/wiki/Edmondson_railway_ticket

Public-service forms and plain language

- Dezeen, "UK government website wins Designs of the Year 2013": https://www.dezeen.com/2013/04/16/gov-uk-government-website-wins-designs-of-the-year-2013/
- GDS blog, "GOV.UK wins Design of the Year 2013": https://gds.blog.gov.uk/2013/04/17/gov-uk-wins-design-of-the-year-2013/
- GOV.UK, Government design principles: https://www.gov.uk/guidance/government-design-principles
- GOV.UK Design System, Error message: https://design-system.service.gov.uk/components/error-message/
- GOV.UK Design System, Question pages: https://design-system.service.gov.uk/patterns/question-pages/
- GOV.UK Design System, Focus states: https://design-system.service.gov.uk/get-started/focus-states/
- Braille Institute, Atkinson Hyperlegible: https://www.brailleinstitute.org/freefont/
- W3C, Understanding WCAG 2.2: Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- W3C, Understanding WCAG 2.2: Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- W3C, Understanding WCAG 2.2: Use of Color: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html

Sri Lankan visual culture and Sinhala type

- Geoffrey Bawa Trust: https://geoffreybawa.com/
- Ampersand Travel, "Geoffrey Bawa: the pioneer of tropical modernism": https://www.ampersandtravel.com/blog/2024/geoffrey-bawa-the-pioneer-of-tropical-modernism/
- The Sunday Times (Sri Lanka), Shannon Salgadoe, "What's in a letter; a lot more than you think", 28/06/2026: https://www.sundaytimes.lk/260628/plus/whats-in-a-letter-a-lot-more-than-you-think-647036.html
- Google Fonts, Gemunu Libre: https://fonts.google.com/specimen/Gemunu+Libre/about
- Google Fonts metadata (families, subsets, designers, popularity): https://fonts.google.com/metadata/fonts
- Google Fonts source descriptions (Abhaya Libre, Yaldevi, Gemunu Libre, Stick No Bills, Maname, Noto Sans Sinhala, Noto Serif Sinhala, Overpass, Marcellus, Ysabeau): https://github.com/google/fonts/tree/main/ofl

Award platforms and AI-generated design

- Awwwards, Transport websites: https://www.awwwards.com/websites/transport/
- Webby Awards winners gallery: https://winners.webbyawards.com/
- DEV Community, "Why Every AI-Built Website Looks the Same": https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p
- 925 Studios, "AI Slop Fonts and Gradients: The Tells That Give Away AI Design": https://www.925studios.co/blog/ai-slop-design-tells
