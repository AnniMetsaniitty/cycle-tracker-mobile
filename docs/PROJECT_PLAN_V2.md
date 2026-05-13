# Cycle Tracker Mobile – Project Plan (v2)

## Goal

Build the next version of the Expo / React Native app by adding the most important missing cycle actions:

- User can start a new cycle
- User can end an active cycle
- User gets a confirmation step before ending a cycle
- Today screen updates correctly after cycle actions
- App shows loading, error, and success feedback
- UI becomes clearer and more friendly without becoming complex

Keep everything realistic for a beginner-friendly mobile project.

This plan builds directly on top of v1, which already covers:

- Register
- Login
- Saved session
- Today screen
- History screen
- Logout

---

## 1. Required Libraries (Keep It Minimal)

Keep using the current setup:

- `expo`
- `react`
- `react-native`
- `expo-router`
- `expo-secure-store`

### Why this is still enough

- React Native already gives buttons, text, inputs, scroll areas, and alerts
- Expo Router already handles the app navigation
- `fetch` is enough for start/end cycle API calls
- Simple local state is enough for this stage

### Built-in tools to prefer

- `fetch` → API calls
- `useState`, `useEffect`, `useCallback`, `useContext` → screen logic
- `ActivityIndicator` → loading states
- `Pressable` → buttons
- `Alert` or a simple confirmation UI → confirm ending a cycle
- React Native components + `StyleSheet` → layout and styling

---

## 2. Libraries to Avoid for v2

Still do not add these unless there is a very clear reason:

- axios
- react-query / @tanstack/react-query
- zod
- react-hook-form
- zustand / redux
- modal libraries
- UI component libraries
- animation libraries

### Rule

If React Native built-in components can handle it, use those first.

---

## 3. Current Folder Structure + Likely Edit Points

Current project structure:

```
cycle-tracker-mobile/
  app/
    _layout.tsx
    index.tsx
    login.tsx
    register.tsx
    history.tsx
  src/
    api.ts
    auth.tsx
    types.ts
    utils.ts
  assets/
  docs/
    PROJECT_PLAN.md
  README.md
```

### Files likely to be edited

- `app/index.tsx` → add Start New Cycle button, End Active Cycle button, loading states, success/error messages, updated empty state

- `app/history.tsx` → improve empty state, readability, and navigation feel

- `app/_layout.tsx` → small navigation label or header improvements if needed

- `src/api.ts` → add `startCycle()` and `endCycle()` if missing

- `src/types.ts` → add request/response types if needed

- `src/utils.ts` → helper text for buttons, dates, status labels, or success messages if needed

### Possible new file (only if it helps)

- `app/start-cycle.tsx` or a small reusable component if the Today screen becomes too crowded

Rule: only add a new screen if the inline Today screen flow starts to feel messy.

---

## 4. Build Order (Very Important)

Follow this order for v2:

1. Review current Today and History screens
2. Add missing API functions for cycle actions
3. Decide whether Start New Cycle should be inline or its own simple screen
4. Build Start New Cycle flow
5. Build End Active Cycle flow
6. Add confirmation before ending
7. Refresh Today screen after both actions
8. Refresh History when returning to it
9. Add loading, error, and success feedback
10. Improve empty states
11. Improve spacing, colors, buttons, and readability
12. Test the full app flow from register to logout

### Why this order?

- Cycle actions are the biggest missing feature
- Today screen is where the user feels those actions immediately
- UI polish should happen after the main behavior works
- Full flow testing should be the final step

---

## 5. Second Week Roadmap

### Day 1 – Review and API Prep

- Read current `app/index.tsx`, `app/history.tsx`, `src/api.ts`, and `src/types.ts`
- Confirm how the backend expects:
  - start cycle
  - end cycle

- Add missing API helpers:
  - `startCycle()`
  - `endCycle()`

- Add any missing TypeScript types

Goal: Mobile app has the API layer needed for cycle actions

---

### Day 2 – Start New Cycle Flow

- Add a clear Start New Cycle action on the Today screen
- If no active cycle exists:
  - show a friendly empty state
  - show a clear button to start a cycle

- Decide the simplest input flow:
  - one button if backend uses today automatically
  - or a very small form if a date is required

- Show loading while the request is running
- Show success or error feedback after the action

Goal: User can start a cycle from the mobile app

---

### Day 3 – Update Today Screen After Start

- Reload current cycle data after starting a cycle
- Reload medication status after starting a cycle
- Make sure the Today screen changes immediately from empty state to active cycle state
- Make button text and layout easy to understand

Display clearly:

- Active cycle state
- Cycle day
- Start date
- Medication information

Goal: Today screen feels correct and responsive after starting a cycle

---

### Day 4 – End Active Cycle Flow

- Add End Active Cycle action for active cycles only
- Add confirmation before ending:
  - use a simple confirmation dialog or simple confirm step

- Prevent accidental repeated taps while request is loading
- Show success or error feedback after ending

Goal: User can safely end a cycle

---

### Day 5 – Refresh Data + History Improvements

- Reload Today screen data after ending a cycle
- Make sure no active cycle state appears correctly
- Verify history includes the newly ended cycle
- Improve History empty state so it feels helpful, not broken
- Improve History card spacing and readability

Goal: Cycle actions are reflected across the app

---

### Day 6 – UI Polish Without Complexity

Improve the UI using only simple styling:

- Better spacing between sections
- Stronger visual hierarchy for titles and labels
- More consistent button colors
- Better contrast for important actions
- Friendlier empty states
- Clearer screen descriptions
- Better balance between content and white space

Also improve usability:

- Make primary actions easier to notice
- Keep navigation obvious
- Reduce visual clutter

Goal: App feels cleaner, calmer, and easier to use

---

### Day 7 – Full Flow Testing + Cleanup

Test this full flow:

- Register
- Login
- Start cycle
- View active cycle
- End cycle
- View history
- Logout

Also check:

- Loading states
- Error states
- Success messages
- Empty states
- Repeat login after app restart

Cleanup:

- Remove confusing placeholder text
- Rename buttons if needed
- Tidy styles and small UI inconsistencies

Goal: v2 works from start to finish and feels more complete than v1

---

## v2 Feature Checklist

- [ ] Start New Cycle action exists
- [ ] End Active Cycle action exists
- [ ] End cycle requires confirmation
- [ ] API function for starting a cycle exists
- [ ] API function for ending a cycle exists
- [ ] Today screen updates after starting a cycle
- [ ] Today screen updates after ending a cycle
- [ ] Loading states are shown during cycle actions
- [ ] Error states are shown clearly
- [ ] Success feedback is shown after actions
- [ ] Today empty state is improved
- [ ] History empty state is improved
- [ ] Buttons are clearer and more consistent
- [ ] Layout and spacing are improved
- [ ] Navigation feels smoother and easier to follow
- [ ] Full user flow is tested end-to-end

---

## Out of Scope (For Now)

Do not build yet:

- Complex form validation
- Date pickers unless the backend truly requires manual date input
- Custom modal libraries
- Global state libraries
- Charts and analytics
- Push notifications
- Offline mode
- Edit or delete old cycles
- Medication editing workflows
- Advanced animations
- Large design system refactors

---

## Key Mindset

Keep v2:

- Clear
- Useful
- Friendly
- Simple

The goal is not to make the app fancy.

The goal is to make the core cycle flow complete and trustworthy.

“Simple and working” is still better than “clever but unfinished”.

---

## Next Step (After v2)

After this works, you can improve with:

- Better form validation
- Pull-to-refresh
- Reusable button and card components
- Safer API base URL configuration
- React Query later, if data loading starts to repeat too much
- Better visual design system
