import { memo } from 'react';
import cn from 'classnames';
// * Styles
import styles from './GalleryItem.module.css';
//*Components
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';

type ItemPropsType = {
  src: string;
  title: string;
  subTitle?: string;
  id?: number;
};

const GalleryItem = ({ src, title, subTitle, id }: ItemPropsType) => {
  return (
    <AnimatedComponent>
      <div
        className={cn([
          id === 2 || id === 3 ? styles.column_group : null,
          styles.item,
        ])}
      >
        <img className={styles.image} src={src} loading="lazy" alt={title} />
        <div className={styles.hidden}>
          <span>{title}</span>
          <span>{subTitle}</span>
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default memo(GalleryItem);
