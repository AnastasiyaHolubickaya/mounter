import React, { memo } from 'react';
//*Styles
import styles from './PricingCard.module.css';

type PropsType = {
  price: number;
  plan: string;
  text: string;
};

const PricingCard = ({ price, plan, text }: PropsType) => {
  return (
    <div className={styles.item}>
      <div className={styles.bg_element}></div>
      <div className={styles.card}>
        <span className={styles.price}>
          {price}
          <span className={styles.dollar}>&#36;</span>
        </span>
        <span className={styles.title}>{plan}</span>
        <p className={styles.text}>
          {text.split('\n').map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default memo(PricingCard);
