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
  //* State to determine if scrolling is active
  const [isScrollOn, setisScrollOn] = useState(false);

  //* State to determine if a mobile device is used
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  //* State to determine if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //* Scroll event handler function
  const handleScroll = useCallback(() => {
    setisScrollOn(window.scrollY > 100);
  }, [setisScrollOn]);

  //* Resize event handler function
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 767);
  }, [setIsMobile]);

  //* Set up event listeners on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    //* Remove event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  //* Authentication context for passing down the component tree
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
