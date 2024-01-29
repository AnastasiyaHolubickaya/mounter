import React from 'react';
import styles from './Button.module.css';

type propsType = {
  value: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<propsType> = ({ value, onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      <span className={styles.text}>{value}</span>
    </button>
  );
};
export default Button;
