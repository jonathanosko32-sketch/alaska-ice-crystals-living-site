# Safe Restore Instructions

If a future change breaks the live site:

1. Stop editing.
2. Do not delete the repository.
3. Do not rebuild from a template.
4. Identify the most recent approved/checkpoint branch.
5. Compare the broken main branch against that checkpoint.
6. Restore only the damaged files or move main back to the last known-good commit if necessary.
7. Record what failed in BUILD_LOG.md.

The project must remain recoverable even when an experiment fails.
