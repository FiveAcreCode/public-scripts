# Public Scripts

Small, auditable browser userscripts and other scripts offered publicly by
Hanson Core LLC.

The repository is intentionally simple: each published userscript is a static
`.user.js` file under [`scripts/`](scripts/), with no build step required for
installation. Repository tooling validates metadata and publication safety but
does not rewrite distributed files.

## Install a userscript

1. Install a compatible userscript manager, such as Tampermonkey or
   Violentmonkey.
2. Open the raw `.user.js` file for the script you want.
3. Review the requested site access and privileges before confirming install.

There are no installable scripts yet. The first script should be added as
`scripts/<script-name>/<script-name>.user.js` with a neighboring README that
explains what it does, what it can access, and how to verify it.

## Repository layout

- `scripts/` contains released, human-readable scripts and per-script docs.
- `templates/` contains the starting point for a new userscript.
- `tools/` contains repository validation; it is never shipped to users.
- `docs/` records architecture, operations, security, validation, and release
  policy.

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
