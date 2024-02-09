import { memo } from 'react';
// * Styles
import styles from './Picture.module.css';

const Picture = () => {
  return (
    <div className={styles.wrapper}>
      <img src="/monitors.png" alt="logo" className={styles.image} />
    </div>
  );
};

export default memo(Picture);
