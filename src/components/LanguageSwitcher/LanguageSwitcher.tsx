import { useState, useEffect } from 'react';
import { LOCALS } from '../../i18n/constants.ts';
import { useTranslation } from 'react-i18next';
//*Styles
import styles from './LanguageSwitcher.module.css';
//*Components
import Wrapper from '../Wrapper/Wrapper.tsx';
import Button from '../Button/Button.tsx';

const LanguageSwitcher = () => {
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
    <div className={styles.switcher_panel}>
      <Wrapper>
        <div className={styles.buttons}>
          <Button
            onClick={() => setSelectedLanguage(LOCALS.EN)}
            disabled={i18n.language === LOCALS.EN}
            value="en"
          />
          <Button
            onClick={() => setSelectedLanguage(LOCALS.UK)}
            disabled={i18n.language === LOCALS.UK}
            value="uk"
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default LanguageSwitcher;
