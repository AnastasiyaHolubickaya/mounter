import React from 'react';
import styles from './Gallery.module.css'

interface IComponentProps {}

const Gallery:React.FC<IComponentProps> = () => {
 

  return (
    <>
    <h1 className={styles.wrapper}>Gallery page</h1>
     
    </>
  )
}

export default Gallery;