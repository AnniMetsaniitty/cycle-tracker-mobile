import type { AuthResponse, Cycle, MedicationStatus } from "./types";

const API_BASE_URL = "http://localhost:3000";
/** For now, const API_BASE_URL = 'http://localhost:3000'; is ok
 * as a placeholder*/

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Something went wrong with the request.");
  }

  return response.json();
}

export function login(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse>("/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentCycle(token: string): Promise<Cycle> {
  return request<Cycle>("/cycle/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getMedicationStatus(token: string): Promise<MedicationStatus> {
  return request<MedicationStatus>("/medication/status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getCycleHistory(token: string): Promise<Cycle[]> {
  return request<Cycle[]>("/cycle/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
