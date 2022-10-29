import { createContext } from 'react';
import { User, purchase } from '../types/types';

export type AuthContextType = {
  user: User | null;
  purchase: purchase | null;
  login: (name: string, password: string) => Promise<boolean>;
  signout: () => void;
  getPurchasebyid: (id: number) => Promise<purchase>;
};

export const AuthContext = createContext<AuthContextType>(null!);