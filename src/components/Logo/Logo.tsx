import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src="/mounter.png" />
    </Link>
  );
};

export default Logo;
