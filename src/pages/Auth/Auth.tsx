import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//*Styles
import styles from './Auth.module.css';
//*Components
import Wrapper from '../../components/Wrapper/Wrapper';
import Banner from '../../components/Banner/Banner';
import FormLogin from '../../components/FormLogin/FormLogin';

const Auth = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <Banner />
      <Wrapper>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t('autorisation')}</h1>
          <FormLogin onSubmitSuccess={onSubmitSuccess} />
        </div>
      </Wrapper>
    </>
  );
};

export default Auth;
