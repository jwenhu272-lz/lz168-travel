'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('lz168_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to load user');
      }
    }
    setLoading(false);
  }, []);

  const register = (email, password, name, phone) => {
    const users = JSON.parse(localStorage.getItem('lz168_users') || '[]');

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'User already exists' };
    }

    const newUser = {
      id: Date.now(),
      email,
      name,
      phone,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('lz168_users', JSON.stringify(users));

    // Auto login after register
    const userData = { id: newUser.id, email, name, phone };
    localStorage.setItem('lz168_user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('lz168_users') || '[]');
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const userData = { id: user.id, email, name: user.name, phone: user.phone };
    localStorage.setItem('lz168_user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('lz168_user');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('lz168_user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Also update in users array
    const users = JSON.parse(localStorage.getItem('lz168_users') || '[]');
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, ...updates } : u
    );
    localStorage.setItem('lz168_users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
