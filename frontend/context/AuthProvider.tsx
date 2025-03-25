import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  user: { email: string; role: string } | null;
  setUser: (user: { email: string; role: string } | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleLogout: () => void;
  api: AxiosInstance;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    const checkLoginState = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLogged(true);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Optionally, fetch user data with the token
      } else {
        setIsLogged(false);
        delete api.defaults.headers.common['Authorization'];
      }
      setLoading(false);
    };

    checkLoginState();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setIsLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, loading, setLoading, handleLogout,api }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;