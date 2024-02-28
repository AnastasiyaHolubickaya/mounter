import { createContext, Dispatch, SetStateAction } from 'react';

type AuthContextProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isScrollOn: boolean;
  isMobile: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isScrollOn: true,
  isMobile: true,
});

export default AuthContext;
