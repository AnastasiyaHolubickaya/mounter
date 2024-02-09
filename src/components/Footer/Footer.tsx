import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//*Icons
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';
//*Styles
import styles from './Footer.module.css';
//*Components
import Logo from '../Logo/Logo';
import Wrapper from '../Wrapper/Wrapper';
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';

type LinksPropsType = {
  path: string;
  text: string;
};

type PreviewPropsType = {
  path: string;
  src: string;
  alt: string;
  title: string;
};

const Footer = () => {
  const { t } = useTranslation();

  const links: LinksPropsType[] = t('importantLinks', {
    returnObjects: true,
  });

  const footerTitles: string[] = t('footerTitles', {
    returnObjects: true,
  });

  const preview: PreviewPropsType[] = t('preview', {
    returnObjects: true,
  });

  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <div className={styles.items}>
          <AnimatedComponent>
            <div className={styles.item}>
              <Logo />
              <span>{t('slogan')}</span>
              <span>
                <span className={styles.span}>$347856</span>
                <span>{t('earn')}</span>
              </span>
              <span>
                <span className={styles.span}>4923</span>
                <span>{t('project')}</span>
              </span>
            </div>
          </AnimatedComponent>
          <AnimatedComponent>
            <div className={styles.item}>
              <span className={styles.title}>{footerTitles[0]}</span>
              <div className={styles.links}>
                {links.map((item, index) => (
                  <Link
                    to={item.path}
                    key={'list item -' + item.text + index}
                    className={styles.link}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedComponent>
          <AnimatedComponent>
            <div className={styles.item}>
              <span className={styles.title}>{footerTitles[1]}</span>
              <div className={styles.preview}>
                {preview.map((item, index) => (
                  <Link to={item.path} key={index} className={styles.img_link}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      title={item.title}
                      loading="lazy"
                      className={styles.image}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedComponent>
          <AnimatedComponent>
            <div className={styles.item}>
              <span className={styles.title}>{footerTitles[2]}</span>
              <span>{t('slogan')}</span>
              <div className={styles.icons}>
                <div className={styles.socialIcon}>
                  <FaPinterest className={styles.icon} />
                </div>
                <div className={styles.socialIcon}>
                  <FaTwitter className={styles.icon} />
                </div>
                <div className={styles.socialIcon}>
                  <FaInstagram className={styles.icon} />
                </div>
                <div className={styles.socialIcon}>
                  <FaFacebook className={styles.icon} />
                </div>
              </div>
            </div>
          </AnimatedComponent>
        </div>
        <div className={styles.underground}>
          <AnimatedComponent>
            <span className={styles.info}>{t('underground')}</span>
          </AnimatedComponent>
        </div>
      </Wrapper>
    </div>
  );
};

export default memo(Footer);
