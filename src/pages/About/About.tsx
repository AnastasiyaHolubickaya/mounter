import React from 'react';
import styles from './About.module.css';

interface IComponentProps {}
  

const About:React.FC<IComponentProps> = () => {
  return (
    <>
      <h1 className={styles.wrapper}>About page </h1>
    </>
  );
};

export default About;
