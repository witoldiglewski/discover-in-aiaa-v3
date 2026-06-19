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

// Import tile icons
import GlobeIcon from '../assets/icons/tiles-Globe.svg?react';
import UploadIcon from '../assets/icons/tiles-upload.svg?react';
import NotionIcon from '../assets/icons/tiles-notion.svg?react';
import BoxIcon from '../assets/icons/tiles-Box.svg?react';
import ContentfulIcon from '../assets/icons/tiles-contentful.svg?react';
import Document360Icon from '../assets/icons/tiles-document360.svg?react';
import AmazonIcon from '../assets/icons/tiles-Amazon.svg?react';
import GuruIcon from '../assets/icons/tiles-guru.svg?react';
import SharePointIcon from '../assets/icons/tiles-sharepoint.svg?react';

// Import button icons
import ChevronLeftIcon from '../assets/icons/buttons-chevron-left.svg?react';
import ChevronRightDefaultIcon from '../assets/icons/buttons-chevron-right-default.svg?react';
import ChevronRightDisabledIcon from '../assets/icons/buttons-chevron-right-disabled.svg?react';
import CloseSmallIcon from '../assets/icons/buttons-close-small.svg?react';

// Import input icons
import ChevronDownIcon from '../assets/icons/inputs-chevron-down.svg?react';
import ChannelMessagingIcon from '../assets/icons/channel-messaging.svg?react';

// Import brand card icon
import BrandCardKnowledgeIcon from '../assets/icons/brand-card-knowledge.svg?react';

// Import Garden icons
import XIcon from '@zendeskgarden/svg-icons/src/16/x-stroke.svg?react';

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

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  max-width: 800px;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  position: relative;
  z-index: 10;
`;

const FieldLabel = styled.h3`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3941);
  margin: 0;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 10;
