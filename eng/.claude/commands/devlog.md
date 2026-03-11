---
description: Auto-generate a development log entry from recent changes
allowed-tools: [Read, Bash, Edit, Glob, Grep]
---

Analyze recent git changes and add a new session entry to DEVLOG.md.

## Tasks

1. Check recent commits with git log --oneline -20
2. Check change scope with git diff --stat HEAD~5
3. Append a new session to DEVLOG.md:

```markdown
## Session #N — [date]

**Goal**: [inferred from commit messages]
**Changes**: [key file/feature changes]
**Agent usage**: [Co-Authored-By commit ratio]
**Next**: [incomplete items]
```

4. Session number = last session number in DEVLOG.md + 1
5. Use today's date
