import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  user: { email: string; role: string } | null;
  setUser: (user: { email: string; role: string } | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleLogout: () => void;
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

  useEffect(() => {
    const checkLoginState = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // TODO: Check token validity by sending to /... endpoint
        setIsLogged(true);
        // Optionally, fetch user data with the token
      } else {
        setIsLogged(false);
      }
      setLoading(false);
    };

    checkLoginState();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, loading, setLoading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;