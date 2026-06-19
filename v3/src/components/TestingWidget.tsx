import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';

// Import icons
import CollapseActiveIcon from '../assets/icons/testing-widget-collapse-active.svg?react';
import CollapseDefaultIcon from '../assets/icons/testing-widget-collapse-default.svg?react';
import HistoryIcon from '../assets/icons/testing-widget-history.svg?react';
import NoticeWarningIcon from '../assets/icons/testing-widget-notice-warning.svg?react';
import NoticeZendeskIcon from '../assets/icons/testing-widget-notice-zendesk.svg?react';
import SendDisabledIcon from '../assets/icons/testing-widget-send-disabled.svg?react';
import SendDefaultIcon from '../assets/icons/testing-widget-send-default.svg?react';
import ChevronDownIcon from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg?react';
import ChevronLeftIcon from '@zendeskgarden/svg-icons/src/16/chevron-left-stroke.svg?react';
import TagArticleIcon from '../assets/icons/tag-article.svg?react';
import TagProcedureIcon from '../assets/icons/tag-procedure.svg?react';
import TagXIcon from '../assets/icons/tag-icon-x.svg?react';
import InputChevronDownIcon from '../assets/icons/inputs-chevron-down.svg?react';
import ChatUserAvatarIcon from '../assets/icons/chat-user-avatar.svg?react';
import ChatBotAvatarIcon from '../assets/icons/chat-bot-avatar.svg?react';

const WidgetContainer = styled.div<{ $collapsed: boolean }>`
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  width: ${props => props.$collapsed ? '56px' : '320px'};
  transition: width 0.3s ease;
  flex-shrink: 0;
  position: relative;
`;

const Header = styled.div<{ $collapsed: boolean }>`
  background: var(--bg-default, white);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 0px);
  height: 56px;
  align-items: center;
  padding: var(--spacing-sm, 12px) ${props => props.$collapsed ? 'var(--spacing-xs, 8px)' : 'var(--spacing-md, 20px) var(--spacing-xs, 8px)'};
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`;

const HeaderContent = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$collapsed ? 'center' : 'space-between'};
  width: ${props => props.$collapsed ? 'auto' : '100%'};
`;

const HeaderTitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  flex: 1;
`;

const IconButton = styled.button<{ $dark?: boolean; $rotate?: boolean }>`
  background: ${props => props.$dark ? 'var(--button-bg-emphasis-active, #646864)' : 'transparent'};
  border: none;
  border-radius: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transform: ${props => props.$rotate ? 'rotate(180deg)' : 'none'};
  transition: background 0.2s ease, transform 0.3s ease;

  &:hover {
    background: ${props => props.$dark ? 'var(--button-bg-emphasis-hover, #8b8e89)' : 'rgba(0, 0, 0, 0.05)'};
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.$dark ? 'white' : 'var(--fg-default, #2f3130)'};
  }
`;

const Content = styled.div<{ $collapsed: boolean }>`
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 0px);
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md, 20px);
  opacity: ${props => props.$collapsed ? 0 : 1};
  transform: ${props => props.$collapsed ? 'translateY(10px)' : 'translateY(0)'};
  transition: ${props => props.$collapsed ? 'none' : 'opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s'};
  pointer-events: ${props => props.$collapsed ? 'none' : 'auto'};
  position: relative;
  z-index: 1;
  animation: ${props => props.$collapsed ? 'none' : 'fadeInUp 0.3s ease 0.3s both'};

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  align-items: center;
  width: 100%;
`;

const IconWrapper = styled.div`
  background: var(--bg-subtle, #f7f7f7);
  padding: var(--spacing-xs, 8px);
  border-radius: var(--border-radii-lg, 12px);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyStateTitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  text-align: center;
  white-space: normal;
  width: 100%;
`;

const EmptyStateDescription = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
  text-align: center;
  white-space: normal;
  width: 100%;
`;

const Footer = styled.div<{ $collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 0px);
  align-items: center;
  padding: var(--spacing-md, 20px);
  flex-shrink: 0;
  opacity: ${props => props.$collapsed ? 0 : 1};
  transform: ${props => props.$collapsed ? 'translateY(10px)' : 'translateY(0)'};
  transition: ${props => props.$collapsed ? 'none' : 'opacity 0.3s ease 0.4s, transform 0.3s ease 0.4s'};
  pointer-events: ${props => props.$collapsed ? 'none' : 'auto'};
  position: relative;
  z-index: 1;
  animation: ${props => props.$collapsed ? 'none' : 'fadeInUpFooter 0.3s ease 0.4s both'};

  @keyframes fadeInUpFooter {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const InputContainer = styled.div<{ $isEnabled: boolean }>`
  background: ${props => props.$isEnabled ? 'var(--bg-default, white)' : 'var(--bg-disabled, rgba(100, 104, 100, 0.08))'};
  border: 1px solid ${props => props.$isEnabled ? 'var(--border-input, #b7b7b3)' : 'var(--border-disabled, #dcdcda)'};
  border-radius: var(--border-radii-pill, 99px);
  display: flex;
  align-items: center;
  min-height: 48px;
  padding-left: var(--spacing-xs, 8px);
  width: 100%;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px var(--spacing-sm, 12px);
`;

const InputPlaceholder = styled.p<{ $isEnabled: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-placeholder, #8b8e89);
  margin: 0;
  flex: 1;
  cursor: ${props => props.$isEnabled ? 'text' : 'not-allowed'};
`;

