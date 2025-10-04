# 🌍 WeaZer Odds — Weather & Air Quality Explorer with NASA Satellite Data

**Live Demo:** [weazer-odds.vercel.app](https://weazer-odds.vercel.app)  
**Repository:** [GitHub Repo](https://github.com/mohamedkhalaf47/WeaZerOdds-NASA)

---

## 📌 Project Overview

**WeaZer Odds** is a web-based dashboard application that combines **live weather forecasts** with **real NASA satellite imagery** to provide users with a clear, accessible, and interactive way of exploring weather and environmental data.

The project is built with **Next.js**, styled using **TailwindCSS & ShadCN UI**, and uses **React Leaflet** for map interactivity.  
It integrates the **Open-Meteo API** for weather data and **NASA GIBS (Global Imagery Browse Services)** for satellite imagery.

---

## 🎯 Objectives

- ✅ Provide **real-time and forecasted weather data** (temperature, wind, AQI, rainfall, etc.).  
- ✅ Enable users to **search by country** or **point directly on a map** to get localized conditions.  
- ✅ Enhance data visualization with **NASA satellite imagery layers**.  
- ✅ Deliver a **minimalistic, accessible, and responsive dashboard** for best user experience.  
- ✅ Allow users to **download weather results as CSV** for offline analysis.  

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)  
- **Styling:** [TailwindCSS](https://tailwindcss.com/)  
- **State/Data Fetching:** Native React Hooks 
- **Maps & Geospatial Data:** [React-Leaflet](https://react-leaflet.js.org/)  
- **APIs:**
  - 🌦️ [Open-Meteo API](https://open-meteo.com/) → Real-time & forecasted weather data  
  - 🛰️ [NASA GIBS API](https://nasa-gibs.github.io/gibs-api-docs/) → Real satellite imagery overlays  

---

## 📑 Features

### 1. **Home Page**
- Search weather data by **country name**.  
- Display:
  - **Air Quality Index (AQI)**
  - **Average temperature**
  - **Rainfall levels**
  - **Wind speed**
  - **Coordinates (longitude & latitude)**  

---

### 2. **Date Search Page**
- Select a **specific date (up to 14 days in advance)**.  
- Fetch weather forecasts for that date and location.  
- Provide an **analysis of possible weather conditions**.  

---

### 3. **Map Viewer Page**
- Interactive **React Leaflet map**.  
- User can **click/pin any location**.  
- Display **current weather conditions** for the selected point.  
- Option to **download weather data as CSV**.  
- Integrated **NASA GIBS satellite imagery** for realistic visualization.  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/mohamedkhalaf47/WeaZerOdds-NASA.git
cd WeaZerOdds-NASA
npm install
npm run dev
