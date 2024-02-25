import { memo } from 'react';
//*Styles
import styles from './ItemTeam.module.css';
//*Components
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';

type propsType = {
  src: string;
  title: string;
  subTitle: string;
};

const ItemTeam = ({ src, title, subTitle }: propsType) => {
  return (
    <AnimatedComponent>
      <div className={styles.item}>
        <img className={styles.image} src={src} loading="lazy" alt={title} />
        <div className={styles.hidden}>
          <span>{title}</span>
          <span>{subTitle}</span>
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default memo(ItemTeam);
