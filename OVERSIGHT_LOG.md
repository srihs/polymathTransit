# Oversight log

This is research data for a PhD on human oversight in agentic software
development. Each row is one oversight episode: a correction, rejection or
override by the owner, a critique finding the owner accepted, or a critique
finding the owner overruled (which changes no code but is still recorded).

Rows are appended by `/oversight` (`.claude/commands/oversight.md`), which also
defines the values in each column. Rows are append-only: never edit or delete
one. Where a row and its commit's `Oversight-` trailers disagree, the commit is
authoritative.

| Date | Commit | Type | Stage | Source | What looked right but was not | What was done | Durable |
|------|--------|------|-------|--------|-------------------------------|---------------|---------|
| 2026-10-01 | cbf0357 | correctness | in-loop | agent-critique | The routing-engineer's Skills table mapped performance tuning to performance-profiling, an Apple-platform skill that cannot serve a Python routing engine. | Removed the row and left a line telling the agent to check the installed skills list for one that fits. | yes |
| 2026-10-01 | 0f2791d | design | in-loop | agent-critique | The CLAUDE.md rule that every JavaScript function has JSDoc did not say whether inline callbacks count, so the five builders applied it differently. | Added the owner's ruling on callbacks to the Code documentation section of CLAUDE.md. | yes |
| 2026-10-01 | ac5ee34 | business-rule | in-loop | agent-critique | The Ticket request form accepts weekend dates with no out-of-hours warning or flag, which FR-07 requires. | Logged as OQ-01 in the requirements open-questions log with options for the owner, together with the NFR-18 unit question as OQ-02. | no |
| 2026-10-01 | 2d58620 | critique-override | in-loop | agent-critique | The code review raised ten findings (C1, C5, 2.1, 2.2, 3.1, 3.2, 4.1 to 4.4) that were correct but concern only the four design directions the owner did not choose. | The owner overruled them as not worth acting on and recorded the adjudication in the review; no code changed. | no |
| 2026-10-01 | 80a0be8 | design | in-loop | agent-critique | The Ticket confirmation showed a just-sent request with the purple strip and tick that mean Confirmed, so a requester could think an unconfirmed trip was booked. | The confirmation now shows a neutral 'Not confirmed yet' stamp with an unfilled strip, and the strip turns purple only when a coordinator confirms. | no |
| 2026-10-01 | f4a8c61 | correctness | in-loop | agent-critique | The Ticket driver page jumped from h1 straight to h3, breaking the heading order that screen-reader users navigate by. | Each stop heading is now an h2 with a screen-reader 'Next stop:' label on the current stop, and the page looks exactly as before. | no |
| 2026-10-01 | d423589 | correctness | in-loop | agent-critique | The Ticket dashboard's list toggle changed its label and its pressed state together, so screen readers announced a contradictory state. | The label now always reads 'Show as list', aria-pressed alone carries the state, and the pressed look uses a tick and a bar as well as colour. | no |
