# CR-001 Out-of-hours requests and the measure of page weight

| | |
|---|---|
| **CR ID** | CR-001 |
| **Title** | Out-of-hours requests go to a coordinator; NFR-18's page weight stated in bytes with a method |
| **Raised by** | requirements-analyst, from the owner's answers to OQ-01 and OQ-02 (`docs/requirements/open-questions.md`) |
| **Date raised** | 01/10/2026 |
| **Baseline** | Requirements Specification v1.0 and User Stories, Backlog & RTM v1.0 (30/09/2026) |
| **Proposed version** | 1.1 of both documents, once approved |
| **Status** | Draft, awaiting the owner's approval |
| **Priority** | High for part A (FR-07 is Must, Release 1; the public form is being designed now). Medium for part B (NFR-18 is Should, Release 2, but the design brief already budgets to it). |

The owner updates the Word and Excel baseline after approving. The
requirements-analyst does not edit `Requirements/`.

---

## 1. What is changing

**Part A: out-of-hours requests (from OQ-01, option C).** A trip date or time
outside operating hours is still accepted by the public form while the date
is open. The form shows a warning, the booking is flagged "Out of hours", and
the request is set to "Needs attention" so that a coordinator confirms it
individually in advance. Operating hours are a setting holding both days of
the week and times of day (FR-42). Nothing in the system treats "weekend" as a
fixed idea.

