import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';


const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Import button icons
import ChevronLeftIcon from '../assets/icons/buttons-chevron-left.svg?react';
import ChevronRightDefaultIcon from '../assets/icons/buttons-chevron-right-default.svg?react';
import CloseSmallIcon from '../assets/icons/buttons-close-small.svg?react';
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';
import BotAvatarIcon from '../assets/icons/bot-avatar.svg?react';



const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: var(--spacing-xs, 8px);
  width: 100%;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: var(--spacing-md, 20px);
  align-items: center;
`;

const PageTitle = styled.h1`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  white-space: nowrap;
`;

const StyledTag = styled(Tag)`
  && {
    border-radius: var(--border-radii-pill, 99px);
    padding: 6px 12px 6px 6px;
    display: flex;
    align-items: center;
    gap: 4px;
    height: 32px;

    span {
      font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0;
    }
  }
`;

const TagIcon = styled.div`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const SaveButton = styled(Button)`
  && {
    height: 32px;
    padding: 8px 12px;
    border-radius: var(--border-radii-pill, 99px);
    border: 1px solid var(--button-border-default, #999b97);
    background: transparent;
    color: var(--button-fg-default, #2f3130);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const ContentRow = styled.div`
  display: flex;
  flex: 1;
  gap: var(--spacing-xs, 8px);
  min-height: 0;
  width: 100%;
  position: relative;
