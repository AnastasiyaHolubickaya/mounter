import { memo } from 'react';
import { Link } from 'react-router-dom';
//*Styles
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src="/mounter.png" />
    </Link>
  );
};

export default memo(Logo);
