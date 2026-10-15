# Publishing userscripts

The repository is the source of truth. Files under `scripts/` are the exact,
readable artifacts installed by users; there is no generated release bundle.

## Before the repository is public

- Confirm `FiveAcreCode/public-scripts` is the intended permanent owner/name.
- Create the repository as public only with explicit authorization.
- Enable private vulnerability reporting and branch protection in GitHub.
- Confirm commit author names and email addresses are appropriate for a public
  history. Rewriting published history is not an acceptable privacy control.
- Review the repository for secrets, internal URLs, client data, and licensed
  third-party code.

## Publish a script

1. Complete the checklist in [CONTRIBUTING.md](../CONTRIBUTING.md).
2. Set both update fields to the raw URL for the file on `main`:

   ```text
   // @downloadURL https://raw.githubusercontent.com/FiveAcreCode/public-scripts/main/scripts/<product>/userscripts/<name>/<name>.user.js
   // @updateURL   https://raw.githubusercontent.com/FiveAcreCode/public-scripts/main/scripts/<product>/userscripts/<name>/<name>.user.js
   ```

   Also set `@homepageURL` to the script's GitHub Pages landing page and
   `@supportURL` to the repository issue tracker.

3. Run `npm test` and review the entire diff.
4. Have a second person review permissions, data handling, network calls, and
   target-site behavior when a script touches authenticated pages.
5. Test installation, update, core behavior, and uninstall in a disposable
   browser profile.
6. Merge only after the README matches the shipped behavior.

GitHub Pages, a CDN, and a package registry are unnecessary for the initial
model. Direct raw-file URLs provide static installation and update endpoints.
If stronger release immutability or traffic capacity is later needed, record a
new hosting decision before changing URLs.

## Correct or withdraw a release

Ship a versioned fix when possible. For an actively dangerous script, remove
the harmful behavior immediately, document the affected versions, and use the
private security process before public disclosure. Deleting a file does not
uninstall copies already present in user browsers.
