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

## Features (v1)

- User registration
- User login
- Persistent login using secure storage
- Today screen with current cycle details
- Medication status and next medication date
- History screen for previous cycles
- Logout

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Configure the API base URL

Update the `API_BASE_URL` value in `src/api.ts` so it points to your backend server.

If you run the app on a real device with Expo Go, use your computer's local network IP instead of `localhost`.

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

## Project Structure

```
app/
  _layout.tsx
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
The v1 goal was to build a working mobile app with authentication, session persistence, a today view, and cycle history.

---

## Notes

- v1 is complete
- The current app depends on a separate backend API
- v2 planning has started in `docs/PROJECT_PLAN_V2.md`

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
