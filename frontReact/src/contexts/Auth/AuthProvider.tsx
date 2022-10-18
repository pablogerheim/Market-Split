import { useEffect, useState } from 'react';
import { useApi } from '../../data/api';
import { User, purchase } from '../../types/types';
import { AuthContext } from './AuthContext';
import { loggedToken } from "../../data/api";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [purchase, setPurchase] = useState<purchase | null>(null)
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storeToken = await localStorage.getItem('authToken');
      if (storeToken) {
        const data = await api.validateToken(storeToken);
        if (!data) {
          setUser(null);
        } else { setUser(data.user) }
      }
    };
    validateToken();
  }, []);

  const login = async (name: string, password: string) => {
    const data = await api.login(name, password);

    if (data.data.token && data.data.user) {
      setUser(data.data.user);
      setToken(data.data.token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    console.log('signout está sendo executada.');
    const storeToken = await loggedToken()
    storeToken && await api.logout(storeToken);
    setToken('');
    setUser(null);
  };

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  const getPurchasebyid = async (id:number) => {
    const data = await api.getPurchasebyid(id);
    setPurchase(data)
    return data
  };

  return (
    <AuthContext.Provider value={{ user, purchase, login, signout, getPurchasebyid }}>
      {children}
    </AuthContext.Provider>
  );
};
