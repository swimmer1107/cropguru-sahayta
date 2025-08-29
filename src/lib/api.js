// Simple front-end API client to talk to your local Node/Express + MongoDB server
const API_BASE = "http://localhost:4000/api";

async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}

export const postChatMessage = (message, language) =>
  request("/chat", { method: "POST", body: JSON.stringify({ message, language }) });

export const fetchChatHistory = () => request("/chat", { method: "GET" });

export const fetchTasks = () => request("/tasks", { method: "GET" });
export const createTask = (task) => request("/tasks", { method: "POST", body: JSON.stringify(task) });

export const fetchNotifications = () => request("/notifications", { method: "GET" });

export const getYieldPrediction = (crop) =>
  request("/predictions/yield", { method: "POST", body: JSON.stringify({ crop }) });
export const fetchPredictions = () => request("/predictions", { method: "GET" });

export const scheduleIrrigation = (data) =>
  request("/irrigation", { method: "POST", body: JSON.stringify(data) });
export const setWeatherAlert = (data) =>
  request("/alerts/weather", { method: "POST", body: JSON.stringify(data) });

export const analyzeField = () => request("/analyze/field", { method: "POST" });
export const forecast = (days = 30) => request(`/forecast?days=${days}`, { method: "GET" });
export const setLocation = (location) =>
  request("/location", { method: "POST", body: JSON.stringify({ location }) });

export const analyzeDisease = (imageBase64) =>
  request("/disease/analyze", { method: "POST", body: JSON.stringify({ imageBase64 }) });
export const getDiseaseHistory = () => request("/disease/history", { method: "GET" });
