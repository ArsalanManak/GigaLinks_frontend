import Cookies from "js-cookie";
import api from "./api";

const TOKEN_KEY = "access_token";

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function clearToken() {
  Cookies.remove(TOKEN_KEY);
}

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  const token = res.data?.access_token;
  if (token) setToken(token);
  return res.data;
}

export async function register(name: string, email: string, password: string) {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
}

export async function logout() {
  await api.post("/auth/logout");
  clearToken();
}

export async function me() {
  const res = await api.get("/auth/me");
  return res.data;
}
