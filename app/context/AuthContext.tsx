'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'admin' | 'user' | null;

interface AuthContextType {
  role: UserRole;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'admin' || storedRole === 'user') {
      setRole(storedRole);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple simulation - in a real app, this would be an API call
    if (email === 'admin@biblioteca.com' && password === 'admin123') {
      setRole('admin');
      localStorage.setItem('userRole', 'admin');
      return true;
    } else if (email === 'usuario@biblioteca.com' && password === 'usuario123') {
      setRole('user');
      localStorage.setItem('userRole', 'user');
      return true;
    }
    return false;
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
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