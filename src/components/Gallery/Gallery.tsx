import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
// * Styles
import styles from './Gallery.module.css';
//*Components
import Title from '../Title/Title';
import Wrapper from '../Wrapper/Wrapper';
import Sorting from '../Sorting/Sorting';
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';
import GalleryItem from '../GalleryItem/GalleryItem';

type GalleryPropsType = {
  src: string;
  title: string;
  subTitle: string;
  id: number;
  category: string | null;
};

const Gallery = () => {
  //* State to keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  //* Translation hook
  const { t } = useTranslation();

  //* Fetching gallery images from translations
  const images: GalleryPropsType[] = t('imagesGallery', {
    returnObjects: true,
  });

  //* Filter images based on the selected category
  const filteredImages = selectedCategory
    ? images.filter((image) => image.category === selectedCategory)
    : images;

  //* Extracting unique categories from the images
  const categories: string[] = Array.from(
    new Set(images.map((image) => image.category || ''))
  );

  //* Handler for category selection
  const handleCategoryClick = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  return (
    <section>
      <Wrapper>
        <div className={styles.title}>
          <Title title={t('titleGallery')} subtitle={t('subTitle')} />
        </div>
        <AnimatedComponent>
          <Sorting categories={categories} onClick={handleCategoryClick} />
        </AnimatedComponent>

        <div className={styles.items}>
          {filteredImages.map((element, index) => (
            <GalleryItem
              key={'image item -' + element + index}
              id={index}
              src={element.src}
              title={element.title}
              subTitle={element.subTitle}
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default memo(Gallery);
