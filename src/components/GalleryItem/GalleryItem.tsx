import { memo } from 'react';
import cn from 'classnames';
// * Styles
import styles from './GalleryItem.module.css';

type ItemPropsType = {
  src: string;
  title: string;
  subTitle?: string;
  id?: number;
};

const GalleryItem = ({ src, title, subTitle, id }: ItemPropsType) => {
  return (
    <div
      className={cn(
        { [styles.column_group]: id === 2 || id === 3 },
        styles.item
      )}
    >
      <img className={styles.image} src={src} loading="lazy" alt={title} />
      <div className={styles.hidden}>
        <span>{title}</span>
        <span>{subTitle}</span>
      </div>
    </div>
  );
};

export default memo(GalleryItem);
