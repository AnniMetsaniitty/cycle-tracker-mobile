# Cycle Tracker Mobile

A mobile application built with Expo and React Native.

The purpose of this app is to help users track their menstrual cycle and medication schedule in a simple and clear way.

---

## Tech Stack

- Expo
- React Native
- Expo Router
- TypeScript
- Expo SecureStore

---

## Planned Features (v1)

- User registration
- User login
- Persistent login using secure storage
- Today screen (current cycle and medication status)
- History screen (previous cycles)
- Logout

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npx expo start
```

### Run the app

- Use Expo Go on your phone and scan the QR code
- Or run on Android emulator:

```bash
npm run android
```

---

## Project Structure (v1)

```
app/
  index.tsx
  login.tsx
  register.tsx
  history.tsx

src/
  api.ts
  auth.ts
  types.ts
  utils.ts
```

---

## Project Goal

This project is part of my learning process in application development.
The focus is on building a working mobile application step by step, starting with a simple and clean foundation.

---

## Notes

- The focus is on functionality first
- Styling and advanced features will be added later
- Additional features (notifications, charts, etc.) are out of scope for v1

---

## Development Workflow

This project uses a simple Git workflow built for feature-by-feature development.

### Branches

- `main` is the only long-lived branch
- create a short-lived branch for each focused task
- branch naming:
  - `feature/<short-feature-name>`
  - `fix/<short-bug-name>`
  - `chore/<short-task-name>`

Examples:

- `feature/start-cycle`
- `fix/session-restore`
- `chore/update-readme`

### Commit rules

- keep commits small and focused
- one commit should represent one logical change
- use clear imperative messages

Recommended commit message style:

- `feat: add start cycle action`
- `fix: handle missing auth token`
- `docs: add git workflow`

### Merge rule

- merge back to `main` only when the branch is locally verified and the work is complete enough to keep `main` usable
- squash merge is recommended for keeping `main` clean

See [AGENT.md](AGENT.md) for the full repository workflow and commit guidance.
