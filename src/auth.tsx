import * as SecureStore from "expo-secure-store";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { login as loginRequest, register as registerRequest } from "./api";
import type { AuthResponse, User } from "./types";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

type AuthContextValue = {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function saveSession(response: AuthResponse) {
    const nextUser = {
      id: response.id,
      username: response.username,
      email: response.email,
    };

    await SecureStore.setItemAsync(TOKEN_KEY, response.accessToken);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(nextUser));

    setToken(response.accessToken);
    setUser(nextUser);
  }

  useEffect(() => {
    async function restoreSession() {
      setIsLoading(true);

      try {
        const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        const savedUser = await SecureStore.getItemAsync(USER_KEY);

        if (!savedToken || !savedUser) {
          return;
        }

        const parsedUser = JSON.parse(savedUser) as User;
        setToken(savedToken);
        setUser(parsedUser);
      } catch {
        setError("Could not restore your saved session.");
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(username: string, password: string) {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginRequest(username, password);
      await saveSession(response);

      return true;
    } catch (authError) {
      const message =
        authError instanceof Error ? authError.message : "Login failed.";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function register(username: string, email: string, password: string) {
    if (!username || !email || !password) {
      setError("Please enter username, email, and password.");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await registerRequest(username, email, password);
      await saveSession(response);
      return true;
    } catch (authError) {
      const message =
        authError instanceof Error ? authError.message : "Register failed.";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    setToken(null);
    setUser(null);
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, isLoading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
