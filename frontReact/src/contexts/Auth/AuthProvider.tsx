import { useEffect, useState } from 'react';
import { useApi } from '../../data/api';
import { User } from '../../types/types';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('authToken');
      if (storageData) {
        const data = await api.validateToken();
        if (!data) {
          setUser(null);
        }
      }
    };
    validateToken();
  }, [api]);

  const login = async (name: string, password: string) => {
    const data = await api.login(name, password);
    
    if (data.name && data.token) {
      // fazer white list para a verificação do token voltar com as informções corretas
      setUser(data.name);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    console.log('signout está sendo executada.');
    setUser(null);
    setToken('');
    await api.logout();
  };

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  return (
    <AuthContext.Provider value={{ user, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
