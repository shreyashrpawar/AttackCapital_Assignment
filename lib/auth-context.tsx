'use client';

import React, { createContext, useContext, useEffect,useState, ReactNode } from 'react';

interface AuthContextType {
  token: string;
  authenticate: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');
// useEffect(() => {
//   const tokenAuth = localStorage.getItem('token');
//   if (tokenAuth) {
//     setToken(tokenAuth);
//   }
// }, []);

// useEffect(() => {
//   if (token) {
//     console.log("Token in state:", token);
//   }
// }, [token]);
  const authenticate = async (): Promise<void> => {
    const tokenAuth = localStorage.getItem('token');
    console.log(tokenAuth)
    if(tokenAuth==''){
    const response = await fetch(
      `/api/auth/grant`,
      {
        method: 'POST',

      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    setToken(data.access_token);
  }
  };

  return (
    <AuthContext.Provider value={{ token, authenticate, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
