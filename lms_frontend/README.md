# OceanLMS Frontend (React + CRA)

A modern LMS frontend with TopBar + SideNav layout, Ocean Professional theme, role-based routing, REST/WS clients, feature flags, and minimal dependencies.

## Quick Start

- Node 18+
- Install deps:
  - npm install
- Start dev server:
  - npm start

## Environment Variables

Create a .env file at the project root with the following (example):

```
REACT_APP_API_BASE=http://localhost:4000
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_WS_URL=ws://localhost:4000/ws
REACT_APP_LOG_LEVEL=info
REACT_APP_FEATURE_FLAGS={"mockApi":true}
REACT_APP_EXPERIMENTS_ENABLED=false
```

Notes:
- REACT_APP_API_BASE and REACT_APP_BACKEND_URL are used by the HTTP client and optional proxy.
- If WS is unavailable, the app will gracefully skip connecting.

## Layout and Theme

- Global theme tokens: src/styles/theme.css
- App shell:
  - TopBar (src/components/TopBar.jsx)
  - SideNav (src/components/SideNav.jsx)
  - Content area with responsive grid utilities in App.css/index.css

## Routing

- Implemented with react-router-dom v6
- Route map:
  - /                        Home (protected)
  - /courses                 Courses (protected)
  - /courses/:id             CourseDetail (protected)
  - /learning                Learning (protected)
  - /assessments             Assessments (protected)
  - /assignments             Assignments (protected)
  - /grades                  Grades (protected)
  - /gradebook               Gradebook (protected)
  - /analytics               Analytics (protected)
  - /notifications           Notifications (protected)
  - /settings                Settings (protected)
  - /profile                 Profile (protected)
  - /users                   Users (admin only)
  - /dashboard/admin         Admin dashboard (admin only)
  - /dashboard/instructor    Instructor dashboard (instructor only)
  - /dashboard/student       Student dashboard (student only)
  - /login, /register, /forgot-password (public)

ProtectedRoute supports roles: student, instructor, admin.

## Feature Flags

- REACT_APP_FEATURE_FLAGS: JSON map. Example: {"mockApi":true}
- REACT_APP_EXPERIMENTS_ENABLED: boolean
- See utils/featureFlags.js

## API and WS Clients

- REST: utils/http.js (fetch) + services/apiClient.js
  - Reads REACT_APP_API_BASE or REACT_APP_BACKEND_URL
  - Mock mode via feature flag mockApi (default true)
- WebSocket: services/wsClient.js
  - Reads REACT_APP_WS_URL
  - Integrates with toast notifications

## Tests

- Minimal smoke test in src/App.test.js ensuring the app renders and shell loads.

## Notes

- Keep dependencies minimal (only react-router-dom).
- Simple SVG charts (no external chart libs).
