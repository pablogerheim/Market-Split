import { useEffect, useState } from 'react';
import { useApi } from '../data/api';
import { Ipurchase, IuserAPI } from '../types/types';
import { AuthContext } from './AuthContext';
import React from 'react'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IuserAPI | null>(null);
  const [purchase, setPurchase] = useState<Ipurchase | null>(null)
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        const data = await api.validateToken();
        if (!data) {
          setUser(null);
        } else { setUser(data.data.user) }
      }
    };
    validateToken();
  }, []);

  const login = async (name: string, password: string) => {
    const data = await api.login(name, password);

    if (data.data.token && data.data.user) {
      const helperUser = data.data.user
      helperUser.token = data.data.token
      setUser(helperUser);
      setToken(data.data.token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    console.log('signout está sendo executada.');
    await api.logout();
    setToken('');
    setUser(null);
  };

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  const getPurchasebyid = async (purchase: Ipurchase) => {
  setPurchase(purchase)
  };

  return (
    <AuthContext.Provider value={{ user, purchase, login, signout, getPurchasebyid }}>
      {children}
    </AuthContext.Provider>
  );
};
