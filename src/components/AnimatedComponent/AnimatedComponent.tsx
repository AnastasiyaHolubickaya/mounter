import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
///Styles
import baseStyles from '../../styles/base.module.css';

type propsType = {
  children: ReactNode;
};

const fadeIn = {
  opacity: 1,
  transform: 'translateY(0) scale(1)',
};

const fadeOut = {
  opacity: 0,
  transform: 'translateY(20px) scale(0)',
};

const AnimatedComponent = ({ children }: propsType) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const props = useSpring({
    ...(inView ? fadeIn : fadeOut),
    config: { tension: 600, friction: 50 },
  });

  return (
    <animated.div ref={ref} style={props} className={baseStyles.animated}>
      {children}
    </animated.div>
  );
};

export default AnimatedComponent;
