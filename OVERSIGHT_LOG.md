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
