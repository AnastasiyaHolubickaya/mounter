import { memo } from 'react';
import styled from 'styled-components';
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
import { AnimationName } from './animationTypes';

type propsType = {
  src: string;
  animationName: AnimationName;
};

const Image = styled.img<{ animationName: AnimationName }>`
  position: absolute;
  animation-duration: ${({ animationName }) =>
    animationName === AnimationName.FlipInY ||
    animationName === AnimationName.bounceInUp
      ? '8s'
      : animationName === AnimationName.BounceInDown
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
    animationName === AnimationName.FlipInY
      ? flipInY
      : animationName === AnimationName.BounceInDown
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
  return <Image src={src} animationName={animationName}></Image>;
};

export default memo(AnimatedBannerImage);
