import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import InfoIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';
import BuildAgentLoader from './BuildAgentLoader';

const TooltipStyles = createGlobalStyle`
  [data-garden-id="tooltips.tooltip_modal"],
  [data-garden-id="tooltips.tooltip_modal"] > div {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }

  [role="tooltip"] {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
`;


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
import ChevronRightIcon from '@zendeskgarden/svg-icons/src/16/chevron-right-stroke.svg?react';
import ChevronDownIcon from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg?react';
import CloseSmallIcon from '../assets/icons/buttons-close-small.svg?react';
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';

// Import bot avatar icons
import BotAvatarProfessionalIcon from '../assets/icons/bot-avatar-professional.svg?react';
import BotAvatarEnthusiasticIcon from '../assets/icons/bot-avatar-enthusiastic.svg?react';
import BotAvatarInformalIcon from '../assets/icons/bot-avatar-informal.svg?react';
import BotAvatarCustomIcon from '../assets/icons/bot-avatar-custom.svg?react';

// Import content type icons
import TagArticleIcon from '../assets/icons/tag-article.svg?react';
import TagProcedureIcon from '../assets/icons/tag-procedure.svg?react';



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

const MainPanelContent = styled.div`
  padding: var(--spacing-lg, 32px) var(--spacing-xl, 40px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 32px);
  overflow-y: auto;
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const SectionDescription = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
  margin: 0;
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

const SectionTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
`;

const SectionLabel = styled.h3`
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
    ? '#19191a'
    : 'var(--bg-default, white)'};
  border: ${props => props.$darkMode
    ? 'none'
    : '1px solid var(--border-default, #dcdcda)'};
  border-radius: var(--border-radii-xl, 16px);
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
  animation: fadeInGradient 1.2s ease 0.5s forwards;
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
  background: #AB59F7;
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
  background: #729AFF;
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
  background: #AB59F7;
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
  letter-spacing: -0.154px;
  color: ${props => props.$darkMode ? '#a47ebf' : '#8d59b1'};
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
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.3536px;
  color: ${props => props.$darkMode ? '#dcdcda' : 'var(--fg-default, #2f3130)'};
  margin: 0;
`;

const KPISubtitle = styled.p<{ $darkMode?: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${props => props.$darkMode ? '#dcdcda' : 'var(--fg-default, #2f3130)'};
  margin: 0;
`;

const KPIInfoIcon = styled(InfoIcon)<{ $darkMode?: boolean }>`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 16px;
  height: 16px;
  color: ${props => props.$darkMode ? 'white' : 'var(--fg-subtle, #646864)'};
  cursor: pointer;
  z-index: 2;
`;

const TopicsHeader = styled.div`
  background: var(--bg-default, white);
  border-radius: var(--border-radii-lg, 12px);
  padding: var(--spacing-xxs, 4px) var(--spacing-xs, 8px);
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const TopicsTitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const TopicsSubtitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const TopicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 5px;
  width: 100%;
`;

const TopicChecklistItem = styled.div<{ $index?: number }>`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.1 : 0}s;
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIconSvg = styled.svg`
  width: 20px;
  height: 20px;
`;

const CheckCircle = styled.circle`
  fill: #ddf0c9;
  opacity: 1;
`;

const CheckMark = styled.path`
  stroke: #293239;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
`;

const TopicTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

const TopicName = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: #646864;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SampleLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TopicCount = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const SampleLink = styled.a`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: var(--anchor-fg-neutral, #2f3130);
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }
`;

const CoverageTagWrapper = styled.div`
  width: 130px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: center;
