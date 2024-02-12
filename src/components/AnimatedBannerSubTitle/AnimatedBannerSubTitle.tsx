import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';

const fadeOutIn = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translateY(-50%);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const SubTitle = styled.h2`
  width: 90%;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  text-align: center;
  position: relative;
  z-index: 9;
  animation: ${fadeOutIn} 5s ease-in-out infinite;

  @media (max-width: 1024px) {
    width: 70%;
    font-size: 16px;
  }
  @media (max-width: 767px) {
    color: var(--c-secondary);
  }
`;

const AnimatedBannerSubTitle = () => {
  const { t } = useTranslation();

  return <SubTitle>{t('slogan')}</SubTitle>;
};

export default memo(AnimatedBannerSubTitle);
