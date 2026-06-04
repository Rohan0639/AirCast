# AirCast

**🔴 Live Demo:** [https://aqi-prediction-ml-2.onrender.com/](https://aqi-prediction-ml-2.onrender.com/)

[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![XGBoost](https://img.shields.io/badge/ML-XGBoost-EBBD3C?style=for-the-badge&logo=xgboost)](https://xgboost.ai/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

## 📖 Description

The **Hyderabad AQI Prediction System** is an AI-powered environmental forecasting platform. It addresses the challenge of reactive pollution management by providing real-time Air Quality Index (AQI) monitoring and proactive next-day forecasting for key stations across Hyderabad, India. 

By integrating live weather data from the World Air Quality Index (WAQI) API with historical trends and station-specific XGBoost regression models, the system delivers highly accurate predictions. The results are presented through a premium, glassmorphic dashboard designed for clarity and visual impact.

---

## 🛠️ Tech Stack

**Frontend:**
- **Framework:** React 19 (Vite)
- **Styling:** Vanilla CSS (Advanced Glassmorphism & Modern Aesthetics)
- **Visualization:** Recharts (Interactive Trends), React-Leaflet (Geographical Mapping)
- **Icons:** Lucide React
- **HTTP Client:** Axios

**Backend:**
- **Framework:** FastAPI (Python 3.10+)
- **Machine Learning:** XGBoost, Scikit-learn, Joblib
- **Data Processing:** NumPy, Native CSV processing
- **Environment Management:** Python-dotenv

**Deployment & DevOps:**
- **Containerization:** Docker
- **Cloud Hosting:** Render (Backend), Vercel (Frontend), Railway (Alternative)
- **Workflow:** GitHub Actions for automated predictions (Optional)

---

## ✨ Key Features

- **Real-Time Monitoring:** Live AQI and weather metrics for major Hyderabad stations (Balanagar, HITEC City, Sanathnagar, etc.).
- **AI-Powered Forecasting:** Uses station-specific XGBoost models to predict tomorrow's AQI with high confidence.
- **Premium Glassmorphic UI:** A state-of-the-art interface featuring blur effects, gradients, and smooth micro-animations.
- **Dynamic Data Visualization:** Comparative trend charts for AQI and Temperature over custom timeframes (7, 15, or 30 days).
- **Interactive Map:** Leaflet-based map showing all monitoring stations with real-time status overlays.
- **Robust Data Pipeline:** Automated fetching, deduplication, and concentration conversion of WAQI API data.

---

## 📂 Project Structure

```text
AQI-PREDICTION-ML/
├── api/                    # Backend FastAPI application
│   ├── data/               # Historical & Live collected datasets (CSV)
│   ├── models/             # Trained ML models (.pkl files)
│   ├── fetch_live_data.py  # WAQI API interaction & data conversion logic
│   ├── index.py            # Main API server, routing, and prediction logic
│   └── requirements.txt    # Python backend dependencies
├── frontend/               # Frontend React application
│   ├── src/                # React components, Hooks, and Styles
│   ├── public/             # Static assets
│   ├── package.json        # Node.js dependencies & scripts
│   └── vite.config.js      # Vite configuration
├── Dockerfile              # Unified build instructions
├── railway.json            # Railway deployment configuration
├── render.yaml             # Render Blueprint configuration
├── .vercelignore           # Vercel deployment exclusions
└── README.md               # Project documentation
```

---

## 🚀 Installation & Local Setup

### Prerequisites
- **Node.js** (v20+)
- **Python** (v3.10+)
- **WAQI API Key** (Get one at [aqicn.org/api/](https://aqicn.org/api/))

### 1. Clone the repository
```bash
git clone https://github.com/Rohan0639/aqi-prediction-ml.git
cd aqi-prediction-ml
```

### 2. Backend Setup
```bash
cd api
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create `.env` files in both `api/` and `frontend/` directories:

**Backend (`api/.env`):**
```env
AQI_API_KEY=your_waqi_api_token_here
PORT=8000
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:8000
```

---

## 💻 Running the Application

### Start Backend
From the `api` directory:
```bash
uvicorn index:app --reload --port 8000
```

### Start Frontend
From the `frontend` directory:
```bash
npm run dev
```
Navigate to `http://localhost:5173` to view the dashboard.

---

## 📡 API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/dashboard` | `GET` | Live weather, current AQI, and AI predictions for all stations. |
| `/api/trend/{name}` | `GET` | Historical AQI & Temp trends (supports `?days=N`). |
| `/api/stations` | `GET` | Metadata and coordinates for all monitoring stations. |

---

## 📸 Visuals

| Dashboard | Interactive Map |
| :---: | :---: |
| ![Dashboard](https://via.placeholder.com/400x225.png?text=Premium+Dashboard) | ![Map](https://via.placeholder.com/400x225.png?text=Interactive+Map) |

---

## 🔮 Future Roadmap

- **Advanced Models:** Incorporating LSTM or GRU networks for multi-day time-series forecasting.
- **User Alerts:** SMS/Email notifications for high-pollution events.
- **Health Recommendations:** AI-generated health tips based on specific pollutant levels.
- **Database Integration:** Migrating from local CSVs to a scalable Cloud SQL database.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
