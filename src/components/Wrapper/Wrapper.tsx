import { ReactNode, memo } from 'react';
// * Styles
import styles from './Wrapper.module.css';

type propsType = {
  children: ReactNode;
};

const Wrapper = ({ children }: propsType) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default memo(Wrapper);
