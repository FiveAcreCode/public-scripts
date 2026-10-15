# Five Acre Code Public Scripts

Small, auditable browser userscripts and other scripts offered publicly by Five
Acre Code, a brand operated by Hanson Core LLC.

The repository is intentionally simple: public artifacts live under
[`scripts/`](scripts/), grouped first by the product or platform they affect
and then by script type. Each published userscript is a static `.user.js` file
with no build step required for installation. Repository tooling validates
metadata and publication safety but does not rewrite distributed files.

## Featured tool

### Shopify Admin Tweaks

A free userscript for Tampermonkey and compatible userscript managers. It adds
a small control to Shopify Admin that can hide the floating **Work with
Sidekick** prompt when it obstructs the interface.

[**Learn more and install**](https://fiveacrecode.github.io/public-scripts/shopify-admin-tweaks/)
· [Review the source](scripts/shopify-admin/userscripts/shopify-admin-tweaks/shopify-admin-tweaks.user.js)
· [Report a problem](https://github.com/FiveAcreCode/public-scripts/issues)

- Runs only on `https://admin.shopify.com/*`.
- Requests no privileged userscript APIs (`@grant none`).
- Makes no network requests and includes no analytics or telemetry.
- Stores only the display preference in Shopify Admin's local browser storage.

Shopify Admin Tweaks is independent and is not affiliated with, endorsed by, or
supported by Shopify.

## Install a userscript

1. Install a compatible userscript manager, such as Tampermonkey or
   Violentmonkey.
2. Open the raw `.user.js` file for the script you want.
3. Review the requested site access and privileges before confirming install.

## Scripts

| Script | Purpose | Status |
|---|---|---|
| [Shopify Admin Tweaks](scripts/shopify-admin/userscripts/shopify-admin-tweaks/) | Hide or show Shopify's floating Sidekick prompt | Public; live browser acceptance pending |

Each script lives in
`scripts/<product>/<script-type>/<script-name>/` with its executable artifact
and documentation describing access, behavior, and installation.

## Repository layout

- `scripts/` contains product-first catalogs and released, human-readable
  scripts. See its [structure guide](scripts/README.md).
- `templates/` contains the starting point for a new userscript.
- `tools/` contains repository validation; it is never shipped to users.
- `docs/` records architecture, operations, security, validation, and release
  policy.
- `site/` is the dependency-free source published through GitHub Pages.

## Work locally

Node.js 22 or newer is the only development prerequisite. The project has no
third-party runtime or development dependencies.

```bash
npm test
```

See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a script and
[docs/publishing.md](docs/publishing.md) before making one public. Security
issues should follow [SECURITY.md](SECURITY.md), not a public issue.

## License

Repository-authored code is available under the [MIT License](LICENSE). A
script derived from another source must retain compatible notices and document
its provenance; copied code with unclear rights is not accepted.
