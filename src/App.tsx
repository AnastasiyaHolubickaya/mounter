import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Header />
        <LanguageSwitcher />
        <section className={styles.content}>
          <Outlet />
        </section>
        <div className={styles.buttons}></div>
        <Footer />
      </I18nextProvider>
    </>
  );
}

export default App;
