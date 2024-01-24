import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <section className={styles.content}>
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default App;
