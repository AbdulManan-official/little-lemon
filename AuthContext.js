import { createContext } from 'react';

export const AuthContext = createContext({
  complete: async () => {},
  logout: async () => {},
});
