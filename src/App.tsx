import { useCallback, useEffect, useState } from 'react';
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

function App() {
  const [isScrollOn, setisScrollOn] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleScroll = useCallback(() => {
    setisScrollOn(window.scrollY > 100);
  }, [setisScrollOn]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 767);
  }, [setIsMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    isScrollOn,
    isMobile,
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
