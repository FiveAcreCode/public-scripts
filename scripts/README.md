# Public script catalog

Scripts are organized by the product or platform they affect, then by their
execution or distribution type, and finally by the individual script:

```text
scripts/<product>/<script-type>/<script>/
```

For example, browser userscripts for Shopify Admin live under
`scripts/shopify-admin/userscripts/`. This product-first structure keeps tools
for the same surface together without assuming every future contribution will
be a browser userscript.

## Products

| Product | Contents |
|---|---|---|
| [Shopify Admin](shopify-admin/) | Optional tools for the Shopify Admin interface |

Each individual script gets a kebab-case directory containing its executable
artifact and a `README.md`. For a userscript, that means:

- `<name>.user.js`: the exact static file installed by users; and
- `README.md`: purpose, supported pages/browsers, permissions, data behavior,
  installation link, limitations, changelog, and manual verification steps.

The repository root [README](../README.md) and
[publishing guide](../docs/publishing.md) describe installation and release
requirements.
