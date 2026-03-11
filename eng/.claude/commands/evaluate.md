---
description: Evaluate all 3 versions against the evaluation matrix
allowed-tools: [Read, Bash, Glob, Grep, Write, "mcp:playwright:*", "mcp:context7:*"]
---

Evaluate versions/v1, v2, v3 against analysis/evaluation-matrix.md criteria.

## Tasks

1. Read analysis/evaluation-matrix.md

2. For each version (v1, v2, v3):

   a. Verify code exists (check src/ folder)
   b. Build test: cd versions/vN && npm run build
      - If npm run build fails: Record version as "build failed", score 0 for features
      - Continue evaluation with remaining versions
      - If all versions fail to build, inform the user and stop
   c. Type check: npx tsc --noEmit
   d. Feature checklist (via code analysis):
      - Each AC item from analysis/acceptance-criteria.md
      - Verify code for each feature exists using Grep
   e. Code quality:
      - TypeScript strict mode enabled
      - Error handling patterns
      - Component structure
      - API security (no env variable exposure)
   f. UI completeness:
      - Responsive classes present
      - Dark mode support
      - Loading state handling
   g. **Playwright Browser Testing** (if MCP available):
      - Test each version sequentially (no simultaneous runs):
        v1: PORT=3001 npm run dev → test → stop
        v2: PORT=3002 npm run dev → test → stop
        v3: PORT=3003 npm run dev → test → stop
      - Wait 3 seconds after dev server starts; retry after 5 seconds on failure (max 2 retries)
      - Capture main page screenshot with Playwright MCP
      - Test main links/buttons with click actions
      - Save test results and screenshots to evaluation/
      - Confirm dev server is stopped before proceeding to next version

3. Record per-version score cards in evaluation/vN-score.md:
   ```
   | Category | Score (0-100) | Rationale |
   ```

4. Write comprehensive comparison in evaluation/comparison.md:
   ```
   | Category | V1 | V2 | V3 |
   ```
   - Total scores
   - Recommended version + reasoning
   - Each version's strengths (mergeable parts)
