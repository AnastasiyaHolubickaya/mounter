import { memo, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import cn from 'classnames';
//*Styles
import styles from './Slider.module.css';
//*Components
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';
//*Icons
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
//*Types
import { itemPropsType } from '../../pages/Home/Home';

export type commentsPropsType = {
  comments: itemPropsType[];
};

const Slider = ({ comments }: commentsPropsType) => {
  const [index, setIndex] = useState(0);

  const props = useSpring({
    transform: `translateX(-${index * (100 / comments.length)}%)`,
    config: config.slow,
  });

  const handlePrev = () => {
    index > 0 && setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    index < comments.length - 1 && setIndex((prev) => prev + 1);
  };

  return (
    <div className={styles.slider}>
      <AnimatedComponent>
        <div className={styles.wrapper}>
          <animated.div
            style={{
              display: 'flex',
              width: `${comments.length * 100}%`,
              height: '100%',
              overflow: 'hidden',
              willChange: 'transform',
              ...props,
            }}
          >
            {comments.map((item, itemIndex) => (
              <div className={styles.item} key={itemIndex}>
                <p className={styles.text}>{item.text}</p>
                <span className={styles.autor}>{item.autor}</span>
                <span className={styles.position}>{item.position}</span>
              </div>
            ))}
          </animated.div>
          <button
            onClick={handlePrev}
            className={cn([styles.button, styles.prev])}
          >
            <FaArrowLeftLong />
          </button>
          <button
            onClick={handleNext}
            className={cn([styles.button, styles.next])}
          >
            <FaArrowRightLong />
          </button>
        </div>
      </AnimatedComponent>
    </div>
  );
};

export default memo(Slider);