`;

const StepperPanel = styled.div`
  background: rgba(247, 247, 247, 0.5);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  padding: 24px;
  padding-top: var(--spacing-lg, 32px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  overflow: auto;
`;

const MainPanel = styled.div`
  flex: 1;
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  padding: var(--spacing-lg, 32px) var(--spacing-xl, 40px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 32px);
  height: 100%;
  overflow: auto;
`;

const SectionTitle = styled.h2`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  white-space: nowrap;
`;

const AgentBanner = styled.div`
  background: var(--bg-subtle, #f7f7f7);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  padding: var(--spacing-md, 20px) 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg, 32px);
  width: 100%;
`;

const AgentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  flex: 1;
`;

const AgentAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: var(--bg-default, white);
  border: 1.2px solid var(--border-subtle, #eae9e8);
  border-radius: 9.6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 28.8px;
    height: 28.8px;
  }
`;

const AgentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const AgentName = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const AgentCompany = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const RecommendationsTag = styled(Tag)`
  && {
    border-radius: var(--border-radii-pill, 99px);

    span {
      font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0;
    }
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
`;

const SectionLabel = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
`;

const KPICard = styled.div<{ $index?: number; $darkMode?: boolean }>`
  background: ${props => props.$darkMode
    ? 'linear-gradient(90deg, rgb(32, 33, 33) 0%, rgb(32, 33, 33) 100%)'
    : 'var(--bg-default, white)'};
  border: 1px solid ${props => props.$darkMode
    ? 'var(--border-default, #404241)'
    : 'var(--border-default, #dcdcda)'};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 32px);
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.2 : 0}s;
`;

const CardGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  animation: fadeInGradient 1.2s ease 1s forwards;
  overflow: hidden;
  border-radius: 12px;

  @keyframes fadeInGradient {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 0.5;
      transform: translateY(0);
    }
  }
`;

const PurpleShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 200px;
  height: 200px;
  left: -50px;
  bottom: -80px;
  background: #9E59F7;
  filter: blur(40px);
  border-radius: 50%;
  opacity: 0.85;
  animation: float1 14s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  mix-blend-mode: overlay;

  @keyframes float1 {
    0% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    20% {
      transform: translate(-40px, 50px) rotate(72deg) scale(1.15);
    }
    40% {
      transform: translate(60px, -30px) rotate(144deg) scale(0.9);
    }
    60% {
      transform: translate(-30px, -50px) rotate(216deg) scale(1.1);
    }
    80% {
      transform: translate(50px, 40px) rotate(288deg) scale(0.95);
    }
    100% {
      transform: translate(0, 0) rotate(360deg) scale(1);
    }
  }
`;

const BlueShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 180px;
  height: 180px;
  right: -40px;
  bottom: -70px;
  background: #7279FF;
  filter: blur(37px);
  border-radius: 50%;
  opacity: 0.85;
  animation: float2 16s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  mix-blend-mode: screen;

  @keyframes float2 {
    0% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    16% {
      transform: translate(50px, 35px) rotate(-60deg) scale(1.12);
    }
    33% {
      transform: translate(-60px, -40px) rotate(-120deg) scale(0.88);
    }
    50% {
      transform: translate(40px, 60px) rotate(-180deg) scale(1.08);
    }
    66% {
      transform: translate(-50px, 30px) rotate(-240deg) scale(0.92);
    }
    83% {
      transform: translate(30px, -55px) rotate(-300deg) scale(1.05);
    }
    100% {
      transform: translate(0, 0) rotate(-360deg) scale(1);
    }
  }
`;

const OrangeShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 160px;
  height: 160px;
  left: 50%;
  bottom: -90px;
  transform: translateX(-50%);
  background: #FF9F31;
  filter: blur(35px);
  border-radius: 50%;
  opacity: 0.85;
  animation: float3 13s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  mix-blend-mode: screen;

  @keyframes float3 {
    0% {
      transform: translate(-50%, 0) rotate(0deg) scale(1);
    }
    25% {
      transform: translate(-90%, -45px) rotate(90deg) scale(1.1);
    }
    50% {
      transform: translate(-10%, 50px) rotate(180deg) scale(0.9);
    }
    75% {
      transform: translate(-80%, 25px) rotate(270deg) scale(1.05);
    }
    100% {
      transform: translate(-50%, 0) rotate(360deg) scale(1);
    }
  }
`;

const KPIContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
  position: relative;
  z-index: 1;
`;

const KPILabel = styled.p<{ $darkMode?: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: ${props => props.$darkMode ? 'var(--fg-default, #dcdcda)' : 'var(--fg-default, #2f3130)'};
  margin: 0;
`;

const KPIValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
`;

const KPIValue = styled.p<{ $darkMode?: boolean }>`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0;
  color: ${props => props.$darkMode ? 'var(--fg-default, #dcdcda)' : 'var(--fg-default, #2f3130)'};
  margin: 0;
`;

const KPISubtitle = styled.p<{ $darkMode?: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: ${props => props.$darkMode ? 'var(--fg-default, #dcdcda)' : 'var(--fg-default, #2f3130)'};
  margin: 0;
`;

const KPIDescription = styled.p<{ $darkMode?: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: ${props => props.$darkMode ? 'var(--fg-default, #dcdcda)' : 'var(--fg-subtle, #646864)'};
  margin: 0;
  position: relative;
  z-index: 1;
`;

const PlusTag = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  background: var(--tag-bg-success, #25390f);
  border-radius: var(--border-radii-pill, 99px);
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  z-index: 2;
`;

const PlusTagText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--tag-fg-success, #c6e8a1);
  margin: 0;
`;

const CurrentAutomationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
`;

const CurrentCard = styled.div<{ $index?: number }>`
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.2 : 0}s;
`;

const CurrentValue = styled.p`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const CurrentLabel = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xs, 8px) 0;
  width: 100%;
`;

const BackButton = styled(Button)`
  && {
    height: 40px;
    padding: 10px 16px;
    border-radius: var(--border-radii-pill, 99px);
    border: 1px solid var(--button-border-default, #999b97);
    background: transparent;
    color: var(--button-fg-default, #2f3130);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const SkipButton = styled(Button)`
  && {
    height: 40px;
    padding: 10px 16px;
    border-radius: var(--border-radii-pill, 99px);
    border: 1px solid var(--button-border-default, #999b97);
    background: transparent;
    color: var(--button-fg-default, #2f3130);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const ContinueButton = styled(Button)<{ $isEnabled: boolean }>`
  && {
    height: 40px;
    padding: 10px 16px;
    border-radius: var(--border-radii-pill, 99px);
    background: ${props => props.$isEnabled ? 'var(--button-bg-emphasis, #2f3130)' : 'var(--bg-disabled, rgba(100, 104, 100, 0.08))'};
    color: ${props => props.$isEnabled ? 'var(--fg-onemphasis, white)' : 'var(--fg-disabled, #8b8e89)'};
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: ${props => props.$isEnabled ? 'pointer' : 'not-allowed'};

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      ${props => props.$isEnabled && `
        background: var(--button-bg-emphasis-hover, #404241);
      `}
    }

    &:active {
      ${props => props.$isEnabled && `
        background: var(--button-bg-emphasis, #2f3130);
      `}
    }
  }
`;

const RightButtons = styled.div`
  display: flex;
  gap: var(--spacing-md, 20px);
  align-items: center;
`;

// Stepper Component
const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
`;

const StepHeader = styled.div`
  display: flex;
  gap: var(--spacing-sm, 12px);
  align-items: center;
  width: 100%;
`;

const StepIcon = styled.div<{ $isCurrent: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$isCurrent
    ? 'linear-gradient(138.15deg, rgb(140, 49, 255) 0%, rgb(255, 159, 49) 132.69%)'
    : 'var(--tag-bg-default, #e8eaec)'};
  flex-shrink: 0;
`;

const StepNumber = styled.p<{ $isCurrent: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: ${props => props.$isCurrent ? 'var(--tag-fg-neutral, white)' : 'var(--tag-fg-default, #293239)'};
  margin: 0;
`;

const StepLabel = styled.p<{ $isCurrent: boolean }>`
  flex: 1;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: ${props => props.$isCurrent ? 'var(--fg-default, #2f3130)' : 'var(--fg-subtle, #646864)'};
  margin: 0;
  min-width: 0;
`;

const StepConnector = styled.div`
  display: flex;
  padding-left: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 100%;
`;

const ConnectorLine = styled.div`
  flex: 1;
  border-left: 1px solid var(--border-default, #dcdcda);
  height: 24px;
  min-width: 0;
`;

interface OptimizeAgentProps {
  widgetIsReady: boolean;
}

function useAnimatedNumber(endValue: number, duration: number = 1200, delay: number = 0) {
  const [value, setValue] = useState(1);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const easeOutCubic = (t: number): number => {
      const x1 = 0;
      const y1 = 0.67;
      const x2 = 0.27;
      const y2 = 1;

      const sampleCurveX = (t: number) => {
        return ((1 - t) ** 3) * 0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * 1;
      };

      const sampleCurveY = (t: number) => {
        return ((1 - t) ** 3) * 0 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * 1;
      };

      const sampleCurveDerivativeX = (t: number) => {
        return 3 * (1 - t) ** 2 * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t ** 2 * (1 - x2);
      };

      let currentT = t;
      for (let i = 0; i < 8; i++) {
        const currentX = sampleCurveX(currentT) - t;
        if (Math.abs(currentX) < 0.00001) break;
        const currentSlope = sampleCurveDerivativeX(currentT);
        if (Math.abs(currentSlope) < 0.00001) break;
        currentT -= currentX / currentSlope;
      }

      return sampleCurveY(currentT);
    };

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current - delay;

      if (elapsed < 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(1 + (endValue - 1) * easedProgress);

      setValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [endValue, duration, delay]);

  return value;
}

interface AnimatedValueProps {
  endValue: number;
  format?: 'number' | 'percentage' | 'currency';
  delay?: number;
}

function AnimatedValue({ endValue, format = 'number', delay = 0 }: AnimatedValueProps) {
  const animatedValue = useAnimatedNumber(endValue, 1200, delay);

  if (format === 'percentage') {
    return <>{animatedValue}%</>;
  } else if (format === 'currency') {
    return <>${animatedValue.toLocaleString()}k</>;
  }
  return <>{animatedValue.toLocaleString()}</>;
}

export default function OptimizeAgent({ widgetIsReady }: OptimizeAgentProps) {
  const steps = [
    { label: 'Connect', isCurrent: false },
    { label: 'Personalize', isCurrent: false },
    { label: 'Optimize', isCurrent: true },
    { label: 'Test', isCurrent: false },
    { label: 'Activate', isCurrent: false },
  ];

  return (
<>
<StepperPanel>
          <StepperContainer>
            {steps.map((step, index) => (
              <StepItem key={index}>
                <StepHeader>
                  <StepIcon $isCurrent={step.isCurrent}>
                    <StepNumber $isCurrent={step.isCurrent}>{index + 1}</StepNumber>
                  </StepIcon>
                  <StepLabel $isCurrent={step.isCurrent}>{step.label}</StepLabel>
                </StepHeader>
                {index < steps.length - 1 && (
                  <StepConnector>
                    <ConnectorLine />
                  </StepConnector>
                )}
              </StepItem>
            ))}
          </StepperContainer>
        </StepperPanel>

        <MainPanel>
          <SectionTitle>Optimize your AI agent</SectionTitle>

          <AgentBanner>
            <AgentInfo>
              <AgentAvatar>
                <BotAvatarIcon />
              </AgentAvatar>
              <AgentDetails>
                <AgentName>Agent name</AgentName>
                <AgentCompany>Joe's Coffee company</AgentCompany>
              </AgentDetails>
            </AgentInfo>
            <RecommendationsTag size="medium">
              <span>4 Recommendations</span>
            </RecommendationsTag>
          </AgentBanner>

          <SectionHeader>
            <SectionLabel>Automation potential</SectionLabel>
            <KPIGrid>
              <KPICard $index={0} $darkMode>
                <CardGradient>
                  <PurpleShape $delay={0} />
                  <BlueShape $delay={2} />
                  <OrangeShape $delay={1} />
                </CardGradient>
                <PlusTag>
                  <PlusTagText>+25%</PlusTagText>
                </PlusTag>
                <KPIContent>
                  <KPILabel $darkMode>Up to</KPILabel>
                  <KPIValueContainer>
                    <KPIValue $darkMode>
                      <AnimatedValue endValue={62} format="percentage" delay={0} />
                    </KPIValue>
                    <KPISubtitle $darkMode>Automation rate</KPISubtitle>
                  </KPIValueContainer>
                </KPIContent>
                <KPIDescription $darkMode>
                  Achievable by closing knowledge and procedure gaps.
                </KPIDescription>
              </KPICard>

              <KPICard $index={1}>
                <KPIContent>
                  <KPILabel>Up to</KPILabel>
                  <KPIValueContainer>
                    <KPIValue>
                      <AnimatedValue endValue={36478} format="number" delay={200} />
                    </KPIValue>
                    <KPISubtitle>Automated conversations</KPISubtitle>
                  </KPIValueContainer>
                </KPIContent>
                <KPIDescription>
                  Achievable by closing knowledge and procedure gaps.
                </KPIDescription>
              </KPICard>

              <KPICard $index={2}>
                <KPIContent>
                  <KPILabel>Up to</KPILabel>
                  <KPIValueContainer>
                    <KPIValue>
                      <AnimatedValue endValue={96} format="currency" delay={400} />
                    </KPIValue>
                    <KPISubtitle>Annual savings</KPISubtitle>
                  </KPIValueContainer>
                </KPIContent>
                <KPIDescription>
                  Based on automated ticket and average handling cost.
                </KPIDescription>
              </KPICard>
            </KPIGrid>
          </SectionHeader>

          <SectionHeader>
            <SectionLabel>Current Automation</SectionLabel>
            <CurrentAutomationGrid>
              <CurrentCard $index={3}>
                <CurrentValue>
                  <AnimatedValue endValue={76346} format="number" delay={600} />
                </CurrentValue>
                <CurrentLabel>Total amount of conversations</CurrentLabel>
              </CurrentCard>

              <CurrentCard $index={4}>
                <CurrentValue>
                  <AnimatedValue endValue={26280} format="number" delay={800} />
                </CurrentValue>
                <CurrentLabel>Conversations covered by knowledge</CurrentLabel>
              </CurrentCard>

              <CurrentCard $index={5}>
                <CurrentValue>
                  <AnimatedValue endValue={37} format="percentage" delay={1000} />
                </CurrentValue>
                <CurrentLabel>Current Automation rate</CurrentLabel>
              </CurrentCard>
            </CurrentAutomationGrid>
          </SectionHeader>
        </MainPanel>
      </>
  );
}

export function OptimizeAgentHeader() {
  return (
    <Header>
      <HeaderLeft>
        <PageTitle>Create AI agent</PageTitle>
        <StyledTag size="large">
          <TagIcon>
            <ChannelMessagingIcon />
          </TagIcon>
          <span>Messaging</span>
        </StyledTag>
      </HeaderLeft>
      <SaveButton>
        <span>Save and close</span>
        <CloseSmallIcon />
      </SaveButton>
    </Header>
  );
}

export function OptimizeAgentFooter({ onBack, onContinue }: { onBack: () => void; onContinue?: () => void }) {
  return (
    <Footer>
      <BackButton onClick={onBack}>
        <ChevronLeftIcon />
        <span>Back</span>
      </BackButton>
      <RightButtons>
        <SkipButton>
          <span>Skip optimization</span>
        </SkipButton>
        <ContinueButton
          disabled={false}
          $isEnabled={true}
          onClick={() => onContinue && onContinue()}
        >
          <span>Continue</span>
          <ChevronRightDefaultIcon />
        </ContinueButton>
      </RightButtons>
    </Footer>
  );
}
