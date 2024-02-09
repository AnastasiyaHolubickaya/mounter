import { keyframes } from 'styled-components';

export const bounceInDown = keyframes`
0% {
  opacity: 0;
  transform: translate(-50%, -50%) rotate(-5deg) translateY(-3000px);
}

60% {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(-5deg) translateY(25px);
}

75%, 90% {
  transform: translate(-50%, -50%) rotate(-5deg) translateY(-10px);
}

100% {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(-5deg);
}
`;

export const flipInY = keyframes`
  0% {
    opacity: 0;
    transform: perspective(400px)  translate(-50%, -50%) rotate(-5deg);
  }

  100% {
    opacity: 1;
    transform: perspective(400px)  translate(-50%, -50%) rotate(-5deg); 
  }
`;

export const bounceInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 3000px, 0) ;
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  75% {
    transform: translate3d(0, 10px, 0)  ;
  }

  90% {
    transform: translate3d(0, -5px, 0) ;
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const bounceUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 3000px, 0) ;
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  75% {
    transform: translate3d(0, 10px, 0)  ;
  }

  90% {
    transform: translate3d(0, -5px, 0) ;
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const zoomIn = keyframes`
  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
`;

export const rotateIn = keyframes`
  0% {
    opacity: 0;
    transform: rotate3d(0, 0, 1, -200deg);
  }

  100% {
    transform: none;
    opacity: 1;
  }
`;

export const fadeInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
`;

export const fadeInRight = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
`;
