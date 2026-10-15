# Public Scripts project status

Observed: 2026-10-15

Status: first userscript prepared locally; nothing published

## Classification

- Ownership: Hanson Core LLC
- Relationship: Five Acre Code public offering operated by Hanson Core LLC
- Kind: static script collection with local Node.js validation tooling
- Lifecycle: incubation
- Tracking: local Git repository; `FiveAcreCode/public-scripts` remote planned
  but not created

## Verified local state

- The repository was generated from starter `internal-tool` version
  `2026.09.17.1`.
- Git was initialized on `main` with the scaffold as the first commit.
- Static distribution, contribution, security, and publication policies are
  documented.
- `npm test` validates repository structure and published userscript metadata.
- Shopify Admin Oddities `0.5.0` is present as a local release candidate with
  permissions, data behavior, limitations, and acceptance documented.
- The Five Acre Code GitHub organization exists on the Free plan, requires 2FA,
  restricts repository creation to owners, and has hard-stop `$0` budgets for
  Actions, Packages, Codespaces, and Git LFS.
- No GitHub repository, remote, deployment, publication, production access, or
  Shopify mutation exists yet.

## Current focus

- Complete source and browser acceptance for Shopify Admin Oddities.
- Review the local repository and separately authorize creation of the public
  `FiveAcreCode/public-scripts` repository before pushing.

## Blockers and inputs

- Product or delivery objective: known; distribute useful scripts as auditable
  static files.
- Runtime/framework: browser JavaScript for userscripts; Node.js 22 or newer for
  repository validation only.
- External systems and authorized environments: Shopify Admin Oddities targets
  `https://admin.shopify.com/*`; browser acceptance should use a disposable
  profile and non-sensitive test data.
- Acceptance evidence: local `npm test` and syntax validation plus pending
  browser installation, behavior, persistence, update, and uninstall tests.

Update this file from current source and owning authorities. A plan, commit, or
tag is not proof of a live deployment.
