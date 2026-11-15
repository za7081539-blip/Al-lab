# firebase-auth-rtk

AI Labs — a Next.js App Router application with Firebase Authentication, where **Redux Toolkit is the single source of truth for auth session state**.

## Stack

- **Next.js 16** (App Router, Turbopack, React Compiler, Cache Components) — JavaScript/JSX
- **Firebase Authentication** — email/password, Google, Facebook
- **Redux Toolkit + react-redux** — auth slice, async thunks, serializable session state
- **Tailwind CSS v4** — styling (`@import "tailwindcss"` + Turbopack loader)

## How auth state works

- `src/components/AuthStateListener.jsx` mounts the app's **single** `onAuthStateChanged` listener (in the root layout). Each callback is mapped to a plain `{uid, email, displayName, photoURL}` object and dispatched as `authStateChanged` — raw Firebase `User` objects and passwords never enter the store.
- `src/reduxToolkit/authSlice.js` owns session state: `{ user, loading }`. `loading` starts `true` and flips `false` only after Firebase finishes restoring the session, which is what prevents premature redirects.
- **Thunks** (`login`, `signup`, `loginWithGoogle`, `loginWithFacebook`, `sendPasswordReset`, `logout`) perform Firebase side effects and report failures via `rejectWithValue({ code, accountCreated })`. They never write session state themselves.
- `src/components/ProtectedRoute.jsx` gates `/dashboard`: waits for `loading`, then renders children only when `user` exists, otherwise redirects to `/login`.
- Route pages (`/login`, `/signup`, `/dashboard`) are thin wrappers around components in `src/components/`.

## Getting started

```bash
npm install
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

Environment variables are configured in `.env.local` (never committed — see `.gitignore`); copy `.env.example` for the required names.

## Routes

| Route | Access |
|---|---|
| `/` | Session check → redirects to `/dashboard` or `/login` |
| `/login` | Email/password + Google + Facebook sign-in, password reset |
| `/signup` | Email/password + Google + Facebook sign-up |
| `/dashboard` | Protected — requires an authenticated session |
