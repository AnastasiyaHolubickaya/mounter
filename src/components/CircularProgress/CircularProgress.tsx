import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

type PropsType = {
  percent: number;
  scrollProgress: number;
};

const CircularProgress = ({ percent, scrollProgress }: PropsType) => {
  const progressAnimation = useSpring({
    dashOffset: ((100 - percent) / 100) * 314,
    config: { duration: 1000 },
  });

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#ddd"
        strokeWidth="8"
      />
      <animated.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#3498db"
        strokeWidth="8"
        strokeDasharray="314"
        style={{
          strokeDashoffset: progressAnimation.dashOffset,
        }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="16">
        {`${scrollProgress}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;
