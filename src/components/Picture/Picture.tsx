import { memo } from 'react';
// * Styles
import styles from './Picture.module.css';

type PropsType = {
  src: string;
};

const Picture = ({ src }: PropsType) => {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt="logo" className={styles.image} />
    </div>
  );
};

export default memo(Picture);
