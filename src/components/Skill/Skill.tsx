import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';
//*Styles
import styles from './Skill.module.css';
//*Components
import Title from '../Title/Title';
import CircularProgress from '../CircularProgress/CircularProgress';

//* Define types for data and item props
type DataPropsType = {
  name: string;
  text: string;
};

type ItemPropsType = {
  name: string;
  text: string;
  id: number;
};

const Skill = () => {
  const { t } = useTranslation();
  //* Fetch skills data from translations
  const skills: DataPropsType[] = t('skills', { returnObjects: true });

  return (
    <Element name="scroll_skill">
      <section>
        <Title title={t('titleSkill')} subtitle={t('subTitle')} />
        <div className={styles.items}>
          {skills.map((element, elIndex) => (
            <Item
              key={`list-item-${element.text}-${elIndex}`}
              text={element.text}
              name={element.name}
              id={elIndex}
            />
          ))}
        </div>
      </section>
    </Element>
  );
};

const Item = memo(({ text, name, id }: ItemPropsType) => {
  //* Use Intersection Observer to determine if the component is in view
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <div
        className={styles.item}
        id="item"
        ref={ref}
        key={`list-item-${id}-${text}`}
      >
        <div className={styles.progress}>
          {inView && <CircularProgress percent={85} id={id} />}
        </div>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </>
  );
});

export default memo(Skill);
