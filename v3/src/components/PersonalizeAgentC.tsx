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
import ChevronDownIcon from '../assets/icons/systrem-prepplies-chevron.svg?react';
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';



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

const SystemRepliesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
  padding: 0 var(--spacing-xxs, 4px);
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 20px;
`;

const LabelText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  padding: 0 1px;
`;

const OptionalTag = styled(Tag)`
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

const SectionHint = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const AccordionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
`;

const AccordionItem = styled.div`
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04);
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px var(--spacing-md, 20px);
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

const AccordionContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  min-width: 0;
`;

const AccordionTitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const AccordionSubtitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  svg {
    width: 16px;
    height: 16px;
    color: var(--fg-default, #2f3130);
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

interface PersonalizeAgentCProps {
  widgetIsReady: boolean;
}

const SYSTEM_REPLIES = [
  {
    title: 'Greeting reply',
    subtitle: '"Hey there, how can I help you today?"'
  },
  {
    title: 'Wrap-up reply',
    subtitle: '"Great. You can ask another question anytime."'
  },
  {
    title: 'Escalation reply',
    subtitle: '"No problem, please leave your details and someone will get back to...'
  },
  {
    title: 'Fallback reply',
    subtitle: '"Sorry I\'m not able to answer your question. Would you like to...'
  }
];

export default function PersonalizeAgentC({ widgetIsReady }: PersonalizeAgentCProps) {
  const steps = [
    { label: 'Connect', isCurrent: false },
    { label: 'Personalize', isCurrent: true },
    { label: 'Optimize', isCurrent: false },
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
          <SectionTitle>
            <span>Personalize your AI agent </span>
            <span style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: 0 }}>(3 of 3)</span>
          </SectionTitle>

          <SystemRepliesSection>
            <SectionHeader>
              <SectionLabel>
                <LabelText>System replies</LabelText>
                <OptionalTag size="small">
                  <span>Optional</span>
                </OptionalTag>
              </SectionLabel>
              <SectionHint>
                For common scenarios in messaging conversations, the AI agent will default to a system reply. You can edit the replies now, or after you've created your AI agent.
              </SectionHint>
            </SectionHeader>

            <AccordionGroup>
              {SYSTEM_REPLIES.map((reply, index) => (
                <AccordionItem key={index}>
                  <AccordionHeader>
                    <AccordionContent>
                      <AccordionTitle>{reply.title}</AccordionTitle>
                      <AccordionSubtitle>{reply.subtitle}</AccordionSubtitle>
                    </AccordionContent>
                    <ChevronIcon>
                      <ChevronDownIcon />
                    </ChevronIcon>
                  </AccordionHeader>
                </AccordionItem>
              ))}
            </AccordionGroup>
          </SystemRepliesSection>
        </MainPanel>
      </>
  );
}

export function PersonalizeAgentCHeader() {
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

export function PersonalizeAgentCFooter({ onBack, onContinue }: { onBack: () => void; onContinue?: () => void }) {
  return (
    <Footer>
      <BackButton onClick={onBack}>
        <ChevronLeftIcon />
        <span>Back</span>
      </BackButton>
      <ContinueButton
        disabled={false}
        $isEnabled={true}
        onClick={() => onContinue && onContinue()}
      >
        <span>Continue</span>
        <ChevronRightDefaultIcon />
      </ContinueButton>
    </Footer>
  );
}
