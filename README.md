# Restaurant Ordering (Vite + React + TypeScript)

A starter project scaffold for a restaurant ordering admin and QR code based ordering system.

Main features included:
- Vite + React + TypeScript
- MUI (Material UI) for responsive UI components
- SCSS support
- React Router (v6)
- Redux Toolkit for state management (menu, orders slices)
- QR code generation page (react-qr-code)

Quick start (Windows PowerShell):

1. Install dependencies

```powershell
cd "c:\Users\hiep\OneDrive\Máy tính\order"
npm install
```

2. Start dev server

```powershell
npm run dev
```

Notes:
- I've included a simple MUI theme, global SCSS and a few example pages (Home, Menu, Orders, QR generator).
- After you run `npm install`, open `http://localhost:5173` to view the app.

Next steps you may want me to implement:
- Connect slices to pages and make Menu items editable.
- Add authentication and role-based pages for staff.
- Add QR scan functionality for mobile devices (to accept orders) and API integration.
