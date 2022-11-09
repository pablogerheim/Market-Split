import { createContext } from 'react';
import { Ipurchase, IuserAPI } from '../types/types';

export type AuthContextType = {
  user: IuserAPI | null;
  purchase: Ipurchase | null;
  login: (name: string, password: string) => Promise<boolean>;
  signout: () => void;
  getPurchasebyid: (purchase: Ipurchase) => void;
};

export const AuthContext = createContext<AuthContextType>(null!);