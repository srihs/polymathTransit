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

## Project decisions

Decided by the owner on 2026-10-01.

- **Requirements.** `Requirements/` holds the requirements specification and
  the user stories, backlog and traceability workbook. Version 1.0 of each is
  the approved baseline (30/09/2026); earlier versions are history. Changes to
  the baseline go through a change request (CR-nnn).
- **Backend.** Django 6.1.
- **Front end.** HTML5 templates rendered by Django, with plain JavaScript
  added on top. Pages work without JavaScript; scripts enhance them (address
  lookup, map pin, live dashboard counts, the driver's offline route).
- **Database.** PostgreSQL (the managed service on Oracle Cloud
  Infrastructure in production).
- **Background jobs.** Procrastinate, using the same PostgreSQL database, so
  there is no separate broker such as Redis. Django's built-in tasks framework
  was not chosen: its built-in backends are for development only and it has no
  scheduling. Two rules apply:
  - A task only calls domain code (a model method or service function) that a
    view could call too. Tasks stay thin so the job library can be replaced.
  - Scheduled jobs check what is due instead of firing at fixed times. For
    example, a job every minute finds trip dates whose cutoff has passed but
    whose day has not been optimised yet (BRL-13, BRL-19). Running a job twice
    does no harm, and missed runs catch up after downtime.
- **Django design philosophies.** Code follows
  https://docs.djangoproject.com/en/6.1/misc/design-philosophies/ :
  - Loose coupling: each app owns its models, URLs, templates and static
    files. The routing solver and the SMS and WhatsApp providers sit behind
    interfaces.
  - Less code, and DRY: each rule and setting lives in one place.
  - Explicit over implicit: business rules run from explicit calls, not
    signals, so every automatic decision can be explained and audited (FR-19,
    FR-50).
  - Models carry their domain logic.
  - Templates hold presentation only.
  - Views are simple and keep GET and POST apart; every action that changes
    data is a POST.
  - URLs are clean and namespaced, end with a slash, and are built with
    `reverse()` or `{% url %}`.
  - Queries are efficient (`select_related`, `prefetch_related`).
