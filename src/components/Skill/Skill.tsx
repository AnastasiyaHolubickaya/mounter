import styles from './Skill.module.css';
//*Components

import { useTranslation } from 'react-i18next';
import Title from '../Title/Title';
import CircularProgress from '../CircularProgress/CircularProgress';
import { useEffect, useState } from 'react';

type DataPropsType = {
  name: string;
  text: string;
};

type ItemPropsType = {
  name: string;
  text: string;
  scrollProgress: number;
};

const Skill = () => {
  const { t } = useTranslation();
  const skills: DataPropsType[] = t('skills', { returnObjects: true });

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    const sectionPosition = document.getElementById('item').offsetTop;

    const newProgress = Math.min(
      (currentPosition / sectionPosition) * 100,
      100
    );

    setScrollProgress(newProgress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Title title={t('titleSkill')} subtitle={t('subTitle')} />
      <div className={styles.items}>
        {skills.map((element, elIndex) => (
          <Item
            key={`list-item-${element.text}-${elIndex}`}
            text={element.text}
            name={element.name}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </>
  );
};

const Item = ({ text, name, scrollProgress }: ItemPropsType) => {
  return (
    <>
      <div className={styles.item} id="item">
        <div className={styles.progress}>
          <CircularProgress percent={85} scrollProgress={scrollProgress} />
        </div>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </>
  );
};

export default Skill;
