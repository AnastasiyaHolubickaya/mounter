//import styles from './About.module.css';
//*Components
import { useTranslation } from 'react-i18next';
import Banner from '../../components/Banner/Banner';
import Title from '../../components/Title/Title';
import AnimatedComponent from '../../components/AnimatedComponent/AnimatedComponent';
import Picture from '../../components/Picture/Picture';
import Button from '../../components/Button/Button';
import Skill from '../../components/Skill/Skill';
import Wrapper from '../../components/Wrapper/Wrapper';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner />
      <Wrapper>
        <div id="scroll_section"></div>
        <Title title={t('titleFeature')} subtitle={t('subTitle')} />
        <div>
          <div>
            <h3></h3>
            <p></p>
            <p></p>
            <Button type="button" value={t('buttonValue')} />
          </div>
          <AnimatedComponent>
            <Picture />
          </AnimatedComponent>
        </div>
        <Skill />
      </Wrapper>
    </>
  );
};

export default About;
