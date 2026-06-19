import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';
import InfoIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';
import AnimationCheckIcon from '../assets/icons/animation-check.svg?react';
import TestAgentLoader from './TestAgentLoader';

// Import button icons
import ChevronLeftIcon from '../assets/icons/buttons-chevron-left.svg?react';
import ChevronRightDefaultIcon from '../assets/icons/buttons-chevron-right-default.svg?react';
import CloseSmallIcon from '../assets/icons/buttons-close-small.svg?react';
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';

// Import bot avatar icons
import BotAvatarProfessionalIcon from '../assets/icons/bot-avatar-professional.svg?react';
import BotAvatarEnthusiasticIcon from '../assets/icons/bot-avatar-enthusiastic.svg?react';
import BotAvatarInformalIcon from '../assets/icons/bot-avatar-informal.svg?react';
import BotAvatarCustomIcon from '../assets/icons/bot-avatar-custom.svg?react';
import CoffeeBotAvatarIcon from '../assets/icons/Coffee-bot-Avatar.svg?react';

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

const MainPanelContent = styled.div`
  padding: var(--spacing-lg, 32px) var(--spacing-xl, 40px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 32px);
  overflow-y: auto;
  flex: 1;
`;

const MainPanel = styled.div<{ $centered?: boolean }>`
  flex: 1;
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  align-items: ${props => props.$centered ? 'center' : 'stretch'};
  justify-content: ${props => props.$centered ? 'center' : 'flex-start'};
`;

const SectionTitle = styled.h2`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 1fr;
  gap: var(--spacing-sm, 12px);
  width: 100%;
  flex: 1;
  min-height: 0;
`;

const MetricCard = styled.div<{ $index?: number }>`
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  padding: var(--spacing-md, 20px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.1 : 0}s;
  position: relative;
`;

const MetricValue = styled.div`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
`;

const MetricLabel = styled.div`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
`;

const MetricInfoIcon = styled(InfoIcon)`
  position: absolute;
  top: var(--spacing-md, 20px);
  right: var(--spacing-md, 20px);
  width: 16px;
  height: 16px;
  color: var(--fg-subtle, #646864);
  cursor: pointer;
`;

const TestingContainer = styled.div<{ $index?: boolean; $isComplete?: boolean }>`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? 0.4 : 0}s;
  flex: ${props => props.$isComplete ? '0' : '1'};
  min-height: 0;
`;

const TestingContentWrapper = styled.div`
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  padding: var(--spacing-lg, 32px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md, 20px);
  overflow: hidden;
  flex: 1;
  min-height: 0;
  height: 100%;
`;

const TestingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
  flex-shrink: 0;
`;

const PulsingDot = styled.div`
  width: 8px;
  height: 8px;
  background: #8d59b1;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;

const TestingStatusText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-accent, #8d59b1);
  margin: 0;
`;

const TestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: hidden;
  overflow-anchor: none;
  flex: 1;
  min-height: 0;
`;

const TestItem = styled.div<{ $delay?: number }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  min-height: 16px;
  flex-shrink: 0;
`;

const TestIcon = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const TestNumber = styled.span`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  min-width: 48px;
`;

const TestTitle = styled.span`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  flex: 1;
`;

const SkeletonLine = styled.div<{ $width: string }>`
  height: 10px;
  padding: 3px 0;
  background: rgba(100, 104, 100, 0.16);
  border-radius: 4px;
  width: ${props => props.$width};
`;

const SummaryContainer = styled.div`
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  padding: var(--spacing-lg, 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md, 20px);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.3;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 1;
  }
`;

const BackgroundGradient = styled.div`
  position: absolute;
  width: 700px;
  height: 700px;
  right: -130px;
  bottom: -305px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
`;

const PurpleShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 500px;
  height: 500px;
  right: -30px;
  bottom: -5px;
  background: #AB59F7;
  filter: blur(80px);
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
      transform: translate(-25px, 30px) rotate(72deg) scale(1.15);
    }
    40% {
      transform: translate(35px, -20px) rotate(144deg) scale(0.9);
    }
    60% {
      transform: translate(-20px, -30px) rotate(216deg) scale(1.1);
    }
    80% {
      transform: translate(30px, 20px) rotate(288deg) scale(0.95);
    }
    100% {
      transform: translate(0, 0) rotate(360deg) scale(1);
    }
  }
`;

const BlueShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 460px;
  height: 460px;
  right: -10px;
  bottom: 35px;
  background: #729AFF;
  filter: blur(76px);
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
      transform: translate(30px, 22px) rotate(-60deg) scale(1.12);
    }
    33% {
      transform: translate(-35px, -25px) rotate(-120deg) scale(0.88);
    }
    50% {
      transform: translate(25px, 35px) rotate(-180deg) scale(1.08);
    }
    66% {
      transform: translate(-30px, 18px) rotate(-240deg) scale(0.92);
    }
    83% {
      transform: translate(18px, -32px) rotate(-300deg) scale(1.05);
    }
    100% {
      transform: translate(0, 0) rotate(-360deg) scale(1);
    }
  }
`;

const OrangeShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 440px;
  height: 440px;
  right: 110px;
  bottom: -145px;
  background: #AB59F7;
  filter: blur(72px);
  border-radius: 50%;
  opacity: 0.85;
  animation: float3 13s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  mix-blend-mode: screen;

  @keyframes float3 {
    0% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    25% {
      transform: translate(-28px, -28px) rotate(90deg) scale(1.1);
    }
    50% {
      transform: translate(32px, 32px) rotate(180deg) scale(0.9);
    }
    75% {
      transform: translate(-26px, 15px) rotate(270deg) scale(1.05);
    }
    100% {
      transform: translate(0, 0) rotate(360deg) scale(1);
    }
  }
`;

const SummaryHeader = styled.div<{ $index?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  width: auto;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.1 : 0}s;
  position: relative;
  z-index: 2;
`;

const AvatarLarge = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 40px;
    height: 40px;
  }
`;

const AgentName = styled.h3`
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
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  align-items: flex-start;
  width: auto;
  position: relative;
  z-index: 2;
`;

const SummaryDivider = styled.div<{ $index?: number }>`
  height: 1px;
  background: var(--border-default, #dcdcda);
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.1 : 0}s;
`;

const SummaryItem = styled.div<{ $index?: number }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.1 : 0}s;
`;

const CheckIconGreen = styled(AnimationCheckIcon)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const SummaryText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const ReportButton = styled(Button)<{ $index?: number }>`
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
    opacity: 0;
    animation: ${fadeInUp} 0.5s ease forwards;
    animation-delay: ${props => props.$index ? props.$index * 0.1 : 0}s;
    position: relative;
    z-index: 2;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
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
      color: ${props => props.$isEnabled ? 'var(--fg-onemphasis, white)' : 'var(--fg-disabled, #8b8e89)'};

      path {
        fill: ${props => props.$isEnabled ? 'var(--fg-onemphasis, white)' : 'var(--fg-disabled, #8b8e89)'};
      }
    }

    &:hover {
      ${props => props.$isEnabled && `
        background: var(--button-bg-emphasis-hover, #404241);
      `}
    }
  }
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
    ? '#8D59B1'
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

