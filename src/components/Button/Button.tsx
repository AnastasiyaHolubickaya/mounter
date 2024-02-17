import React, { memo } from 'react';
//*Styles
import styles from './Button.module.css';

type propsType = {
  value: string;
  onClick?: () => void;
  disabled?: boolean;
  type: 'button' | 'reset' | 'submit';
};

const Button: React.FC<propsType> = ({ value, onClick, disabled, type }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className={styles.text}>{value}</span>
    </button>
  );
};

export default memo(Button);