`;

const CoverageTag = styled(Tag)`
  && {
    border-radius: var(--border-radii-pill, 99px);
    background: var(--tag-bg-default, #eae9e8);
    padding: 2px var(--spacing-xs, 8px);
    height: 20px;

    span {
      font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.0004px;
      color: var(--tag-fg-default, #2f3130);
    }
  }
`;

const TooltipContent = styled.div<{ $isFlipped?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: white;
  border: 1px solid #dcdcda;
  border-radius: 16px;
  box-shadow: 0px 16px 12px rgba(12, 12, 13, 0.16);
  min-width: 280px;
  max-width: 320px;
  position: relative;
  transform: ${props => props.$isFlipped ? 'translateY(4px)' : 'translateY(-4px)'};

  &::after {
    content: '';
    position: absolute;
    bottom: ${props => props.$isFlipped ? 'auto' : '-8px'};
    top: ${props => props.$isFlipped ? '-8px' : 'auto'};
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: ${props => props.$isFlipped ? 'none' : '8px solid white'};
    border-bottom: ${props => props.$isFlipped ? '8px solid white' : 'none'};
  }

  &::before {
    content: '';
    position: absolute;
    bottom: ${props => props.$isFlipped ? 'auto' : '-9px'};
    top: ${props => props.$isFlipped ? '-9px' : 'auto'};
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: ${props => props.$isFlipped ? 'none' : '9px solid #dcdcda'};
    border-bottom: ${props => props.$isFlipped ? '9px solid #dcdcda' : 'none'};
  }
`;

const TooltipHeading = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #2f3130;
  margin: 0;
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TicketItem = styled.a`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const LetterTag = styled.div`
  background: #68737d;
  border-radius: 2px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const LetterTagText = styled.span`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: white;
  text-align: center;
`;

const TicketText = styled.span`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #1f73b7;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${TicketItem}:hover & {
    text-decoration: underline;
  }
`;

const MoreTickets = styled.span`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #1f73b7;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// Review Phase Components
const ReviewTopicSection = styled.div<{ $index?: number }>`
  background: var(--bg-subtle, #f7f7f7);
  border-radius: var(--border-radii-xl, 16px);
  padding-top: var(--spacing-sm, 12px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.1 : 0}s;
`;

const ReviewTopicHeader = styled.div`
  padding: 0 var(--spacing-md, 20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReviewTopicTitle = styled.h4`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const ReviewTopicCoverageTag = styled(Tag)`
  && {
    border-radius: var(--border-radii-pill, 99px);
    background: var(--tag-bg-default, #eae9e8);
    padding: 2px var(--spacing-xs, 8px);
    height: 20px;

    span {
      font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.0004px;
      color: var(--tag-fg-default, #2f3130);
    }
  }
`;

const ContentItemsContainer = styled.div`
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  padding: var(--spacing-sm, 12px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
`;

const ContentItem = styled.div`
  padding: 4px var(--spacing-sm, 12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs, 8px);
  cursor: pointer;
`;

const ContentSeparator = styled.div`
  height: 1px;
  background: var(--border-default, #dcdcda);
  margin: 0;
`;

const ContentItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  flex: 1;
`;

const ContentItemTitle = styled.span`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
`;

const ContentTypeBadge = styled.div<{ $type: 'article' | 'procedure' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: var(--border-radii-pill, 99px);
  background: ${props => props.$type === 'article' ? '#ddf0c9' : '#e3f1ff'};
  height: 20px;

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.0004px;
    color: var(--fg-default, #2f3130);
  }
`;

const ChevronIconButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--border-radii-pill, 99px);
  color: var(--fg-default, #2f3130);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease;

  ${ContentItem}:hover & {
    background: rgba(0, 0, 0, 0.05);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const DetailsSidebar = styled.div`
  width: 360px;
  background: var(--bg-default, white);
  border-left: 1px solid var(--border-default, #dcdcda);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const DetailsHeader = styled.div`
  padding: var(--spacing-lg, 32px) var(--spacing-md, 20px) var(--spacing-md, 20px);
  border-bottom: 1px solid var(--border-default, #dcdcda);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
`;

const DetailsTypeLabel = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.66px;
  text-transform: uppercase;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const DetailsTitle = styled.h3`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const DetailsContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md, 20px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md, 20px);
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
`;

const DetailsSectionLabel = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const DetailsSectionValue = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-lg, 12px);
  overflow: hidden;
`;

const AccordionHeader = styled.button<{ $isOpen: boolean }>`
  background: var(--bg-default, white);
  border: none;
  padding: var(--spacing-sm, 12px) var(--spacing-md, 20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
  text-align: left;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  padding: 0 var(--spacing-md, 20px) var(--spacing-sm, 12px);
  border-top: 1px solid var(--border-default, #dcdcda);
`;

const AccordionItem = styled.div`
  display: flex;
  gap: var(--spacing-xs, 8px);
  align-items: flex-start;
`;

const AccordionItemLabel = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: var(--fg-default, #2f3130);
  margin: 0;
  min-width: 100px;
`;

const AccordionItemValue = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: var(--fg-default, #2f3130);
  margin: 0;
  flex: 1;
`;

const DetailsFooter = styled.div`
  padding: var(--spacing-md, 20px);
  border-top: 1px solid var(--border-default, #dcdcda);
  display: flex;
  gap: var(--spacing-xs, 8px);
`;

const DetailsButton = styled(Button)`
  && {
    flex: 1;
    height: 40px;
    padding: 10px 16px;
    border-radius: var(--border-radii-pill, 99px);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.154px;
  }
`;

const ApproveButton = styled(DetailsButton)`
  && {
    background: var(--button-bg-emphasis, #2f3130);
    color: var(--fg-onemphasis, white);
    border: none;

    &:hover {
      background: var(--button-bg-emphasis-hover, #404241);
    }
  }
`;

const RejectButton = styled(DetailsButton)`
  && {
    background: transparent;
    color: var(--button-fg-default, #2f3130);
    border: 1px solid var(--button-border-default, #999b97);

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

    &:active {
      ${props => props.$isEnabled && `
        background: var(--button-bg-emphasis, #2f3130);
      `}
    }
  }
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

const TOPICS_DATA = [
  {
    name: 'Account & billing',
    count: '4,523 conversations',
    coverage: '28.5% coverage',
    sampleTickets: [
      '#2341 Billing discrepancy on invoice',
      '#1829 Unable to update payment method',
      '#3456 Subscription charges unclear',
      '#2871 Need refund for duplicate charge',
      '#4102 Payment declined but account charged'
    ]
  },
  {
    name: 'Product features',
    count: '3,876 conversations',
    coverage: '24.3% coverage',
    sampleTickets: [
      '#5612 How to use advanced search filters',
      '#3984 Export feature not working properly',
      '#2765 Custom fields configuration help',
      '#4521 Integration with third-party tools',
      '#6237 Dashboard customization options'
    ]
  },
  {
    name: 'Technical issues',
    count: '2,891 conversations',
    coverage: '18.1% coverage',
    sampleTickets: [
      '#7834 Application keeps crashing on mobile',
      '#5429 Data sync issues between devices',
      '#3891 Error 500 when uploading files',
      '#6742 Cannot load dashboard',
      '#4563 API connection timeout errors'
    ]
  },
  {
    name: 'Password reset',
    count: '1,542 conversations',
    coverage: '9.7% coverage',
    sampleTickets: [
      '#8921 Password reset email not received',
      '#7456 Reset link expired before use',
      '#5834 Cannot remember password format',
      '#9012 Account locked after failed attempts',
      '#6745 Two-factor authentication bypass'
    ]
  },
  {
    name: 'Shipping & delivery',
    count: '1,289 conversations',
    coverage: '8.1% coverage',
    sampleTickets: [
      '#3421 Order still in transit for 2 weeks',
      '#5678 Wrong delivery address on shipment',
      '#4892 Package marked delivered but not received',
      '#7123 Tracking number not updating',
      '#8934 Need expedited shipping option'
    ]
  },
  {
    name: 'Refunds & returns',
    count: '1,156 conversations',
    coverage: '7.2% coverage',
    sampleTickets: [
      '#9234 Return label not provided',
      '#6783 Refund not processed after 10 days',
      '#5421 Item damaged during shipping',
      '#7856 Return window expired by 2 days',
      '#4567 Partial refund request'
    ]
  },
  {
    name: 'Payment methods',
    count: '987 conversations',
    coverage: '6.2% coverage',
    sampleTickets: [
      '#3256 Unable to add new credit card',
      '#7894 PayPal integration not working',
      '#5623 Saved payment method disappeared',
      '#8412 International payment declined',
      '#6734 Gift card balance not applying'
    ]
  },
  {
    name: 'Order tracking',
    count: '823 conversations',
    coverage: '5.2% coverage',
    sampleTickets: [
      '#4523 Tracking shows delivered but not received',
      '#9187 Cannot find tracking information',
      '#6842 Shipment stuck in customs',
      '#5234 Expected delivery date passed',
      '#7965 Tracking updates stopped 5 days ago'
    ]
  },
  {
    name: 'Product availability',
    count: '734 conversations',
    coverage: '4.6% coverage',
    sampleTickets: [
      '#8234 When will item be back in stock',
      '#5967 Pre-order status inquiry',
      '#7123 Alternative product suggestions',
      '#4856 Size out of stock notification',
      '#9432 Regional availability check'
    ]
  },
  {
    name: 'Account cancellation',
    count: '612 conversations',
    coverage: '3.8% coverage',
    sampleTickets: [
      '#6745 How to cancel my subscription',
      '#8923 Cancellation not processed',
      '#5234 Data export before account closure',
      '#7456 Charged after cancellation',
      '#4891 Reactivate cancelled account'
    ]
  }
];

const REVIEW_CONTENT = [
  {
    topic: 'Account & billing',
    coverage: '28.5% coverage',
    items: [
      { title: 'How to update payment information', type: 'article' as const },
      { title: 'Process refund for duplicate charge', type: 'procedure' as const },
      { title: 'Understanding your invoice charges', type: 'article' as const }
    ]
  },
  {
    topic: 'Product features',
    coverage: '24.3% coverage',
    items: [
      { title: 'Using advanced search filters', type: 'article' as const },
      { title: 'Configure custom fields', type: 'procedure' as const }
    ]
  },
  {
    topic: 'Technical issues',
    coverage: '18.1% coverage',
    items: [
      { title: 'Troubleshoot mobile app crashes', type: 'article' as const },
      { title: 'Fix data sync issues between devices', type: 'procedure' as const }
    ]
  }
];

interface OptimizeAgentProps {
  widgetIsReady: boolean;
  selectedTone: 'professional' | 'enthusiastic' | 'informal' | 'custom';
  buildPhase: 'discover' | 'review';
  onLoadingChange?: (isLoading: boolean) => void;
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

export default function OptimizeAgent({ widgetIsReady, selectedTone, buildPhase, onLoadingChange }: OptimizeAgentProps) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(showLoader);
    }
  }, [showLoader, onLoadingChange]);
  const [tooltipStates, setTooltipStates] = useState<{[key: number]: boolean}>({});
  const [flippedStates, setFlippedStates] = useState<{[key: number]: boolean}>({});
  const linkRefs = useRef<{[key: number]: HTMLAnchorElement | null}>({});
  const tooltipRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const [selectedContent, setSelectedContent] = useState<{type: 'article' | 'procedure', title: string, topic: string} | null>(null);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);

  const steps = [
    { label: 'Connect', isCurrent: false },
    { label: 'Personalize', isCurrent: false },
    { label: 'Build', isCurrent: true },
    { label: 'Test', isCurrent: false },
    { label: 'Activate', isCurrent: false },
  ];

  // Select the appropriate bot avatar based on selected tone
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

  const handleMouseEnter = (index: number) => {
    setTooltipStates(prev => ({ ...prev, [index]: true }));

    setTimeout(() => {
      const linkElement = linkRefs.current[index];
      const tooltipElement = tooltipRefs.current[index];

      if (linkElement && tooltipElement) {
        const linkRect = linkElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceAbove = linkRect.top;
        const spaceBelow = viewportHeight - linkRect.bottom;
        const flipped = spaceAbove < tooltipRect.height && spaceBelow > spaceAbove;
        setFlippedStates(prev => ({ ...prev, [index]: flipped }));
      }
    }, 0);
  };

  const handleMouseLeave = (index: number) => {
    setTooltipStates(prev => ({ ...prev, [index]: false }));
  };

  const handleTooltipMouseEnter = (index: number) => {
    setTooltipStates(prev => ({ ...prev, [index]: true }));
  };

  const handleTooltipMouseLeave = (index: number) => {
    setTooltipStates(prev => ({ ...prev, [index]: false }));
  };

  return (
<>
<TooltipStyles />
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

        <MainPanel $centered={showLoader}>
          {showLoader ? (
            <BuildAgentLoader onComplete={() => setShowLoader(false)} />
          ) : (
            <MainPanelContent>
          {buildPhase === 'discover' ? (
            <>
          <SectionTitleGroup>
            <SectionTitle>Discover automation opportunities</SectionTitle>
            <SectionDescription>
              We analyzed your past support conversations to find the topics with the greatest potential for automation.
            </SectionDescription>
          </SectionTitleGroup>

          <SectionHeader>
            <KPIGrid>
              <KPICard $index={0} $darkMode>
                <KPIInfoIcon $darkMode />
                <CardGradient>
                  <PurpleShape $delay={0} />
                  <BlueShape $delay={2} />
                  <OrangeShape $delay={1} />
                </CardGradient>
                <KPIContent>
                  <KPILabel $darkMode>Up to</KPILabel>
                  <KPIValueContainer>
                    <KPIValue $darkMode>
                      <AnimatedValue endValue={62} format="percentage" delay={0} />
                    </KPIValue>
                    <KPISubtitle $darkMode>Automation potential</KPISubtitle>
                  </KPIValueContainer>
                </KPIContent>
              </KPICard>

              <KPICard $index={1}>
                <KPIInfoIcon />
                <KPIContent>
                  <KPILabel>Up to</KPILabel>
                  <KPIValueContainer>
                    <KPIValue>
                      <AnimatedValue endValue={36478} format="number" delay={200} />
                    </KPIValue>
                    <KPISubtitle>Automated conversations</KPISubtitle>
                  </KPIValueContainer>
                </KPIContent>
              </KPICard>

              <KPICard $index={2}>
                <KPIInfoIcon />
                <KPIContent>
                  <KPILabel>Currently</KPILabel>
                  <KPIValueContainer>
                    <KPIValue>
                      <AnimatedValue endValue={26280} format="number" delay={400} />
                    </KPIValue>
                    <KPISubtitle>Conversations covered by knowledge</KPISubtitle>
                  </KPIValueContainer>
                </KPIContent>
              </KPICard>
            </KPIGrid>
          </SectionHeader>

          <SectionHeader>
            <TopicsHeader>
              <TopicsTitle>Approve suggested content to improve automation</TopicsTitle>
            </TopicsHeader>

            {REVIEW_CONTENT.map((section, sectionIndex) => {
              const displayTickets = TOPICS_DATA[sectionIndex]?.sampleTickets.slice(0, 5) || [];
              const topicCoverage = TOPICS_DATA[sectionIndex]?.coverage || section.coverage;
              const isTooltipOpen = tooltipStates[sectionIndex] || false;
              const isFlipped = flippedStates[sectionIndex] || false;

              return (
                <ReviewTopicSection key={sectionIndex} $index={sectionIndex}>
                  <ReviewTopicHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <ReviewTopicTitle>{section.topic}</ReviewTopicTitle>
                      <SampleLinkWrapper>
                        <Tooltip
                          content={
                            <TooltipContent
                              ref={(el) => { tooltipRefs.current[sectionIndex] = el; }}
                              $isFlipped={isFlipped}
                              onMouseEnter={() => handleTooltipMouseEnter(sectionIndex)}
                              onMouseLeave={() => handleTooltipMouseLeave(sectionIndex)}
                            >
                              <TooltipHeading>Sample tickets</TooltipHeading>
                              <TicketList>
                                {displayTickets.map((ticket, ticketIndex) => (
                                  <TicketItem key={ticketIndex} href="#">
                                    <LetterTag>
                                      <LetterTagText>S</LetterTagText>
                                    </LetterTag>
                                    <TicketText>{ticket}</TicketText>
                                  </TicketItem>
                                ))}
                              </TicketList>
                            </TooltipContent>
                          }
                          placement="top"
                          size="large"
                          delayMS={0}
                          hasArrow={false}
                          zIndex={9999}
                          isVisible={isTooltipOpen}
                        >
                          <SampleLink
                            ref={(el) => { linkRefs.current[sectionIndex] = el; }}
                            href="#"
                            onMouseEnter={() => handleMouseEnter(sectionIndex)}
                            onMouseLeave={() => handleMouseLeave(sectionIndex)}
                          >
                            Sample tickets
                          </SampleLink>
                        </Tooltip>
                      </SampleLinkWrapper>
                    </div>
                    <ReviewTopicCoverageTag size="small">
                      <span>{topicCoverage}</span>
                    </ReviewTopicCoverageTag>
                  </ReviewTopicHeader>
                  <ContentItemsContainer>
                    {section.items.map((item, itemIndex) => (
                      <>
                        <ContentItem
                          key={itemIndex}
                          onClick={() => setSelectedContent({type: item.type, title: item.title, topic: section.topic})}
                        >
                          <ContentItemLeft>
                            <ContentItemTitle>{item.title}</ContentItemTitle>
                            <ContentTypeBadge $type={item.type}>
                              {item.type === 'article' ? <TagArticleIcon /> : <TagProcedureIcon />}
                              <span>{item.type === 'article' ? 'Article' : 'Procedure'}</span>
                            </ContentTypeBadge>
                          </ContentItemLeft>
                          <ChevronIconButton>
                            <ChevronRightIcon />
                          </ChevronIconButton>
                        </ContentItem>
                        {itemIndex < section.items.length - 1 && <ContentSeparator />}
                      </>
                    ))}
                  </ContentItemsContainer>
                </ReviewTopicSection>
              );
            })}
          </SectionHeader>
          </>
          ) : (
            <>
          <SectionTitleGroup>
            <SectionTitle>Review suggested content per topic</SectionTitle>
            <SectionDescription>
              We have prepared AI generated articles and procedures that will improve AI agents automation rate.
            </SectionDescription>
          </SectionTitleGroup>

          <SectionHeader>
            {REVIEW_CONTENT.map((section, index) => (
              <ReviewTopicSection key={index} $index={index}>
                <ReviewTopicHeader>
                  <ReviewTopicTitle>{section.topic}</ReviewTopicTitle>
                  <ReviewTopicCoverageTag size="small">
                    <span>{section.coverage}</span>
                  </ReviewTopicCoverageTag>
                </ReviewTopicHeader>
                <ContentItemsContainer>
                  {section.items.map((item, itemIndex) => (
                    <>
                      <ContentItem key={itemIndex}>
                        <ContentItemLeft>
                          <ContentItemTitle>{item.title}</ContentItemTitle>
                          <ContentTypeBadge $type={item.type}>
                            {item.type === 'article' ? <TagArticleIcon /> : <TagProcedureIcon />}
                            <span>{item.type === 'article' ? 'Article' : 'Procedure'}</span>
                          </ContentTypeBadge>
                        </ContentItemLeft>
                        <ChevronIconButton>
                          <ChevronRightIcon />
                        </ChevronIconButton>
                      </ContentItem>
                      {itemIndex < section.items.length - 1 && <ContentSeparator />}
                    </>
                  ))}
                </ContentItemsContainer>
              </ReviewTopicSection>
            ))}
          </SectionHeader>
          </>
          )}
          </MainPanelContent>
          )}
        </MainPanel>

        {selectedContent && (
          <DetailsSidebar>
            <DetailsHeader>
              <DetailsTypeLabel>{selectedContent.type} details</DetailsTypeLabel>
              <DetailsTitle>{selectedContent.title}</DetailsTitle>
            </DetailsHeader>
            <DetailsContent>
              <DetailsSection>
                <DetailsSectionLabel>Topic</DetailsSectionLabel>
                <DetailsSectionValue>{selectedContent.topic}</DetailsSectionValue>
              </DetailsSection>

              <AccordionContainer>
                <AccordionHeader $isOpen={placementOpen} onClick={() => setPlacementOpen(!placementOpen)}>
                  Placement
                  <ChevronDownIcon />
                </AccordionHeader>
                <AccordionContent $isOpen={placementOpen}>
                  <AccordionItem>
                    <AccordionItemLabel>Category</AccordionItemLabel>
                    <AccordionItemValue>General</AccordionItemValue>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemLabel>Section</AccordionItemLabel>
                    <AccordionItemValue>Account and settings</AccordionItemValue>
                  </AccordionItem>
                </AccordionContent>
              </AccordionContainer>

              <AccordionContainer>
                <AccordionHeader $isOpen={permissionsOpen} onClick={() => setPermissionsOpen(!permissionsOpen)}>
                  Viewing permissions
                  <ChevronDownIcon />
                </AccordionHeader>
                <AccordionContent $isOpen={permissionsOpen}>
                  <AccordionItem>
                    <AccordionItemLabel>Visibility</AccordionItemLabel>
                    <AccordionItemValue>Everyone</AccordionItemValue>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemLabel>User segment</AccordionItemLabel>
                    <AccordionItemValue>—</AccordionItemValue>
                  </AccordionItem>
                </AccordionContent>
              </AccordionContainer>
            </DetailsContent>
            <DetailsFooter>
              <RejectButton onClick={() => setSelectedContent(null)}>Reject</RejectButton>
              <ApproveButton onClick={() => setSelectedContent(null)}>Approve</ApproveButton>
            </DetailsFooter>
          </DetailsSidebar>
        )}
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

export function OptimizeAgentFooter({
  onBack,
  onContinue,
  currentPhase,
  isLoading = false
}: {
  onBack: () => void;
  onContinue?: () => void;
  currentPhase?: 'discover' | 'review';
  isLoading?: boolean;
}) {
  const buttonText = currentPhase === 'review' ? 'Approve and continue' : 'Continue';

  return (
    <Footer>
      <BackButton onClick={onBack}>
        <ChevronLeftIcon />
        <span>Back</span>
      </BackButton>
      <ContinueButton
        disabled={isLoading}
        $isEnabled={!isLoading}
        onClick={() => !isLoading && onContinue && onContinue()}
      >
        <span>{buttonText}</span>
        <ChevronRightDefaultIcon />
      </ContinueButton>
    </Footer>
  );
}
