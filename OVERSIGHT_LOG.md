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
