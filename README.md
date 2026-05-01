# ExtensionsAtLab
A Chrome extension that customizes the Apps4LAB evaluator portal at https://portaal.apps4lab.be.

## Installation
1. Open Chrome or Edge and go to `chrome://extensions`.
2. Enable `Developer mode` in the top-right.
3. Click `Load unpacked`.
4. Select this `ExtensionsAtLab` folder.
5. The extension will install and begin injecting styles into the portal.

## Features
- Replaces the default portal theme with a cleaner, more modern UI.
- Adds a floating custom CSS editor directly in the portal page.
- Save and enable/disable your own CSS without editing extension files.
- Uses browser storage so your custom styles persist across reloads.
- Grade badge colors and SVG grade bar colors are both controlled by a single set of CSS variables.
- Provides a theme breakdown guide file for building new custom themes.

## How to use custom CSS
1. Open the portal at `https://portaal.apps4lab.be`.
2. Click the round `+` button in the lower-right corner.
3. Enter your CSS in the text area.
4. Toggle `Enabled` to turn custom CSS on or off.
5. Click `Save` to persist changes.
6. Click `Clear` to remove stored CSS.

You can also manage your custom CSS from the extension's options page (`chrome://extensions` → Apps4LAB Redesign → Details → Extension options).

## What `theme-breakdown.txt` is for
The `theme-breakdown.txt` file contains a full summary of the extension's styling structure:
- the CSS variables used in `styles.css`
- the component selectors styled by the extension
- the SVG grade bar attribute selectors and their variable mappings
- the storage key reference for content.js and options.js
- the layout and visual design intent
- an AI-friendly prompt for generating new custom themes

Use it as a reference or as input to an AI theme generator when you want to create a new visual palette.

## Newest update
- Fixed storage key mismatch between `options.js` and `content.js` — CSS saved via the options page now correctly loads on the portal.
- Added `Enabled` checkbox to the options page to match the in-page panel behaviour.
- Added SVG grade bar overrides (`rect[fill="..."]`) to `styles.css`, tied to the same CSS variables as the grade badges so both update together.
- Updated `theme-breakdown.txt` with SVG grade bar documentation and storage key reference.

## Notes
- `content.js` injects the custom editor UI and loads saved CSS on matching portal pages.
- `styles.css` contains the default redesign styles for the portal.
- `options.js` and `content.js` share the same storage keys (`apps4labCustomCss`, `apps4labCustomCssEnabled`).
- If the editor does not appear, reload the portal page after installing or updating the extension.
