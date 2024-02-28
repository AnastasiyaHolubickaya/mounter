import { memo } from 'react';
import { useTranslation } from 'react-i18next';
//*Styles
import styles from './Contact.module.css';
//*Components
import Banner from '../../components/Banner/Banner';
import Map from '../../components/Map/Map';
import Title from '../../components/Title/Title';
import Wrapper from '../../components/Wrapper/Wrapper';
import ContactAddress from '../../components/ContactAddress/ContactAddress';

const Contact = () => {
  //* Use translation hook for language localization
  const { t } = useTranslation();

  return (
    <>
      <Banner />
      <section>
        <Wrapper>
          <Title title={t('titleContact')} subtitle={t('subTitle')} />
          <div className={styles.map_block} id="scroll_section">
            <Map />
          </div>
          <ContactAddress />
        </Wrapper>
      </section>
    </>
  );
};

export default memo(Contact);
