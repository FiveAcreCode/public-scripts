# Public Scripts project status

Observed: 2026-10-15

Status: repository foundation ready; no scripts published

## Classification

- Ownership: Hanson Core LLC
- Relationship: organization-owned public offering
- Kind: static script collection with local Node.js validation tooling
- Lifecycle: incubation
- Tracking: local Git repository; public GitHub remote proposed but not created

## Verified local state

- The repository was generated from starter `internal-tool` version
  `2026.09.17.1`.
- Git was initialized on `main` with the scaffold as the first commit.
- Static distribution, contribution, security, and publication policies are
  documented.
- `npm test` validates repository structure and published userscript metadata.
- No userscript, GitHub remote, deployment, publication, infrastructure,
  production access, or external-system mutation exists yet.

## Current focus

- Add the first bounded, reviewable userscript and its per-script README.
- Decide whether to create `hansoncorellc/public-scripts` as a public GitHub
  repository, then verify organization policy and public commit identity before
  pushing.

## Blockers and inputs

- Product or delivery objective: known; distribute useful scripts as auditable
  static files.
- Runtime/framework: browser JavaScript for userscripts; Node.js 22 or newer for
  repository validation only.
- External systems and authorized environments: each script must name its
  target sites; none are authorized yet.
- Acceptance evidence: local `npm test`, full source review, and a documented
  install/behavior/update test for each script.

Update this file from current source and owning authorities. A plan, commit, or
tag is not proof of a live deployment.
