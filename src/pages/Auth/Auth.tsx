import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//*Styles
import styles from './Auth.module.css';
//*Components
import Wrapper from '../../components/Wrapper/Wrapper';
import Banner from '../../components/Banner/Banner';
import FormLogin from '../../components/FormLogin/FormLogin';

const Auth = () => {
  //* Use translation hook for language localization
  const { t } = useTranslation();

  const navigate = useNavigate();

  //* Function to execute on successful form submission
  const onSubmitSuccess = () => {
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <Banner />
      <Wrapper>
        <div className={styles.wrapper} id="scroll_section">
          <h1 className={styles.title}>{t('autorisationF')}</h1>
          <FormLogin onSubmitSuccess={onSubmitSuccess} />
        </div>
      </Wrapper>
    </>
  );
};

export default memo(Auth);
