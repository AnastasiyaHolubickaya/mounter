import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { memo, useEffect } from 'react';

type PropsType = {
  percent: number;
  id: number;
};

const CircularProgress = ({ percent, id }: PropsType) => {
  //* Довжина кола
  const circumference = 80;

  //* Calculate offset
  const offset = ((100 - percent) * circumference * Math.PI) / 100;

  //* Intersection observer hook
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  //* Unique ID for each instance
  const uniqueId = `progress-${id}`;

  const [progressAnimation, setProgressAnimation] = useSpring(() => ({
    uniqueId: circumference * Math.PI,
    percent: 0,
    config: { duration: 1000 },
  }));

  //* Effect to start animation when component is in view
  useEffect(() => {
    if (inView) {
      setProgressAnimation({
        uniqueId: offset,
        percent: percent,
        config: { duration: 1000 },
      });
    }
  }, [inView, offset, percent, setProgressAnimation, uniqueId]);

  return (
    <animated.svg ref={ref} width="100" height="100" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#ddd"
        strokeWidth="2"
      />
      <animated.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#00bbd5"
        strokeWidth="2"
        strokeDasharray={circumference * Math.PI}
        style={{
          strokeDashoffset: progressAnimation.uniqueId,
        }}
      />

      <animated.text x="50%" y="50%" textAnchor="middle" dy=".3em">
        {inView && progressAnimation.percent.to((val) => `${Math.floor(val)}%`)}
      </animated.text>
    </animated.svg>
  );
};

export default memo(CircularProgress);
