// * Styles
import { useTranslation } from 'react-i18next';
import Title from '../Title/Title';
import Wrapper from '../Wrapper/Wrapper';
import styles from './Feature.module.css';

//ype propsType = {};

const Feature = () => {
  const { t } = useTranslation();

  return (
    <section>
      <Wrapper>
      <div className={styles.title}>
        <Title title={t('titleFeature')} subtitle={t('subTitle')} />
      </div>
    </Wrapper>
    </section>
    
  );
};

export default Feature;
