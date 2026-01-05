import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getUser();
    setUser(user);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const userData = await authService.login({ email, password });
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const userData = await authService.register({ name, email, password });
    setUser(userData);
    return userData;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
