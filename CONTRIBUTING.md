# Contributing

Contributions should be small enough to audit and safe for someone to install
after reading the distributed file.

## Add or change a script

1. Copy `templates/userscript.user.js` into
   `scripts/<script-name>/<script-name>.user.js`.
2. Add `scripts/<script-name>/README.md` with its purpose, supported sites,
   requested privileges, data behavior, limitations, and manual test steps.
3. Keep `@match` entries as narrow as possible and declare every privilege with
   `@grant`. Do not request access in anticipation of future use.
4. Set `@downloadURL` and `@updateURL` to the raw URL of the same file on the
   `main` branch under `FiveAcreCode/public-scripts`.
5. Run `npm test` and manually test installation and behavior in a disposable
   browser profile on non-sensitive data.

Every behavior change to a published script must increment its version. Use
semantic versioning: patch for fixes, minor for compatible functionality, and
major for intentionally incompatible behavior.

## Acceptance boundary

Do not submit:

- credentials, tokens, private URLs, customer identifiers, or production data;
- scripts that bypass access controls, consent, paywalls, or platform security;
- telemetry, remote writes, or network access that is not clearly disclosed;
- minified, obfuscated, generated-only, or unauditable distributed code;
- copied code without compatible licensing and documented provenance; or
- an external `@require` dependency without a recorded security decision.

Repository validation is necessary but not sufficient. A reviewer must read the
complete distributed script and verify its behavior before publication.
