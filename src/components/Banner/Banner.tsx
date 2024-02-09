import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
//*Styles
import styles from './Banner.module.css';
//*Components
import Button from '../Button/Button';
import AnimatedBannerSubTitle from '../AnimatedBannerSubTitle/AnimatedBannerSubTitle';
import AnimatedBannerImage from '../AnimatedBannerImage/AnimatedBannerImage';
//*Enum
import { AnimationName } from '../AnimatedBannerImage/animationTypes';

const flipInY: AnimationName = AnimationName.FlipInY;
const bounceInDown: AnimationName = AnimationName.BounceInDown;
const bounceInUp: AnimationName = AnimationName.bounceInUp;
const bounceUp: AnimationName = AnimationName.bounceUp;
const zoomIn: AnimationName = AnimationName.zoomIn;
const rotateIn: AnimationName = AnimationName.rotateIn;
const fadeInLeft: AnimationName = AnimationName.fadeInLeft;
const fadeInRight: AnimationName = AnimationName.fadeInRight;

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper_banner}>
      <div className={styles.animation_images}>
        <div className={styles.pencup}>
          <AnimatedBannerImage
            src="/public/pencup.png"
            animationName={rotateIn}
          ></AnimatedBannerImage>
        </div>
        <div className={styles.flower1}>
          <AnimatedBannerImage
            src="/public/flower-1.png"
            animationName={fadeInRight}
          ></AnimatedBannerImage>
        </div>
        <div className={styles.flower2}>
          <AnimatedBannerImage
            src="/public/flower-2.png"
            animationName={fadeInLeft}
          ></AnimatedBannerImage>
        </div>
      </div>
      <div className={styles.paper}>
        <div className={styles.scretch}>
          <img src="/public/scretch.png" />
        </div>
        <div className={styles.pencile}>
          <AnimatedBannerImage
            src="/public/pencile.png"
            animationName={flipInY}
          ></AnimatedBannerImage>
        </div>

        <div className={styles.pen}>
          <AnimatedBannerImage
            src="/public/pen-1.png"
            animationName={bounceInDown}
          ></AnimatedBannerImage>
        </div>
        <div className={styles.marker}>
          <AnimatedBannerImage
            src="/public/marker.png"
            animationName={bounceInUp}
          ></AnimatedBannerImage>
        </div>
        <div className={styles.knife}>
          <AnimatedBannerImage
            src="/public/knife.png"
            animationName={bounceUp}
          ></AnimatedBannerImage>
        </div>
        <div className={styles.plant}>
          <AnimatedBannerImage
            src="/public/plant.png"
            animationName={zoomIn}
          ></AnimatedBannerImage>
        </div>
      </div>
      <div className={styles.text}>
        <h1 className={cn([styles.title, styles.adaptive_font_title])}>
          mounter
        </h1>
        <AnimatedBannerSubTitle />
        <Button value={t('buttonValue')} />
      </div>
    </div>
  );
};

export default memo(Banner);
