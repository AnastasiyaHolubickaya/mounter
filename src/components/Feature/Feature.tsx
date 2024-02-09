import { memo } from 'react';
import { useTranslation } from 'react-i18next';
//*Components
import Title from '../Title/Title';
import Wrapper from '../Wrapper/Wrapper';
import Accordeon from '../Accordeon/Accordeon';
import Picture from '../Picture/Picture';
// * Styles
import styles from './Feature.module.css';
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';

export type itemsPropsType = {
  title: string;
  content: string;
};

const Feature = () => {
  const { t } = useTranslation();

  const accordeonList: itemsPropsType[] = t('accordeon', {
    returnObjects: true,
  });

  const baseStyle: boolean = false;

  return (
    <section>
      <Wrapper>
        <div className={styles.title}>
          <Title title={t('titleFeature')} subtitle={t('subTitle')} />
        </div>
        <div className={styles.items}>
          <AnimatedComponent>
            <div className={styles.accordeon}>
              <Accordeon items={accordeonList} baseStyle={baseStyle} />
            </div>
          </AnimatedComponent>
          <div className={styles.picture}>
            <AnimatedComponent>
              <Picture />
            </AnimatedComponent>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default memo(Feature);
