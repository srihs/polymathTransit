# Open questions log

The requirements-analyst keeps this log. It records questions where the
approved baseline (`Requirements/`, version 1.0, 30/09/2026) is silent,
ambiguous or contradicts itself, together with the options and a
recommendation. The owner answers. The analyst does not.

- **IDs.** Entries are numbered OQ-nn. They are separate from the baseline's
  Q-01 to Q-27, which belong to the owner's documents. If an answer is taken
  into the baseline, the change request says which Q or rule ID it becomes.
- **Status.** Open (waiting for the owner), Answered (the owner's answer is
  recorded), or Closed (the answer is in the baseline through a change
  request, or no change was needed).
- **Answers.** The owner's answer is written into the entry with the date,
  word for word where possible. If an answer changes the baseline, the analyst
  drafts a change request in `docs/requirements/change-requests/`.
- **Quotes.** Requirement text is quoted exactly from the v1.0 specification
  and workbook. Earlier versions are quoted only to show history.

| ID | Question | Raised from | Status |
|----|----------|-------------|--------|
| OQ-01 | How should the public form treat a weekend trip date? | Code review 2026-10-01, finding C2 | Open |
| OQ-02 | Is NFR-18's "500 KB" 500,000 bytes or 512,000 bytes, and what is counted? | Code review 2026-10-01, finding 2.1 | Open |

---

## OQ-01 Weekend trip dates on the public request form

- **Raised:** 2026-10-01, from `docs/reviews/2026-10-01-design-system-options.md`
  finding C2 ("Weekend dates are accepted"). The owner accepted the finding
  and sent the question here.
- **Affects:** BRL-13, FR-07, US-05, A-08, Q-04, FR-42, BRL-15, BRL-21,
  Appendix A (Booking: Flags). The design brief's validation table and strings
  (`docs/design/system-options/brief.md`, `hours.warning`).
- **Status:** Open

### Question

A requester types or picks a Saturday or Sunday as the trip date (the review
used Saturday 17/10/2026). What should the public form do: refuse the date,
accept it with a warning and an "Out of hours" flag for a coordinator, or
something else?

### What the baseline says

- **BRL-13** (rule, last sentence): "Trips outside operating hours are flagged
  'Out of hours'." Its default column: "5:00 pm previous day; 7:00 am same day
  after a break; 60 min lead; hours Mon–Fri 07:00–18:00".
- **BRL-13** (what the form refuses): "After the cutoff, the public form does
  not accept requests for that date."
- **FR-07** Cutoff enforcement: "The form shall only offer trip dates and
  pickup times that are still open under BRL-13, using the school calendar to
  identify the first school day after a break. … Trips outside operating hours
  show a warning and are flagged."
- **A-08** (assumption): "Vans are used during school days; weekend use is
  occasional and flagged for manual handling."
- **Q-04**: "Minimum notice period and operating hours? Are weekend trips
  allowed?" Why it matters: "Default settings and the out-of-hours flag."
  Status: "Open: Partly: requests close 5:00 pm the previous day. Operating
  hours and weekend trips still to confirm."
- **Section 13**: "The eight still open (Q-04, Q-05, Q-08 to Q-11, Q-17, Q-18)
  only set default values and can be settled during design."
- **FR-42** Settings: administrators configure "… request cutoff time,
  operating hours, plan approval time, …".
- **FR-03**: the form shall "reject past dates". **Appendix A**, Booking, Trip
  date: "Date DD/MM/YYYY, today or later". **Section 6.3**, row 5: "Date picker
  (closed dates disabled)".
- **Appendix A**, Booking, Flags: "Late (exception) + reason, Out of hours, New
  requester, Address check, Shared, Gap job, High priority".
- **BRL-15**: "Requests are always set to 'Needs attention' when an address
  cannot be located reliably, wheelchair access is needed, or the phone number
  has never been seen before, even if a route is found." "Out of hours" is not
  in this list.
- **BRL-05** and **US-55 AC-1**: a van's route must fit its available hours
  for that day; otherwise the van is not proposed and the reason says
  "Outside available hours – coordinator approval needed". **FR-38** holds
  "available hours per weekday" for each van.
- **BRL-21**: "A coordinator approves each day's plan on the morning of the
  trip day. Final details go to requesters and route links to drivers only on
  approval." Default: "Approval by 7:10 am on the trip day".
- **NFR-06**: "99.5% availability 06:30–19:00 Mon–Fri (Sri Lanka time)".

