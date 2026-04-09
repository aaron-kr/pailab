// src/lib/firebase-client.ts
// Safe client-side Firebase initialization.
// Uses getApps() guard so it's safe to import from multiple scripts —
// Firebase will only be initialized once regardless of how many modules import this.
//
// IMPORTANT: This file is for client-side scripts ONLY (in <script> tags).
// Do not import in Astro frontmatter (SSR context).
//
// All PUBLIC_ env vars must be set in your .env file:
//   PUBLIC_FIREBASE_API_KEY=...
//   PUBLIC_FIREBASE_AUTH_DOMAIN=...
//   PUBLIC_FIREBASE_PROJECT_ID=...
//   PUBLIC_FIREBASE_STORAGE_BUCKET=...
//   PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
//   PUBLIC_FIREBASE_APP_ID=...

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey:            import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain:        import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Only initialize if not already done (handles multiple imports)
const app: FirebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export { app };
