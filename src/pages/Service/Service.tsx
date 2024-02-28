import { memo, useCallback } from 'react';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
//*Styles
import styles from './Service.module.css';
//*Components
import Wrapper from '../../components/Wrapper/Wrapper';
import Title from '../../components/Title/Title';
import Banner from '../../components/Banner/Banner';
import Accordeon from '../../components/Accordeon/Accordeon';
import Picture from '../../components/Picture/Picture';

//* Define prop types for the accordion items
type AccordeonListPropsType = {
  title: string;
  content: string;
};

//* Define prop types for the service list items
type ServiceListPropsType = {
  icon: string;
  title: string;
  text: string;
};

const Service = () => {
  //* Use translation hook for language localization
  const { t } = useTranslation();

  //* Fetch accordion list and service list from translations
  const accordeonList: AccordeonListPropsType[] = t('accordeon', {
    returnObjects: true,
  });

  const servicesList: ServiceListPropsType[] = t('servicesList', {
    returnObjects: true,
  });

  return (
    <>
      <Banner />
      <Wrapper>
        <section>
          <Element name="scroll_section" />
          <Title title={t('serviceTitle')} subtitle={t('subTitle')} />
          <div className={styles.items}>
            {servicesList.map((item, index) => (
              <Item
                key={'image item -' + item + index}
                icon={item.icon}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </section>
        <section>
          <Title title={t('faqTitle')} subtitle={t('subTitle')} />
          <div className={styles.faq}>
            <div className={styles.images}>
              <Picture src="/img/faq.jpg" />
            </div>
            <Accordeon items={accordeonList} baseStyle={true} />
          </div>
        </section>
      </Wrapper>
    </>
  );
};

//* Memoized Item component to prevent unnecessary renders
const Item = memo(({ icon, title, text }: ServiceListPropsType) => {
  //* Function to parse SVG string and render it as an image
  const parseSVG = useCallback((svgString: string) => {
    const encoded = encodeURIComponent(svgString);

    return <img src={`data:image/svg+xml,${encoded}`} alt="icon" />;
  }, []);

  return (
    <div className={styles.item}>
      <div className={styles.item_icon}>
        <div className={styles.svg}>{parseSVG(icon)}</div>
        <h4 className={styles.title}>{title}</h4>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
});

export default memo(Service);