`;

const SelectInput = styled.div<{ $isOpen: boolean }>`
  background: var(--bg-default, white);
  border: 1px solid ${props => props.$isOpen ? 'var(--border-primaryemphasis, #406cc4)' : 'var(--border-input, #b7b7b3)'};
  border-radius: var(--border-radii-control, 8px);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
  cursor: pointer;
  width: 100%;
  position: relative;

  ${props => props.$isOpen && `
    box-shadow:
      0 0 0 1px var(--bg-default, white),
      0 0 0 4px var(--border-primaryemphasis, #406cc4);
  `}

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &:hover {
    border-color: ${props => props.$isOpen ? 'var(--border-primaryemphasis, #406cc4)' : 'var(--border-default, #dcdcda)'};
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  min-width: 300px;
  background: var(--bg-raised, white);
  border: 1px solid var(--border-subtle, #e8eaec);
  border-radius: var(--border-radii-lg, 12px);
  box-shadow: 0px 16px 12px rgba(10, 13, 14, 0.16);
  padding: var(--spacing-xxs, 4px);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: var(--spacing-xxs, 4px);
  z-index: 100;
`;

const DropdownItem = styled.div<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected ? 'var(--opacity-neutral-100, rgba(100, 104, 100, 0.08))' : 'transparent'};
  display: flex;
  gap: var(--spacing-sm, 12px);
  align-items: center;
  padding: var(--spacing-xs, 8px) var(--spacing-sm, 12px);
  border-radius: var(--border-radii-md, 8px);
  cursor: pointer;
  min-height: 56px;

  &:hover {
    background: var(--opacity-neutral-100, rgba(100, 104, 100, 0.08));
  }
`;

const Avatar = styled.div`
  background: var(--bg-emphasis, #5c6970);
  width: 32px;
  height: 32px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const AvatarText = styled.p`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  letter-spacing: 0;
  color: var(--fg-onemphasis, white);
  margin: 0;
  text-align: center;
`;

const BrandInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const BrandName = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #293239);
  margin: 0;
`;

const BrandArticles = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #293239);
  margin: 0;
`;

const SelectedBrandCard = styled.div`
  background: var(--bg-default, white);
  border: 1px solid var(--border-subtle, #eae9e8);
  border-radius: var(--border-radii-lg, 12px);
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.04);
  padding: var(--spacing-md, 20px);
  display: flex;
  gap: var(--spacing-sm, 12px);
  align-items: center;
  width: 100%;
`;

const BrandIconWrapper = styled.div`
  background: var(--bg-subtle, #f7f7f7);
  width: 40px;
  height: 40px;
  border-radius: var(--border-radii-md, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 8px;

  svg {
    width: 16px;
    height: 16px;
    color: var(--fg-default, #2f3130);
  }
`;

const BrandCardInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BrandCardName = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const BrandCardArticles = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: var(--fg-subtle, #646864);
  margin: 0;
`;

const ConnectedTag = styled.div`
  background: var(--tag-bg-success, #ddf0c9);
  color: var(--tag-fg-success, #25390f);
  border-radius: var(--border-radii-pill, 99px);
  padding: 2px var(--spacing-xs, 8px);
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ConnectedTagText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  margin: 0;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;

  svg {
    width: 20px;
    height: 20px;
    color: var(--fg-default, #2f3130);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Placeholder = styled.span`
  flex: 1;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-placeholder, #8b8e89);
`;

const AdditionalSourcesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  max-width: 800px;
  padding-top: 10px;
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

const SourcesTitle = styled.h4`
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

const Tile = styled.div<{ $disabled?: boolean }>`
  background: var(--bg-default, white);
  border: 1px solid var(--border-subtle, #eae9e8);
  border-radius: var(--corner-radius-xs, 8px);
  padding: var(--spacing-md, 20px);
  display: flex;
  gap: var(--spacing-sm, 12px);
  align-items: center;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  flex: 1 1 220px;
  min-width: 220px;

  &:hover {
    ${props => !props.$disabled && `
      background: rgba(0, 0, 0, 0.02);
    `}
  }
`;

const TileIcon = styled.div`
  background: var(--bg-subtle, #f7f7f7);
  padding: 8px;
  border-radius: var(--border-radii-md, 8px);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TileTitle = styled.p<{ $disabled?: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: ${props => props.$disabled ? 'var(--fg-subtle, #646864)' : 'var(--fg-default, #2f3130)'};
  margin: 0;
  white-space: nowrap;
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

interface ConnectKnowledgeProps {
  widgetIsReady: boolean;
  setWidgetIsReady: (ready: boolean) => void;
  widgetCollapsed: boolean;
  setWidgetCollapsed: (collapsed: boolean) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
}

export default function ConnectKnowledge({ widgetIsReady, setWidgetIsReady, widgetCollapsed, setWidgetCollapsed, selectedBrand, setSelectedBrand }: ConnectKnowledgeProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const brands = [
    { id: 'joes-coffee', name: "Joe's Coffee", initials: 'JC', articles: 52 },
    { id: 'morning-brew', name: "Morning Brew Co.", initials: 'MB', articles: 32 },
    { id: 'bean-there', name: "Bean There", initials: 'BT', articles: 28 },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Set ready state and expand widget when brand is selected
  useEffect(() => {
    if (selectedBrand) {
      setWidgetIsReady(true);
      setWidgetCollapsed(false);
    }
  }, [selectedBrand, setWidgetIsReady, setWidgetCollapsed]);

  const steps = [
    { label: 'Connect', isCurrent: true },
    { label: 'Personalize', isCurrent: false },
    { label: 'Build', isCurrent: false },
    { label: 'Test', isCurrent: false },
    { label: 'Activate', isCurrent: false },
  ];

  const knowledgeSources = [
    { name: 'Crawl Website', icon: GlobeIcon, enabled: true },
    { name: 'File upload', icon: UploadIcon, enabled: true },
    { name: 'Notion', icon: NotionIcon, enabled: true },
    { name: 'File Box', icon: BoxIcon, enabled: true },
    { name: 'Contentful', icon: ContentfulIcon, enabled: true },
    { name: 'Document360', icon: Document360Icon, enabled: true },
    { name: 'Amazon S3', icon: AmazonIcon, enabled: true },
    { name: 'Guru', icon: GuruIcon, enabled: true },
    { name: 'SharePoint', icon: SharePointIcon, enabled: true },
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
        <SectionTitle>Connect knowledge</SectionTitle>

        <FormField>
          <FieldLabel>Select brand and knowledge base*</FieldLabel>
          {!selectedBrand ? (
            <DropdownWrapper ref={dropdownRef}>
              <SelectInput $isOpen={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <Placeholder>Select a brand</Placeholder>
                <ChevronDownIcon />
              </SelectInput>
              <DropdownMenu $isOpen={dropdownOpen}>
                {brands.map((brand) => (
                  <DropdownItem
                    key={brand.id}
                    $isSelected={false}
                    onClick={() => {
                      setSelectedBrand(brand.id);
                      setDropdownOpen(false);
                    }}
                  >
                    <Avatar>
                      <AvatarText>{brand.initials}</AvatarText>
                    </Avatar>
                    <BrandInfo>
                      <BrandName>{brand.name}</BrandName>
                      <BrandArticles>
                        {brand.articles > 0 ? `${brand.articles} articles in knowledge base` : 'No knowledge base found'}
                      </BrandArticles>
                    </BrandInfo>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownWrapper>
          ) : (
            <SelectedBrandCard>
              <BrandIconWrapper>
                <BrandCardKnowledgeIcon />
              </BrandIconWrapper>
              <BrandCardInfo>
                <BrandCardName>{brands.find(b => b.id === selectedBrand)?.name}</BrandCardName>
                <BrandCardArticles>
                  {brands.find(b => b.id === selectedBrand)?.articles} articles connected
                </BrandCardArticles>
              </BrandCardInfo>
              <ConnectedTag>
                <ConnectedTagText>Connected</ConnectedTagText>
              </ConnectedTag>
              <RemoveButton onClick={() => {
                setSelectedBrand(null);
                setWidgetIsReady(false);
              }}>
                <XIcon />
              </RemoveButton>
            </SelectedBrandCard>
          )}
        </FormField>

        <AdditionalSourcesSection>
          <SourcesHeader>
            <SourcesTitle>Add additional knowledge sources</SourcesTitle>
            <SourcesHint>Add your existing content from other sources</SourcesHint>
          </SourcesHeader>

          <TilesGrid>
            {knowledgeSources.map((source, index) => {
              const IconComponent = source.icon;
              return (
                <Tile key={index} $disabled={!source.enabled}>
                  <TileIcon>
                    <IconComponent />
                  </TileIcon>
                  <TileTitle $disabled={!source.enabled}>{source.name}</TileTitle>
                </Tile>
              );
            })}
          </TilesGrid>
        </AdditionalSourcesSection>
      </MainPanel>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 32px);
  height: 100%;
  width: 100%;
`;

const PanelsRow = styled.div`
  display: flex;
  flex: 1;
  gap: var(--spacing-xs, 8px);
  min-height: 0;
`;

// Exported helper components for header and footer
export function ConnectKnowledgeHeader() {
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

export function ConnectKnowledgeFooter({ onBack, onContinue, selectedBrand }: { onBack: () => void; onContinue?: () => void; selectedBrand: string | null }) {
  return (
    <Footer>
      <BackButton onClick={onBack}>
        <ChevronLeftIcon />
        <span>Back</span>
      </BackButton>
      <ContinueButton
        disabled={!selectedBrand}
        $isEnabled={selectedBrand !== null}
        onClick={() => onContinue && onContinue()}
      >
        <span>Continue</span>
        {selectedBrand ? <ChevronRightDefaultIcon /> : <ChevronRightDisabledIcon />}
      </ContinueButton>
    </Footer>
  );
}
