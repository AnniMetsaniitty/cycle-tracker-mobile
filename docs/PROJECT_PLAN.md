# Cycle Tracker Mobile – Project Plan (v1)

## Goal

Build a simple Expo / React Native app (v1) with only the core features:

- User can register
- User can log in
- App remembers login (token storage)
- User sees Today screen
- User sees History screen
- User can log out

Keep everything minimal and beginner-friendly.

---

## 1. Required Libraries (Minimum Setup)

Only use these:

- `expo`
- `react`
- `react-native`
- `expo-router`
- `expo-secure-store`

### Why this is enough

- Expo = app environment
- React / React Native = UI
- Expo Router = navigation between screens
- Secure Store = safe login token storage

### Built-in tools to use

- `fetch` → API calls
- `useState`, `useEffect`, `useContext` → state management
- React Native components → UI

---

## 2. Libraries to Add Later (NOT for v1)

Do not use these yet:

- axios
- react-query / @tanstack/react-query
- zod
- react-hook-form
- zustand / redux
- chart libraries
- animation libraries
- notifications

### Rule

If React + fetch can do it, use that first.

---

## 3. Simplest Folder Structure

```
cycle-tracker-mobile/
  app/
    _layout.tsx
    index.tsx        // Today screen
    login.tsx
    register.tsx
    history.tsx
  src/
    api.ts
    auth.ts
    types.ts
    utils.ts
  assets/
  README.md
```

### File roles

- `app/_layout.tsx` → navigation setup

- `app/index.tsx` → Today screen

- `app/login.tsx` → login screen

- `app/register.tsx` → register screen

- `app/history.tsx` → history screen

- `src/api.ts` → backend requests

- `src/auth.ts` → login state + token handling

- `src/types.ts` → TypeScript types

- `src/utils.ts` → helper functions

---

## 4. Build Order (Very Important)

Follow this exact order:

1. Setup Expo app
2. Add navigation (screens only)
3. Add API base config
4. Build login
5. Add token storage
6. Restore session on app start
7. Build register
8. Build Today screen
9. Add logout
10. Build History screen
11. Add loading + error states
12. Cleanup and polish

### Why this order?

- Login unlocks everything else
- Today screen is the main feature
- History is secondary
- Logout completes the auth flow

---

## 5. First Week Roadmap

### Day 1 – Project Setup

- Create Expo app (TypeScript)
- Install:
  - expo-router
  - expo-secure-store

- Run app on device/simulator
- Create folder structure

Goal: App runs successfully

---

### Day 2 – Screen Skeletons

Create screens:

- Login

- Register

- Today

- History

- Add navigation between them

- Add simple placeholder text

Goal: Can navigate between screens

---

### Day 3 – API + Types

- Create `types.ts`:
  - User
  - AuthResponse
  - Cycle
  - Medication status

- Create `api.ts`:
  - login()
  - register()
  - getCurrentCycle()
  - getMedicationStatus()
  - getCycleHistory()

Goal: API layer exists

---

### Day 4 – Login Flow

- Build login form
- Call login API
- Save token (SecureStore)
- Save user in state
- Redirect to Today screen

Goal: Login works end-to-end

---

### Day 5 – Register + Session Restore

- Build register form
- Call register API
- Save token after register
- On app start:
  - Check saved token
  - Keep user logged in if exists

Goal: Auth persists across app restarts

---

### Day 6 – Today Screen

Display:

- Cycle day

- Start date

- Active state

- Medication state

- Next medication date

- Add logout button

Goal: Main screen shows real data

---

### Day 7 – History + Cleanup

- Load history data
- Show list of cycles
- Add empty state
- Add loading + error messages

Test full flow:

- Register
- Login
- Today
- History
- Logout

Goal: App works from start to finish

---

## v1 Feature Checklist

- [ ] User can register
- [ ] User can log in
- [ ] Token stored securely
- [ ] Session persists
- [ ] Today screen works
- [ ] History screen works
- [ ] Logout works

---

## Out of Scope (For Now)

Do not build yet:

- Fancy UI / styling
- Charts
- Notifications
- Offline support
- Complex state management
- Advanced validation
- App Store publishing

---

## Key Mindset

Keep v1:

- Small
- Simple
- Working

“Done” is better than “perfect”.

---

## Next Step (After v1)

After this works, you can improve with:

- Better UI
- Form validation
- React Query
- Charts
- Notifications
