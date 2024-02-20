//import styles from './Gallery.module.css'
import { memo } from 'react';
import Banner from '../../components/Banner/Banner';

const Gallery = () => {
  return (
    <>
      <Banner />
      <div id="scroll_section"></div>
    </>
  );
};

export default memo(Gallery);
