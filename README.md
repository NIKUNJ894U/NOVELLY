# NOVELLY | The Future of Physical Reading in India

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**NOVELLY** is a premium, high-fidelity book discovery and rental platform designed for the modern reader. We bridge the gap between digital discovery and real-world acquisition by connecting users with a network of premium local libraries across India.

## 🚀 Key Features
- **Library Locator**: Real-time geolocation with Google Maps to find nearby partner libraries.
- **Curated Discovery**: Browse 60+ hand-picked titles with accurate metadata and ratings.
- **Smart Recommendations**: A personalized engine that learns from your reading habits.
- **Unified Dashboard**: Manage rentals, purchases, and wishlists in a high-end glassmorphic interface.
- **Adaptive UI**: Snappy, physics-based interactions powered by Framer Motion.

## 🛠️ Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS & Modern UI Tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Google Maps JavaScript API

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/novelly.git
   cd novelly
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example file and add your API keys:
   ```bash
   cp .env.example .env
   ```
   *Required Keys*:
   - `VITE_GOOGLE_MAPS_API_KEY`: Get one from [Google Cloud Console](https://console.cloud.google.com/).
   - `VITE_GOOGLE_CLIENT_ID`: Required for Google OAuth Sign-In.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment
This project is deployment-ready for platforms like **Vercel**, **Netlify**, or **GitHub Pages**.
```bash
npm run build
```
The output will be in the `dist/` directory.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
**Designed for the Indian Reading Community.**
*Elevate Your Reading. Discover Your Next Obsession.*
