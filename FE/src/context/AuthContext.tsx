import type { AuthResponse, Login, Register, User } from 'project-shared';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { loginUser, registerUser } from '../api';

const STORAGE_TOKEN_KEY = 'auth_token';
const STORAGE_USER_KEY = 'auth_user';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: Login) => Promise<void>;
  register: (payload: Register) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY);
    const storedUser = localStorage.getItem(STORAGE_USER_KEY);

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as User;
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    }
  }, []);

  const persistAuth = useCallback((response: AuthResponse) => {
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem(STORAGE_TOKEN_KEY, response.token);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(response.user));
  }, []);

  const login = useCallback(
    async (payload: Login) => {
      const response = await loginUser(payload);
      persistAuth(response);
    },
    [persistAuth],
  );

  const register = useCallback(
    async (payload: Register) => {
      const response = await registerUser(payload);
      persistAuth(response);
    },
    [persistAuth],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === 'ADMIN',
      login,
      register,
      logout,
    }),
    [login, logout, register, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
