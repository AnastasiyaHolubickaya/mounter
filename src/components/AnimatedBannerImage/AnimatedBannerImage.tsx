import { memo } from 'react';
//*Styles
import styled from 'styled-components';
//*Animations
import {
  flipInY,
  bounceInDown,
  bounceInUp,
  bounceUp,
  zoomIn,
  rotateIn,
  fadeInLeft,
  fadeInRight,
} from './animations';
import { AnimationName } from '../../types/animationTypes';

//* Define the prop types for the component
type propsType = {
  src: string;
  animationName: AnimationName;
};

//* Styled component for the animated image
const Image = styled.img<{ animationName: AnimationName }>`
  position: absolute;
  animation-duration: ${({ animationName }) =>
    animationName === AnimationName.flipInY ||
    animationName === AnimationName.bounceInUp
      ? '8s'
      : animationName === AnimationName.bounceInDown
      ? '6s'
      : animationName === AnimationName.bounceUp
      ? '7s'
      : animationName === AnimationName.zoomIn
      ? '5s'
      : animationName === AnimationName.rotateIn
      ? '2s'
      : animationName === AnimationName.fadeInLeft
      ? '4s'
      : animationName === AnimationName.fadeInRight
      ? '3s'
      : '0s'};
  animation-delay: 0.8s;
  animation-fill-mode: both;
  animation-name: ${({ animationName }) =>
    animationName === AnimationName.flipInY
      ? flipInY
      : animationName === AnimationName.bounceInDown
      ? bounceInDown
      : animationName === AnimationName.bounceInUp
      ? bounceInUp
      : animationName === AnimationName.bounceUp
      ? bounceUp
      : animationName === AnimationName.zoomIn
      ? zoomIn
      : animationName === AnimationName.rotateIn
      ? rotateIn
      : animationName === AnimationName.fadeInLeft
      ? fadeInLeft
      : animationName === AnimationName.fadeInRight
      ? fadeInRight
      : 'none'};
`;

const AnimatedBannerImage = ({ src, animationName }: propsType) => {
  return <Image src={src} animationName={animationName} alt="picture"></Image>;
};

export default memo(AnimatedBannerImage);
