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
const SubTitle = styled.div`
  font-size: clamp(19px, 5vw, 25px);
  font-weight: 600;
  text-align: center;
  animation: ${fadeOutIn} 5s ease-in-out infinite;
`;

const AnimatedBannerSubTitle = () => {
  const { t } = useTranslation();

  return <SubTitle>{t('slogan')}</SubTitle>;
};

export default memo(AnimatedBannerSubTitle);
