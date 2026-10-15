# Shopify Admin Tweaks

Shopify Admin Tweaks adds a small Five Acre Code control panel to Shopify Admin
for optional interface adjustments. Version `0.5.0` currently provides one
control: hide or show Shopify's floating Sidekick field.

This project is independent and is not affiliated with, endorsed by, or
supported by Shopify.

## Status

Version `0.5.0` is published from `FiveAcreCode/public-scripts` as a release
candidate. Browser acceptance remains pending.

## Permissions and data behavior

- Runs only on `https://admin.shopify.com/*` at `document-idle`.
- Uses `@grant none`; it receives no privileged Tampermonkey APIs.
- Adds a local control panel and hides elements marked with Shopify's Sidekick
  data attribute when the option is enabled.
- Stores panel-open and Sidekick visibility preferences in the Shopify Admin
  origin's `localStorage` under `fac-shopify-admin-tweaks`.
- Makes no network requests and includes no analytics, telemetry, credentials,
  remote code, or external dependencies.

Because the script runs inside authenticated Shopify Admin pages, review its
complete source before installing it even though its current behavior is
limited.

## Install

Open the
[raw userscript](https://raw.githubusercontent.com/FiveAcreCode/public-scripts/main/scripts/shopify-admin/userscripts/shopify-admin-tweaks/shopify-admin-tweaks.user.js)
with Tampermonkey or another compatible userscript manager. Review the requested
site access before confirming installation.

## Use

1. Open Shopify Admin.
2. Select the circular Five Acre Code control at the bottom-right of the page.
3. Toggle **Hide Sidekick**.

The preference persists in that browser for the Shopify Admin origin. Click
outside the panel or press `Escape` to close it.

## Remove or reset

Disable or uninstall the script through the userscript manager. To remove its
saved preferences as well, run this in Shopify Admin's browser console:

```js
localStorage.removeItem('fac-shopify-admin-tweaks');
```

## Known limitations and acceptance

- Shopify can change the Sidekick data attribute or Admin markup without
  notice, which may stop the hide control from working.
- The full `admin.shopify.com` origin is matched because Admin routes are
  dynamic; the script does not call Shopify APIs.
- Before publication, verify installation, panel open/close behavior, Sidekick
  hiding, preference persistence, update detection, and uninstall/reset in a
  disposable browser profile with non-sensitive test data.

## Changelog

### 0.5.0

- Added the Sidekick visibility control and persistent local preference.
- Added Five Acre Code publication, licensing, and update metadata.
- Added accessible control labels, expanded-state reporting, and Escape-key
  closing.
