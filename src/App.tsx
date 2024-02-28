import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import i18n from './i18n';
//*Styles
import styles from './App.module.css';
//*Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import ButtonUp from './components/ButtonUp/ButtonUp';
import AuthContext from './authContext';
import useScrollAndResize from './hooks/useScrollResize';

function App() {
  const [appState, setAppState] = useState({
    isScrollOn: false,
    isMobile: window.innerWidth < 767,
    isAuthenticated: false,
  });

  const { handleScroll, handleResize } = useScrollAndResize(setAppState);

  useEffect(() => {
    handleScroll();
    handleResize();
  }, [handleResize, handleScroll]);

  //* Context for passing down the component tree
  const authContextValue = {
    appState,
    setAppState,
  };

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AuthContext.Provider value={authContextValue}>
          <Header />
          <LanguageSwitcher />
          <div className={styles.content}>
            <Outlet />
          </div>
          <Footer />
          <ButtonUp />
        </AuthContext.Provider>
      </I18nextProvider>
    </>
  );
}

export default App;
