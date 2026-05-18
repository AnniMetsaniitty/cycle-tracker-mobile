# AGENT.md

## Purpose

This repository uses a simple Git workflow designed for feature-by-feature development.
The goal is to keep the process easy to follow, reduce merge pain, and make progress visible
one finished feature at a time.

---

## Branching Strategy

### Long-lived branch

- `main` is the only long-lived branch.
- `main` should stay stable and reflect work that is finished and locally verified.

### Short-lived branches

Create a new branch for each focused change:

- `feature/<short-feature-name>`
- `fix/<short-bug-name>`
- `chore/<short-maintenance-task>`

Examples:

- `feature/start-cycle`
- `feature/history-empty-state`
- `fix/session-restore`
- `chore/update-readme`

### Scope rule

- One branch should cover one feature, one fix, or one maintenance task.
- Do not mix unrelated work in the same branch.
- If a branch grows into multiple independent tasks, split the work into separate branches.

### Branch lifetime

- Keep branches short-lived.
- Merge back to `main` as soon as the task is complete.
- If a branch stays open for more than a day or two, sync it with `main` to avoid large conflicts.

### Sync rule

- Branch from the latest `main`.
- Before opening a merge request or merging, update the branch with the latest `main`.
- Rebase or merge is acceptable as long as the branch stays clean and understandable.

---

## Commit Rules

### Commit scope

- Each commit should represent one logical change.
- Keep commits small enough to review easily.
- Prefer commits that leave the app in a working state.

### Commit message style

Use short, imperative commit messages.

Recommended format:

- `feat: add start cycle action`
- `fix: handle missing auth token`
- `chore: update Expo config`
- `docs: add git workflow`

Plain imperative messages are also acceptable if they stay clear:

- `Add start cycle action to today screen`
- `Fix session restore on app launch`

### Avoid

- Vague commit messages such as `stuff`, `changes`, or `wip`
- Large mixed commits that combine unrelated features and fixes
- Dead code, commented-out experiments, or partial work committed to `main`

### Before committing

- Review the changed files.
- Check that the change matches the branch purpose.
- Verify the changed area locally when possible.
- Make sure documentation is updated if the workflow or developer process changes.

---

## Merge Rules

- Only merge work that is finished enough to keep `main` usable.
- Prefer a clean final history for `main`.
- Squash merging is recommended when a branch contains several small working commits for one feature.
- If preserving commit history adds value, keep the branch commits only when they are already clean and logical.

---

## Feature-by-Feature Workflow

Use this sequence for each new task:

1. Update local `main`
2. Create a focused branch from `main`
3. Build one feature or fix on that branch
4. Make small, clear commits during the work
5. Verify the result locally
6. Merge back to `main` when the change is complete
7. Delete the branch after merge

Example:

1. `main`
2. create `feature/start-cycle`
3. implement the start cycle flow
4. commit logical steps
5. test the flow locally
6. merge into `main`
7. delete `feature/start-cycle`

---

## Practical Rules For This Project

- Favor small branches because this is a learning project with a simple app structure.
- Match branch names to user-visible work when possible.
- Keep unfinished experiments out of `main`.
- Prefer shipping one completed feature at a time over building several partial features in parallel.
- When in doubt, make the smaller branch and the smaller commit.
