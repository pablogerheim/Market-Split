import { createContext } from 'react';
import { User } from '../../types/types';

export type AuthContextType = {
  user: User | null;
  login: (name: string, password: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);