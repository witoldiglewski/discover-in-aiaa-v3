import styled, { keyframes } from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';

// Custom checkbox components
const CustomCheckboxContainer = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin: 0;
  z-index: 1;
`;

const CheckboxBox = styled.div<{ $checked: boolean }>`
  position: absolute;
  inset: 0;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${props => props.$checked ? '#2f3130' : '#8b8e89'};
  background: ${props => props.$checked ? '#2f3130' : 'white'};
  transition: all 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  ${HiddenCheckbox}:hover ~ & {
    ${props => !props.$checked && `
      background: rgba(64, 108, 196, 0.08);
      border-color: #406cc4;
    `}
    ${props => props.$checked && `
      background: #404241;
      border-color: #404241;
    `}
  }

  ${HiddenCheckbox}:active ~ & {
    ${props => !props.$checked && `
      background: rgba(64, 108, 196, 0.16);
      border-color: #406cc4;
    `}
    ${props => props.$checked && `
      background: #646864;
      border-color: #646864;
    `}
  }

  svg {
    width: 8px;
    height: 6px;

    path {
      fill: white;
    }
  }
`;

// Import icons
import ChevronLeftIcon from '../assets/icons/buttons-chevron-left.svg?react';
import ChevronRightDefaultIcon from '../assets/icons/buttons-chevron-right-default.svg?react';
import CloseSmallIcon from '../assets/icons/buttons-close-small.svg?react';
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';
import CheckboxCheckIcon from '../assets/icons/checkbox-check.svg?react';
import ChannelAndroidIcon from '../assets/icons/channel-android.svg?react';
import ChannelIosSkdIcon from '../assets/icons/channel-ios-skd.svg?react';
import ChannelWebWidgetIcon from '../assets/icons/channel-web-widget.svg?react';

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
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
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

const ChannelsSection = styled.div<{ $delay?: number }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$delay || 0}s;
`;

const FieldLabel = styled.h3`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3941);
  margin: 0;
`;

const ChannelsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  width: 100%;
`;

const ChannelCard = styled.div<{ $selected: boolean }>`
  background: var(--bg-default, white);
  border: 1px solid ${props => props.$selected ? 'var(--border-emphasis, #8b8e89)' : 'var(--border-subtle, #eae9e8)'};
  border-radius: var(--border-radii-lg, 12px);
  padding: var(--spacing-md, 20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  position: relative;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ChannelIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const ChannelText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ChannelName = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #2f3941;
  margin: 0;
`;

const ChannelType = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #2f3941;
  margin: 0;
`;

const StyledCheckboxCheckIcon = styled(CheckboxCheckIcon)`
  width: 10px;
  height: 10px;

  path {
    fill: white;
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

const ActivateButton = styled(Button)`
  && {
    height: 40px;
    padding: 10px 16px;
    border-radius: var(--border-radii-pill, 99px);
    background: var(--button-bg-emphasis, #2f3130);
    color: var(--fg-onemphasis, white);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover:not(:disabled) {
      background: var(--button-bg-emphasis-hover, #404241);
    }

    &:active:not(:disabled) {
      background: var(--button-bg-emphasis, #2f3130);
    }

    &:disabled {
      background: var(--bg-disabled, rgba(100, 104, 100, 0.08));
      color: var(--fg-disabled, #8b8e89);
      cursor: not-allowed;

      svg path {
        fill: var(--fg-disabled, #8b8e89);
      }
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
  font-weight: ${props => props.$isCurrent ? '600' : '400'};
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

const CHANNELS = [
  { id: 'web-widget', name: "Joe's Coffee - Web chat", type: 'Web Widget', icon: 'web' },
  { id: 'ios-sdk', name: 'Bean There Rewards (iOS)', type: 'iOS SDK', icon: 'ios' },
  { id: 'android-sdk', name: 'Bean There Rewards (Android)', type: 'Android SDK', icon: 'android' },
];

interface ActivateAgentProps {
  selectedChannels: string[];
  setSelectedChannels: (channels: string[]) => void;
}

export default function ActivateAgent({ selectedChannels, setSelectedChannels }: ActivateAgentProps) {
  const handleChannelToggle = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      setSelectedChannels(selectedChannels.filter(id => id !== channelId));
    } else {
      setSelectedChannels([...selectedChannels, channelId]);
    }
  };

  const steps = [
    { label: 'Connect', isCurrent: false },
    { label: 'Personalize', isCurrent: false },
    { label: 'Optimize', isCurrent: false },
    { label: 'Test', isCurrent: false },
    { label: 'Activate', isCurrent: true },
  ];

  return (
    <ContentRow>
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
        <MainPanelContent>
          <SectionTitle>Activate your AI agent</SectionTitle>

          <ChannelsSection $delay={0}>
            <FieldLabel>Select messaging channels for activation</FieldLabel>
            <ChannelsList>
              {CHANNELS.map((channel) => {
                const isSelected = selectedChannels.includes(channel.id);
                const IconComponent = channel.icon === 'web' ? ChannelWebWidgetIcon :
                                    channel.icon === 'ios' ? ChannelIosSkdIcon :
                                    ChannelAndroidIcon;

                return (
                  <ChannelCard
                    key={channel.id}
                    $selected={isSelected}
                    onClick={() => handleChannelToggle(channel.id)}
                  >
                    <ChannelInfo>
                      <ChannelIconWrapper>
                        <IconComponent />
                      </ChannelIconWrapper>
                      <ChannelText>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelType>{channel.type}</ChannelType>
                      </ChannelText>
                    </ChannelInfo>
                    <CustomCheckboxContainer>
                      <HiddenCheckbox
                        checked={isSelected}
                        onChange={() => {}}
                        aria-label={`Select ${channel.name}`}
                      />
                      <CheckboxBox $checked={isSelected}>
                        {isSelected && <StyledCheckboxCheckIcon />}
                      </CheckboxBox>
                    </CustomCheckboxContainer>
                  </ChannelCard>
                );
              })}
            </ChannelsList>
          </ChannelsSection>
        </MainPanelContent>
      </MainPanel>
    </ContentRow>
  );
}

// Export Header component for use in MainContent
export function ActivateAgentHeader() {
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
interface ActivateAgentFooterProps {
  onBack?: () => void;
  onActivate?: () => void;
  hasSelectedChannels?: boolean;
}

export function ActivateAgentFooter({ onBack, onActivate, hasSelectedChannels = false }: ActivateAgentFooterProps) {
  return (
    <Footer>
      <BackButton onClick={onBack}>
        <ChevronLeftIcon />
        <span>Back</span>
      </BackButton>
      <ActivateButton
        onClick={hasSelectedChannels ? onActivate : undefined}
        disabled={!hasSelectedChannels}
      >
        <span>Finish and activate</span>
        <ChevronRightDefaultIcon />
      </ActivateButton>
    </Footer>
  );
}
