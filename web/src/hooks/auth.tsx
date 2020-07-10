import React, { useState, createContext, useCallback, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@LucasPark:token');
    const user = localStorage.getItem('@LucasPark:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@LucasPark:token', token);
    localStorage.setItem('@LucasPark:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@LucasPark:token');
    localStorage.removeItem('@LucasPark:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an Authprovider');
  }

  return context;
}

export { AuthProvider, useAuth };
