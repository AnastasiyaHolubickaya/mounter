import { memo } from 'react';
// * Styles
import styles from './Sorting.module.css';

type propsType = {
  categories: string[];
  onClick: (category: string | null) => void;
};

const Sorting = ({ categories, onClick }: propsType) => {
  return (
    <div className={styles.filter}>
      <div onClick={() => onClick(null)}>
        <span className={styles.text}>all</span>
      </div>
      {categories.map((str, index) => (
        <div key={'list item -' + str + index} onClick={() => onClick(str)}>
          <span className={styles.text}>{str}</span>
        </div>
      ))}
    </div>
  );
};

export default memo(Sorting);
