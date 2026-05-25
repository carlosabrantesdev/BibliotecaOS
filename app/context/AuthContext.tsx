'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type UserRole = 'admin' | 'user' | null;

interface AuthContextType {
  role: UserRole;
  authLoaded: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'admin' || storedRole === 'user') {
      setRole(storedRole);
    }
    setAuthLoaded(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      setRole(data.role as UserRole);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('token', data.token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ role, authLoaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
