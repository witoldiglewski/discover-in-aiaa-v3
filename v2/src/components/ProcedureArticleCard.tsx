import { useState } from 'react';
import styled from 'styled-components';
import WorkflowIcon from '../assets/icons/Workflow - 26px icon.svg?react';
import BookOpenIcon from '../assets/icons/Book open.svg?react';
import StartIcon from '../assets/icons/Start icon - 16px.svg?react';
import ChevronRightStrokeIcon from '@zendeskgarden/svg-icons/src/16/chevron-right-stroke.svg?react';

const Card = styled.div.attrs({ className: 'procedure-article-card' })<{ $isChecked: boolean }>`
  background: white;
  border: 1px solid ${props => props.$isChecked ? '#406cc4' : '#dcdcda'};
  display: flex;
  gap: 20px;
  align-items: flex-start;
  overflow: hidden;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: border-color 0.2s ease;

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

const TopicLabel = styled.p.attrs({ className: 'topic-label' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  margin: 0;
  width: 100%;
`;

const TopicName = styled.span.attrs({ className: 'topic-name' })`
  color: #2f3130;
  font-weight: 600;
`;

const ReviewButton = styled.button.attrs({ className: 'review-button' })`
  background: white;
  border: 1px solid #d8dcde;
  border-radius: 99px;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: #f8f9f9;
    border-color: #a0a4a8;
  }
`;

const ButtonContent = styled.div.attrs({ className: 'button-content' })`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ButtonText = styled.span.attrs({ className: 'button-text' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #2f3130;
`;

const ButtonIconWrapper = styled.div.attrs({ className: 'button-icon' })`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    color: #8d59b1;
  }
`;

const ChevronIconWrapper = styled.div.attrs({ className: 'chevron-icon' })`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    color: #68737d;
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

interface ProcedureArticleCardProps {
  type: 'procedure' | 'article';
  title: string;
  relatedTopic: string;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  onReviewClick?: () => void;
}

export default function ProcedureArticleCard({
  type,
  title,
  relatedTopic,
  isChecked: controlledIsChecked,
  onChange,
  onReviewClick
}: ProcedureArticleCardProps) {
  const [internalIsChecked, setInternalIsChecked] = useState(true);

  const isChecked = controlledIsChecked !== undefined ? controlledIsChecked : internalIsChecked;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking the review button
    if ((e.target as HTMLElement).closest('.review-button')) {
      e.stopPropagation();
      return;
    }

    const newValue = !isChecked;
    if (controlledIsChecked === undefined) {
      setInternalIsChecked(newValue);
    }
    onChange?.(newValue);
  };

  const handleReviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReviewClick?.();
  };

  return (
    <Card $isChecked={isChecked} onClick={handleCardClick}>
      <IconContainer>
        {type === 'procedure' ? <WorkflowIcon /> : <BookOpenIcon />}
      </IconContainer>
      <Content>
        <TextContent>
          <Title>{title}</Title>
          <TopicLabel>
            Created for topic: <TopicName>{relatedTopic}</TopicName>
          </TopicLabel>
        </TextContent>
        <ReviewButton onClick={handleReviewClick}>
          <ButtonContent>
            <ButtonIconWrapper>
              <StartIcon />
            </ButtonIconWrapper>
            <ButtonText>Review {type}</ButtonText>
          </ButtonContent>
          <ChevronIconWrapper>
            <ChevronRightStrokeIcon />
          </ChevronIconWrapper>
        </ReviewButton>
      </Content>
      <CheckboxContainer>
        <Checkbox $isChecked={isChecked} />
      </CheckboxContainer>
    </Card>
  );
}
