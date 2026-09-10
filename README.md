# Q-SENTINEL: Quantum Machine Learning Platform for Tuberculosis Diagnostics

Q-Sentinel is a medical intelligence platform that assists pulmonologists, radiologists, and infectious disease specialists in identifying and predicting risks for Tuberculosis (TB) using **Quantum Machine Learning (QML)** alongside classical Machine Learning benchmarks.

---

## 🌟 Key Features

- **8-Qubit Variational Quantum Classifier (VQC)**: Projects multi-modal patient biomarkers into an entangled 256-dimensional Hilbert space to isolate non-linear decision boundaries for early-stage (T1–T2) TB detection.
- **Quantum vs Classical ML Benchmarking**: Real-time side-by-side risk trajectories comparing 8-Qubit VQC with DenseNet-121 / XGBoost baselines on the same telemetry curves.
- **Chest Radiograph 9-Zone Segmentation**: Exact image-bound 9-zone segmentation of CXR DICOM/image scans with localized anomaly scoring and pathological insight extraction.
- **Live Patient Telemetry Streaming**: Real-time fluctuating vital signs (Heart Rate, SpO2, Resp Rate, Temp) and inflammatory biomarkers (CRP, ESR, Pleural ADA).
- **Interactive CRT Clinical Portal**: Editorial user interface with an interactive CRT robot doctor terminal, zero-scroll single-view clinical layouts, and plain-English medical insights.

---

## 🏗️ Architecture

```
q-sentinel/
├── src/                      # React 19 + Vite Frontend
│   ├── components/           # UI components, CRT Doctor character, Nav tabs
│   ├── contexts/             # Authentication & Patient state contexts
│   ├── data/                 # Cohort records, synthetic datasets, doctors
│   ├── pages/                # Workspace, QML Analysis, Radiograph, Trends, Notes
│   └── App.tsx               # Client-side router configuration
├── backend/                  # Python FastAPI Backend & Quantum Engine
│   ├── api.py                # REST & WebSocket API endpoints
│   ├── quantum_circuit.py    # PennyLane 8-qubit variational ansatz & kernel
│   ├── quantum_tb_engine.py  # QML prediction engine & noise mitigation
│   ├── xray_analyzer.py      # CXR 9-zone feature extraction & vision analysis
│   ├── icu_simulator.py      # Real-time hemodynamic vital simulation
│   └── requirements.txt      # Python dependencies
├── package.json              # Frontend dependencies and build scripts
└── README.md
```

---

## 🚀 Getting Started & Local Hosting

### Prerequisites

- **Node.js**: `v18.x` or higher
- **npm** or **yarn** / **pnpm**
- **Python**: `3.10+` (optional, for running local quantum simulation backend)
- **Git**

---

### 1. Clone the Repository

```bash
git clone https://github.com/low-key-jake/Q-SENTINEL.git
cd Q-SENTINEL
```

---

### 2. Frontend Setup (React + Vite)

Install frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The application will now be running at:
👉 **`http://localhost:3000/`**

To build for production:

```bash
npm run build
npm run preview
```

---

### 3. Backend Setup (FastAPI & PennyLane QML Engine)

In a new terminal:

```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

Run the backend server:

```bash
uvicorn api:app --reload --port 8000
```

Backend API documentation (Swagger UI) will be accessible at:
👉 **`http://localhost:8000/docs`**

---

## 🩺 Demo Credentials

The platform comes pre-configured with hospital staff credentials:

| Physician ID | Password | Doctor | Department |
| :--- | :--- | :--- | :--- |
| `DR-778` | `QML#Doc2026` | Dr. Sarah Chen | Pulmonology (Chief) |
| `DR-892` | `TB#Quantum99` | Dr. James Wilson | Diagnostic Imaging (Radiologist) |
| `DR-445` | `Lungs#123` | Dr. Elena Rostova | Infectious Disease (TB Specialist) |
| `DR-112` | `Quantum#8Qubit` | Dr. Michael Chang | Quantum Analytics (Lead QML) |

---

## 📜 License

This project is open-source and intended for clinical research, medical imaging evaluation, and healthcare innovation.
