# Security policy

## Reporting a vulnerability

Do not disclose an exploitable issue, credential, or affected user in a public
issue. Once this repository is public, use its private GitHub Security Advisory
reporting flow. Until that channel exists, report the issue privately to the
repository owner through an established Five Acre Code contact.

Include the affected script and version, the minimum reproduction, likely
impact, and whether the issue is already public. Do not include real customer
or account data.

## Supported versions

Only the current version of each script on `main` is supported. Because browser
and target-site changes can invalidate a script at any time, users should
disable a script whose permissions or behavior no longer match its README.

## Security model

Userscripts execute inside browser sessions and can inherit access to sensitive
pages. Published scripts therefore use narrow site matches, least-privilege
grants, readable source, no embedded secrets, and no undisclosed telemetry.
Installation always remains a user decision after reviewing those permissions.
