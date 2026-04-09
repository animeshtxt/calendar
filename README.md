# Interactive Wall Calendar

A 3D-flipping, responsive web calendar built with Next.js and pure CSS. It mimics the physical feel of a wall calendar with monthly themes, integrated notes and holiday tracking.

## Features

- **Realistic 3D Page Flips:** Smooth CSS-based page turning animations without heavy external libraries.
- **Integrated Note-Taking:** Add daily or monthly notes, automatically saved to `localStorage`.
- **Responsive Layout:** Side-by-side on desktop, stacked on mobile. Uses strict height constraints so it doesn't jump or resize unexpectedly.
- **Zero Database:** Fully client-side, no database or api requried.

## Local Setup

Prerequisite: Node.js v18.17.0+ or newer.

1. **Clone the repository**
   ```bash
   git clone https://github.com/animeshtxt/calendar.git
   cd calendar
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Tech Stack

- Next.js 14 (App Router)
- React
- Vanilla CSS Modules
