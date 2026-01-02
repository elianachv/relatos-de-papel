import { createContext, useContext, useState } from "react";
 
const AuthContext = createContext(null);
 
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("auth_user");
    return null;
  }
}
 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);
 
  const login = (userData) => {
    setUser({ email: userData.email });
    localStorage.setItem("auth_user", JSON.stringify({ email: userData.email }));
  };
 
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };
 
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };
 
  return (
<AuthContext.Provider value={value}>
      {children}
</AuthContext.Provider>
  );
}
 
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}