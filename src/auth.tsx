import * as SecureStore from "expo-secure-store";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

import { login as loginRequest } from "./api";
import type { User } from "./types";

const TOKEN_KEY = "authToken";

type AuthContextValue = {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(username: string, password: string) {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginRequest(username, password);

      await SecureStore.setItemAsync(TOKEN_KEY, response.accessToken);

      setToken(response.accessToken);
      setUser({
        id: response.id,
        username: response.username,
        email: response.email,
      });

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

  return (
    <AuthContext.Provider value={{ token, user, isLoading, error, login }}>
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
