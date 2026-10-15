# Public Scripts validation

Validation must match risk and prove the requested outcome. Replace the
placeholders below when the runtime and first task are selected.

## Always

- Run `git status --short --branch` before and after work.
- Review the complete diff and preserve unrelated work.
- Check for secrets, credentials, private data, generated output, and licensed
  third-party source before committing.
- Verify documentation links and commands changed by the task.
- Distinguish local checks from deployed or user-acceptance evidence.

## Project commands

| Check | Command | When required |
|---|---|---|
| Format/lint | `TODO` | Relevant source changes |
| Type/static analysis | `TODO` | Relevant source changes |
| Unit/integration tests | `TODO` | Behavior changes |
| Build/package | `TODO` | Before handoff or release candidate |
| Live/visual acceptance | `TODO` | Only in an explicitly authorized environment |

## Handoff evidence

Report changed files, checks and results, external actions, residual risks, and
the next decision. Do not call a project deployed or released from local
evidence alone.
