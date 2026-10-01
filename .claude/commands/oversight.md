---
description: Record an oversight episode as its own commit with Oversight- trailers, then log it in OVERSIGHT_LOG.md
argument-hint: "[any of: type=… stage=… source=… trigger=\"…\" action=\"…\" durable=yes|no]"
---

# /oversight

This file is the normative definition of an oversight episode record. CLAUDE.md
("Oversight capture") says when an episode happens and the rules around it; this
file alone defines what is recorded and how. Do not restate these definitions
anywhere else.

## The record

An oversight episode is recorded as one git commit. After a blank line, its
message ends with exactly these six trailers, in this order, one line each:

| Trailer | Allowed value |
|---|---|
| `Oversight-Type` | One of: `architecture`, `business-rule`, `correctness`, `security`, `scope`, `data-model`, `performance`, `dependency`, `design`, `critique-override` |
| `Oversight-Stage` | `in-loop` if caught during the build, before handover; `acceptance` if caught by a stakeholder reviewing the delivered output; `production` if caught after go-live |
| `Oversight-Source` | `self` if the owner spotted it unaided; `agent-critique` if an agent review surfaced it; `client`, `stakeholder` or `colleague` if a person other than the owner did |
| `Oversight-Trigger` | What was produced that looked correct and was not, in one sentence |
| `Oversight-Action` | What was done about it, in one sentence |
| `Oversight-Durable` | `yes` if it produced a new or changed rule in CLAUDE.md, a subagent definition, a test, or a lint rule; `no` otherwise |

Value rules:

- Type, Stage, Source and Durable take exactly one of the listed values,
  lower case, with nothing added.
- Trigger and Action are a single sentence each, on one line, ending with a
  full stop. They contain no `|` character, because they are copied into the
  log table.
- Type `critique-override` always has Durable `no`.
- Durable `yes` requires the commit itself to contain the durable change: a
  change to CLAUDE.md, to a file under `.claude/agents/`, to a test, or to a
  lint rule.

Any other trailers on the commit (such as `Co-Authored-By`) go in the same final
block, above the six Oversight- trailers, so the message still ends with them.

## What the command does

The owner's input is in `$ARGUMENTS`. It may give some of the six values, in
any form.

1. **Collect the six values.** Take whatever `$ARGUMENTS` and the conversation
   state explicitly. Ask the owner for every value they have not given. You may
   offer a suggested value, but do not commit with a value the owner has not
   given or confirmed. Check every value against "Value rules" above and ask
   again if one fails.

2. **Check the branch.** Run `git branch --show-current`. If it is `PROD`,
   stop and ask the owner which branch to use; episodes are not committed
   directly to `PROD`.

3. **Stage the current change.** Run `git status --short` and show the owner
   the changed files. Stage only the files that belong to this episode, by
   name (never `git add -A` when anything else has changed). If feature work
   is mixed in, ask the owner which files belong to the episode. For a
   `critique-override`, the staged change is the review document with the
   owner's adjudication written into it. If nothing is staged, stop and say
   so; an episode commit is never empty.

4. **Write the commit.** Write the message to a temporary file in the
   scratchpad and commit with `git commit -F <file>`:

   ```
   <imperative summary of the correction, 72 characters or fewer>

   <a short body: what was wrong, who caught it, what changed>

   Co-Authored-By: <as the session's attribution instructions require>
   Oversight-Type: <value>
   Oversight-Stage: <value>
   Oversight-Source: <value>
   Oversight-Trigger: <value>
   Oversight-Action: <value>
   Oversight-Durable: <value>
   ```

   Then check that git reads all six trailers:
   `git log -1 --format='%(trailers:key=Oversight-Type,key=Oversight-Stage,key=Oversight-Source,key=Oversight-Trigger,key=Oversight-Action,key=Oversight-Durable)'`
   must print six lines. If the commit fails (for example a hook rejects
   it), fix the cause and commit again. Never amend.

5. **Append the log row.** Append one row to the table at the end of
   `OVERSIGHT_LOG.md`:

   ```
   | <YYYY-MM-DD> | <short SHA> | <Type> | <Stage> | <Source> | <Trigger> | <Action> | <Durable> |
   ```

   The date is the commit date, in ISO format. Never edit or delete existing
   rows. The row cannot go in the episode commit, because it contains that
   commit's SHA, so commit it on its own straight away:
   `git add OVERSIGHT_LOG.md` and
   `git commit` with the subject `Log oversight episode <short SHA>`, the
   session's attribution trailer if one is required, and no Oversight-
   trailers.

6. **Print the result.** Print the episode commit's full SHA, and the log
   commit's SHA, to the owner.
