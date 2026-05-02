import type { AuthResponse, Cycle, MedicationStatus } from "./types";

// In Expo Go on a real phone, replace localhost with your computer's local IP.
const API_BASE_URL = "http://192.168.32.153:8080";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Something went wrong with the request.";

    try {
      const errorData = await response.json();
      if (
        typeof errorData.message === "string" &&
        errorData.message.length > 0
      ) {
        message = errorData.message;
      }
    } catch {
      // Keep the default message if the response body is not JSON.
    }

    throw new Error(message);
  }

  return response.json();
}

export function login(
  username: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse>("/user/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function register(
  username: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse>("/user/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export function getCurrentCycle(userId: number, token: string): Promise<Cycle> {
  return request<Cycle>(`/cycle/current/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getMedicationStatus(
  userId: number,
  token: string,
): Promise<MedicationStatus> {
  return request<MedicationStatus>(`/medication/status/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getCycleHistory(
  userId: number,
  token: string,
): Promise<Cycle[]> {
  return request<Cycle[]>(`/cycle/history/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
