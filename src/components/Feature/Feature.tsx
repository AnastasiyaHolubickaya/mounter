import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';
//*Components
import Title from '../Title/Title';
import Wrapper from '../Wrapper/Wrapper';
import Accordeon from '../Accordeon/Accordeon';
import Picture from '../Picture/Picture';
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';
// * Styles
import styles from './Feature.module.css';

export type itemsPropsType = {
  title: string;
  content: string;
};

const Feature = () => {
  //* Initialize translation hook
  const { t } = useTranslation();

  //* Retrieve accordion items from translation
  const accordeonList: itemsPropsType[] = t('accordeon', {
    returnObjects: true,
  });

  return (
    <Element name="scroll_section">
      <section>
        <Wrapper>
          <div className={styles.title}>
            <Title title={t('titleFeature')} subtitle={t('subTitle')} />
          </div>
          <div className={styles.items}>
            <AnimatedComponent>
              <div className={styles.accordeon}>
                <Accordeon items={accordeonList} baseStyle={false} />
              </div>
            </AnimatedComponent>
            <div className={styles.picture}>
              <AnimatedComponent>
                <Picture src="/monitors.png" />
              </AnimatedComponent>
            </div>
          </div>
        </Wrapper>
      </section>
    </Element>
  );
};

export default memo(Feature);