interface TestAgentProps {
  selectedTone: 'professional' | 'enthusiastic' | 'informal' | 'custom';
  agentName?: string;
  companyName?: string;
  onTestComplete?: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

const TEST_TOPICS = [
  'Inquiring about the size of delivery boxes',
  'How do I make a return for large items?',
  'Will the item fit through the door?',
  'Does Insurance cover Pet damage?',
  'What if I don\'t like the color in real life',
  'Do you provide sample swatches before I order?',
  'Requesting information on what colors would go with my current living space',
  'Can I get expedited shipping?',
  'How to track my order?',
  'What is your return policy?',
  'Do you offer international shipping?',
  'How can I change my delivery address?',
  'What payment methods do you accept?',
  'Is assembly included with delivery?',
  'How long is the warranty?',
  'Can I cancel my order?',
  'Do you price match?',
  'Are there any current promotions?',
  'How do I apply a discount code?',
  'What if my item arrives damaged?',
  'Can I schedule a specific delivery time?',
  'Do you have a showroom I can visit?',
  'How do I care for my furniture?',
  'What materials are used?',
  'Is customization available?',
  'How long will delivery take?',
  'Can I modify my order after placing it?',
  'Do you offer financing options?',
  'What are your business hours?',
  'How can I contact customer service?',
  'Can I leave special delivery instructions?',
  'What happens if I\'m not home for delivery?'
];

const TOPIC_NUMBERS = [
  1121, 4455, 5678, 8899, 5161, 1234, 7181, 6677, 3121, 9101,
  9202, 2233, 8765, 3344, 5566, 7788, 9900, 1122, 3344, 5577,
  6688, 7799, 8811, 9922, 1010, 2020, 3030, 4040, 5050, 6060,
  7070, 8080
];

export default function TestAgent({ selectedTone, agentName = 'Agent name', companyName = 'Company name', onTestComplete, onLoadingChange }: TestAgentProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [testPhase, setTestPhase] = useState<'creating' | 'testing' | 'complete'>('creating');
  const [testedCount, setTestedCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [visibleTests, setVisibleTests] = useState(0);

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(showLoader);
    }
  }, [showLoader, onLoadingChange]);
  const testListRef = useRef<HTMLDivElement>(null);
  const testingIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const steps = [
    { label: 'Connect', isCurrent: false },
    { label: 'Personalize', isCurrent: false },
    { label: 'Build', isCurrent: false },
    { label: 'Test', isCurrent: true },
    { label: 'Activate', isCurrent: false },
  ];

  const getBotAvatar = () => {
    switch (selectedTone) {
      case 'professional':
        return <BotAvatarProfessionalIcon />;
      case 'enthusiastic':
        return <BotAvatarEnthusiasticIcon />;
      case 'informal':
        return <BotAvatarInformalIcon />;
      case 'custom':
        return <BotAvatarCustomIcon />;
      default:
        return <BotAvatarProfessionalIcon />;
    }
  };

  // Show skeletons sequentially
  useEffect(() => {
    if (!showLoader && testPhase === 'creating') {
      const timer = setInterval(() => {
        setVisibleTests(prev => {
          if (prev >= 32) {
            clearInterval(timer);
            // Reset counts before starting testing phase
            setTestedCount(0);
            setPassedCount(0);
            setFailedCount(0);
            setTestPhase('testing');
            return prev;
          }
          return prev + 1;
        });
      }, 200);

      return () => clearInterval(timer);
    }
  }, [showLoader, testPhase]);

  // Convert skeletons to titles with checks and update counts
  useEffect(() => {
    if (testPhase !== 'testing') return;

    // Clear any existing interval
    if (testingIntervalRef.current) {
      clearInterval(testingIntervalRef.current);
    }

    testingIntervalRef.current = setInterval(() => {
      setTestedCount(prev => {
        if (prev >= 32) {
          if (testingIntervalRef.current) {
            clearInterval(testingIntervalRef.current);
            testingIntervalRef.current = null;
          }
          setTimeout(() => {
            setTestPhase('complete');
            // Call onTestComplete after summary animation completes (0.6s fade in)
            if (onTestComplete) {
              setTimeout(onTestComplete, 600);
            }
          }, 2000);
          return 32;
        }
        return prev + 1;
      });
    }, 150);

    return () => {
      if (testingIntervalRef.current) {
        clearInterval(testingIntervalRef.current);
        testingIntervalRef.current = null;
      }
    };
  }, [testPhase]);

  // Update pass/fail counts based on testedCount
  useEffect(() => {
    if (testPhase === 'testing' && testedCount > 0) {
      // Topic 8 fails, all others pass
      const failed = testedCount >= 8 ? 1 : 0;
      const passed = testedCount - failed;
      setPassedCount(passed);
      setFailedCount(failed);
    }
  }, [testedCount, testPhase]);

  // Auto-scroll to bottom as new tests appear
  useEffect(() => {
    if (testListRef.current && (testPhase === 'creating' || testPhase === 'testing')) {
      testListRef.current.scrollTop = testListRef.current.scrollHeight;
    }
  }, [visibleTests, testedCount, testPhase]);

  if (showLoader) {
    return (
      <>
        <StepperPanel>
          <StepperContainer>
            {steps.map((step, index) => (
              <StepItem key={step.label}>
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
        <MainPanel $centered>
          <TestAgentLoader onComplete={() => setShowLoader(false)} />
        </MainPanel>
      </>
    );
  }

  return (
    <>
      <StepperPanel>
        <StepperContainer>
          {steps.map((step, index) => (
            <StepItem key={step.label}>
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
        <MainPanelContent>
          <SectionTitle>Testing report</SectionTitle>

          <BentoGrid>
            <MetricCard $index={0}>
              <MetricInfoIcon />
              <MetricValue>8</MetricValue>
              <MetricLabel>Content items approved</MetricLabel>
            </MetricCard>
            <MetricCard $index={1}>
              <MetricInfoIcon />
              <MetricValue>{testedCount}</MetricValue>
              <MetricLabel>Topics tested</MetricLabel>
            </MetricCard>
            <MetricCard $index={2}>
              <MetricInfoIcon />
              <MetricValue>{passedCount}</MetricValue>
              <MetricLabel>Topics passed</MetricLabel>
            </MetricCard>
            <MetricCard $index={3}>
              <MetricInfoIcon />
              <MetricValue>{failedCount}</MetricValue>
              <MetricLabel>Topics failed</MetricLabel>
            </MetricCard>

            <TestingContainer $index={true} $isComplete={testPhase === 'complete'}>
              {testPhase === 'complete' ? (
                <SummaryContainer>
                  <SummaryHeader $index={0}>
                    <AvatarLarge>
                      <CoffeeBotAvatarIcon />
                    </AvatarLarge>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                      <AgentName>{agentName}</AgentName>
                      <AgentCompany>{companyName}</AgentCompany>
                    </div>
                  </SummaryHeader>
                  <SummaryList>
                    <SummaryItem $index={1}>
                      <CheckIconGreen />
                      <SummaryText>All tests complete</SummaryText>
                    </SummaryItem>
                    <SummaryItem $index={2}>
                      <CheckIconGreen />
                      <SummaryText>Automation coverage 62%</SummaryText>
                    </SummaryItem>
                    <SummaryItem $index={3}>
                      <CheckIconGreen />
                      <SummaryText>CSAT Projection 88%</SummaryText>
                    </SummaryItem>
                  </SummaryList>
                  <ReportButton $index={4}>See full report</ReportButton>
                </SummaryContainer>
              ) : (
                <TestingContentWrapper>
                  <TestingHeader>
                    <PulsingDot />
                    <TestingStatusText>
                      {testPhase === 'creating' ? 'Creating Test scenarios...' : 'Running simulations...'}
                    </TestingStatusText>
                  </TestingHeader>
                  <TestList ref={testListRef}>
                    {Array.from({ length: visibleTests }).map((_, index) => {
                      const topicNumber = TOPIC_NUMBERS[index];
                      const hasTitle = testedCount > index;
                      const showCheck = testedCount > index;
                      const isFailed = index === 7 && testedCount > index; // 8th topic (index 7) fails
                      // Random skeleton width between 30% and 60% of container
                      const randomPercent = 30 + Math.floor((index * 137) % 31); // Pseudo-random 30-60%

                      return (
                        <TestItem key={index}>
                          {showCheck && (
                            <TestIcon>
                              <AnimationCheckIcon />
                            </TestIcon>
                          )}
                          <TestNumber>#{topicNumber}</TestNumber>
                          {hasTitle ? (
                            <TestTitle>{TEST_TOPICS[index]}</TestTitle>
                          ) : (
                            <SkeletonLine $width={`${randomPercent}%`} />
                          )}
                        </TestItem>
                      );
                    })}
                  </TestList>
                </TestingContentWrapper>
              )}
            </TestingContainer>
          </BentoGrid>
        </MainPanelContent>
      </MainPanel>
    </>
  );
}

export function TestAgentHeader() {
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

// Export Footer component for use in MainContent
interface TestAgentFooterProps {
  onBack?: () => void;
  onContinue?: () => void;
  testComplete?: boolean;
  isLoading?: boolean;
}

export function TestAgentFooter({ onBack, onContinue, testComplete, isLoading = false }: TestAgentFooterProps) {
  const isDisabled = !testComplete || isLoading;

  return (
    <Footer>
      <BackButton onClick={onBack}>
        <ChevronLeftIcon />
        <span>Back</span>
      </BackButton>
      <ContinueButton
        disabled={isDisabled}
        $isEnabled={!isDisabled}
        onClick={() => !isDisabled && onContinue && onContinue()}
      >
        <span>Continue</span>
        <ChevronRightDefaultIcon />
      </ContinueButton>
    </Footer>
  );
}
