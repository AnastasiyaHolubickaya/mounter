import { memo } from 'react';
//*Styles
import styles from './ItemTeam.module.css';

type propsType = {
  src: string;
  title: string;
  subTitle: string;
};

const ItemTeam = ({ src, title, subTitle }: propsType) => {
  return (
    <div className={styles.item}>
      <img className={styles.image} src={src} loading="lazy" alt={title} />
      <div className={styles.hidden}>
        <span>{title}</span>
        <span>{subTitle}</span>
      </div>
    </div>
  );
};

export default memo(ItemTeam);
