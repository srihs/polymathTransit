# PolymathTransit

## Branching (project rule)

- `PROD` is the main branch. It holds the production code and nothing else.
- Every piece of work, whether a feature or a bug fix, is done on its own
  branch.
- Every new development branch is created from `PROD`, never from another
  development branch:

      git switch PROD
      git pull
      git switch -c <branch-name>

- Nothing is committed directly to `PROD`.
- For a production release, the branches being released are merged into
  `PROD`, and the release is made from `PROD`.

## Oversight capture

This repository is research data for a PhD on human oversight in agentic
software development. These rules are addressed to you, the agent working here.

- When I correct you, reject your approach, override a decision, or tell you
  something you produced is wrong, that is an OVERSIGHT EPISODE.
- An agent-run review counts. If a critique agent surfaces something and I
  accept it, that is an episode with `Oversight-Source: agent-critique`, which
  is NOT the same as me spotting it unaided.
- If a critique agent surfaces something and I decide it is wrong, or right but
  not worth acting on, that is also an episode, and an important one. It
  changes no code, so record it by committing the review document with my
  adjudication written into it, typed `critique-override`, Durable: no.
- Anything a stakeholder raises after handover matters MORE than what I catch
  during the build, because it is something my own review let through.
- Commit each episode on its own, separately from feature work, using
  `/oversight`. Do not assemble trailers by hand, and do not fold an episode
  into a larger commit.
- Never squash, amend, rebase, cherry-pick or force-push a commit carrying an
  `Oversight-` trailer. That history is the dataset, and it cannot be repaired
  later.
- Never delete or overwrite a subagent definition, a CLAUDE.md section, or a
  file under `.claude/commands/`. Change it and commit the change, so the
  evolution stays visible. Removing one outright is allowed only as its own
  commit whose message says why.
- The main session runs `/oversight` and makes the commits itself. It does not
  delegate that to a subagent. Where an episode is Durable: yes because it
  changes CLAUDE.md or a subagent definition, the owning agent authors that
  change first, and `/oversight` only commits and logs it.
- If you are unsure whether something counts, ask me rather than guessing. A
  false entry is worse than a missing one.
- The normative definitions live in `/oversight`
  (`.claude/commands/oversight.md`). Read that file; do not duplicate it here.
