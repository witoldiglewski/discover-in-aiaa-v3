import { useState } from 'react';
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

// Import bot icons
import BotFormalIcon from '../assets/icons/bot-Formal.svg?react';
import BotEnthusiasticIcon from '../assets/icons/bot-enthusiastic.svg?react';
import BotInformalIcon from '../assets/icons/bot-informal.svg?react';
import BotCustomIcon from '../assets/icons/bot-custom.svg?react';
import ResizeHandleIcon from '../assets/icons/text-area-resize-handle.svg?react';
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';

// Import button icons
import ChevronLeftIcon from '../assets/icons/buttons-chevron-left.svg?react';
import ChevronRightDefaultIcon from '../assets/icons/buttons-chevron-right-default.svg?react';
import CloseSmallIcon from '../assets/icons/buttons-close-small.svg?react';

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

const ToneOfVoiceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  position: relative;
  z-index: 1;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: 0.1s;
  position: relative;
  z-index: 1;
`;

const SourcesHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
  width: 100%;
`;

const SourcesTitle = styled.h3`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const SourcesHint = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const TilesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

const Tile = styled.div<{ $disabled?: boolean; $selected?: boolean }>`
  background: var(--bg-default, white);
  border: 1px solid ${props => props.$selected ? 'var(--border-emphasis, #8b8e89)' : 'var(--border-subtle, #eae9e8)'};
  border-radius: var(--border-radii-lg, 12px);
  padding: var(--spacing-md, 20px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.04);
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  flex: 1 1 220px;
  min-width: 220px;
  position: relative;

  &:hover {
    ${props => !props.$disabled && `
      background: rgba(0, 0, 0, 0.02);
    `}
  }
`;

const BotIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const BotIconWrapperInline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const TileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const TileTitle = styled.p<{ $disabled?: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: ${props => props.$disabled ? 'var(--fg-subtle, #646864)' : 'var(--fg-default, #2f3130)'};
  margin: 0;
`;

const TileSubtitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const RadioButton = styled.div<{ $selected: boolean }>`
  position: absolute;
  top: 9px;
  right: 9px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: ${props => props.$selected ? '6px solid #2f3130' : '1px solid var(--border-input, #b7b7b3)'};
  flex-shrink: 0;
`;

const CustomTile = styled.div<{ $selected: boolean }>`
  background: var(--bg-default, white);
  border: 1px solid ${props => props.$selected ? 'var(--border-emphasis, #8b8e89)' : 'var(--border-subtle, #eae9e8)'};
  border-radius: var(--border-radii-lg, 12px);
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.04);
  padding: var(--spacing-md, 20px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  width: 100%;
  position: relative;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

const CustomTileHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sm, 12px);
  align-items: flex-start;
  width: 100%;
`;

const CustomTileContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CustomTextareaWrapper = styled.div<{ $isFocused: boolean }>`
  width: 100%;
  border: 1px solid ${props => props.$isFocused ? 'var(--border-primaryemphasis, #406cc4)' : 'var(--border-input, #b7b7b3)'};
  border-radius: var(--border-radii-control, 8px);
  background: var(--bg-default, white);
  position: relative;

  ${props => props.$isFocused && `
    box-shadow:
      0 0 0 1px var(--bg-default, white),
      0 0 0 4px var(--border-primaryemphasis, #406cc4);
  `}

  &:hover {
    border-color: ${props => props.$isFocused ? 'var(--border-primaryemphasis, #406cc4)' : 'var(--border-default, #dcdcda)'};
  }
`;

const CustomTextarea = styled.textarea`
  width: 100%;
  min-height: 112px;
  padding: 12px;
  padding-bottom: 32px;
  border: none;
  outline: none;
  resize: vertical;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  background: transparent;

  &::placeholder {
    color: var(--fg-placeholder, #8b8e89);
  }

  &::-webkit-resizer {
    display: none;
  }
`;

const TextareaFooter = styled.div`
  position: absolute;
  bottom: 8px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
`;

const CharacterCount = styled.span<{ $isOverLimit: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: ${props => props.$isOverLimit ? 'var(--fg-danger, #cc3340)' : 'var(--fg-subtle, #646864)'};
`;

const ResizeHandle = styled.div`
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 10px;
    height: 10px;
    color: var(--fg-subtle, #646864);
  }
`;

const FileUploadArea = styled.div`
  height: 80px;
  border: 1px dashed var(--border-emphasis, #8b8e89);
  border-radius: var(--border-radii-control, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
`;

const FileUploadText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-primary, #406cc4);
  margin: 0;
  text-align: center;
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

interface PersonalizeAgentProps {
  widgetIsReady: boolean;
  selectedTone: 'professional' | 'enthusiastic' | 'informal' | 'custom';
  setSelectedTone: (tone: 'professional' | 'enthusiastic' | 'informal' | 'custom') => void;
  customToneText: string;
  setCustomToneText: (text: string) => void;
}

export default function PersonalizeAgent({ widgetIsReady, selectedTone, setSelectedTone, customToneText, setCustomToneText }: PersonalizeAgentProps) {
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const maxCharacters = 500;

  // CHANGE 1: Update step position to 2 (Personalize)
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
          {/* CHANGE 2: Main content replaced with Personalize content */}
          <SectionTitle>
            <span>Personalize your AI agent </span>
            <span style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: 0 }}>(1 of 3)</span>
          </SectionTitle>

          {/* Tone of Voice section */}
          <ToneOfVoiceSection>
            <SourcesHeader>
              <SourcesTitle>Select tone of voice</SourcesTitle>
            </SourcesHeader>

            <TilesGrid>
              {/* Professional tile */}
              <Tile $selected={selectedTone === 'professional'} onClick={() => setSelectedTone('professional')}>
                <BotIconWrapper>
                  <BotFormalIcon />
                </BotIconWrapper>
                <TileContent>
                  <TileTitle>Professional</TileTitle>
                  <TileSubtitle>Polite and direct</TileSubtitle>
                </TileContent>
                <RadioButton $selected={selectedTone === 'professional'} />
              </Tile>

              {/* Enthusiastic tile */}
              <Tile $selected={selectedTone === 'enthusiastic'} onClick={() => setSelectedTone('enthusiastic')}>
                <BotIconWrapper>
                  <BotEnthusiasticIcon />
                </BotIconWrapper>
                <TileContent>
                  <TileTitle>Enthusiastic</TileTitle>
                  <TileSubtitle>Upbeat and friendly</TileSubtitle>
                </TileContent>
                <RadioButton $selected={selectedTone === 'enthusiastic'} />
              </Tile>

              {/* Informal tile */}
              <Tile $selected={selectedTone === 'informal'} onClick={() => setSelectedTone('informal')}>
                <BotIconWrapper>
                  <BotInformalIcon />
                </BotIconWrapper>
                <TileContent>
                  <TileTitle>Informal</TileTitle>
                  <TileSubtitle>Casual and friendly</TileSubtitle>
                </TileContent>
                <RadioButton $selected={selectedTone === 'informal'} />
              </Tile>
            </TilesGrid>

            {/* Custom tile - full width */}
            <CustomTile $selected={selectedTone === 'custom'} onClick={() => setSelectedTone('custom')}>
              <CustomTileHeader>
                <BotIconWrapperInline>
                  <BotCustomIcon />
                </BotIconWrapperInline>
                <CustomTileContent>
                  <TileTitle>Custom</TileTitle>
                  <TileSubtitle>Define a custom tone of voice</TileSubtitle>
                </CustomTileContent>
                <RadioButton $selected={selectedTone === 'custom'} />
              </CustomTileHeader>

              {/* Show textarea when custom is selected */}
              {selectedTone === 'custom' && (
                <CustomTextareaWrapper $isFocused={isTextareaFocused}>
                  <CustomTextarea
                    placeholder="Describe the tone of voice you want for your AI agent..."
                    value={customToneText}
                    onChange={(e) => {
                      if (e.target.value.length <= maxCharacters) {
                        setCustomToneText(e.target.value);
                      }
                    }}
                    onFocus={() => setIsTextareaFocused(true)}
                    onBlur={() => setIsTextareaFocused(false)}
                    maxLength={maxCharacters}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <TextareaFooter>
                    <CharacterCount $isOverLimit={customToneText.length > maxCharacters}>
                      {maxCharacters - customToneText.length} characters remaining
                    </CharacterCount>
                    <ResizeHandle>
                      <ResizeHandleIcon />
                    </ResizeHandle>
                  </TextareaFooter>
                </CustomTextareaWrapper>
              )}
            </CustomTile>
          </ToneOfVoiceSection>

          {/* Add avatar section */}
          <AvatarSection>
            <SourcesHeader>
              <SourcesTitle>Add avatar</SourcesTitle>
              <SourcesHint>Use a JPG, PNG, or GIF smaller than 100KB. 50px by 50px works best.</SourcesHint>
            </SourcesHeader>

            {/* File upload */}
            <FileUploadArea>
              <FileUploadText>Choose a file or drag and drop here</FileUploadText>
            </FileUploadArea>
          </AvatarSection>
        </MainPanel>
      </>
  );
}

// Exported helper components for header and footer
export function PersonalizeAgentHeader() {
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

export function PersonalizeAgentFooter({ onBack, onContinue }: { onBack: () => void; onContinue?: () => void }) {
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
