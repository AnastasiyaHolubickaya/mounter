import { memo } from 'react';
import { useTranslation } from 'react-i18next';
// * Styles
import styles from './Team.module.css';
//*Components
import Wrapper from '../Wrapper/Wrapper';
import Title from '../Title/Title';
import ItemTeam from '../ItemTeam/ItemTeam';

type propsType = {
  src: string;
  title: string;
  subTitle: string;
};

const Team = () => {
  const { t } = useTranslation();

  //* Fetch skills data from translations
  const photo: propsType[] = t('teamGallery', {
    returnObjects: true,
  });

  return (
    <Wrapper>
      <section>
        <Title title={t('titleTeam')} subtitle={t('subTitle')} />
        <div className={styles.items}>
          {photo.map((element, index) => (
            <ItemTeam
              key={'image item -' + element + index}
              src={element.src}
              title={element.title}
              subTitle={element.subTitle}
            />
          ))}
        </div>
      </section>
    </Wrapper>
  );
};

export default memo(Team);
