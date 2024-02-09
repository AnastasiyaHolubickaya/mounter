import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
//*Const
import { LOCALS } from '../../i18n/constants.ts';
//*Styles
import styles from './LanguageSwitcher.module.css';
//*Components
import Wrapper from '../Wrapper/Wrapper.tsx';

//Types
type propsType = {
  isScrollOn: boolean;
  isMobile: boolean;
};

const LanguageSwitcher = ({ isScrollOn, isMobile }: propsType) => {
  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(LOCALS.EN);

  useEffect(() => {
    const changeLanguage = async () => {
      if (selectedLanguage === LOCALS.UK) {
        try {
          const ukModule = await import('../../i18n/translations/uk.json');
          i18n.addResourceBundle(
            selectedLanguage,
            'translation',
            ukModule.default,
            true,
            true
          );
          i18n.changeLanguage(selectedLanguage);
        } catch (error) {
          console.error('Failed to load the UK language module', error);
        }
      } else {
        i18n.changeLanguage(selectedLanguage);
      }
    };

    changeLanguage();
  }, [i18n, selectedLanguage]);

  return (
    <div
      className={cn([
        styles.switcher_panel,
        (isScrollOn || isMobile) && styles.fixed,
      ])}
    >
      <Wrapper>
        <div className={styles.buttons}>
          <button
            onClick={() => setSelectedLanguage(LOCALS.EN)}
            disabled={i18n.language === LOCALS.EN}
            className={cn([styles.button, styles.button_en])}
          ></button>
          <button
            onClick={() => setSelectedLanguage(LOCALS.UK)}
            disabled={i18n.language === LOCALS.UK}
            className={cn([styles.button, styles.button_uk])}
          ></button>
        </div>
      </Wrapper>
    </div>
  );
};

export default memo(LanguageSwitcher);
