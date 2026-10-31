# 🚀 DSA Practical Hub

A high-performance, responsive React web application designed to view, search, inspect, and copy Data Structures & Algorithms (DSA) lab practical code with **100% offline functionality**.

![DSA Practical Hub](public/pwa-512x512.png)

---

## 🌟 Key Features

- **100% Offline Capability**: Built with `vite-plugin-pwa` and Workbox caching. Once loaded or installed, the application functions with zero internet connection.
- **20 Complete Practical Assignments**: Categorized across *Searching & Sorting*, *Stack & Queue*, *Trees*, *Graphs*, *Greedy & DP*, and *String & Pathfinding* with complete, executable C++ and Python implementations.
- **Dual-Strategy Copy-to-Clipboard**:
  - Uses `navigator.clipboard.writeText()` when available in secure contexts.
  - Automatically falls back to a hidden `<textarea>` with `document.execCommand('copy')` for older browsers or non-secure contexts.
  - Provides an immediate animated "Copied!" checkmark badge that reverts after 2 seconds.
- **Side-by-Side Split View & Terminal Output**: Realistic terminal emulator showing authentic program outputs alongside the code.
- **Downloadable Source Files**: One-click download button for `.cpp` and `.py` source files.
- **Dark & Light Mode**: Seamless theme switching with persistent preferences saved in `localStorage`.
- **Keyboard Shortcuts**:
  - Press `/` anywhere to focus the search bar.
  - Press `Esc` to close modals.
  - Press `←` and `→` arrow keys to navigate between practicals.
- **PWA Installable**: Can be installed as a standalone desktop or mobile application.

---

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (Class-based dark mode, custom developer color palette)
- **Lucide React** (Modern, clean icon set)
- **Vite Plugin PWA** (Workbox service worker, CacheFirst offline caching strategy)

---

## 📁 Project Structure

```
dsa-practical-hub/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
├── src/
│   ├── components/
│   │   ├── AssignmentCard.jsx    # Grid card for each practical
│   │   ├── AssignmentModal.jsx   # Split-view detail modal
│   │   ├── CodeViewer.jsx        # Offline syntax display & downloader
│   │   ├── CopyButton.jsx        # Dual-strategy clipboard button with 2s badge
│   │   ├── FilterBar.jsx         # Search bar and category pills with counts
│   │   ├── Navbar.jsx            # Header, online/offline status, theme toggle
│   │   ├── OfflineBanner.jsx     # PWA status banner
│   │   └── TerminalOutput.jsx    # macOS-style terminal emulator for output
│   ├── data/
│   │   └── assignments.js        # 20 complete DSA lab assignments
│   ├── App.jsx                   # Main layout and filter state
│   ├── index.css                 # Tailwind directives & custom scrollbars
│   └── main.jsx                  # React entry point with service worker
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 💻 Getting Started

### Development Server
```bash
npm install
npm run dev
```

### Production Build (with PWA Service Worker)
```bash
npm run build
npm run preview
```
