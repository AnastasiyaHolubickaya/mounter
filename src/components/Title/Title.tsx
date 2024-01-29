// * Styles
import styles from './Title.module.css';

type propsType = {
  title: string;
  subtitle: string;
};

const Title = ({ title, subtitle }: propsType) => {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.subtitle}>{subtitle}</span>
    </>
  );
};

export default Title;
