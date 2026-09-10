export const API_BASE = '/api';

export const apiClient = {
  getLiveHistory: async () => {
    const res = await fetch(`${API_BASE}/live-history`);
    return res.json();
  },
  
  getLiveVitals: async () => {
    const res = await fetch(`${API_BASE}/live-vitals`);
    return res.json();
  },
  
  uploadXRay: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch(`${API_BASE}/upload-xray`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },
  
  triggerDrift: async () => {
    const res = await fetch(`${API_BASE}/trigger-drift`, { method: 'POST' });
    return res.json();
  }
};
