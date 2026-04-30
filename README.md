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
- Provides a theme breakdown guide file for building new custom themes.

## How to use custom CSS
1. Open the portal at `https://portaal.apps4lab.be`.
2. Click the round `+` button in the lower-right corner.
3. Enter your CSS in the text area.
4. Toggle `Enabled` to turn custom CSS on or off.
5. Click `Save` to persist changes.
6. Click `Clear` to remove stored CSS.

## What `theme-breakdown.txt` is for
The `theme-breakdown.txt` file contains a full summary of the extension's styling structure:
- the CSS variables used in `styles.css`
- the component selectors styled by the extension
- the layout and visual design intent
- an AI-friendly prompt for generating new custom themes

Use it as a reference or as input to an AI theme generator when you want to create a new visual palette.

## Newest update
- Added an in-page custom CSS editor overlay with save and clear buttons.
- Added an `Enabled` checkbox to toggle custom CSS without removing saved content.
- Added extension options support and persistent storage for custom theme data.
- Added `theme-breakdown.txt` to document theme structure and guide future theme creation.

## Notes
- `content.js` injects the custom editor UI and loads saved CSS on matching portal pages.
- `styles.css` contains the default redesign styles for the portal.
- If the editor does not appear, reload the portal page after installing or updating the extension.
