import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';
import { Link } from 'react-scroll';
//*Styles
import styles from './About.module.css';
//*Components
import Banner from '../../components/Banner/Banner';
import Title from '../../components/Title/Title';
import AnimatedComponent from '../../components/AnimatedComponent/AnimatedComponent';
import Picture from '../../components/Picture/Picture';
import Button from '../../components/Button/Button';
import Skill from '../../components/Skill/Skill';
import Wrapper from '../../components/Wrapper/Wrapper';
import Pricing from '../../components/Pricing/Pricing';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner />
      <Wrapper>
        <Element name="scroll_section">
          <section>
            <Title title={t('titleFeature')} subtitle={t('subTitle')} />
            <div className={styles.items}>
              <div className={styles.info}>
                <h3 className={styles.title}>{t('silence.title')}</h3>
                {t('silence.text')
                  .split('\n')
                  .map((line, lineIndex) => (
                    <p key={lineIndex} className={styles.text}>
                      {line}
                      <br />
                    </p>
                  ))}
                <Link
                  to="scroll_skill"
                  smooth={true}
                  duration={800}
                  offset={-50}
                  spy={true}
                >
                  <Button type="button" value={t('buttonValue')} />
                </Link>
              </div>
              <AnimatedComponent>
                <Picture src='"/monitors.png"' />
              </AnimatedComponent>
            </div>
          </section>
        </Element>
        <Skill />
        <Pricing />
      </Wrapper>
    </>
  );
};

export default memo(About);
