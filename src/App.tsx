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

function App() {
  const [isScrollOn, setisScrollOn] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

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

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Header isScrollOn={isScrollOn} isMobile={isMobile} />
        <LanguageSwitcher isScrollOn={isScrollOn} isMobile={isMobile} />
        <div className={styles.content}>
          <Outlet />
        </div>
        <Footer />
      </I18nextProvider>
    </>
  );
}

export default App;
