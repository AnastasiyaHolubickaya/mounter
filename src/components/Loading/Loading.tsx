import { memo } from 'react';
//*Styles
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <>
      <div className={styles.item}>
        <img src="/loading.gif" alt="Loading" />
      </div>
    </>
  );
};

export default memo(Loading);
