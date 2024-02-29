import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); } 
`;

const Wrapper = styled.div<{ isAbsolute: boolean; size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(p) =>
    p.isAbsolute &&
    css`
      position: absolute;
      left: calc(50% - ${p.size / 2}px);
      top: calc(50% - ${p.size / 2}px);
    `}
`;

const SpinnerSVG = styled.svg`
  animation: ${rotate} 3s linear infinite;
`;

const CircleLoader: React.FC<{ shineColor?: string; size?: number; absolute?: boolean }> = ({
  shineColor,
  size = 24,
  absolute = false,
}) => {
  const [progress, setProgress] = useState(1);
  const desiredProgress = 75;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= desiredProgress ? desiredProgress : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, [desiredProgress]);

  return (
    <Wrapper isAbsolute={absolute} size={size}>
      <SpinnerSVG
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.32">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
          <circle cx="12" cy="12" r="10" stroke="black" strokeOpacity="0.15" strokeWidth="4" />
        </g>
        <path
          d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
        <path
          d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"
          stroke={shineColor ? shineColor : 'rgba(255, 255, 255, 0.5)'}
          strokeOpacity={shineColor === '#6620c7' ? '0.35' : '0.4'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
        />
      </SpinnerSVG>
    </Wrapper>
  );
};
export default CircleLoader;
