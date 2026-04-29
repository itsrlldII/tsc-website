import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const http = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export async function fetchMembers() {
  const res = await http.get("/members");
  return res.data;
}

export async function submitApplication(payload) {
  const res = await http.post("/applications", payload);
  return res.data;
}

export async function submitContact(payload) {
  const res = await http.post("/contact", payload);
  return res.data;
}

export async function verifyAdmin(password) {
  const res = await http.post("/admin/verify", null, {
    headers: { "X-Admin-Password": password },
  });
  return res.data;
}

export async function fetchApplications(password) {
  const res = await http.get("/applications", {
    headers: { "X-Admin-Password": password },
  });
  return res.data;
}

export async function fetchContactMessages(password) {
  const res = await http.get("/contact", {
    headers: { "X-Admin-Password": password },
  });
  return res.data;
}

export async function fetchLiveStreams() {
  const res = await http.get("/streams/live");
  return res.data;
}

export async function fetchDiscordStats() {
  const res = await http.get("/discord/stats");
  return res.data;
}

export async function fetchYouTubeLatest(limit = 6) {
  const res = await http.get(`/youtube/latest?limit=${limit}`);
  return res.data;
}
