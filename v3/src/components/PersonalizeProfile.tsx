import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';

// Import icons
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';
import ChevronLeftIcon from '../assets/icons/buttons-chevron-left.svg?react';
import ChevronRightDefaultIcon from '../assets/icons/buttons-chevron-right-default.svg?react';
import CloseSmallIcon from '../assets/icons/buttons-close-small.svg?react';
import ResizeHandleIcon from '../assets/icons/text-area-resize-handle.svg?react';
import XIcon from '../assets/icons/tag-icon-x.svg?react';

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
  padding: var(--spacing-lg, 32px) var(--spacing-xl, 40px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 32px);
  height: 100%;
  overflow: auto;
`;

const FormSection = styled.div<{ $delay?: number }>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$delay || 0}s;
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

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
`;

const FieldLabel = styled.h4`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const InputWrapper = styled.div<{ $isFocused: boolean }>`
  background: var(--bg-default, white);
  border: 1px solid ${props => props.$isFocused ? 'var(--border-primaryemphasis, #406cc4)' : 'var(--border-input, #b7b7b3)'};
  border-radius: var(--border-radii-control, 8px);
  padding: 12px;
  display: flex;
  align-items: center;
  width: 100%;
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

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
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
`;

const TextareaWrapper = styled.div<{ $isFocused: boolean }>`
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