const SendButton = styled.button<{ $isEnabled: boolean }>`
  background: ${props => props.$isEnabled ? 'var(--button-bg-emphasis, #2f3130)' : 'var(--bg-disabled, rgba(100, 104, 100, 0.08))'};
  border: none;
  border-radius: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: var(--spacing-xs, 8px);
  flex-shrink: 0;
  cursor: ${props => props.$isEnabled ? 'pointer' : 'not-allowed'};

  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.$isEnabled ? 'var(--fg-onemphasis, white)' : 'var(--fg-disabled, #8b8e89)'};
  }

  &:hover {
    ${props => props.$isEnabled && `
      background: var(--button-bg-emphasis-hover, #404241);
    `}
  }
`;

const BackgroundGradient = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  opacity: ${props => props.$isVisible ? 0.5 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(10px)'};
  transition: ${props => props.$isVisible
    ? 'opacity 1.2s ease 1s, transform 1.2s ease 1s'
    : 'opacity 0.2s ease 0s, transform 0.2s ease 0s'
  };
  overflow: hidden;
  border-radius: var(--border-radii-xl, 16px);
`;

const PurpleShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 280px;
  height: 280px;
  left: 10px;
  bottom: -130px;
  background: #AB59F7;
  filter: blur(45px);
  border-radius: 50%;
  opacity: 0.5;
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
  width: 260px;
  height: 260px;
  right: 20px;
  bottom: -110px;
  background: #729AFF;
  filter: blur(42px);
  border-radius: 50%;
  opacity: 0.5;
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
  width: 240px;
  height: 240px;
  left: 50%;
  bottom: -140px;
  transform: translateX(-50%);
  background: #AB59F7;
  filter: blur(40px);
  border-radius: 50%;
  opacity: 0.5;
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

const DetailsContent = styled.div<{ $collapsed: boolean }>`
  flex: ${props => props.$collapsed ? '0' : '1'};
  min-height: 0;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--spacing-md, 20px);
  display: ${props => props.$collapsed ? 'none' : 'flex'};
  flex-direction: column;
  gap: var(--spacing-md, 20px);
  opacity: ${props => props.$collapsed ? 0 : 1};
  transform: ${props => props.$collapsed ? 'translateY(10px)' : 'translateY(0)'};
  transition: ${props => props.$collapsed ? 'none' : 'opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s'};
  pointer-events: ${props => props.$collapsed ? 'none' : 'auto'};
  position: relative;
  z-index: 1;
  animation: ${props => props.$collapsed ? 'none' : 'fadeInUpDetails 0.3s ease 0.3s both'};

  @keyframes fadeInUpDetails {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DetailsTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  padding-bottom: var(--spacing-md, 20px);
  border-bottom: 1px solid var(--border-default, #dcdcda);
`;

const DetailsTopicLabel = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const DetailsMainTitle = styled.h2`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const TagsRow = styled.div`
  display: flex;
  gap: var(--spacing-xs, 8px);
  align-items: center;
`;

const StyledTag = styled(Tag)`
  && {
    border-radius: var(--border-radii-pill, 99px);
    padding: 2px var(--spacing-xs, 8px);
    height: 20px;

    span {
      font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0;
      color: var(--tag-fg-default, #2f3130);
    }
  }
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
    letter-spacing: 0;
    color: var(--fg-default, #2f3130);
  }
`;

const RationaleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
`;

const RationaleTitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const RationaleText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const SampleNote = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
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
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const DetailsSectionValue = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccordionItem = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-subtle, #e8eaec);
  border-bottom: 1px solid var(--border-subtle, #e8eaec);

  & + & {
    border-top: none;
  }
`;

const AccordionHeader = styled.button<{ $isOpen: boolean }>`
  background: transparent;
  border: none;
  padding: var(--spacing-md, 20px) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  text-align: left;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
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
  padding-bottom: var(--spacing-md, 20px);
`;

const AccordionContentTitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const AccordionContentDescription = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const AccordionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AccordionItemLabel = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const AccordionItemValue = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  text-align: right;
`;

const OutlineButton = styled(Button)`
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

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const RadioOption = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
  cursor: pointer;
  padding: var(--spacing-xs, 8px) 0;
`;

const RadioButton = styled.div<{ $selected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: ${props => props.$selected ? '6px solid #2f3130' : '1px solid var(--border-input, #b7b7b3)'};
  flex-shrink: 0;
`;

const RadioLabel = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  flex: 1;
`;

const InputWithTagsContainer = styled.div`
  width: 100%;
  min-height: 40px;
  padding: 4px 36px 4px 12px;
  background: var(--bg-default, white);
  border: 1px solid var(--border-input, #b7b7b3);
  border-radius: var(--border-radii-control, 8px);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xxs, 4px);
  align-items: center;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: var(--border-default, #dcdcda);
  }
`;

const InputTag = styled.div`
  background: var(--tag-bg-default, #eae9e8);
  border-radius: var(--border-radii-controlsubtle, 4px);
  height: 32px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  span {
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0;
    color: var(--tag-fg-default, #2f3130);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 16px;
    height: 16px;

    svg {
      width: 16px;
      height: 16px;
      color: var(--fg-default, #2f3130);
    }

    &:hover svg {
      color: var(--fg-emphasis, #000);
    }
  }
`;

const InputChevronIcon = styled.div`
  position: absolute;
  right: 11px;
  top: 9px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  svg {
    width: 16px;
    height: 16px;
    color: var(--fg-default, #2f3130);
  }
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  display: flex;
  gap: var(--spacing-xs, 8px);
  width: 100%;
  align-items: flex-end;
`;

const MessageAvatar = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  flex: 1;
  min-width: 0;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs, 8px);
`;

const MessageSender = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const MessageTimestamp = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const BubbleContent = styled.div<{ $isUser: boolean }>`
  background: ${props => props.$isUser ? '#f7f7f7' : '#f7f4fa'};
  color: var(--fg-default, #2f3130);
  padding: var(--spacing-sm, 12px);
  border-radius: 16px 16px 16px 0;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
`;

const DetailsFooter = styled.div<{ $collapsed: boolean }>`
  padding: var(--spacing-md, 20px);
  border-top: 1px solid var(--border-default, #dcdcda);
  display: ${props => props.$collapsed ? 'none' : 'flex'};
  gap: var(--spacing-xs, 8px);
  opacity: ${props => props.$collapsed ? 0 : 1};
  transform: ${props => props.$collapsed ? 'translateY(10px)' : 'translateY(0)'};
  transition: ${props => props.$collapsed ? 'none' : 'opacity 0.3s ease 0.4s, transform 0.3s ease 0.4s'};
  pointer-events: ${props => props.$collapsed ? 'none' : 'auto'};
  position: relative;
  z-index: 1;
  animation: ${props => props.$collapsed ? 'none' : 'fadeInUpDetailsFooter 0.3s ease 0.4s both'};

  @keyframes fadeInUpDetailsFooter {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
    letter-spacing: 0;
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

interface TestingWidgetProps {
  collapsed?: boolean;
  onToggle?: () => void;
  isReady?: boolean;
  contentDetails?: {type: 'article' | 'procedure', title: string, topic: string} | null;
  conversationDetails?: {name: string, status: string} | null;
  onApprove?: () => void;
  onReject?: () => void;
  onConversationClose?: () => void;
}

const RATIONALE_MAP: Record<string, string> = {
  'How to update payment information': 'Payment-related tickets are among the most common in support queues. Providing a clear, self-service article for payment updates can significantly reduce agent workload while improving customer satisfaction with instant resolution.',
  'Process refund for duplicate charge': 'Duplicate charges create urgent customer issues that require immediate resolution. A standardized procedure ensures refunds are processed consistently and quickly, reducing escalations and improving customer trust.',
  'Understanding your invoice charges': 'Billing inquiries account for a high volume of repetitive questions. This article helps customers understand their charges independently, reducing ticket volume and allowing agents to focus on complex issues.',
  'Using advanced search filters': 'Many users don\'t utilize the full capabilities of search features, leading to frustration and support tickets. This article empowers customers to find information independently, reducing "how do I find X" questions.',
  'Configure custom fields': 'Custom field configuration is a common setup request that follows the same steps. A procedure standardizes this process, reduces setup time, and ensures consistency across implementations.',
  'Troubleshoot mobile app crashes': 'App crash reports are high-priority issues that often follow common patterns. This article provides standard troubleshooting steps that resolve most cases without agent intervention, improving resolution time.',
  'Fix data sync issues between devices': 'Data synchronization issues are recurring technical problems with well-documented solutions. A standardized procedure ensures quick resolution and reduces back-and-forth troubleshooting with customers.',
};

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const CONVERSATIONS_BY_TOPIC: Record<string, Message[]> = {
  'Inquiring about the size of delivery boxes': [
    { text: "Hi, I'm interested in ordering a dining table. Can you tell me about the size of the delivery boxes?", isUser: true, timestamp: "Mar 03, 10:22 PM" },
    { text: "Hello! I'd be happy to help with that. Our dining tables typically come in 2-3 boxes. The dimensions vary by model, but most are around 60\" x 40\" x 8\".", isUser: false, timestamp: "Mar 03, 10:22 PM" },
    { text: "That's quite large. I'm worried about getting them up to my third-floor apartment.", isUser: true, timestamp: "Mar 03, 10:23 PM" },
    { text: "I understand your concern. Our delivery team is experienced with stairs and tight spaces. They'll bring the boxes to your apartment and can even help with assembly if needed.", isUser: false, timestamp: "Mar 03, 10:23 PM" },
  ],
  'How do I make a return for large items?': [
    { text: "I need to return a sectional sofa I ordered last month. How does the return process work for large furniture?", isUser: true, timestamp: "Mar 05, 2:15 PM" },
    { text: "I can help you with that return. For large items like sectionals, we arrange a pickup from your home. Can you provide your order number?", isUser: false, timestamp: "Mar 05, 2:15 PM" },
    { text: "Yes, it's order #78945", isUser: true, timestamp: "Mar 05, 2:16 PM" },
    { text: "Thank you! I've located your order. I'll schedule a pickup for next Tuesday between 10 AM and 2 PM. Our team will disassemble and remove the sofa. You'll receive a full refund within 5-7 business days.", isUser: false, timestamp: "Mar 05, 2:16 PM" },
  ],
  'Will the item fit through the door?': [
    { text: "I'm interested in the king-size bed frame, but I'm worried it won't fit through my bedroom door. How can I check?", isUser: true, timestamp: "Mar 07, 9:30 AM" },
    { text: "Great question! The bed frame ships disassembled, so individual pieces are much smaller. The largest piece is the headboard at 78\" x 4\" x 52\". Could you measure your doorway?", isUser: false, timestamp: "Mar 07, 9:31 AM" },
    { text: "My door is 32 inches wide and 80 inches tall.", isUser: true, timestamp: "Mar 07, 9:32 AM" },
    { text: "Perfect! The headboard will fit through easily when turned on its side. All other pieces are smaller, so you won't have any issues with delivery or assembly.", isUser: false, timestamp: "Mar 07, 9:32 AM" },
  ],
  'Does Insurance cover Pet damage?': [
    { text: "I have two cats and I'm worried about them scratching my new sofa. Does your furniture protection plan cover pet damage?", isUser: true, timestamp: "Mar 08, 3:45 PM" },
    { text: "Yes! Our Premium Protection Plan covers accidental damage including pet scratches, stains, and tears. It's available for $99 and covers your furniture for 5 years.", isUser: false, timestamp: "Mar 08, 3:45 PM" },
    { text: "That sounds good. What exactly is covered?", isUser: true, timestamp: "Mar 08, 3:46 PM" },
    { text: "The plan covers pet damage, spills, burns, rips, and structural issues. We'll either repair or replace the item at no additional cost. Would you like to add it to your order?", isUser: false, timestamp: "Mar 08, 3:46 PM" },
  ],
  'What if I don\'t like the color in real life': [
    { text: "I'm thinking about ordering the gray accent chair, but what if the color looks different in person?", isUser: true, timestamp: "Mar 10, 11:20 AM" },
    { text: "We offer a 30-day home trial! If the color isn't what you expected, you can return or exchange it within 30 days for a full refund.", isUser: false, timestamp: "Mar 10, 11:20 AM" },
    { text: "Oh that's reassuring. Is there a restocking fee?", isUser: true, timestamp: "Mar 10, 11:21 AM" },
    { text: "No restocking fees at all! We want you to be completely happy with your purchase. We'll even arrange free pickup if you decide to return it.", isUser: false, timestamp: "Mar 10, 11:21 AM" },
  ],
  'Do you provide sample swatches before I order?': [
    { text: "I'm interested in your velvet sofa collection. Do you offer fabric samples so I can see the material in person?", isUser: true, timestamp: "Mar 12, 4:10 PM" },
    { text: "Absolutely! We offer free fabric swatches for all our upholstery options. You can order up to 5 swatches at no charge.", isUser: false, timestamp: "Mar 12, 4:10 PM" },
    { text: "That's perfect! How long does it take to receive them?", isUser: true, timestamp: "Mar 12, 4:11 PM" },
    { text: "Swatches typically arrive within 5-7 business days. I can send you a link to order them right now, or I can add them to your account. Which would you prefer?", isUser: false, timestamp: "Mar 12, 4:11 PM" },
  ],
  'Requesting information on what colors would go with my current living space': [
    { text: "I have beige walls and a dark wood floor. What color dining chairs would you recommend?", isUser: true, timestamp: "Mar 14, 1:30 PM" },
    { text: "With beige walls and dark wood floors, you have lots of options! Navy blue or forest green would add a rich, sophisticated contrast. For something lighter, cream or light gray would keep things airy.", isUser: false, timestamp: "Mar 14, 1:30 PM" },
    { text: "I like the idea of navy blue. Do you have any in that color?", isUser: true, timestamp: "Mar 14, 1:31 PM" },
    { text: "Yes! Our Harbor Collection has beautiful navy velvet dining chairs that would look stunning with your décor. I can send you a link to view them. Would that be helpful?", isUser: false, timestamp: "Mar 14, 1:31 PM" },
  ],
  'Can I get expedited shipping?': [
    { text: "I need a coffee table delivered by next Friday for a housewarming party. Is expedited shipping available?", isUser: true, timestamp: "Mar 15, 10:00 AM" },
    { text: "I'll check availability for you! Which coffee table are you interested in?", isUser: false, timestamp: "Mar 15, 10:00 AM" },
    { text: "The modern marble top coffee table.", isUser: true, timestamp: "Mar 15, 10:01 AM" },
    { text: "Great choice! Yes, that item is in stock and we can offer expedited delivery. For an additional $149, we can guarantee delivery by next Thursday. Would that work for you?", isUser: false, timestamp: "Mar 15, 10:01 AM" },
  ],
  'How to track my order?': [
    { text: "I ordered a dresser last week. How can I track my order?", isUser: true, timestamp: "Mar 16, 2:45 PM" },
    { text: "I can help you with that! Can you provide your order number or the email address you used for the order?", isUser: false, timestamp: "Mar 16, 2:45 PM" },
    { text: "My order number is #45892", isUser: true, timestamp: "Mar 16, 2:46 PM" },
    { text: "Thank you! Your dresser is currently in transit and scheduled for delivery on March 20th. I've sent a tracking link to your email. You can also track it anytime by logging into your account.", isUser: false, timestamp: "Mar 16, 2:46 PM" },
  ],
  'What is your return policy?': [
    { text: "What's your return policy if I'm not satisfied with my purchase?", isUser: true, timestamp: "Mar 18, 5:20 PM" },
    { text: "We offer a 30-day home trial on all furniture. If you're not completely satisfied, you can return it for a full refund within 30 days of delivery.", isUser: false, timestamp: "Mar 18, 5:20 PM" },
    { text: "Do I have to pay for return shipping?", isUser: true, timestamp: "Mar 18, 5:21 PM" },
    { text: "No, return shipping is free! We'll arrange pickup from your home at no charge. The item just needs to be in its original condition with all parts included.", isUser: false, timestamp: "Mar 18, 5:21 PM" },
  ],
  'Do you offer international shipping?': [
    { text: "I'm moving to Canada next month. Do you ship internationally?", isUser: true, timestamp: "Mar 20, 8:15 AM" },
    { text: "Yes, we do ship to Canada! Shipping costs and delivery times vary based on location and item size. Where in Canada will you be located?", isUser: false, timestamp: "Mar 20, 8:15 AM" },
    { text: "Toronto, Ontario", isUser: true, timestamp: "Mar 20, 8:16 AM" },
    { text: "Perfect! We regularly ship to Toronto. Delivery typically takes 10-15 business days. I can provide a shipping quote once you select your items. Please note that customs fees may apply.", isUser: false, timestamp: "Mar 20, 8:16 AM" },
  ],
  'How can I change my delivery address?': [
    { text: "I need to change my delivery address. I moved last week and forgot to update it on my order.", isUser: true, timestamp: "Mar 22, 11:30 AM" },
    { text: "I can help with that! Can you provide your order number so I can check the status?", isUser: false, timestamp: "Mar 22, 11:30 AM" },
    { text: "It's order #67234", isUser: true, timestamp: "Mar 22, 11:31 AM" },
    { text: "Thank you! Your order hasn't shipped yet, so I can update the address. What's the new delivery address?", isUser: false, timestamp: "Mar 22, 11:31 AM" },
    { text: "456 Oak Street, Apartment 3B, Seattle, WA 98101", isUser: true, timestamp: "Mar 22, 11:32 AM" },
    { text: "Perfect! I've updated your delivery address to 456 Oak Street, Apartment 3B, Seattle, WA 98101. You'll receive a confirmation email shortly.", isUser: false, timestamp: "Mar 22, 11:32 AM" },
  ],
  'What payment methods do you accept?': [
    { text: "What payment methods do you accept? Can I use PayPal?", isUser: true, timestamp: "Mar 23, 3:00 PM" },
    { text: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and we also offer financing through Affirm.", isUser: false, timestamp: "Mar 23, 3:00 PM" },
    { text: "Great! Tell me more about the Affirm financing option.", isUser: true, timestamp: "Mar 23, 3:01 PM" },
    { text: "With Affirm, you can split your purchase into monthly payments. For purchases over $500, you can choose 6, 12, or 24-month payment plans. Rates start as low as 0% APR based on your credit.", isUser: false, timestamp: "Mar 23, 3:01 PM" },
  ],
  'Is assembly included with delivery?': [
    { text: "I'm ordering a bedroom set. Is assembly included with delivery?", isUser: true, timestamp: "Mar 25, 9:45 AM" },
    { text: "Yes! White glove delivery with full assembly is included for all bedroom sets. Our team will unpack, assemble, and place everything exactly where you want it.", isUser: false, timestamp: "Mar 25, 9:45 AM" },
    { text: "That's wonderful! Will they also remove the packaging materials?", isUser: true, timestamp: "Mar 25, 9:46 AM" },
    { text: "Absolutely! They'll remove all packaging, boxes, and materials, leaving your space clean and ready to enjoy your new furniture.", isUser: false, timestamp: "Mar 25, 9:46 AM" },
  ],
  'How long is the warranty?': [
    { text: "What kind of warranty comes with your furniture?", isUser: true, timestamp: "Mar 26, 1:15 PM" },
    { text: "All our furniture comes with a 1-year manufacturer's warranty covering defects in materials and workmanship. Some items have extended warranties up to 10 years on structural components.", isUser: false, timestamp: "Mar 26, 1:15 PM" },
    { text: "What about the upholstery?", isUser: true, timestamp: "Mar 26, 1:16 PM" },
    { text: "Upholstered furniture has a 1-year warranty on fabric and cushions. We also offer an optional Premium Protection Plan that extends coverage to 5 years and includes accidental damage.", isUser: false, timestamp: "Mar 26, 1:16 PM" },
  ],
  'Can I cancel my order?': [
    { text: "I placed an order yesterday but need to cancel it. Is that possible?", isUser: true, timestamp: "Mar 27, 4:30 PM" },
    { text: "I can help with that! Can you provide your order number?", isUser: false, timestamp: "Mar 27, 4:30 PM" },
    { text: "Order #89123", isUser: true, timestamp: "Mar 27, 4:31 PM" },
    { text: "Let me check the status... Good news! Your order hasn't been processed yet, so I can cancel it for you right now. You'll receive a full refund within 3-5 business days.", isUser: false, timestamp: "Mar 27, 4:31 PM" },
  ],
  'Do you price match?': [
    { text: "I found the same dining table at another store for $200 less. Do you price match?", isUser: true, timestamp: "Mar 28, 10:00 AM" },
    { text: "Yes, we do offer price matching! We'll match any competitor's price on identical items. Can you provide me with the competitor's information and their current price?", isUser: false, timestamp: "Mar 28, 10:00 AM" },
    { text: "It's at FurnitureStore.com for $799", isUser: true, timestamp: "Mar 28, 10:01 AM" },
    { text: "Thank you! Let me verify that it's the exact same model... Yes, I can confirm it's identical. I'll match their price of $799. Would you like to complete your order now?", isUser: false, timestamp: "Mar 28, 10:02 AM" },
  ],
  'Are there any current promotions?': [
    { text: "Do you have any sales or promotions running right now?", isUser: true, timestamp: "Mar 29, 2:20 PM" },
    { text: "Yes! We currently have 20% off all bedroom furniture and 15% off when you purchase a complete dining set. These promotions run through the end of the month.", isUser: false, timestamp: "Mar 29, 2:20 PM" },
    { text: "Perfect! I was looking at bedroom furniture. Does the sale apply to all bed frames?", isUser: true, timestamp: "Mar 29, 2:21 PM" },
    { text: "Yes, the 20% discount applies to all bed frames, dressers, nightstands, and bedroom sets. The discount will be automatically applied at checkout!", isUser: false, timestamp: "Mar 29, 2:21 PM" },
  ],
  'How do I apply a discount code?': [
    { text: "I have a discount code. Where do I enter it during checkout?", isUser: true, timestamp: "Mar 30, 5:45 PM" },
    { text: "You can enter your discount code on the checkout page. There's a 'Promo Code' field right above the order summary. Just type it in and click 'Apply'.", isUser: false, timestamp: "Mar 30, 5:45 PM" },
    { text: "I tried but it says the code is invalid.", isUser: true, timestamp: "Mar 30, 5:46 PM" },
    { text: "Let me help you with that. What's the code you're trying to use? I can check if it's still active and applicable to your items.", isUser: false, timestamp: "Mar 30, 5:46 PM" },
  ],
  'What if my item arrives damaged?': [
    { text: "What should I do if my furniture arrives damaged?", isUser: true, timestamp: "Apr 01, 9:00 AM" },
    { text: "I'm sorry to hear that! Please inspect your delivery upon arrival. If there's any damage, take photos and contact us within 48 hours. We'll arrange a replacement or repair at no cost to you.", isUser: false, timestamp: "Apr 01, 9:00 AM" },
    { text: "Do I need to keep the damaged item?", isUser: true, timestamp: "Apr 01, 9:01 AM" },
    { text: "Yes, please keep the damaged item and all packaging until we can arrange pickup. We'll send a replacement and our team will collect the damaged piece when they deliver the new one.", isUser: false, timestamp: "Apr 01, 9:01 AM" },
  ],
  'Can I schedule a specific delivery time?': [
    { text: "Can I choose a specific time for delivery? I work during the day.", isUser: true, timestamp: "Apr 02, 11:15 AM" },
    { text: "Yes! We offer delivery time windows. You can choose morning (8 AM - 12 PM), afternoon (12 PM - 4 PM), or evening (4 PM - 8 PM) slots based on availability in your area.", isUser: false, timestamp: "Apr 02, 11:15 AM" },
    { text: "Perfect! I'd prefer an evening delivery. Is there an extra charge?", isUser: true, timestamp: "Apr 02, 11:16 AM" },
    { text: "Evening delivery is available for an additional $49. Once you place your order, you'll receive a call to schedule your preferred time window.", isUser: false, timestamp: "Apr 02, 11:16 AM" },
  ],
  'Do you have a showroom I can visit?': [
    { text: "Do you have a physical showroom where I can see the furniture in person?", isUser: true, timestamp: "Apr 03, 3:30 PM" },
    { text: "Yes! We have showrooms in several cities. Where are you located?", isUser: false, timestamp: "Apr 03, 3:30 PM" },
    { text: "I'm in Los Angeles", isUser: true, timestamp: "Apr 03, 3:31 PM" },
    { text: "Great! We have a showroom in West Hollywood at 8500 Melrose Ave. We're open Monday-Saturday 10 AM - 7 PM, and Sunday 11 AM - 6 PM. No appointment needed!", isUser: false, timestamp: "Apr 03, 3:31 PM" },
  ],
  'How do I care for my furniture?': [
    { text: "I just received my leather sofa. How should I care for it?", isUser: true, timestamp: "Apr 04, 1:00 PM" },
    { text: "Congratulations on your new sofa! For leather, wipe spills immediately with a soft, dry cloth. Clean monthly with a leather cleaner and condition every 6 months to prevent drying.", isUser: false, timestamp: "Apr 04, 1:00 PM" },
    { text: "Should I keep it away from sunlight?", isUser: true, timestamp: "Apr 04, 1:01 PM" },
    { text: "Yes, direct sunlight can fade and dry out leather over time. Try to position it away from windows, or use curtains during peak sun hours. I can email you our complete care guide if you'd like!", isUser: false, timestamp: "Apr 04, 1:01 PM" },
  ],
  'What materials are used?': [
    { text: "What materials is the Coastal Dining Table made from?", isUser: true, timestamp: "Apr 05, 10:30 AM" },
    { text: "The Coastal Dining Table features a solid oak wood top with a natural oil finish, and the base is made from powder-coated steel for durability.", isUser: false, timestamp: "Apr 05, 10:30 AM" },
    { text: "Is the wood sustainably sourced?", isUser: true, timestamp: "Apr 05, 10:31 AM" },
    { text: "Yes! All our wood is FSC-certified, meaning it comes from responsibly managed forests. We're committed to sustainable and ethical sourcing for all our materials.", isUser: false, timestamp: "Apr 05, 10:31 AM" },
  ],
  'Is customization available?': [
    { text: "Can I customize the fabric on your sectional sofas?", isUser: true, timestamp: "Apr 06, 2:15 PM" },
    { text: "Absolutely! Most of our sofas and sectionals are available in multiple fabric options. Which sectional are you interested in?", isUser: false, timestamp: "Apr 06, 2:15 PM" },
    { text: "The Cloud Sectional", isUser: true, timestamp: "Apr 06, 2:16 PM" },
    { text: "Great choice! The Cloud Sectional is available in 12 different fabrics including velvet, linen, and performance fabrics. You can also choose the leg finish. I can send you our fabric swatch collection!", isUser: false, timestamp: "Apr 06, 2:16 PM" },
  ],
  'How long will delivery take?': [
    { text: "How long does delivery typically take after I place an order?", isUser: true, timestamp: "Apr 07, 4:45 PM" },
    { text: "Delivery time varies by item. In-stock items typically deliver within 1-2 weeks. Made-to-order pieces take 4-8 weeks. Which item are you interested in?", isUser: false, timestamp: "Apr 07, 4:45 PM" },
    { text: "The Brighton Coffee Table", isUser: true, timestamp: "Apr 07, 4:46 PM" },
    { text: "The Brighton Coffee Table is currently in stock! You can expect delivery within 7-10 business days. We'll contact you to schedule a specific delivery date once your order is placed.", isUser: false, timestamp: "Apr 07, 4:46 PM" },
  ],
  'Can I modify my order after placing it?': [
    { text: "I placed an order an hour ago but want to change the color. Is that possible?", isUser: true, timestamp: "Apr 08, 11:20 AM" },
    { text: "I'll check if we can modify it! What's your order number?", isUser: false, timestamp: "Apr 08, 11:20 AM" },
    { text: "Order #91845", isUser: true, timestamp: "Apr 08, 11:21 AM" },
    { text: "Good news! Your order hasn't entered production yet. I can update the color for you. What color would you like instead?", isUser: false, timestamp: "Apr 08, 11:21 AM" },
  ],
  'Do you offer financing options?': [
    { text: "Do you offer any financing plans? I want to buy a bedroom set but would like to pay over time.", isUser: true, timestamp: "Apr 09, 9:30 AM" },
    { text: "Yes! We partner with Affirm to offer flexible financing. You can split purchases over $500 into monthly payments with rates as low as 0% APR.", isUser: false, timestamp: "Apr 09, 9:30 AM" },
    { text: "How does the approval process work?", isUser: true, timestamp: "Apr 09, 9:31 AM" },
    { text: "It's quick and easy! During checkout, select Affirm as your payment method. You'll get an instant decision with no impact to your credit score. Most customers are approved within seconds.", isUser: false, timestamp: "Apr 09, 9:31 AM" },
  ],
  'What are your business hours?': [
    { text: "What are your customer service hours?", isUser: true, timestamp: "Apr 10, 6:00 PM" },
    { text: "Our customer service team is available Monday through Friday, 9 AM to 8 PM EST, and Saturday-Sunday, 10 AM to 6 PM EST.", isUser: false, timestamp: "Apr 10, 6:00 PM" },
    { text: "Can I place orders outside those hours?", isUser: true, timestamp: "Apr 10, 6:01 PM" },
    { text: "Absolutely! You can place orders on our website 24/7. If you need assistance, you can also use our live chat which is available anytime, or leave us a message and we'll respond within 24 hours.", isUser: false, timestamp: "Apr 10, 6:01 PM" },
  ],
  'How can I contact customer service?': [
    { text: "What's the best way to contact customer service?", isUser: true, timestamp: "Apr 11, 10:15 AM" },
    { text: "You can reach us several ways! Live chat (like this) is available 24/7. You can also call us at 1-800-FURNITURE (1-800-387-6488) or email support@furniture.com.", isUser: false, timestamp: "Apr 11, 10:15 AM" },
    { text: "Do you have social media support?", isUser: true, timestamp: "Apr 11, 10:16 AM" },
    { text: "Yes! We're active on Facebook, Instagram, and Twitter. Send us a DM and our social team typically responds within 2-3 hours during business hours.", isUser: false, timestamp: "Apr 11, 10:16 AM" },
  ],
  'Can I leave special delivery instructions?': [
    { text: "I have a specific gate code and parking instructions for delivery. Where can I add those details?", isUser: true, timestamp: "Apr 12, 3:20 PM" },
    { text: "Great question! You can add delivery instructions during checkout in the 'Special Instructions' field. You can also call us after placing your order to add or update instructions.", isUser: false, timestamp: "Apr 12, 3:20 PM" },
    { text: "Perfect! My building is tricky to find so I want to make sure the delivery team has all the details.", isUser: true, timestamp: "Apr 12, 3:21 PM" },
    { text: "Absolutely! Please include gate codes, parking info, building entry instructions, and your phone number. Our delivery team will also call you 30 minutes before arrival to confirm.", isUser: false, timestamp: "Apr 12, 3:21 PM" },
  ],
};

export default function TestingWidget({ collapsed: controlledCollapsed, onToggle, isReady = false, contentDetails, conversationDetails, onApprove, onReject, onConversationClose }: TestingWidgetProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);
  const [visibilityOption, setVisibilityOption] = useState<'everyone' | 'segment'>('segment');

  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const getRationale = (title: string): string => {
    return RATIONALE_MAP[title] || 'This content addresses frequently asked questions and common support scenarios, helping to improve automation coverage and reduce manual agent workload.';
  };

  // Auto-expand when content or conversation is selected
  useEffect(() => {
    if (contentDetails || conversationDetails) {
      if (onToggle && collapsed) {
        onToggle();
      } else if (!onToggle) {
        setInternalCollapsed(false);
      }
    }
  }, [contentDetails, conversationDetails]);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const handleBack = () => {
    if (conversationDetails && onConversationClose) {
      onConversationClose();
    } else if (contentDetails && onApprove) {
      onApprove();
    }
  };

  return (
    <WidgetContainer $collapsed={collapsed}>
      {!contentDetails && !conversationDetails && (
        <BackgroundGradient $isVisible={isReady && !collapsed}>
          <PurpleShape $delay={0} />
          <BlueShape $delay={2} />
          <OrangeShape $delay={1} />
        </BackgroundGradient>
      )}
      <Header $collapsed={collapsed}>
        <HeaderContent $collapsed={collapsed}>
          {collapsed ? (
            <IconButton $dark $rotate onClick={handleToggle}>
              <CollapseActiveIcon />
            </IconButton>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {(contentDetails || conversationDetails) && (
                  <IconButton onClick={handleBack}>
                    <ChevronLeftIcon />
                  </IconButton>
                )}
                <HeaderTitle>
                  {contentDetails
                    ? `${contentDetails.type.charAt(0).toUpperCase() + contentDetails.type.slice(1)} details`
                    : conversationDetails
                    ? 'Conversation preview'
                    : 'Preview'}
                </HeaderTitle>
              </div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {!contentDetails && !conversationDetails && (
                  <IconButton>
                    <HistoryIcon />
                  </IconButton>
                )}
                <IconButton $rotate onClick={handleToggle}>
                  <CollapseDefaultIcon />
                </IconButton>
              </div>
            </>
          )}
        </HeaderContent>
      </Header>

      {contentDetails ? (
        <>
          <DetailsContent $collapsed={collapsed} key={`details-content-${contentDetails.title}`}>
            <DetailsTopSection>
              <DetailsTopicLabel>Topic: {contentDetails.topic}</DetailsTopicLabel>
              <DetailsMainTitle>{contentDetails.title}</DetailsMainTitle>
              <TagsRow>
                <StyledTag size="small">
                  <span>8% Estimated automation</span>
                </StyledTag>
                <ContentTypeBadge $type={contentDetails.type}>
                  {contentDetails.type === 'article' ? <TagArticleIcon /> : <TagProcedureIcon />}
                  <span>{contentDetails.type === 'article' ? 'Article' : 'Procedure'}</span>
                </ContentTypeBadge>
              </TagsRow>
            </DetailsTopSection>

            <RationaleSection>
              <RationaleTitle>Rationale</RationaleTitle>
              <RationaleText>
                {getRationale(contentDetails.title)}
              </RationaleText>
            </RationaleSection>

            <AccordionContainer>
              <AccordionItem>
                <AccordionHeader $isOpen={placementOpen} onClick={() => setPlacementOpen(!placementOpen)}>
                  Placement
                  <ChevronDownIcon />
                </AccordionHeader>
                <AccordionContent $isOpen={placementOpen} style={{ gap: '4px' }}>
                  <AccordionContentTitle>Categories and sections</AccordionContentTitle>
                  <AccordionContentDescription>
                    Select where you want to publish the article.
                  </AccordionContentDescription>
                  <div style={{ marginTop: '4px' }}>
                    <OutlineButton>Manage sections</OutlineButton>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem>
                <AccordionHeader $isOpen={permissionsOpen} onClick={() => setPermissionsOpen(!permissionsOpen)}>
                  Viewing permissions
                  <ChevronDownIcon />
                </AccordionHeader>
                <AccordionContent $isOpen={permissionsOpen} style={{ gap: '20px' }}>
                  <AccordionContentDescription>
                    Select who can view this article based on user segments.
                  </AccordionContentDescription>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div onClick={() => setVisibilityOption('segment')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RadioButton $selected={visibilityOption === 'segment'} />
                        <RadioLabel>Only visible to the selected user segments</RadioLabel>
                      </div>
                      <AccordionContentDescription>Select up to 10 user segments.</AccordionContentDescription>
                      {visibilityOption === 'segment' && (
                        <InputWithTagsContainer style={{ marginTop: '4px' }}>
                          <InputTag>
                            <span>Everyone</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              aria-label="Remove Everyone"
                            >
                              <TagXIcon />
                            </button>
                          </InputTag>
                          <InputChevronIcon>
                            <InputChevronDownIcon />
                          </InputChevronIcon>
                        </InputWithTagsContainer>
                      )}
                    </div>

                    <RadioOption $selected={visibilityOption === 'everyone'} onClick={() => setVisibilityOption('everyone')}>
                      <RadioButton $selected={visibilityOption === 'everyone'} />
                      <RadioLabel>Visible to everyone</RadioLabel>
                    </RadioOption>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </AccordionContainer>

            <SampleNote>
              Based on a sample of 48,200 tickets from July 16, 2025 to July 23, 2025.
            </SampleNote>
          </DetailsContent>
          <DetailsFooter $collapsed={collapsed}>
            <RejectButton onClick={onReject}>Reject</RejectButton>
            <ApproveButton onClick={onApprove}>Review</ApproveButton>
          </DetailsFooter>
        </>
      ) : conversationDetails ? (
        <DetailsContent $collapsed={collapsed} key={`conversation-${conversationDetails.name}`}>
          {(CONVERSATIONS_BY_TOPIC[conversationDetails.name] || []).map((message, index) => (
            <MessageBubble key={index} $isUser={message.isUser}>
              <MessageAvatar>
                {message.isUser ? <ChatUserAvatarIcon /> : <ChatBotAvatarIcon />}
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>
                  <MessageSender>{message.isUser ? 'Test user' : 'AI agent'}</MessageSender>
                  <MessageTimestamp>{message.timestamp}</MessageTimestamp>
                </MessageHeader>
                <BubbleContent $isUser={message.isUser}>
                  {message.text}
                </BubbleContent>
              </MessageContent>
            </MessageBubble>
          ))}
        </DetailsContent>
      ) : (
        <>
          <Content $collapsed={collapsed} key={`content-${isReady}`}>
            <EmptyState>
              <IconWrapper>
                {isReady ? <NoticeZendeskIcon /> : <NoticeWarningIcon />}
              </IconWrapper>
              <EmptyStateTitle>
                {isReady ? 'Your AI Agent is ready to test' : 'Connect knowledge'}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {isReady
                  ? 'Your content may still be processing, some answers might be inaccurate until this is complete.'
                  : 'Select a brand and add knowledge sources to your AI agent. Then ask it questions to preview its responses.'
                }
              </EmptyStateDescription>
            </EmptyState>
          </Content>

          <Footer $collapsed={collapsed} key={`footer-${isReady}`}>
            <InputContainer $isEnabled={isReady}>
              <InputWrapper>
                <InputPlaceholder $isEnabled={isReady}>
                  {isReady ? 'Type a message' : 'Conversation is not active yet...'}
                </InputPlaceholder>
              </InputWrapper>
              <SendButton disabled={!isReady} $isEnabled={isReady}>
                {isReady ? <SendDefaultIcon /> : <SendDisabledIcon />}
              </SendButton>
            </InputContainer>
          </Footer>
        </>
      )}
    </WidgetContainer>
  );
}
