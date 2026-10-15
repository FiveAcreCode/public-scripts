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

## 2026-10-15 - Use organization-scoped identity and MIT licensing

- Decision: prepare the namespace and raw update URLs for the proposed public
  repository `hansoncorellc/public-scripts` and license repository-authored code
  under MIT.
- Context: organization ownership provides durable provenance and maintenance
  continuity for scripts publicly offered by the business. MIT permits broad
  reuse while retaining attribution and the warranty disclaimer.
- Consequence: changing repository ownership or name after publication would
  require coordinating install/update URLs. No GitHub repository is created by
  this decision; publication still needs explicit authorization.

## 2026-10-15 - Keep release validation dependency-free

- Decision: use a small Node.js 22+ validator with no third-party packages and
  reject external userscript `@require` dependencies unless a later security
  decision approves them.
- Context: fewer dependency and build layers make publicly installed source
  easier to audit and reduce supply-chain exposure.
- Consequence: maintainers run `npm test`; project-specific behavior still
  requires human review and manual browser testing.
