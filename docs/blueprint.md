# **App Name**: Bíblia 365

## Core Features:

- User Authentication: Secure login, registration, and password recovery using Firebase Authentication. Login verification with protected routes.
- Daily Reading Display: Show daily Bible reading + Catholic explanation, loaded from local JSON files (1 per day, total 365). Implement lazy loading + offline cache for performance. Content comes pre-written in JSONs (no AI summary generation).
- Reading Progress Tracking: User progress stored in Firestore. Progress bar on Home shows: “Day X of 365 completed”. “Continue Reading” button leads directly to the next incomplete day.
- Reading Completion: “Mark as Complete” button → marks the day as completed in Firestore and automatically advances to the next day. “Previous Day” button → goes back to the previous day.
- Calendar View: Grid with all 365 days. Completed days marked with ✅. Incomplete days remain blank. User can click any day to open its reading.
- Accessibility Controls: A+ / A- buttons to adjust font size. Reading modes: Soft White (default: #FAFAFA), Beige (#FDF6E3), and Dark (#111111).
- How It Works: Explains the purpose: a 365-day plan (~15 minutes/day), combining Bible and Catechism.
- Home Screen: After login, the user is redirected to Home. Displays: progress bar, Continue Reading button, and quick access to main sections.

## Style Guidelines:

- Primary color: Marian Blue (#1E3A8A) – spiritual, traditional.
- Accent color: Soft Gold (#D4A373) – used in progress indicators and main buttons.
- Background: Soft White (#FAFAFA), with Beige and Dark options.
- Text: Always black (#000000) for readability.
- Font: Inter (Google Fonts, modern sans-serif for great legibility).
- Layout: Fully responsive (mobile + desktop).
- Bottom fixed menu: Home | Reading | Calendar | Profile | How It Works (i).
- Icons: Clear and simple for navigation and progress.
- Animations: Smooth transitions for screen changes and progress updates.