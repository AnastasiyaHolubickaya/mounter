import { memo } from 'react';
import Banner from '../../components/Banner/Banner';
//import styles from './Contact.module.css'

const Contact = () => {
  return (
    <>
      <Banner />
      <div id="scroll_section"></div>
    </>
  );
};

export default memo(Contact);
