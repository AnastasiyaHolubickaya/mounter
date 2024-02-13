import { useState, useEffect, memo } from 'react';
import { useSpring, animated, config } from 'react-spring';
//*Icons
import { FaArrowUp } from 'react-icons/fa';
//*Styles
import styles from './ButtonUp.module.css';

const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 200);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 20}px)`,
    config: config.wobbly,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <animated.button
      style={springProps}
      className={styles.button}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </animated.button>
  );
};

export default memo(ButtonUp);
