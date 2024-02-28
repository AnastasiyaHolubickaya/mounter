import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// * Styles
import styles from './Registration.module.css';
//*Components
import Banner from '../../components/Banner/Banner';
import Wrapper from '../../components/Wrapper/Wrapper';
import FormRegistration from '../../components/FormRegistration/FormRegistration';

const Registration = () => {
  //* Use translation hook for language localization
  const { t } = useTranslation();

  //* Use navigate hook for programmatic navigation
  const navigate = useNavigate();

  //* Wrap the onSubmitSuccess function in useCallback to memoize it
  const onSubmitSuccess = useCallback(() => {
    setTimeout(() => {
      navigate('/auth');
    }, 1000);
  }, [navigate]);

  return (
    <>
      <Banner />
      <Wrapper>
        <div className={styles.wrapper}>
          <h1 className={styles.title} id="scroll_section">
            {t('registrationF')}
          </h1>
          <FormRegistration onSubmitSuccess={onSubmitSuccess} />
        </div>
      </Wrapper>
    </>
  );
};

export default memo(Registration);
