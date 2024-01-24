import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import { memo } from 'react';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src="/mounter.png" />
    </Link>
  );
};

export default memo(Logo);