History (for context only): in v0.1 to v0.4, BRL-13 read "Requests with less
than the minimum notice, or outside operating hours, are accepted but flagged
'Urgent' / 'Out of hours' for the coordinator", and FR-07 said "the request is
still accepted and flagged (BRL-13)". v0.5 replaced the minimum notice with the
5:00 pm cutoff but kept "Trips outside operating hours are flagged 'Out of
hours'". No version says that out-of-hours requests are refused.

### What the baseline decides

1. **The default operating hours cover days as well as times.** "hours
   Mon–Fri 07:00–18:00" puts Saturday and Sunday outside operating hours by
   default. (Reading of BRL-13's default column; confidence: likely.)
2. **Out-of-hours trips get a warning and a flag; they are not refused.**
   BRL-13 and FR-07 say "flagged" and "show a warning", and A-08 says weekend
   use is "flagged for manual handling". The only dates the form refuses are
   past dates (FR-03) and dates past their cutoff (BRL-13, FR-07). A weekend
   date that is still before its cutoff is therefore open.
3. **Operating hours are a setting** (FR-42), so the Mon–Fri default can
   change without a code change.
4. **The cutoff for a weekend date is the normal one**, 5:00 pm the previous
   day: the 7:00 am exception applies only "when the trip date is the first
   school day after one or more non-school days", and a Saturday is not a
   school day. (Derived from BRL-13; confidence: inferred.)

So the prototypes are right to accept the date, but wrong to accept it
silently: FR-07 requires a warning and a flag, and the brief has no rule or
string for an out-of-hours day. The brief's `hours.warning` ("Trips after
6:00 pm are outside our normal hours. …") covers only late times, not days,
and not times before 7:00 am.

### What the baseline leaves open

1. **Whether weekend trips are allowed at all, and the real operating hours.**
   This is Q-04, owned by the Transport Coordinators, still open.
2. **What "manual handling" means.** A-08 implies a coordinator must look at
   every weekend request, but BRL-15 does not list "Out of hours" as a reason
   for "Needs attention". If a van has weekend available hours (FR-38), a
   weekend request can be "Proposed" and approved in a batch (FR-26, US-23
   AC-2) without anyone noticing the flag. If no van has weekend hours, BRL-05
   already sends it to "Needs attention" (US-55 AC-1), but only by accident of
   the van data.
3. **Who approves a weekend day's plan, and when.** BRL-19 runs "Optimise day"
   at the cutoff (Friday 5:00 pm for a Saturday). BRL-21 then needs approval
   by 7:10 am on Saturday, and final details and driver links go out only on
   approval. NFR-06 does not cover weekends. The baseline has no rule for this.
4. **Weekday non-school days.** Is a trip on a Poya day, public holiday, school
   break day or college non-school day also "outside operating hours"? The
   default ("Mon–Fri") says no; A-08 ("Vans are used during school days")
   suggests these are exceptional too. FR-07 uses the school calendar only to
   work out cutoffs.
5. **Wording.** There is no requester-facing text, in English or Sinhala, for
   an out-of-hours day or for a time before 7:00 am (FR-65).

### Edge cases the answer must cover

Found with the edge-case review; the ux-designer and test-engineer should
carry these forward whichever option is chosen.

- **Typed dates and no JavaScript.** Pages must work without scripts
  (CLAUDE.md, "Front end"). The server has to check the date and show the
  warning (or the error) on the returned page. A disabled date in a picker is
  not enough, and the review found the gap through a typed date.
- **The requester may not know the date is a Saturday.** With DD/MM/YYYY
  (NFR-12) typed by hand, a warning about "weekends" makes sense only if the
  form shows the day name next to the date, in the chosen language.
- **Screen readers and colour.** The warning must be tied to the date field
  and announced when it appears, and must not rely on colour alone (NFR-03).
- **If dates are refused (option A),** a picker must say why a date cannot be
  chosen, and a typed weekend date needs a plain-language message next to the
  field (FR-03), not a silent refusal.
- **Both rules at once.** A weekend date that is also past its cutoff should
  show the closed-date message only. A weekend request that also needs
  wheelchair access already goes to "Needs attention" (BRL-15); the requester
  should see one clear message about what happens next, not two.
- **The acknowledgement message** (FR-33) says "We'll confirm soon". For a
  flagged weekend request the requester may need to hear that a coordinator
  will check it. Message templates are short (C-06) and WhatsApp templates
  need approval (C-07), so this is a decision, not a detail.
- **Time-only cases.** The same mechanism should handle weekday trips before
  7:00 am or after 6:00 pm, including a return trip that ends after 6:00 pm on
  a weekday.

Out of this question: fixed-trip series on weekends (BRL-14 skips holidays and
non-school days but does not mention weekends). That is a coordinator-side
question; it can be logged separately if the owner wants it.

### Options

| Option | What the public form does | For | Against | Baseline change? |
|--------|---------------------------|-----|---------|------------------|
| A. Refuse | Weekend dates are disabled in the picker and refused on the server, with the transport office number, as for closed dates. Coordinators enter weekend trips themselves (FR-30). | No request reaches the queue that no van can run. Simple to explain. | Contradicts BRL-13 and FR-07 ("flagged", not refused) and A-08. Blocks real, occasional weekend use, and pushes staff back to phoning (R-01, R-16). If "weekend" is hard-coded, it breaks FR-42's configurable hours. | Yes: change request to BRL-13, FR-07, US-05 (new acceptance criterion) and A-08. |
| B. Accept, warn and flag | The date is accepted. The form shows a warning; the booking gets the "Out of hours" flag. The request then follows the normal flow. | What the baseline says. One mechanism for out-of-hours days and times, driven by the FR-42 setting. | A flagged request can still be "Proposed" and batch-approved if a van has weekend hours. Leaves the Saturday approval problem (open point 3) unsolved. | No. The design brief needs the rule and strings. |
| C. Accept, warn, flag and send to a coordinator | As B, and "Out of hours" also sets "Needs attention", switchable like the other BRL-15 triggers. For out-of-hours dates, the coordinator confirms the trip individually in advance, as BRL-21 already requires for early trips, instead of waiting for a weekend morning approval. | Delivers A-08's "manual handling" for certain. Fits the existing BRL-15 and BRL-21 patterns. Adds work only for occasional weekend trips. | Needs a small baseline change. | Yes: change request adding a trigger to BRL-15 and an out-of-hours rule to BRL-21. |
| D. Leave as built | The date is accepted silently: no warning, no flag. | None. | Fails FR-07 ("show a warning and are flagged") and BRL-13. | Not acceptable as it stands; listed for completeness. |

### Recommendation

**Option C. If the owner prefers not to change the baseline now, use option B,
which is the baseline as written.**

1. Define "outside operating hours" from the FR-42 setting (days and times;
   default Monday to Friday, 7:00 am to 6:00 pm). Do not hard-code "weekend".
   A date or time outside the setting shows a warning next to the field and
   sets the "Out of hours" flag. This much is already required by BRL-13 and
   FR-07, needs no change request, and should go into the brief's validation
   table with English and Sinhala strings.
2. Approve a small change request for option C: "Out of hours" becomes a
   switchable BRL-15 trigger, and BRL-21 says trips on out-of-hours dates are
   confirmed individually in advance. I can draft it once the owner chooses.
3. Ask the Transport Coordinators to close Q-04 (are weekend trips allowed,
   and what are the real hours). If the answer is "never", move to option A
   through a change request, still based on the setting rather than
   hard-coded days.
4. For weekday non-school days (open point 4), keep the baseline (flag by
   operating hours only) until Q-04 is answered, and ask the coordinators the
   same question at the same time.

The point to note for the design: Q-04 stays a "default value only" question
(Section 13) only if the operating-hours setting holds days as well as times.
If the setting were built as times only, answering Q-04 would need a code
change.

### Owner's answer

Owner's answer: pending

---

## OQ-02 The unit of NFR-18's "500 KB"

- **Raised:** 2026-10-01, from `docs/reviews/2026-10-01-design-system-options.md`
  finding 2.1. The owner overruled the finding for direction 2 (not chosen)
  and sent the unit question here, because it decides how Ticket's pages are
  measured too.
- **Affects:** NFR-18 and its test TC-NFR-18 (Should, Release 2 in the RTM);
  the design brief's weight budget (`brief.md` section 2 and its checklist);
  how every later page weight is reported.
- **Status:** Open

### Question

NFR-18 sets the public form page at "500 KB or less". Is a KB 1,000 bytes
(limit 500,000 bytes) or 1,024 bytes (limit 512,000 bytes)? And, because the
unit alone does not settle a measurement, what exactly is counted?

### What the baseline says

- **NFR-18** Low-bandwidth use: "The public form and driver link work on slow
  or unstable mobile data: form page 500 KB or less, and the driver link keeps
  showing the last loaded route when offline." Measure / verification: "Test
  on throttled 3G". Priority: Should.
- **NFR-05**: "Pages load in 3 seconds or less on 4G".
- Nothing else. "KB" appears only in NFR-18, in both the specification and the
  workbook. The glossary (Appendix C) has no entry for it, and no section
  defines units of data size. The wording has not changed since NFR-18 was
  added in v0.3.

### What the baseline decides and leaves open

Decided: a 500 KB ceiling for the public form page, verified on a throttled
3G connection. The driver link has no size limit, only offline behaviour.

Not defined:

1. **The unit:** 1,000 or 1,024 bytes.
2. **What is counted:** bytes on the wire (compressed, with headers) or file
   sizes before compression; which resources (HTML, CSS, JavaScript, fonts,
   images); and whether things loaded only after the requester acts (for
   example the map for "Choose on map", US-02 AC-3, FR-52) are part of the
   "form page".
3. **Which state:** first visit with an empty cache or a repeat visit, and
   which language. Sinhala loads extra fonts, so it is the heavier case.

Current practice in the project is mixed. The brief counts "HTML, CSS, JS,
images and fonts, with the Sinhala font loaded". Direction 1's README converts
with 1,024 (412,302 bytes reported as 403 KB). Direction 2's README reports
KiB as "KB". The review counted local files at full size and fonts as
transferred, with headers. Ticket's README and the review's run give slightly
different figures. Two people measuring the same page can therefore reach
different answers.

### Measured sizes (from the review, in bytes)

| Page | Bytes | In units of 1,000 | In units of 1,024 | Under 500,000? | Under 512,000? |
|------|------:|------------------:|------------------:|:--------------:|:--------------:|
| Ticket (direction 5, chosen), request page, English | 393,164 | 393.2 | 383.9 | Yes (106,836 to spare) | Yes (118,836 to spare) |
| Ticket (direction 5, chosen), request page, Sinhala | 415,844 | 415.8 | 406.1 | Yes (84,156 to spare) | Yes (96,156 to spare) |
| Inscription (direction 2, not developed), request page, Sinhala | 502,491 | 502.5 | 490.7 | No | Yes |

The chosen design passes under either unit. The question matters for the
build: production adds a CSRF field, real place lists and the address
lookup, so the margin will shrink.

### Options

| Option | Limit | For | Against |
|--------|-------|-----|---------|
| A. 1 KB = 1,000 bytes | 500,000 bytes | The standard meaning of "kilo" (SI and IEC 80000-13). The stricter reading, so a page that passes cannot fail under the other reading. No current page changes. | A page between 500,000 and 512,000 bytes fails, which only direction 2 did, and it is not being developed. |
| B. 1 KB = 1,024 bytes | 512,000 bytes | Matches older software convention and some tools' reports. 12,000 bytes (2.4%) more room. | Ambiguous to readers who take "K" as 1,000. A page can pass on one report and fail on another. |
| C. State the limit in bytes and fix the method | 500,000 or 512,000 bytes, with a defined measurement | Removes both ambiguities: the unit and what is counted. Gives TC-NFR-18 an exact test. | Needs the owner to agree the method as well as the unit. |

### Recommendation

**Option C with A's unit: 500,000 bytes, with the method stated.** Suggested
wording for the method:

> The public form page, opened for the first time with an empty cache,
> transfers no more than 500,000 bytes over the network, in English and in
> Sinhala, measured separately. Count every resource the page loads before
> the requester does anything (HTML, CSS, JavaScript, fonts and images),
> as transferred in the production set-up, including compression and
> headers. Resources loaded only after a deliberate action, such as opening
> the map to drop a pin, are measured and reported separately.

Reasons: it is the stricter reading and costs nothing today (Ticket has at
least 84,156 bytes to spare). It matches NFR-18's purpose, which is slow data,
so what crosses the network is what matters. It also gives the
requirements-analyst one exact test to verify against at step 7. Until a
production server exists, uncompressed file sizes (as the prototypes were
measured) are an upper bound: a page that passes uncompressed will pass.

Whether the map loaded by "Choose on map" needs its own budget is a separate
question. I can log it if the owner wants it. Map tiles can be heavy, and
pin drop is how staff with informal addresses book (FR-52).

This clarifies NFR-18's measure without changing the 500 figure. The owner
decides whether to record it here as an interpretation, or to put it into the
baseline through a change request so that the specification carries it. I
recommend the change request, which could be grouped with OQ-01's, and can
draft it on the owner's answer.

### Owner's answer

Owner's answer: pending
