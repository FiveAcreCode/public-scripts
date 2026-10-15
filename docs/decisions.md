# Public Scripts decisions

Record durable product, architecture, security, data, and operational decisions.
Do not use this file as a chronological activity log.

## 2026-10-15 - Initialize from maintained starter

- Decision: use Manager starter `internal-tool` version
  `2026.09.17.1` as the project baseline.
- Context: the project needs a consistent agent, documentation, validation,
  privacy, and Git foundation before implementation.
- Consequence: project-specific facts evolve here; future starter changes do
  not automatically modify this repository.

## 2026-10-15 - Distribute readable static userscripts

- Decision: keep each browser userscript as a directly installable `.user.js`
  source file without a compile, bundle, minification, or application server.
- Context: users need to audit what will execute in authenticated browser
  sessions, and the initial collection does not need infrastructure.
- Consequence: the committed release file is authoritative; all browser and
  target-site compatibility testing is script-specific.

## 2026-10-15 - Separate public brand from legal ownership

- Decision: publish under the Five Acre Code brand and proposed GitHub
  organization repository `FiveAcreCode/public-scripts`; retain Hanson Core LLC
  as copyright/legal owner and license repository-authored code under MIT.
- Context: Five Acre Code is the public-facing work while Hanson Core LLC is the
  operating legal entity. The brand owns the namespace and presentation; the
  legal entity retains rights and responsibility.
- Consequence: scripts use `https://fiveacrecode.com/` as their namespace and
  the proposed organization raw URLs for installation/update. Changing those
  URLs after publication requires coordination. No GitHub repository is created
  by this decision; publication still needs explicit authorization.

## 2026-10-15 - Keep release validation dependency-free

- Decision: use a small Node.js 22+ validator with no third-party packages and
  reject external userscript `@require` dependencies unless a later security
  decision approves them.
- Context: fewer dependency and build layers make publicly installed source
  easier to audit and reduce supply-chain exposure.
- Consequence: maintainers run `npm test`; project-specific behavior still
  requires human review and manual browser testing.

## 2026-10-15 - Organize scripts by product, then script type

- Decision: place public artifacts under
  `scripts/<product>/<script-type>/<script>/`, with a catalog README at each
  product and script-type level.
- Context: the repository may eventually contain several script formats for
  several products. Product-first navigation keeps related tools together,
  while the type level preserves distinct installation and validation rules.
- Consequence: the first artifact lives under `shopify-admin/userscripts/`.
  Shopify Admin Oddities was renamed Shopify Admin Tweaks before publication
  so its name describes the optional UI adjustments it provides.
