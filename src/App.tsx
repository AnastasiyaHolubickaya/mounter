import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <section className={styles.content}>
        <Outlet />
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
