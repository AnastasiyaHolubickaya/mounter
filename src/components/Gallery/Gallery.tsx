import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
//*Components
import Title from '../Title/Title';
import Wrapper from '../Wrapper/Wrapper';
import Sorting from '../Sorting/Sorting';
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';
// * Styles
import styles from './Gallery.module.css';

type GalleryPropsType = {
  src: string;
  title: string;
  subTitle: string;
  id: number;
  category: string | null;
};

type ItemPropsType = {
  src: string;
  title: string;
  subTitle: string;
  id: number;
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useTranslation();

  const images: GalleryPropsType[] = t('imagesGallery', {
    returnObjects: true,
  });

  const filteredImages = selectedCategory
    ? images.filter((image) => image.category === selectedCategory)
    : images;

  const categories: string[] = Array.from(
    new Set(images.map((image) => image.category || ''))
  );

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <section>
      <Wrapper>
        <div className={styles.title}>
          <Title title={t('titleGallery')} subtitle={t('subTitle')} />
        </div>
        <AnimatedComponent>
          <Sorting categories={categories} onClick={handleCategoryClick} />
        </AnimatedComponent>
        <AnimatedComponent>
          <div className={styles.items}>
            {filteredImages.map((element, index) => (
              <Item
                key={'image item -' + element + index}
                id={index}
                src={element.src}
                title={element.title}
                subTitle={element.subTitle}
              />
            ))}
          </div>
        </AnimatedComponent>
      </Wrapper>
    </section>
  );
};

const Item = ({ src, title, subTitle, id }: ItemPropsType) => {
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

export default memo(Gallery);
