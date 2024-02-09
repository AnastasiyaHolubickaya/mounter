import { memo } from 'react';
import { useTranslation } from 'react-i18next';
//*Styles
//import styles from './Home.module.css';
//*Components
import Feature from '../../components/Feature/Feature';
import Gallery from '../../components/Gallery/Gallery';
import Team from '../../components/Team/Team';
import Slider from '../../components/Slider/Slider';
import Banner from '../../components/Banner/Banner';

export type itemPropsType = {
  text: string;
  autor: string;
  position: string;
};

const Home = () => {
  const { t } = useTranslation();

  const comments: itemPropsType[] = t('comments', {
    returnObjects: true,
  });

  return (
    <>
      <Banner />
      <Feature />
      <Gallery />
      <Team />
      <Slider comments={comments} />
    </>
  );
};

export default memo(Home);
