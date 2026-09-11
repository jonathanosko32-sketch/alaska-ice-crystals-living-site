# HOW TO SEND OSKO THE LIVING OS — READ FIRST

This file is a permanent delivery handoff for every future AI/developer working on the Alaska Ice Crystals / OSKO Living OS.

## Current confirmed working web build

`TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html`

Phone-safe GitHub Pages link:

https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html

FIX8 is the current user-confirmed working fallback. Do not overwrite it.

## Every time Osko is asked to check a new web build

Send two direct tap-ready links in the chat:

1. NEW TEST — exact GitHub Pages URL for the new TEST HTML file.
2. SAFE WORKING FIX8 — the FIX8 URL above.

Do not send only a GitHub source/blob page, repository path, commit SHA, or instructions to type/copy a URL. Osko primarily works from an Android phone.

State clearly whether the new build is:
- actually confirmed on Osko's phone,
- syntax-checked only,
- or not yet tested.

Never call an unconfirmed test the new stable build.

## If the deliverable becomes an Android APK

Use the protected existing OSKO build/signing process. Upload the completed signed APK to Google Drive and send a direct phone-safe Drive link. Never expose signing keys, passwords, API keys, or other secrets.

## Broken historical web builds

FIX7, FIX9, and FIX10 are preserved history but are not user-confirmed working builds. Do not direct Osko to them as the active OS.

## Development rule

Preserve working versions first. Build new systems as separate modules where practical, syntax-check them, and integrate them into a new TEST version only after the module is clean. Avoid wrapper-on-wrapper patch stacks and avoid blindly replacing the main animation loop.
