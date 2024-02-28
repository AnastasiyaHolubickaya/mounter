import { useState, useEffect, memo, useCallback } from 'react';
import { useSpring, animated, config } from 'react-spring';
//*Icons
import { FaArrowUp } from 'react-icons/fa';
//*Styles
import styles from './ButtonUp.module.css';

const ButtonUp = () => {
  //* State to track button visibility
  const [isVisible, setIsVisible] = useState(false);

  //* Scroll event handler to toggle button visibility
  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > 200);
  }, []);

  //* Add and remove scroll event listener on mount and unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  //* Animated spring properties for fade-in effect
  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? 0 : 20}px)`,
    config: config.wobbly,
  });

  //* Scroll to the top of the page when the button is clicked
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
