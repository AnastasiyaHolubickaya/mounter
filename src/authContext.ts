import { createContext, Dispatch, SetStateAction } from 'react';

export type AuthContextProps = {
  appState: {
    isScrollOn: boolean;
    isMobile: boolean;
    isAuthenticated: boolean;
  };
  setAppState: Dispatch<
    SetStateAction<{
      isScrollOn: boolean;
      isMobile: boolean;
      isAuthenticated: boolean;
    }>
  >;
};

const AuthContext = createContext<AuthContextProps>({
  appState: {
    isScrollOn: false,
    isMobile: window.innerWidth < 767,
    isAuthenticated: false,
  },
  setAppState: () => {},
});

export default AuthContext;
