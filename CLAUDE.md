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
