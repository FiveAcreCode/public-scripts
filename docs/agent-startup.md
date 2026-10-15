# Public Scripts agent startup

This is the canonical instruction file for this internal-tool repository. Read
it completely before taking action. Keep root and compatibility agent files as
stable pointers; put evolving and project-specific guidance here.

## Purpose and boundary

The tool's operator, workflow, runtime, data, integrations, and operational
state belong in [project-status.md](project-status.md) and current source. Do not
add a web UI, cloud service, database, or automation unless the actual workflow
requires it.

## Knowledge hierarchy

1. Current user instructions and approved operating policy.
2. Implemented source, tests, executable configuration, schemas, and Git state.
3. Owning external systems for live inputs, outputs, and health.
4. Project architecture, decisions, operations, and validation documents.
5. Current official dependency/provider documentation.

## Mandatory startup

1. Read this file, `README.md`, [project-status.md](project-status.md),
   [operations.md](operations.md), and [data-and-security.md](data-and-security.md).
2. Run `git status --short --branch` and preserve existing work.
3. Identify the operator, input, output, side effects, authority, and recovery
   path for the requested action.
4. Inspect source/tests before implementation claims.
5. Use the smallest safe action and validation that proves the outcome.

## Implementation and operations

- Make read-only/reporting paths incapable of mutation.
- Require an explicit mode, target, and confirmation boundary for destructive
  or external writes; provide dry-run/preview when meaningful.
- Validate inputs, make retry/idempotency behavior explicit, and surface partial
  failure rather than presenting stale/fabricated success.
- Keep credentials, protected data, raw provider responses, and local exports
  out of Git and logs.
- Prefer structured schemas and deterministic commands for repeated workflows.
- Document backup, restore, migration, retention, observability, and ownership
  when persistent or hosted state is introduced.

## External actions

Provider reads may be used when authorized. Messages, tickets, deploys,
configuration changes, database writes, file deletion, and other side effects
require the request to authorize that action and exact target.

## Task map

| Task | Start with |
|---|---|
| Current state and objective | `docs/project-status.md` |
| Architecture/runtime | `docs/architecture.md` |
| Commands, scheduling, side effects, recovery | `docs/operations.md` |
| Data, credentials, privacy, retention | `docs/data-and-security.md` |
| Validation | `docs/validation.md` and executable project commands |
| Update agent guidance | This file only |
