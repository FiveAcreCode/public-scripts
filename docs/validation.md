# Public Scripts validation

Validation covers the repository foundation and metadata common to every
published userscript. Each script must add manual acceptance for its target
site and behavior.

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
| Repository and metadata validation | `npm test` | Every change |
| Syntax check | Included in `npm test` for the repository validator and every `.user.js` file | Script or tooling changes |
| Build/package | Not applicable; tracked `.user.js` files are the artifacts | Revisit before adding a build step |
| Install/update test | Disposable browser profile and non-sensitive test account/data | Every script release |
| Behavior and uninstall test | Per-script README procedure on every declared site/browser | Every script release |

The common validator checks required metadata, semantic versions, stable raw
URLs, organization namespace, narrow site matches, declared grants, newline
discipline, unsupported external dependencies, and several common credential
patterns. It does not prove that a script is benign, compatible, or correct.
Review the full distributed source and its effective page/network permissions.

## Handoff evidence

Report changed files, checks and results, external actions, residual risks, and
the next decision. Do not call a project deployed or released from local
evidence alone.