const StyledTextarea = styled.textarea`
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
  right: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;
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

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: 0.2s;
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

const FileUploadArea = styled.div`
  height: 80px;
  border: 1px dashed var(--border-emphasis, #8b8e89);
  border-radius: var(--border-radii-control, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  position: relative;

  &:hover {
    background: rgba(64, 108, 196, 0.04);
  }
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

const HiddenFileInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

const UploadedItem = styled.div`
  background: var(--bg-subtle, #f7f7f7);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-lg, 12px);
  padding: var(--spacing-xs, 8px) var(--spacing-sm, 12px) var(--spacing-xs, 8px) var(--spacing-xs, 8px);
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 20px);
  width: 100%;
`;

const UploadedItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  flex: 1;
  min-width: 0;
`;

const FileProgress = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 12px);
  height: 36px;
  flex-shrink: 0;
`;

const ProgressPercentage = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
  margin: 0;
  white-space: nowrap;
  width: 45px;
  text-align: right;
  flex-shrink: 0;
`;

const ProgressBarContainer = styled.div`
  width: 200px;
  height: 6px;
  background: var(--opacity-neutral-200, rgba(100, 104, 100, 0.16));
  border-radius: 6px;
  position: relative;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.$progress}%;
  background: var(--bg-successemphasis, #4b7d04);
  border-radius: 6px;
  transition: width 0.2s ease;
`;

const FileThumbnail = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 0.9px solid var(--border-subtle, #eae9e8);
  background: var(--bg-default, white);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FileName = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
  margin: 0;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: var(--fg-default, #2f3130);
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

interface PersonalizeProfileProps {
  name?: string;
  onNameChange?: (name: string) => void;
  businessProfile?: string;
  onBusinessProfileChange?: (profile: string) => void;
}

export default function PersonalizeProfile({
  name: externalName = '',
  onNameChange,
  businessProfile: externalBusinessProfile = '',
  onBusinessProfileChange
}: PersonalizeProfileProps) {
  const [name, setName] = useState(externalName);
  const [businessProfile, setBusinessProfile] = useState(externalBusinessProfile);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isProfileFocused, setIsProfileFocused] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{name: string, progress: number, thumbnail?: string} | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (onNameChange) onNameChange(value);
  };

  const handleBusinessProfileChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBusinessProfile(value);
    if (onBusinessProfileChange) onBusinessProfileChange(value);
  };

  const handleBusinessProfileFocus = () => {
    setIsProfileFocused(true);
    if (!businessProfile) {
      const defaultProfile = "We're a specialty coffee roaster dedicated to sourcing the finest single-origin beans from sustainable farms around the world. Our expert roasters craft each batch to bring out unique flavor profiles, from bright and fruity to rich and chocolatey. We believe great coffee starts with great relationships—with farmers, with our craft, and with every customer who trusts us with their morning ritual.";
      setBusinessProfile(defaultProfile);
      if (onBusinessProfileChange) onBusinessProfileChange(defaultProfile);
    }
  };

  const handleUploadClick = () => {
    // Mock file upload - start at 0% progress
    setUploadedFile({
      name: 'morning-brew-logo.png',
      progress: 0
    });

    // Simulate upload progress - increment by 1% every 20ms for smooth animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      if (progress >= 100) {
        clearInterval(interval);
        // Show thumbnail when complete
        setUploadedFile({
          name: 'morning-brew-logo.png',
          progress: 100,
          thumbnail: '/src/assets/icons/Coffee-bot-Avatar.svg' // Using coffee bot as mock thumbnail
        });
      } else {
        setUploadedFile(prev => prev ? {...prev, progress} : null);
      }
    }, 20);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const steps = [
    { label: 'Connect', isCurrent: false },
    { label: 'Personalize', isCurrent: true },
    { label: 'Optimize', isCurrent: false },
    { label: 'Test', isCurrent: false },
    { label: 'Activate', isCurrent: false },
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
        <FormSection $delay={0}>
          <SectionTitle>Personalize your AI agent</SectionTitle>
          <FieldContainer>
            <FieldLabel>Agent name</FieldLabel>
            <InputWrapper $isFocused={isNameFocused}>
              <StyledInput
                placeholder="Enter agent name"
                value={name}
                onChange={handleNameChange}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
              />
            </InputWrapper>
          </FieldContainer>
        </FormSection>

        <FormSection $delay={0.1}>
          <FieldContainer>
            <FieldLabel>Business profile</FieldLabel>
            <TextareaWrapper $isFocused={isProfileFocused}>
              <StyledTextarea
                placeholder="Describe your business and what you do"
                value={businessProfile}
                onChange={handleBusinessProfileChange}
                onFocus={handleBusinessProfileFocus}
                onBlur={() => setIsProfileFocused(false)}
              />
              <TextareaFooter>
                <ResizeHandle>
                  <ResizeHandleIcon />
                </ResizeHandle>
              </TextareaFooter>
            </TextareaWrapper>
          </FieldContainer>
        </FormSection>

        <AvatarSection>
          <SourcesHeader>
            <SourcesTitle>Add avatar</SourcesTitle>
            <SourcesHint>Use a JPG, PNG, or GIF smaller than 100KB. 50px by 50px works best.</SourcesHint>
          </SourcesHeader>

          <FileUploadArea onClick={handleUploadClick}>
            <FileUploadText>Choose a file or drag and drop here</FileUploadText>
          </FileUploadArea>

          {uploadedFile && (
            <UploadedItem>
              <UploadedItemContent>
                {uploadedFile.progress < 100 ? (
                  <FileProgress>
                    <ProgressPercentage>{uploadedFile.progress}%</ProgressPercentage>
                    <ProgressBarContainer>
                      <ProgressBarFill $progress={uploadedFile.progress} />
                    </ProgressBarContainer>
                  </FileProgress>
                ) : (
                  <FileThumbnail>
                    {uploadedFile.thumbnail && <img src={uploadedFile.thumbnail} alt={uploadedFile.name} />}
                  </FileThumbnail>
                )}
                <FileName>{uploadedFile.name}</FileName>
              </UploadedItemContent>
              <RemoveButton onClick={handleRemoveFile}>
                <XIcon />
              </RemoveButton>
            </UploadedItem>
          )}
        </AvatarSection>
      </MainPanel>
    </ContentRow>
  );
}

// Export Header component for use in MainContent
export function PersonalizeProfileHeader() {
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
interface PersonalizeProfileFooterProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function PersonalizeProfileFooter({ onBack, onContinue }: PersonalizeProfileFooterProps) {
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
