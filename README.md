# Privacy World — $SEIS Simulator

A fully client-side React simulation of crypto wallet privacy concepts.  
**No real cryptocurrency is involved.**

---

## 🚀 Quick Start (Local Development)

```bash
npm install
npm run dev
```
Then open http://localhost:5173

---

## 🏗️ Build for Production

```bash
npm run build
```
Output goes to `dist/` — ready to upload to any static host.

---

## ☁️ Deploy in 2 Minutes

### Vercel (Recommended)
1. Push this folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Framework: **Vite** → Click Deploy
4. Done ✅ — live URL provided instantly

### Netlify
1. Go to [netlify.com](https://netlify.com) → Add new site → Deploy manually
2. Drag & drop the `dist/` folder  
   *OR* connect GitHub repo → build command: `npm run build`, publish dir: `dist`
3. Done ✅

### GitHub Pages
```bash
npm run build
# Upload contents of dist/ to gh-pages branch
```

---

## 📁 Project Structure

```
privacy-world/
├── <script type="module" src="./src/main.jsx"></script>           # Entry HTML
├── vite.config.js           # Vite config
├── netlify.toml             # Netlify SPA routing
├── vercel.json              # Vercel SPA routing
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Root component + page routing
    ├── index.css            # Global styles + reset
    ├── theme.js             # Color tokens (single source of truth)
    ├── utils.js             # Shared helpers (address gen, score calc)
    ├── api/
    │   └── index.js         # ⭐ Placeholder backend hooks (swap for real API here)
    └── components/
        ├── Navbar.jsx
        ├── Toast.jsx
        ├── LandingPage.jsx
        ├── AuthPage.jsx
        ├── Dashboard.jsx
        ├── WalletPage.jsx
        ├── TxGraph.jsx       # Animated canvas transaction graph
        ├── PrivacyAudit.jsx  # Privacy score + breakdown
        └── TransactionsPage.jsx
```

---

## 🔌 Connecting a Real Backend

All backend calls are isolated in `src/api/index.js`.  
Each function has a `// TODO: replace with real POST /api/...` comment.

Example — replace `apiLogin`:
```js
export async function apiLogin(username, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json(); // expects { user: { username } }
}
```

---

## 🎨 Customisation

Edit `src/theme.js` to change all colors in one place:
```js
export const PURPLE = "#6A0DAD"; // Change this for a new theme
```

---

## ⚠️ Disclaimer

This is an educational simulator only. No real cryptocurrency is involved.
