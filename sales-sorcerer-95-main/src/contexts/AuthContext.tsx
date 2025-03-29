
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatar: 'https://i.pravatar.cc/150?u=admin',
  },
  {
    id: '2',
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager' as UserRole,
    avatar: 'https://i.pravatar.cc/150?u=manager',
  },
  {
    id: '3',
    email: 'user@example.com',
    password: 'user123',
    name: 'Standard User',
    role: 'user' as UserRole,
    avatar: 'https://i.pravatar.cc/150?u=user',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('salesDashboardUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('salesDashboardUser', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
    } else {
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = MOCK_USERS.find((u) => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      throw new Error('Email already in use');
    }
    
    // In a real app, you would make an API call to create the user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      name,
      role: 'user',
      avatar: `https://i.pravatar.cc/150?u=${email}`,
    };
    
    setUser(newUser);
    localStorage.setItem('salesDashboardUser', JSON.stringify(newUser));
    toast.success('Account created successfully!');
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('salesDashboardUser');
    toast.info('You have been logged out');
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    
    // Role hierarchy: admin > manager > user
    if (user.role === 'admin') return true;
    if (user.role === 'manager' && requiredRole !== 'admin') return true;
    if (user.role === 'user' && requiredRole === 'user') return true;
    
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
