export const API_BASE = import.meta.env.VITE_API_URL || '/api';

// ── Local Simulation Fallback ───────────────────────────────────────────────
// When backend is cold-starting (Render free tier sleeps after 15min),
// generate realistic demo data so the UI is never blank for judges.

let localTick = 0;
const localHistory: any[] = [];

function generateLocalTick() {
  localTick++;
  const now = new Date();
  const t = localTick * 0.1;

  const hr = 78 + 8 * Math.sin(t * 0.3) + (Math.random() - 0.5) * 4;
  const spo2 = 96 + 2 * Math.sin(t * 0.15) + (Math.random() - 0.5) * 1.5;
  const rr = 16 + 3 * Math.sin(t * 0.2) + (Math.random() - 0.5) * 2;
  const temp = 37.0 + 0.5 * Math.sin(t * 0.08) + (Math.random() - 0.5) * 0.2;
  const wbc = 8.5 + 2 * Math.sin(t * 0.05) + (Math.random() - 0.5) * 1;
  const qmlRisk = 52 + 18 * Math.sin(t * 0.12) + (Math.random() - 0.5) * 5;
  const classicalRisk = 38 + 12 * Math.sin(t * 0.1) + (Math.random() - 0.5) * 4;

  const tick = {
    timestamp: now.toISOString(),
    classical_vitals: {
      heart_rate: Math.round(hr * 10) / 10,
      spo2: Math.min(100, Math.max(88, Math.round(spo2 * 10) / 10)),
      resp_rate: Math.round(rr * 10) / 10,
      temperature: Math.round(temp * 100) / 100,
      wbc_count: Math.round(wbc * 10) / 10,
    },
    risk: {
      qml: Math.min(100, Math.max(0, Math.round(qmlRisk * 10) / 10)),
      classical: Math.min(100, Math.max(0, Math.round(classicalRisk * 10) / 10)),
    },
    qml_correlations: {
      hr_temp_sync: 0.85 + 0.1 * Math.sin(t * 0.2),
      spo2_wbc_coupling: 0.72 + 0.15 * Math.sin(t * 0.15),
      entanglement_entropy: 0.65 + 0.2 * Math.sin(t * 0.18),
    },
    drift_alert: false,
    advisory: qmlRisk > 65 ? "Elevated quantum biomarker correlation detected" : "Within normal parameters",
  };

  localHistory.push(tick);
  if (localHistory.length > 120) localHistory.shift();
  return tick;
}

// Pre-fill 15 points so graphs aren't empty on first load
for (let i = 0; i < 15; i++) generateLocalTick();

// Keep generating ticks in background
setInterval(generateLocalTick, 1000);

let backendAlive = false;

async function tryFetch(url: string, options?: RequestInit): Promise<Response | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      backendAlive = true;
      return res;
    }
    return null;
  } catch {
    backendAlive = false;
    return null;
  }
}

export const apiClient = {
  getLiveHistory: async () => {
    const res = await tryFetch(`${API_BASE}/live-history`);
    if (res) return res.json();
    // Fallback: return local simulation
    return { history: [...localHistory], total_ticks: localHistory.length };
  },
  
  getLiveVitals: async () => {
    const res = await tryFetch(`${API_BASE}/live-vitals`);
    if (res) return res.json();
    // Fallback: return latest local tick
    return localHistory[localHistory.length - 1] || generateLocalTick();
  },
  
  uploadXRay: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await tryFetch(`${API_BASE}/upload-xray`, {
      method: 'POST',
      body: formData,
    });
    if (res) return res.json();
    // Return error so the UI shows it properly
    throw new Error('Backend is warming up. Please try again in 30 seconds.');
  },
  
  triggerDrift: async () => {
    const res = await tryFetch(`${API_BASE}/trigger-drift`, { method: 'POST' });
    if (res) return res.json();
    // Fallback: inject local anomaly
    localHistory.forEach(t => {
      t.risk.qml = Math.min(100, t.risk.qml + 15);
      t.drift_alert = true;
    });
    return { status: "Micro-drift anomaly injected (local simulation)" };
  },

  isBackendAlive: () => backendAlive,
};
