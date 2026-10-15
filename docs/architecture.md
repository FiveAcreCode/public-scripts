# Public Scripts architecture

Status: public repository and first userscript published; static presentation
site implemented for GitHub Pages

## Purpose and boundaries

- Intended outcome: distribute small scripts as static, readable files that
  users can inspect, install, and update without a hosted application.
- Primary users or operators: Five Acre Code maintainers and people choosing to
  install an offered script; Hanson Core LLC is the legal owner.
- Explicitly out of scope: a hosted application runtime, backend, database,
  account system, undisclosed telemetry, credential storage, and
  generated/minified release artifacts.

## System shape

- Runtime/framework: plain browser JavaScript for distributed userscripts;
  dependency-free Node.js 22+ validation for maintainers.
- Source entry points: `scripts/**/*.user.js` for releases, organized as
  `scripts/<product>/<script-type>/<script>/`; `site/` for dependency-free
  public presentation; and `tools/validate-*.mjs` for validation.
- Data stores: none selected
- External services: target websites declared independently by each script;
  GitHub Actions validates source and deploys the static presentation site.
- Deployment targets: public `FiveAcreCode/public-scripts` GitHub repository,
  raw static-file URLs, and GitHub Pages; no application runtime or package
  registry is used.

## Authority and data flow

The committed `.user.js` file is both source and distributed artifact. A user
reviews its declared permissions and installs it into a userscript manager,
which executes it only on declared `@match` pages. Any page data, network call,
or mutation is script-specific and must be documented next to that script.

Repository validation reads committed files and emits process output only. It
has no network access and performs no writes. The validators prevent missing
release metadata, organization/URL drift, broad all-site matches, external
`@require` dependencies without a decision, common credential patterns, and
landing-page version/install drift; human source review remains the release
authority.

## Constraints

- Preserve repository-local conventions and current source truth.
- Keep install/update URLs stable after the first publication.
- Prefer plain source over bundling; add dependencies only through a recorded
  security decision.
- Record consequential architecture changes in [decisions.md](decisions.md).
- Do not describe planned components as implemented.
