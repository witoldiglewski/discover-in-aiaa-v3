import { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import SparkleIcon from '../assets/icons/Sparkle gray.svg?react';
import { Tooltip } from '@zendeskgarden/react-tooltips';

const TooltipStyles = createGlobalStyle`
  [data-garden-id="tooltip.tooltip"] {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    max-width: none !important;
    z-index: 9999 !important;
  }

  [data-garden-id="tooltip.tooltip_arrow"] {
    &::before {
      border-top-color: #dcdcda !important;
      border-bottom-color: #dcdcda !important;
    }

    &::after {
      border-top-color: white !important;
      border-bottom-color: white !important;
    }
  }

  /* Arrow pointing up when tooltip is below tag */
  [data-popper-placement^="bottom"] .tooltip-content-custom {
    &::after {
      bottom: auto !important;
      top: -8px !important;
      border-top: none !important;
      border-bottom: 8px solid white !important;
      left: 48px !important;
    }

    &::before {
      bottom: auto !important;
      top: -9px !important;
      border-top: none !important;
      border-bottom: 9px solid #dcdcda !important;
      left: 47px !important;
    }
  }
`;

const Card = styled.div.attrs({ className: 'topic-checkbox-card' })<{ $isChecked: boolean }>`
  background: white;
  border: 1px solid ${props => props.$isChecked ? '#406cc4' : '#dcdcda'};
  display: flex;
  gap: 20px;
  align-items: flex-start;
  overflow: visible;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: border-color 0.2s ease;
  position: relative;

  &:hover {
    border-color: ${props => props.$isChecked ? '#406cc4' : '#a0a4a8'};
  }
`;

const IconContainer = styled.div.attrs({ className: 'icon-container' })`
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
    color: #646864;
  }
`;

const Content = styled.div.attrs({ className: 'card-content' })`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
  align-self: stretch;
`;

const TextContent = styled.div.attrs({ className: 'text-content' })`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const Title = styled.p.attrs({ className: 'card-title' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #2f3130;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const Description = styled.p.attrs({ className: 'card-description' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #2f3130;
  margin: 0;
  width: 100%;
`;

const TagContainer = styled.div.attrs({ className: 'tag-container' })`
  display: flex;
  gap: 0;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Tag = styled.div.attrs({ className: 'percentage-tag' })`
  background: #d9ecfc;
  display: flex;
  gap: 4px;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 99px;
  cursor: pointer;
`;

const TagText = styled.p.attrs({ className: 'tag-text' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #1a3250;
  margin: 0;
  text-align: center;
  white-space: nowrap;
`;

const TooltipContent = styled.div.attrs({ className: 'tooltip-content-custom' })<{ $isFlipped?: boolean }>`
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

  /* Arrow pointing down (when tooltip is above tag) - positioned at left to align with tag center */
  &::after {
    content: '';
    position: absolute;
    bottom: ${props => props.$isFlipped ? 'auto' : '-8px'};
    top: ${props => props.$isFlipped ? '-8px' : 'auto'};
    left: 48px;
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
    left: 47px;
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

const CheckboxContainer = styled.div.attrs({ className: 'checkbox-container' })`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 2px;
  align-self: stretch;
  flex-shrink: 0;
`;

const Checkbox = styled.div.attrs({ className: 'checkbox' })<{ $isChecked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${props => props.$isChecked ? '#1f73b7' : 'white'};
  border: ${props => props.$isChecked ? 'none' : '1px solid #d8dcde'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
  position: relative;

  &::after {
    content: '';
    display: ${props => props.$isChecked ? 'block' : 'none'};
    width: 8px;
    height: 6px;
    border-left: 1.5px solid white;
    border-bottom: 1.5px solid white;
    transform: rotate(-45deg) translate(0.5px, -1px);
  }
`;

interface TopicCheckboxCardProps {
  title: string;
  description: string;
  percentage: string;
  sampleTickets: string[];
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function TopicCheckboxCard({
  title,
  description,
  percentage,
  sampleTickets,
  isChecked: controlledIsChecked,
  onChange
}: TopicCheckboxCardProps) {
  const [internalIsChecked, setInternalIsChecked] = useState(true);
  const [isTooltipFlipped, setIsTooltipFlipped] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);
  const tooltipContentRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isChecked = controlledIsChecked !== undefined ? controlledIsChecked : internalIsChecked;

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsTooltipOpen(true);

    // Check placement after tooltip is shown
    setTimeout(() => {
      if (tagRef.current && tooltipContentRef.current) {
        const tagRect = tagRef.current.getBoundingClientRect();
        const tooltipRect = tooltipContentRef.current.getBoundingClientRect();
        const flipped = tooltipRect.top > tagRect.bottom;
        setIsTooltipFlipped(flipped);
      }
    }, 150);
  };

  const handleMouseLeave = () => {
    // Delay closing to allow hovering into tooltip
    closeTimeoutRef.current = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 100);
  };

  const handleTooltipMouseEnter = () => {
    // Cancel close when hovering into tooltip
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    // Close tooltip when leaving tooltip area
    setIsTooltipOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on the tag (for tooltip)
    if (tagRef.current && tagRef.current.contains(e.target as Node)) {
      e.stopPropagation();
      return;
    }

    const newValue = !isChecked;
    if (controlledIsChecked === undefined) {
      setInternalIsChecked(newValue);
    }
    onChange?.(newValue);
  };

  // Show up to 5 tickets in tooltip, with a "+X more" if there are more
  const displayTickets = sampleTickets.slice(0, 5);
  const remainingCount = sampleTickets.length - 5;

  return (
    <>
      <TooltipStyles />
      <Card $isChecked={isChecked} onClick={handleClick}>
        <IconContainer>
          <SparkleIcon />
        </IconContainer>
        <Content>
          <TextContent>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </TextContent>
          <TagContainer>
          <Tooltip
            content={
              <TooltipContent
                ref={tooltipContentRef}
                $isFlipped={isTooltipFlipped}
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
              >
                <TooltipHeading>Sample tickets</TooltipHeading>
                <TicketList>
                  {displayTickets.map((ticket, index) => (
                    <TicketItem key={index} href="#">
                      <LetterTag>
                        <LetterTagText>S</LetterTagText>
                      </LetterTag>
                      <TicketText>{ticket}</TicketText>
                    </TicketItem>
                  ))}
                  {remainingCount > 0 && (
                    <MoreTickets>+{remainingCount} sample tickets</MoreTickets>
                  )}
                </TicketList>
              </TooltipContent>
            }
            placement="top-start"
            size="large"
            delayMS={0}
            hasArrow={false}
            zIndex={9999}
            isVisible={isTooltipOpen}
          >
            <Tag
              ref={tagRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <TagText>{percentage}</TagText>
            </Tag>
          </Tooltip>
        </TagContainer>
      </Content>
      <CheckboxContainer>
        <Checkbox $isChecked={isChecked} />
      </CheckboxContainer>
    </Card>
    </>
  );
}
