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

## Agent workflow (project rule)

Every task runs through one of this project's subagents in `.claude/agents/`.
Nothing runs on general agents: never use general-purpose, Explore, Plan,
claude-code-guide, the `claude` catch-all or any other built-in agent for
project work.

### The main session

- It is the orchestrator. It breaks work down, delegates each task to the
  agent that owns it, integrates the results and talks to the owner.
- It does no task work itself: it writes no code, documents, tests or
  configuration. It may read files and run read-only commands to brief agents
  and check their results.
- It owns git: it creates branches from `PROD`, makes every commit, merges
  with the owner's approval, and runs `/oversight`.
- Each delegation names the requirement IDs, the files in scope and the skills
  from the agent's Skills table that apply. The main session checks that the
  agent's report lists the skills it used.
- If no agent fits a task, it asks the owner and has the process-steward
  create or extend an agent. It never falls back to a general agent.
- Bootstrap exception: the first agent definitions and this section were
  written by the main session on 2026-10-01, because no agent existed yet.

### Agents

| Agent | Use it for | Writes to |
|-------|-----------|-----------|
| requirements-analyst | Reading the requirements, slice briefs with acceptance criteria, traceability, open questions, change request drafts, verifying finished work against the acceptance criteria and rules | `docs/requirements/` |
| architect | App boundaries, data model, lifecycles, background jobs, integration interfaces, URL and API design, security architecture, library and service choices, ADRs | `docs/adr/`, `docs/architecture/` |
| ux-designer | User flows, screen specs, forms, content and microcopy, states, accessibility, critique of built screens, user guides and in-app help | `docs/design/` |
| backend-developer | Django models, migrations, domain logic, services, forms, views, URLs, roles and permissions, audit trail, Procrastinate tasks, management commands | Django apps (except routing and integrations) |
| routing-engineer | The allocation and route-optimisation engine: solver spike, constraints, insertion and pooling, gap-filling, splits, no-fit alternatives, Optimise day, explanations, benchmarks | The routing app, `docs/routing/` |
| integrations-engineer | Map service, SMS gateway, WhatsApp Business Platform and email: adapters, fakes, retries, fallbacks, delivery tracking, message templates | The maps and notifications apps |
| frontend-developer | Django templates, HTML5, CSS and plain JavaScript for every screen, from the ux-designer's specs | App `templates/` and `static/` |
| devops-engineer | Containers, settings per environment, dependencies, database setup, worker processes, CI, Oracle Cloud deployment, backups, README and developer setup | Build, settings, CI and `docs/operations/` |
| test-engineer | Acceptance tests from the acceptance criteria, business-rule tests, permission and security behaviour tests; running the full suite | `tests/` |
| code-reviewer | Independent critique of correctness, rule compliance, data model, design and tests after each piece of work | `docs/reviews/` |
| security-privacy-reviewer | Independent critique of security and of compliance with the Personal Data Protection Act No. 9 of 2022 | `docs/reviews/`, `docs/privacy/` |
| process-steward | Changes to CLAUDE.md, the agent definitions and the slash commands, including the Durable changes from oversight episodes | `CLAUDE.md`, `.claude/agents/`, `.claude/commands/` |

### Normal order for a feature

1. requirements-analyst: a slice brief with stories, acceptance criteria,
   rules and open questions.
2. architect: design and ADRs, where the slice needs a decision.
3. ux-designer: flows and screen specs, when the slice has screens.
4. backend-developer, routing-engineer, integrations-engineer and
   frontend-developer: the build, each in their own area.
5. test-engineer: acceptance and business-rule tests, then the full suite.
6. code-reviewer, plus security-privacy-reviewer when the work touches sign-in,
   roles, tokens, the public form, personal data or an external service.
7. requirements-analyst: verifies the result against the acceptance criteria.
8. The owner adjudicates every review finding. Accepted and overruled findings
   are both oversight episodes, recorded with `/oversight`.

### Rules for every agent

- Read this file first. "Branching", "Oversight capture" and "Project
  decisions" bind you.
- The requirements are version 1.0 in `Requirements/`. Cite their IDs exactly
  (BR, BRL, FR, NFR, US, AC, Q). Where code enforces a rule, a comment cites
  the rule's ID.
- Never commit, push, merge, create or switch branches, stash, or rewrite
  history. Read-only git commands are fine. The main session makes every
  commit.
- Never edit `CLAUDE.md`, `.claude/agents/` or `.claude/commands/` (the
  process-steward's), or `OVERSIGHT_LOG.md` (written only by `/oversight`).
- Work only in the area you own. If the task needs a change elsewhere, say so
  in your report; do not make it.
- If the requirements are silent, ambiguous or contradict each other, stop and
  report the question with options and a recommendation. Do not guess.
- Before a task that matches your Skills table, load that skill with the Skill
  tool. Do not use skills or commands that start their own agents.
- Write in British English and plain language.
- End with a report: (1) outcome: done, partly done or blocked; (2) files
  created or changed; (3) requirement IDs covered; (4) skills used, or "none";
  (5) checks run, with results exactly as they came out; (6) questions,
  assumptions and anything left undone.
