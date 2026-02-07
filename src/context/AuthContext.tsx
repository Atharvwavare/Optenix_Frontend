import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  mobile?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore auth on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    const storedToken = localStorage.getItem("auth_token");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = (userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("auth_user", JSON.stringify(userData));
    localStorage.setItem("auth_token", jwtToken);
  };

  // ✅ UPDATE USER
  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  // ✅ LOGOUT
  const logout = () => {
  if (user?.email) {
    localStorage.removeItem(`cart_${user.email}`); // 🧹 clear user cart
  }

  setUser(null);
  setToken(null);

  localStorage.removeItem("user");
  localStorage.removeItem("token");
};


  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
