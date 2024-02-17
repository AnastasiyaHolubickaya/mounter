import { memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
//*Styles
import styles from './Banner.module.css';
//*Components
import Button from '../Button/Button';
import AnimatedBannerSubTitle from '../AnimatedBannerSubTitle/AnimatedBannerSubTitle';
import AnimatedBannerImage from '../AnimatedBannerImage/AnimatedBannerImage';
//*Enum
import { AnimationName } from '../../types/animationTypes';

type dataType = {
  imageData?: { src: string; animationName: AnimationName; name: string }[];
};

const Banner = ({ imageData = [] }: dataType) => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const getPage = useCallback((pathname: string) => {
    const pageTitles: Record<string, string> = {
      '/': 'homeTitle',
      '/about': 'aboutTitle',
      '/gallery': 'galleryTitle',
      '/service': 'serviceTitle',
      '/contact': 'contactTitle',
      '/auth': 'authTitle',
      '/registration': 'RegTitle'
    };

    return pageTitles[pathname] || '';
  }, []);

  return (
    <div
      className={cn([
        styles.wrapper,
        pathname === '/' ? styles.bg_basik : styles.bg_default,
      ])}
    >
      {imageData.length > 0 && (
        <>
          <div className={styles.animation_images}>
            {imageData.map((item, itemId) => (
              <div key={`${item.name}-${itemId}`} className={styles[item.name]}>
                <AnimatedBannerImage
                  src={item.src}
                  animationName={item.animationName}
                ></AnimatedBannerImage>
              </div>
            ))}
          </div>
          <div className={styles.paper}>
            <img className={styles.paper_img} src="/paper_banner.png" />
            <div className={styles.scretch}>
              <img src="/scretch.png" />
            </div>
          </div>
        </>
      )}

      <div className={styles.text}>
        <h1
          className={cn([
            styles.title,
            pathname === '/' ? styles.title_basik : styles.title_default,
          ])}
        >
          {t(getPage(pathname))}
        </h1>
        {pathname === '/' && (
          <>
            <AnimatedBannerSubTitle />
            <Button type="button" value={t('buttonValue')} />
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Banner);
