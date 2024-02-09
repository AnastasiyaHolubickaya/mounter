import { memo } from 'react';
// * Styles
import styles from './Title.module.css';
//*Components
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';

type propsType = {
  title: string;
  subtitle: string;
};

const Title = ({ title, subtitle }: propsType) => {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <AnimatedComponent>
        <span className={styles.subtitle}>{subtitle}</span>
      </AnimatedComponent>
    </>
  );
};

export default memo(Title);
