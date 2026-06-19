import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';

// Import icons
import CollapseActiveIcon from '../assets/icons/testing-widget-collapse-active.svg?react';
import CollapseDefaultIcon from '../assets/icons/testing-widget-collapse-default.svg?react';
import HistoryIcon from '../assets/icons/testing-widget-history.svg?react';
import NoticeWarningIcon from '../assets/icons/testing-widget-notice-warning.svg?react';
import NoticeZendeskIcon from '../assets/icons/testing-widget-notice-zendesk.svg?react';
import SendDisabledIcon from '../assets/icons/testing-widget-send-disabled.svg?react';
import SendDefaultIcon from '../assets/icons/testing-widget-send-default.svg?react';
import ChevronDownIcon from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg?react';

const WidgetContainer = styled.div<{ $collapsed: boolean }>`
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-xl, 16px);
  display: flex;
  flex-direction: column;
  height: 100%;
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

const DetailsContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md, 20px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md, 20px);
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

interface TestingWidgetProps {
  collapsed?: boolean;
  onToggle?: () => void;
  isReady?: boolean;
  contentDetails?: {type: 'article' | 'procedure', title: string, topic: string} | null;
  onApprove?: () => void;
  onReject?: () => void;
}

export default function TestingWidget({ collapsed: controlledCollapsed, onToggle, isReady = false, contentDetails, onApprove, onReject }: TestingWidgetProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const [placementOpen, setPlacementOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);

  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  return (
    <WidgetContainer $collapsed={collapsed}>
      {!contentDetails && (
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
              <HeaderTitle>{contentDetails ? `${contentDetails.type.charAt(0).toUpperCase() + contentDetails.type.slice(1)} details` : 'Preview'}</HeaderTitle>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {!contentDetails && (
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
          <DetailsContent>
            <DetailsSection>
              <DetailsTypeLabel>{contentDetails.type} details</DetailsTypeLabel>
              <DetailsSectionValue style={{ fontSize: '20px', lineHeight: '24px', letterSpacing: '-0.45px' }}>
                {contentDetails.title}
              </DetailsSectionValue>
            </DetailsSection>

            <DetailsSection>
              <DetailsSectionLabel>Topic</DetailsSectionLabel>
              <DetailsSectionValue>{contentDetails.topic}</DetailsSectionValue>
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
            <RejectButton onClick={onReject}>Reject</RejectButton>
            <ApproveButton onClick={onApprove}>Approve</ApproveButton>
          </DetailsFooter>
        </>
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
