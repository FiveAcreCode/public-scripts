# Public Scripts architecture

Status: implemented repository foundation and first local release candidate;
nothing published

## Purpose and boundaries

- Intended outcome: distribute small scripts as static, readable files that
  users can inspect, install, and update without a hosted application.
- Primary users or operators: Five Acre Code maintainers and people choosing to
  install an offered script; Hanson Core LLC is the legal owner.
- Explicitly out of scope: a hosted application, backend, database, account
  system, undisclosed telemetry, credential storage, and generated/minified
  release artifacts.

## System shape

- Runtime/framework: plain browser JavaScript for distributed userscripts;
  dependency-free Node.js 22+ validation for maintainers.
- Source entry points: `scripts/**/*.user.js` for releases, organized as
  `scripts/<product>/<script-type>/<script>/`, and
  `tools/validate-userscripts.mjs` for validation.
- Data stores: none selected
- External services: target websites declared independently by each script;
  GitHub Actions is configured for validation if the repository is published.
- Deployment targets: proposed public `FiveAcreCode/public-scripts` GitHub
  repository and its raw static-file URLs; no remote exists yet.

## Authority and data flow

The committed `.user.js` file is both source and distributed artifact. A user
reviews its declared permissions and installs it into a userscript manager,
which executes it only on declared `@match` pages. Any page data, network call,
or mutation is script-specific and must be documented next to that script.

Repository validation reads committed files and emits process output only. It
has no network access and performs no writes. The validator prevents missing
release metadata, organization/URL drift, broad all-site matches, external
`@require` dependencies without a decision, and several common credential
patterns; human source review remains the release authority.

## Constraints

- Preserve repository-local conventions and current source truth.
- Keep install/update URLs stable after the first publication.
- Prefer plain source over bundling; add dependencies only through a recorded
  security decision.
- Record consequential architecture changes in [decisions.md](decisions.md).
- Do not describe planned components as implemented.
