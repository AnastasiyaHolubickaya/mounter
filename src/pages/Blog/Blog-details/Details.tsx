import { memo } from 'react';
import styles from './Details.module.css';

const Details = () => {
  return (
    <>
      <h1 className={styles.wrapper}>Blog details page</h1>
    </>
  );
};

export default memo(Details);
