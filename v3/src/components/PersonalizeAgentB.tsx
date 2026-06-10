import { useState, useRef, useEffect } from 'react';
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
import ChevronDownIcon from '../assets/icons/inputs-chevron-down.svg?react';
import CheckIcon from '../assets/icons/dropdown-Check.svg?react';
import TagXIcon from '../assets/icons/tag-icon-x.svg?react';
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';
import LinkAnchorIcon from '../assets/icons/link-anchor.svg?react';



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

const LanguageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  position: relative;
  z-index: 2;
`;

const TranslationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: 0.1s;
  position: relative;
  z-index: 1;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
  width: 100%;
`;

const FieldLabel = styled.label`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  width: 100%;
`;

const HintContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const FieldHint = styled.p`
  flex: 1;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const HintLink = styled.a`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-primary, #406cc4);
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: baseline;

  &:hover {
    text-decoration: underline;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px 36px 10px 12px;
  background: var(--bg-default, white);
  border: 1px solid var(--border-input, #b7b7b3);
  border-radius: var(--border-radii-control, 8px);
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  outline: none;
  cursor: pointer;

  &::placeholder {
    color: var(--fg-placeholder, #8b8e89);
  }

  &:hover {
    border-color: var(--border-default, #dcdcda);
  }

  &:focus {
    border-color: var(--border-primaryemphasis, #406cc4);
    box-shadow:
      0 0 0 1px var(--bg-default, white),
      0 0 0 4px var(--border-primaryemphasis, #406cc4);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
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

const MultiSelectInput = styled.div`
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

  &:focus-within {
    border-color: var(--border-primaryemphasis, #406cc4);
    box-shadow:
      0 0 0 1px var(--bg-default, white),
      0 0 0 4px var(--border-primaryemphasis, #406cc4);
  }
`;

const MultiSelectIcon = styled.div`
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

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 10px 36px 10px 12px;
  background: var(--bg-default, white);
  border: 1px solid var(--border-input, #b7b7b3);
  border-radius: var(--border-radii-control, 8px);
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;

  &:hover {
    border-color: var(--border-default, #dcdcda);
  }

  &:focus {
    border-color: var(--border-primaryemphasis, #406cc4);
    box-shadow:
      0 0 0 1px var(--bg-default, white),
      0 0 0 4px var(--border-primaryemphasis, #406cc4);
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--bg-default, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-control, 8px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 2000;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  padding: 4px 0;
`;

const DropdownItem = styled.div<{ $isSelected?: boolean; $isHovered?: boolean; $hasCheckbox?: boolean }>`
  padding: 10px 12px 10px ${props => props.$hasCheckbox ? '12px' : '36px'};
  margin: 0 4px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: ${props => props.$isSelected ? '600' : '400'};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: relative;
  background: transparent;
  transition: background-color 0.1s ease;

  /* Left border indicator for hover state */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--border-primaryemphasis, #406cc4);
    border-radius: 4px 0 0 4px;
    opacity: 0;
    transition: opacity 0.1s ease;
  }

  &:hover {
    background: var(--bg-primarysubtle, #ebf4ff);

    &::before {
      opacity: 1;
    }
  }

`;

const CheckIconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  svg {
    width: 16px;
    height: 16px;
    color: var(--border-primaryemphasis, #406cc4);
  }
`;

const FloraCheckbox = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  position: relative;
  margin-right: 8px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: var(--border-radii-controlsubtle, 4px);
  background: ${props => props.$checked ? 'var(--button-bg-emphasis, #2f3130)' : 'var(--bg-default, white)'};
  border: 1px solid ${props => props.$checked ? 'var(--button-bg-emphasis, #2f3130)' : 'var(--border-control, #8b8e89)'};
  transition: all 0.1s ease;

  &:hover {
    background: ${props => props.$checked ? 'var(--button-bg-emphasis-hover, #404241)' : 'rgba(64, 108, 196, 0.08)'};
    border-color: ${props => props.$checked ? 'var(--button-bg-emphasis-hover, #404241)' : 'var(--border-primaryemphasis, #406cc4)'};
  }

  &:active {
    background: ${props => props.$checked ? 'var(--button-bg-emphasis-active, #646864)' : 'rgba(64, 108, 196, 0.16)'};
    border-color: ${props => props.$checked ? 'var(--button-bg-emphasis-active, #646864)' : 'var(--border-primaryemphasis, #406cc4)'};
  }
`;

const CheckboxIconWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  svg {
    width: 8px;
    height: 6px;
    color: white;
  }
`;

const LanguageTag = styled.div`
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
    opacity: 0.8;
    width: 16px;
    height: 16px;
    margin-left: 4px;

    &:hover {
      opacity: 1;
    }

    svg {
      width: 16px;
      height: 16px;
      color: var(--tag-fg-default, #2f3130);
    }
  }
`;

const MultiSelectTrigger = styled.div`
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

  &:focus-within {
    border-color: var(--border-primaryemphasis, #406cc4);
    box-shadow:
      0 0 0 1px var(--bg-default, white),
      0 0 0 4px var(--border-primaryemphasis, #406cc4);
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

interface PersonalizeAgentBProps {
  widgetIsReady: boolean;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedTranslationLanguages: string[];
  setSelectedTranslationLanguages: (languages: string[]) => void;
}

// 12 most popular languages in the world
const LANGUAGES = [
  'English',
  'Mandarin Chinese',
  'Hindi',
  'Spanish',
  'French',
  'Arabic',
  'Bengali',
  'Portuguese',
  'Russian',
  'Japanese',
  'German',
  'Korean',
];

export default function PersonalizeAgentB({ widgetIsReady, selectedLanguage, setSelectedLanguage, selectedTranslationLanguages, setSelectedTranslationLanguages }: PersonalizeAgentBProps) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isTranslationDropdownOpen, setIsTranslationDropdownOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const translationDropdownRef = useRef<HTMLDivElement>(null);

  const handleRemoveLanguage = (language: string) => {
    setSelectedTranslationLanguages(prev => prev.filter(lang => lang !== language));
  };

  const handleToggleLanguage = (language: string) => {
    setSelectedTranslationLanguages(prev => {
      if (prev.includes(language)) {
        return prev.filter(lang => lang !== language);
      } else {
        return [...prev, language];
      }
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
      if (translationDropdownRef.current && !translationDropdownRef.current.contains(event.target as Node)) {
        setIsTranslationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <span style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: 0 }}>(2 of 3)</span>
          </SectionTitle>

          {/* Language Selection */}
          <LanguageSection>
            <FieldContainer>
              <FieldLabel>Select language*</FieldLabel>
              <FieldHint>
                The default language your AI agent uses to communicate. You can add more languages in your Localization settings in Admin Center.{' '}
                <HintLink href="#" target="_blank">
                  Localization settings
                  <LinkAnchorIcon style={{ marginLeft: '4px' }} />
                </HintLink>
              </FieldHint>
            </FieldContainer>

            <DropdownContainer ref={languageDropdownRef}>
              <DropdownButton onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
                <span>{selectedLanguage}</span>
                <InputIcon>
                  <ChevronDownIcon />
                </InputIcon>
              </DropdownButton>
              <DropdownMenu $isOpen={isLanguageDropdownOpen}>
                {LANGUAGES.map((language) => {
                  const isSelected = selectedLanguage === language;
                  return (
                    <DropdownItem
                      key={language}
                      $isSelected={isSelected}
                      $hasCheckbox={false}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageDropdownOpen(false);
                      }}
                    >
                      {isSelected && (
                        <CheckIconWrapper>
                          <CheckIcon />
                        </CheckIconWrapper>
                      )}
                      {language}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </DropdownContainer>
          </LanguageSection>

          {/* Translation Languages */}
          <TranslationSection>
            <FieldContainer>
              <FieldLabel>Select languages for translation</FieldLabel>
            </FieldContainer>

            <DropdownContainer ref={translationDropdownRef}>
              <MultiSelectTrigger onClick={() => setIsTranslationDropdownOpen(!isTranslationDropdownOpen)}>
                {selectedTranslationLanguages.map((language) => (
                  <LanguageTag key={language}>
                    <span>{language}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveLanguage(language);
                      }}
                      aria-label={`Remove ${language}`}
                    >
                      <TagXIcon />
                    </button>
                  </LanguageTag>
                ))}
                <MultiSelectIcon>
                  <ChevronDownIcon />
                </MultiSelectIcon>
              </MultiSelectTrigger>
              <DropdownMenu $isOpen={isTranslationDropdownOpen}>
                {LANGUAGES.filter(lang => lang !== selectedLanguage).map((language) => {
                  const isSelected = selectedTranslationLanguages.includes(language);
                  return (
                    <DropdownItem
                      key={language}
                      onClick={() => handleToggleLanguage(language)}
                      $hasCheckbox={false}
                      $isSelected={isSelected}
                    >
                      {isSelected && (
                        <CheckIconWrapper>
                          <CheckIcon />
                        </CheckIconWrapper>
                      )}
                      {language}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </DropdownContainer>
          </TranslationSection>
        </MainPanel>
      </>
  );
}

// Exported helper components for header and footer
export function PersonalizeAgentBHeader() {
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

export function PersonalizeAgentBFooter({ onBack, onContinue }: { onBack: () => void; onContinue?: () => void }) {
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
