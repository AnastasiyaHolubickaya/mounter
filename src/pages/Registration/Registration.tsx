import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// * Styles
import styles from './Registration.module.css';
//*Components
import Banner from '../../components/Banner/Banner';
import Wrapper from '../../components/Wrapper/Wrapper';
import FormRegistration from '../../components/FormRegistration/FormRegistration';

const Registration = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    setTimeout(() => {
      navigate('/auth');
    }, 1000);
  };

  return (
    <>
      <Banner />
      <Wrapper>
        <div className={styles.wrapper}>
          <h1 className={styles.title} id="scroll_section">
            {t('registration')}
          </h1>
          <FormRegistration onSubmitSuccess={onSubmitSuccess} />
        </div>
      </Wrapper>
    </>
  );
};

export default Registration;
