# Public Scripts data and security

- Data inputs and authorities: committed source is authoritative for repository
  validation. Each script must separately document page data and APIs it uses.
- Data outputs and consumers: validation emits local console results; released
  scripts are consumed directly by userscript managers; GitHub Pages serves
  static public explanation and installation links.
- Sensitivity classification: repository contents are public. Secrets,
  customer data, private endpoints, signed URLs, browsing data, and protected
  provider responses are prohibited.
- Credentials and access scopes: repository tooling needs none. A script must
  not embed credentials and must use the narrowest possible `@match`, `@grant`,
  and network permissions.
- Local/persistent storage: none in repository tooling or the public site. Any
  browser storage used by a script requires disclosure, a purpose, a retention
  rule, and a deletion path in that script's README.
- Public-site collection: the static site contains no forms, cookies,
  analytics, telemetry, remote fonts, or client-side network requests.
- Retention and deletion: Git permanently retains published history. Review all
  content before commit; do not rely on later deletion to remove sensitive data.
- Logging/redaction: do not log tokens, account data, page contents, or personal
  data. Debug logging must be off in released scripts unless non-sensitive and
  explicitly useful.
- Export/share boundary: every tracked file and commit identity is assumed
  externally visible once the repository is public.

Collect and retain the minimum needed. Keep credentials, personal/client data,
raw protected logs, signed URLs, and local exports out of Git. Separate read
permissions from write permissions and test authorization/failure paths.