**Part B: page weight (from OQ-02, option C with option A's unit).** NFR-18's
"500 KB" becomes 500,000 bytes, measured as bytes transferred over the network
on a first visit with an empty cache, in English and in Sinhala separately.
Anything loaded only after the requester acts, such as the map, is measured
and reported separately.

## 2. Why

**Part A.** The design-options review of 01/10/2026 (finding C2,
`docs/reviews/2026-10-01-design-system-options.md`) found that the prototypes
accept a Saturday date silently. The baseline already requires a warning and a
flag (BRL-13: "Trips outside operating hours are flagged 'Out of hours'";
FR-07: "Trips outside operating hours show a warning and are flagged"), but it
does not say what happens next. A-08 says weekend use is "flagged for manual
handling", yet BRL-15 does not list "Out of hours" as a reason for "Needs
attention". A flagged request could therefore be "Proposed" and approved in a
batch (FR-26, US-23 AC-2) without anyone noticing the flag. And BRL-21 needs a
coordinator to approve a Saturday's plan by 7:10 am on Saturday, which no rule
or availability target (NFR-06: "06:30–19:00 Mon–Fri") supports. The owner
chose to send every out-of-hours request to a coordinator.

**Part B.** "KB" appears only in NFR-18, and no part of the baseline defines
it or says what is counted. Two people measuring the same page reached
different figures (OQ-02, "Current practice"). The owner chose the stricter
unit and a fixed method so that TC-NFR-18 has one exact test.

## 3. Affected items

| ID | Where | Kind of change |
|----|-------|----------------|
| BRL-13 | Spec section 8; workbook, Business Rules | Wording: defines "outside operating hours" and what follows. Default column clarified. |
| BRL-15 | Spec section 8; workbook, Business Rules | Wording: new switchable trigger, "Out of hours". |
| BRL-21 | Spec section 8; workbook, Business Rules | Wording: out-of-hours trips confirmed individually in advance. One clause depends on open point OP-2. |
| FR-07 | Spec 9.1; workbook, Requirements; Appendix B | Wording: warning, flag, "Needs attention", day name, typed dates. New test case IDs in the RTM. |
| FR-42 | Spec 9.6; workbook, Requirements | Wording: operating hours are days and times; the new trigger is a manual-review trigger. New test case IDs in the RTM. |
| FR-36 | Workbook, RTM only | New test case ID (TC-US-33-5). Requirement wording unchanged: "when early trips are still unconfirmed at the cutoff" is extended through US-33 AC-5. See section 4.9. |
| NFR-18 | Spec section 10; workbook, Requirements and RTM | Wording of the requirement and its measure. TC-NFR-18 defined. |
| US-05 | Spec 11 (EP-01); workbook, User Stories | Seven new acceptance criteria (AC-7 to AC-13); points 3 to 5. |
| US-39 | Spec 11 (EP-06); workbook, User Stories | Two new acceptance criteria (AC-3, AC-4); points unchanged. |
| US-33 | Spec 11 (EP-05); workbook, User Stories | One new acceptance criterion (AC-5); points unchanged. |
| A-08 | Spec 12.1 | Wording, to match. |
| Section 6.2 | Spec, "Needs attention" row | Wording, to match. |
| Section 6.3 | Spec, request form row 5 | Wording, to match. |
| Q-04 | Spec section 13; workbook, Open Questions | Status text only. Q-04 stays Open. |
| Section 11.2, section 15; workbook, Epics | Spec and workbook | Point totals (section 6). |

Not changed, and why:

- **Appendix A, Booking, Flags** already lists "Out of hours". **Status** keeps
  "Needs attention". No new data field is needed for the booking.
- **BRL-05, FR-62 and US-55** (a van's available hours) are a separate check
  on the van, not on the request. They stay as they are.
- **FR-03** ("reject past dates") and the cutoff in BRL-13 stay the only
  reasons the form refuses a date.
- **FR-33 and US-30 AC-1** (acknowledgement "We'll confirm soon") stay as
  they are; see OP-6.
- **NFR-05** (3 seconds on 4G) is a separate measure and is not changed.

---

## 4. Proposed wording

Text marked **Now** is quoted exactly from v1.0. Text marked **Proposed** is
the new wording. Where a clause depends on an open point, it is marked with
the point's number and shown with its alternatives in section 7.

### 4.1 BRL-13 Request cutoff

**Now (rule):** "Requests for a trip date must be submitted by 5:00 pm on the
previous day. Exception: when the trip date is the first school day after one
or more non-school days (e.g. Monday, or the day after a holiday or school
break), the cutoff is 7:00 am on the trip date itself, and pickups that day
must be at least 60 min after the cutoff. After the cutoff, the public form
does not accept requests for that date. A coordinator may still enter a late
booking (FR-30), flagged 'Late (exception)' with a reason. Cancellations are
accepted at any time; change requests after the cutoff go to a coordinator.
Trips outside operating hours are flagged 'Out of hours'."

**Now (default):** "5:00 pm previous day; 7:00 am same day after a break;
60 min lead; hours Mon–Fri 07:00–18:00"

**Proposed (rule):** "Requests for a trip date must be submitted by 5:00 pm on
the previous day. Exception: when the trip date is the first school day after
one or more non-school days (e.g. Monday, or the day after a holiday or school
break), the cutoff is 7:00 am on the trip date itself, and pickups that day
must be at least 60 min after the cutoff. **[OP-3: cutoff for a date whose
previous day is also outside operating hours.]** After the cutoff, the public
form does not accept requests for that date. A coordinator may still enter a
late booking (FR-30), flagged 'Late (exception)' with a reason. Cancellations
are accepted at any time; change requests after the cutoff go to a
coordinator. Operating hours are the days of the week and the opening and
closing times set by the administrator (FR-42). A trip is outside operating
hours when its date is not an operating day, or when a time the requester
gives (pickup, must arrive by, or return pickup) is before the opening time or
after the closing time. While its date is still open, such a trip is accepted:
the form shows a warning, the request is flagged 'Out of hours' and set to
'Needs attention' (BRL-15), and a coordinator confirms it individually
(BRL-21)."

**Proposed (default):** "5:00 pm previous day; 7:00 am same day after a break;
60 min lead; operating hours Mon–Fri 07:00–18:00 (both the days and the times
are settings; a time exactly at opening or closing is inside operating hours)"

### 4.2 BRL-15 Manual review triggers

**Now (rule):** "Requests are always set to 'Needs attention' when an address
cannot be located reliably, wheelchair access is needed, or the phone number
has never been seen before, even if a route is found."

**Now (default):** "Each trigger can be switched on/off"

**Proposed (rule):** "Requests are always set to 'Needs attention' when an
address cannot be located reliably, wheelchair access is needed, the phone
number has never been seen before, or the trip is outside operating hours
(BRL-13), even if a route is found. **[OP-5: fixed-trip occurrences are not
set to 'Needs attention' for being outside operating hours; they keep the
'Out of hours' flag.]**"

**Proposed (default):** unchanged, "Each trigger can be switched on/off".
Switching the "Out of hours" trigger off gives the baseline's own behaviour
(warning and flag only, option B of OQ-01).

### 4.3 BRL-21 Plan approval

**Now (rule):** "A coordinator approves each day's plan on the morning of the
trip day. Final details go to requesters and route links to drivers only on
approval. Trips departing before the approval deadline + 30 min must be
confirmed individually in advance; at the cutoff, the system alerts
coordinators about any that are not. If the plan is not approved by the
deadline, coordinators are alerted again."

**Now (default):** "Approval by 7:10 am on the trip day; early trips = before
7:40 am"

**Proposed (rule):** "A coordinator approves each day's plan on the morning of
the trip day. Final details go to requesters and route links to drivers only
on approval. Trips departing before the approval deadline + 30 min, and trips
outside operating hours (BRL-13), must be confirmed individually in advance;
at the cutoff, the system alerts coordinators about any that are not. If the
plan is not approved by the deadline, coordinators are alerted again.
**[OP-2: when, and by whom, the plan for a date that is not an operating day
is approved.]**"

**Proposed (default):** "Approval by 7:10 am on the trip day; early trips =
before 7:40 am **[OP-2: approval time for a date that is not an operating
day]**"

### 4.4 FR-07 Cutoff enforcement

**Now:** "The form shall only offer trip dates and pickup times that are still
open under BRL-13, using the school calendar to identify the first school day
after a break. It shall show when the chosen date closes (e.g. 'Requests for
tomorrow close at 5:00 pm today' or 'Requests for Monday close at 7:00 am on
Monday') and, when a date is closed, the transport office number. Trips
outside operating hours show a warning and are flagged."

**Proposed:** "The form shall only offer trip dates and pickup times that are
still open under BRL-13, using the school calendar to identify the first
school day after a break. It shall show the day of the week next to the
chosen date, and when the chosen date closes (e.g. 'Requests for tomorrow
close at 5:00 pm today' or 'Requests for Monday close at 7:00 am on Monday')
and, when a date is closed, the transport office number. A date or time
outside operating hours (FR-42) is accepted while the date is open: the form
shows a warning next to that field, and the submitted request is flagged 'Out
of hours' and set to 'Needs attention' (BRL-15). These checks apply equally
to dates and times that are typed rather than picked. When a date is both
closed and outside operating hours, only the closed-date message is shown."

### 4.5 FR-42 Settings

**Now:** "Administrators shall configure dwell and buffer times, default
flexibility, extra ride-time limit, request cutoff time, operating hours, plan
approval time, rate limits, manual-review triggers, optimisation weights and
data retention period."

**Proposed:** "Administrators shall configure dwell and buffer times, default
flexibility, extra ride-time limit, request cutoff time, operating hours (the
days of the week and the opening and closing times), plan approval time, rate
limits, manual-review triggers (BRL-15, including 'Out of hours'),
optimisation weights and data retention period."

### 4.6 NFR-18 Low-bandwidth use

**Now (requirement):** "The public form and driver link work on slow or
unstable mobile data: form page 500 KB or less, and the driver link keeps
showing the last loaded route when offline."

**Now (measure):** "Test on throttled 3G"

**Proposed (requirement):** "The public form and driver link work on slow or
unstable mobile data: the form page transfers 500,000 bytes or less on a first
visit with an empty cache, in English and in Sinhala, and the driver link
keeps showing the last loaded route when offline."

**Proposed (measure):** "Test on throttled 3G. Page weight is the total number
of bytes transferred over the network, as served by the production set-up
(after compression, including headers), for every resource the form page
loads before the requester does anything: HTML, CSS, JavaScript, fonts and
images. English and Sinhala are measured separately, and each must be
500,000 bytes or less. Resources loaded only after a deliberate action by the
requester (for example opening the map to drop a pin) are measured and
reported separately and are not counted in the 500,000 bytes."

### 4.7 A-08 (assumption)

**Now:** "Vans are used during school days; weekend use is occasional and
flagged for manual handling."

**Proposed:** "Vans are used during school days; weekend use is occasional.
Requests outside operating hours (FR-42) are flagged 'Out of hours' and
confirmed individually by a coordinator (BRL-13, BRL-15, BRL-21)."

### 4.8 Sections 6.2 and 6.3, and Q-04

**Section 6.2, "Needs attention". Now:** "No suitable van found, or the
request has an address that couldn't be placed, special needs or a risk flag.
A coordinator must act."
**Proposed:** "No suitable van found, or the request has an address that
couldn't be placed, special needs, a risk flag, or a trip outside operating
hours. A coordinator must act."

**Section 6.3, row 5. Now:** "Date of trip&nbsp; (shows when requests for the
chosen date close) | Date picker (closed dates disabled) | Yes" (the source
has two spaces before the bracket)
**Proposed:** "Date of trip (shows the day of the week and when requests for
the chosen date close; warns if the day is outside operating hours) | Date
picker (closed dates disabled), or typed | Yes"

**Q-04 status. Now:** "Open: Partly: requests close 5:00 pm the previous day.
Operating hours and weekend trips still to confirm."
**Proposed:** "Open: Partly: requests close 5:00 pm the previous day.
Out-of-hours requests are accepted, flagged and confirmed individually by a
coordinator, and operating days and times are settings (CR-001). The actual
operating hours, and whether weekend trips are allowed at all, still to
confirm."

With this change, Section 13's statement that Q-04 "only set[s] default
values" holds: the answer changes the operating-hours setting, not the code.

### 4.9 FR-36 Coordinator alerts (no wording change proposed)

FR-36 already covers "when early trips are still unconfirmed at the cutoff"
and "Needs-attention items". The new US-33 AC-5 extends the first of these to
out-of-hours trips, as the proposed BRL-21 requires. If the owner prefers the
FR to say so, the proposed wording is: "… when early trips **or trips outside
operating hours** are still unconfirmed at the cutoff, …".

---

## 5. New acceptance criteria

The numbering continues the RTM's (TC-US-nn-n). Strings in quotes are the
meaning to be tested; the ux-designer writes the final English and Sinhala
text (FR-65), which must keep the meaning. Unless an AC says otherwise,
operating hours are the default, Monday to Friday, 7:00 am to 6:00 pm.

### US-05 (FR-07), new AC-7 to AC-13

| Test case | Acceptance criterion |
|-----------|----------------------|
| TC-US-05-7 | AC-7: GIVEN it is Thursday 15/10/2026, 3:00 pm WHEN I pick or type Saturday 17/10/2026 THEN the date is accepted, the day name 'Saturday' is shown next to the date, and a warning next to the date says that Saturday is outside our normal hours and a coordinator will check the request before confirming it |
| TC-US-05-8 | AC-8: GIVEN I have chosen Saturday 17/10/2026 and every other field is valid WHEN I tap 'Send request' THEN I see 'Request received' with a reference, the confirmation screen says a coordinator will check this trip because it is outside our normal hours, and the request is flagged 'Out of hours' and set to 'Needs attention', even if a van is found |
| TC-US-05-9 | AC-9: GIVEN I choose Wednesday 14/10/2026 WHEN I enter a 6:30 am pickup, or a 6:30 pm return pickup THEN a warning appears next to that time field, and on 'Send request' the request is flagged 'Out of hours' and set to 'Needs attention'; WHEN instead I enter a 7:00 am pickup and a 6:00 pm return pickup THEN no out-of-hours warning appears |
| TC-US-05-10 | AC-10: GIVEN it is Friday 16/10/2026, 5:01 pm WHEN I pick or type Saturday 17/10/2026 THEN I see only the closed-date message with the transport office number (as in AC-2), not the out-of-hours warning, and the form is not sent |
| TC-US-05-11 | AC-11: GIVEN JavaScript is turned off in my browser WHEN I type 17/10/2026 and tap 'Send request' THEN the request is accepted and flagged as in AC-8, and the confirmation screen shows the day name and the out-of-hours message |
| TC-US-05-12 | AC-12: GIVEN I use a screen reader, or the form in Sinhala WHEN the out-of-hours warning appears THEN it is announced without moving my focus, is programmatically linked to the date or time field it is about, is in my chosen language, and is shown with a text label or icon as well as colour (NFR-03) |
| TC-US-05-13 | AC-13: GIVEN I choose Saturday 17/10/2026 and tick 'Wheelchair access needed' WHEN I tap 'Send request' THEN the confirmation screen shows one message that a coordinator will check my request, not one message per reason |

AC-10 depends on OP-3 only for Sunday dates; for Saturday the cutoff is the
same under every option.

### US-39 (FR-42), new AC-3 and AC-4

| Test case | Acceptance criterion |
|-----------|----------------------|
| TC-US-39-3 | AC-3: GIVEN I add Saturday 8:00 am to 1:00 pm to the operating hours WHEN I save THEN a new request for Saturday at 9:00 am shows no warning and is not flagged, a new request for Saturday at 2:00 pm is warned and flagged 'Out of hours', bookings already made keep their flags, and the change is audit-logged |
| TC-US-39-4 | AC-4: GIVEN I switch off the 'Out of hours' manual-review trigger WHEN a request for Saturday is submitted THEN it is still warned and flagged 'Out of hours', but is not set to 'Needs attention' for that reason |

### US-33 (FR-36), new AC-5

| Test case | Acceptance criterion |
|-----------|----------------------|
| TC-US-33-5 | AC-5: GIVEN the plan for Saturday 17/10/2026 contains an out-of-hours trip that is not individually confirmed WHEN the cutoff optimisation finishes on Friday 16/10/2026 at 5:00 pm THEN coordinators get an alert to confirm that out-of-hours trip now |

### TC-NFR-18 (NFR-18), defined

The RTM names TC-NFR-18 but does not define it. Proposed checks, all under
one test case ID as for the other NFRs:

1. **English page weight.** First visit, empty cache, production set-up: total
   bytes transferred for the form page before any action is 500,000 or less.
2. **Sinhala page weight.** The same, with Sinhala chosen: 500,000 or less.
3. **After-action resources.** Bytes transferred after "Choose on map" (and any
   other deliberate action) are measured and reported separately, with no
   pass or fail limit (OP-7).
4. **Throttled 3G.** The form can be completed and sent on the throttled
   profile (OP-8).
5. **Driver link offline.** After the route has loaded once, switching the
   network off still shows the last loaded route.

Until a production server exists, the uncompressed size of each file is an
acceptable upper bound for checks 1 and 2: a page that passes uncompressed
will pass when compressed.

---

## 6. Impact on stories and estimates

Story points follow the baseline's scale (Fibonacci, confidence Low, ±60%) and
are for the delivery team to re-estimate.

| Story | Now | Proposed | Why |
|-------|-----|----------|-----|
| US-05 (Must, Release 1) | 3 points, Medium | **5 points, Medium** | Seven new criteria: day name, warnings on date and time fields, flag and "Needs attention", precedence over the closed-date message, typed dates without JavaScript, accessibility, one combined message. |
| US-39 (Must, Release 1) | 3 points, Low | 3 points, Low | Operating hours were already a setting; adding days and one trigger switch is small. |
| US-33 (Should, Release 2) | 3 points, Low | 3 points, Low | Reuses the early-trip alert at the cutoff. |

| Total | Now | Proposed |
|-------|-----|----------|
| EP-01 (section 11.2; workbook, Epics) | 8 stories, 27 points | 8 stories, **29 points** |
| Release 1 (section 15) | 38 stories, 150 points | 38 stories, **152 points** |
| All releases | 216 points | **218 points** |

Depending on the open points: OP-2 option P1 changes the wording of FR-34,
FR-61, US-31 AC-1 and US-52 AC-1 ("in the morning"), with perhaps 1 more point
on US-52. OP-3 option (b) fits inside US-05's 5 points. NFR-18 carries no
story points; an automated page-weight check (test-engineer and
devops-engineer) is small and not in the backlog.

### Impact assessment

| Dimension | Impact | Detail |
|-----------|--------|--------|
| Scope | Low | One new manual-review trigger, two rule clauses, a measurement method. No new screens or entities. |
| Schedule | Low | +2 points in Release 1. |
| Risk | Reduces | Out-of-hours requests can no longer be batch-approved unnoticed. Staff are not pushed back to phoning for weekend trips (R-01, R-16). Page weight can no longer pass on one report and fail on another. |
| Privacy (PDPA No. 9 of 2022) | None | No new personal data; the "Out of hours" flag is already in Appendix A. |
| Coordinator workload | Low | Every out-of-hours request needs one individual confirmation. A-08 expects these to be occasional. |
| Downstream | Medium | ux-designer: the brief's validation table and strings (`docs/design/system-options/brief.md`, `hours.warning`, which now covers only late times) and its weight budget (section 2 and checklist). architect and backend-developer: the operating-hours setting must hold days and times, and the trigger must be switchable. test-engineer: the new test cases. routing-engineer: none (BRL-05 unchanged). |

---

## 7. Open points

These are not decided by this change request. Each has options and a
recommendation. OP-2 and OP-3 change proposed wording, so the owner may
decide them at approval (section 9); the others can follow later.

### OP-1 Q-04 is still with the Transport Coordinators

Are weekend trips allowed at all, and what are the real operating hours? This
change request does not close Q-04. Because days and times are both settings,
the answer only changes the setting. **If the answer is "never"**, a further
change request would move to refusing out-of-hours dates (option A of OQ-01),
still driven by the setting. **Recommendation:** ask the coordinators Q-04
together with OP-2, OP-3 and OP-4, since all four are about how they work
outside normal hours.

### OP-2 Who approves the plan for a date that is not an operating day, and when

BRL-19 runs "Optimise day" at the cutoff (Friday 5:00 pm for a Saturday).
BRL-21 then requires approval "by 7:10 am on the trip day", and final details
(FR-34) and driver links (FR-61) go out only on approval. NFR-06 covers
"Mon–Fri" only.

| Option | What happens | For | Against |
|--------|--------------|-----|---------|
| P1. Approve on the last operating day | The plan for a non-operating day is approved after its cutoff optimisation, by the closing time of the last operating day before it (default: Friday, between 5:00 pm and 6:00 pm). Final details and driver links go out on that approval. Coordinators are alerted if it is not approved by then. | Keeps a person approving before anything goes out. Within operating hours and NFR-06. Every trip on that day is already confirmed individually, so approval is quick. The driver link works offline (NFR-18). | A short window. FR-34, FR-61, US-31 AC-1 and US-52 AC-1 say "morning" and need rewording. A late change on Saturday reaches the driver only through "Route updated". |
| P2. Approve on the morning, as now | A named coordinator approves by 7:10 am on Saturday. | No rule change. | Someone must work every Saturday with trips; NFR-06 does not cover weekends. |
| P3. No day-plan approval | Because every trip is confirmed individually, final details and driver links go out automatically at the cutoff. | No weekend work. | Sends driver links without a person approving the day, against BRL-21's principle. |

**Recommendation: P1.** Proposed clause for BRL-21: "For a date that is not an
operating day, the plan is approved after its cutoff optimisation and before
the closing time of the last operating day before it; final details and route
links go out on that approval." Default: "closing time of the last operating
day before the date". The Transport Coordinators should confirm, since they
own BRL-21's times (Q-25, Q-27).

### OP-3 Cutoff for a date whose previous day is also not an operating day

The normal cutoff for Sunday is 5:00 pm on Saturday. Under this change, the
coordinator must confirm the trip individually, and the cutoff alert (BRL-21)
and the "Optimise day" run (BRL-19) would fall on Saturday evening, outside
operating hours. OQ-01 noted that the weekend cutoff is the normal one; that
reading did not foresee individual confirmation.

| Option | Cutoff for Sunday 18/10/2026 | For | Against |
|--------|------------------------------|-----|---------|
| (a) Normal rule | Saturday 17/10/2026, 5:00 pm | No rule change. | Requests arrive when no coordinator is working; the alert goes unread. |
| (b) Last operating day | Friday 16/10/2026, 5:00 pm | Every out-of-hours date closes while coordinators are working; works with P1. | A Sunday closes earlier than requesters may expect; the form must say so ("Requests for Sunday close at 5:00 pm on Friday"). |
| (c) Leave to coordinators | As (a), and coordinators handle late requests by phone | No rule change. | Leaves the gap in place. |

**Recommendation: (b).** Proposed clause for BRL-13, at the marker in 4.1:
"For a date that is not an operating day, the cutoff is 5:00 pm on the last
operating day before it." Saturday's cutoff is the same under every option.

### OP-4 Weekday non-school days

Is a trip on a Poya day, a public holiday, a school break day or a college
non-school day "outside operating hours"? The default ("Mon–Fri") says no;
A-08 ("Vans are used during school days") suggests these are exceptional too.
**Recommendation:** keep the baseline reading (operating hours only, not the
school calendar) until Q-04 is answered, and ask the coordinators the same
question at the same time. If the answer is yes, a further change request
would add "non-school days" to BRL-13's definition.

### OP-5 Fixed-trip series outside operating hours

Under BRL-15 as proposed, every occurrence of a fixed series outside operating
hours (for example a 6:30 pm practice each Tuesday) would go to "Needs
attention", one item per occurrence each term. The coordinator who set up the
series has already accepted its hours. **Recommendation:** fixed-trip
occurrences keep the "Out of hours" flag but are not set to "Needs attention"
for that reason (the clause marked OP-5 in 4.2). Bookings entered by a
coordinator under FR-30 follow the rule like any other request; the
coordinator can confirm them at once. Whether a fixed series may run on a
weekend at all (BRL-14 does not mention weekends) stays out of this change
request, as in OQ-01.

### OP-6 Acknowledgement message for out-of-hours requests

US-30 AC-1's acknowledgement ends "We'll confirm soon". That stays true for an
out-of-hours request. Templates are short (C-06) and WhatsApp templates need
re-approval when changed (C-07). **Recommendation:** no template change; the
confirmation screen (US-05 AC-8) carries the explanation.

### OP-7 A budget for the map

The map loaded by "Choose on map" (US-02 AC-3, FR-52) is reported separately
and has no limit. Map tiles can be heavy, and pin drop is how staff with
informal addresses book. **Recommendation:** log it as a separate question
once the map service is chosen and its weight can be measured.

### OP-8 The throttled-3G profile and what "work" means

NFR-18's measure says "Test on throttled 3G" but gives no speeds and no pass
condition beyond "work". The owner's answer did not cover this, and this
change request does not alter it. **Recommendation:** the test-engineer
proposes a profile stated as numbers (download, upload, latency), not as a
tool's preset name, which can change between versions, and the owner
confirms it. Without a time limit, check 4 of TC-NFR-18 passes if the form
can be completed and sent.

---

## 8. For the owner: where the baseline changes

When approved, as "Changes in version 1.0" asks ("Each approved CR is
recorded here and in the change history as version 1.x"):

- **Specification:** add a 1.1 row to the change history and a row to
  the "Changes in version 1.0" table (or a new "Changes in version 1.1"
  heading, as the owner prefers) naming CR-001; update sections 6.2, 6.3, 8 (BRL-13,
  BRL-15, BRL-21), 9.1 (FR-07), 9.6 (FR-42), 10 (NFR-18), 11 (US-05, US-33,
  US-39 and the EP-01 total in 11.2), 12.1 (A-08), 13 (Q-04) and 15 (Release 1
  points).
- **Workbook:** Read Me (version 1.1); Epics (EP-01 points); User Stories
  (US-05, US-33, US-39); Requirements (FR-07, FR-42, NFR-18); Business Rules
  (BRL-13, BRL-15, BRL-21); RTM (FR-07 gains TC-US-05-7 to TC-US-05-13; FR-42
  gains TC-US-39-3 and TC-US-39-4; FR-36 gains TC-US-33-5; the NFR-18 row's
  title is cut from the requirement text and changes with it); Open Questions
  (Q-04 status).

After the baseline is updated, the requirements-analyst marks OQ-01 and OQ-02
Closed in `docs/requirements/open-questions.md`.

---

## 9. Approval

Part A and part B may be approved together or separately.

| Decision | Choice |
|----------|--------|
| Part A (out-of-hours requests) | Approved / Approved with changes / Rejected: ________________ |
| Part B (NFR-18 page weight) | Approved / Approved with changes / Rejected: ________________ |
| OP-2 (approval of a non-operating day's plan) | P1 / P2 / P3 / Left open: ________________ |
| OP-3 (cutoff for a date after a non-operating day) | (a) / (b) / (c) / Left open: ________________ |
| OP-5 (fixed-trip occurrences) | As recommended / Other: ________________ |

Approved by: ______________________ (owner)

Date: ____________

Comments: ________________________________________________
