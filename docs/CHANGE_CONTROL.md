# Change Control

Purpose: prevent a future AI or coding session from destroying approved work.

For every change:
- State the exact object/behavior being changed.
- Do not modify unrelated locked objects.
- Preserve the current working build before large changes.
- Test in Chrome on the phone.
- If the change fails, restore the last known-good checkpoint instead of rebuilding.
- Record the result in BUILD_LOG.md.

Major changes require a new checkpoint branch after approval.
