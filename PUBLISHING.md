# Publishing to the Visual Studio Marketplace

This extension is plain JavaScript with no build step, so publishing is just packaging and uploading.

## One-time setup

1. Create a publisher (if you don't have one) at <https://marketplace.visualstudio.com/manage>.
   The publisher id must match `publisher` in [package.json](package.json) (`mayerwin`).
2. Create a Personal Access Token (PAT) with the **Marketplace > Manage** scope from
   <https://dev.azure.com> (Azure DevOps, same Microsoft account).
3. Log in once:
   ```sh
   npx @vscode/vsce login mayerwin
   ```

## Package a `.vsix`

```sh
npm run package
# -> explorer-file-filter-<version>.vsix
```

Install it locally to test: *Extensions: Install from VSIX…* (or `code --install-extension explorer-file-filter-<version>.vsix`).

## Publish

```sh
npm run publish            # publishes the current version
# or bump + publish in one go:
npx @vscode/vsce publish patch   # minor | major
```

After publishing, the listing appears at
<https://marketplace.visualstudio.com/items?itemName=mayerwin.explorer-file-filter>.

## Screenshots

The three README screenshots live in [`images/`](images/), numbered in display order so they're easy to pick:

1. `images/screenshot-1-button.png` — the Filter button in the toolbar
2. `images/screenshot-2-open.png` — the filter open
3. `images/screenshot-3-filtered.png` — filtering in action

They were captured from the bundled [`demo/`](demo/) project (open it with the **Run Extension (with demo)** launch config). To recapture, regenerate and overwrite these files.

## Notes

- README screenshots are referenced by absolute `raw.githubusercontent.com` URLs so they render on both GitHub and the Marketplace.
- [`.vscodeignore`](.vscodeignore) keeps the `demo/`, `images/`, and dev files out of the published package.
