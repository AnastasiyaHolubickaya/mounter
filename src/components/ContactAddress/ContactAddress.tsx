import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
//*Styles
import styles from './ContactAddress.module.css';

const ContactAddress = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.items}>
      <div className={styles.item}>
        <Link to="#">
          <img src="/SVG/home.svg" className={styles.icon} />
        </Link>
        <address className={styles.text}>{t('mapMarker')}</address>
      </div>
      <div className={styles.item}>
        <Link to="mailto:info@example.com">
          <img src="/SVG/envelop.svg" className={styles.icon} />
        </Link>
        <Link className={styles.text} to="mailto:info@example.com">
          info@example.com
        </Link>
      </div>
      <div className={styles.item}>
        <Link to="tel:+1234567890">
          <img src="/SVG/phone-hang-up.svg" className={styles.icon} />
        </Link>
        <Link className={styles.text} to="tel:+1234567890">
          +1 (234) 567-890
        </Link>
      </div>
    </div>
  );
};

export default memo(ContactAddress);
