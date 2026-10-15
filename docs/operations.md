# Public Scripts operations

- Primary operator/workflow: Five Acre Code maintainers add, review, validate,
  and publish human-readable scripts on behalf of Hanson Core LLC.
- Local-only or hosted: development and validation are local; released files
  are intended for a public GitHub repository but no remote exists yet.
- Supported command: `npm test` performs read-only structure and metadata
  validation.
- Script entry points: static `.user.js` files under `scripts/`; each one must
  document its own browser/runtime support and manual verification.
- Mutating/destructive modes: repository tooling has none. Installing,
  enabling, or removing a userscript is an explicit end-user action.
- Scheduling/trigger: local validation is manual; the included GitHub Actions
  workflow runs on proposed pushes and pull requests after publication.
- Observability and failure reporting: validation prints every file-level error
  and returns a non-zero exit code. Script runtime behavior must be documented
  per script without logging secrets or page data.
- Backup/restore/rollback: Git history is the source of truth. Correct a release
  with a new version; removing a file cannot remove already-installed copies.
- Support owner: Five Acre Code, operated by Hanson Core LLC; public support
  channels are not established.

Every repeated run should expose its inputs, target, observation/execution time,
result, partial failures, and whether state changed. A failed read must not
replace the last good observation with fabricated healthy data.
