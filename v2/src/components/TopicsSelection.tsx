import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import TopicCheckboxCard from './TopicCheckboxCard';
import AllTopicsModal from './AllTopicsModal';
import InfoIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';
import { Tooltip } from '@zendeskgarden/react-tooltips';

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

const Container = styled.div.attrs({ className: 'topics-selection' })`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SectionHeader = styled.div.attrs({ className: 'section-header' })`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 12px;
  width: 100%;
  overflow: hidden;
`;

const HeaderContent = styled.div.attrs({ className: 'header-content' })`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
`;

const HeaderTitle = styled.div.attrs({ className: 'header-title' })`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const Title = styled.p.attrs({ className: 'section-title' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: #2f3130;
  margin: 0;
  white-space: nowrap;
`;

const InfoIconWrapper = styled.div.attrs({ className: 'info-icon' })`
  width: 16px;
  height: 16px;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    color: #68737d;
  }
`;

const Subtitle = styled.p.attrs({ className: 'section-subtitle' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  margin: 0;
  width: 100%;
`;

const CardsContainer = styled.div.attrs({ className: 'cards-container' })`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
  overflow-x: visible;
  min-height: 0;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d8dcde;
    border-radius: 6px;
    border: 3px solid white;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b8c0c5;
  }
`;

const CardWrapper = styled.div<{ $index: number }>`
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index * 0.1}s;
  position: relative;
  z-index: 1;

  &:hover {
    z-index: 100;
  }
`;

const ShowMoreLink = styled.button.attrs({ className: 'show-more-link' })`
  background: transparent;
  border: none;
  padding: 12px 0;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #1f73b7;
  text-align: left;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

interface Topic {
  id: string;
  title: string;
  description: string;
  percentage: string;
  sampleTickets: string[];
}

const defaultTopics: Topic[] = [
  {
    id: '1',
    title: 'Password Reset Requests',
    description: 'Customers asking for a temporary password or one-time login credential to regain access to their account',
    percentage: '12% of total tickets',
    sampleTickets: [
      '#511 Can\'t remember my password',
      '#224 Need password reset link',
      '#234 Password reset email not received',
      '#453 Locked out of my account',
      '#136 Reset password not working'
    ]
  },
  {
    id: '2',
    title: 'Delivery Address Changes',
    description: 'Users requesting to modify or update the shipping address for their pending orders',
    percentage: '8% of total tickets',
    sampleTickets: [
      '#722 Change delivery address',
      '#845 Update shipping address',
      '#901 Wrong delivery address entered',
      '#1024 Need to change my order\'s address',
      '#567 Edit delivery details'
    ]
  },
  {
    id: '3',
    title: 'Billing Questions',
    description: 'Inquiries about charges, invoices, payment methods, and subscription billing issues',
    percentage: '6% of total tickets',
    sampleTickets: [
      '#389 Question about recent charge',
      '#412 Invoice not received',
      '#698 Update payment method',
      '#755 Unexpected billing amount',
      '#823 Need billing history'
    ]
  }
];

interface TopicsSelectionProps {
  topics?: Topic[];
  onSelectedTopicsChange?: (topicTitles: string[]) => void;
  initialSelectedTopics?: string[];
}

export default function TopicsSelection({ topics = defaultTopics, onSelectedTopicsChange, initialSelectedTopics = [] }: TopicsSelectionProps) {
  // Initialize with provided selection or all topics if none provided
  const getInitialSelection = () => {
    if (initialSelectedTopics.length > 0) {
      // Convert topic titles to IDs
      const selectedIds = topics
        .filter(t => initialSelectedTopics.includes(t.title))
        .map(t => t.id);
      return new Set(selectedIds);
    }
    return new Set(topics.map(t => t.id));
  };

  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(getInitialSelection());
  const [showAllTopicsModal, setShowAllTopicsModal] = useState(false);

  // Notify parent on mount with initial selection
  useEffect(() => {
    if (onSelectedTopicsChange) {
      // If we have initialSelectedTopics, use those; otherwise use all
      const selectedTitles = initialSelectedTopics.length > 0
        ? initialSelectedTopics
        : topics.map(t => t.title);
      onSelectedTopicsChange(selectedTitles);
    }
  }, []);

  const handleTopicChange = (id: string, checked: boolean) => {
    setSelectedTopics(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }

      // Notify parent with topic titles
      if (onSelectedTopicsChange) {
        const selectedTitles = topics
          .filter(t => next.has(t.id))
          .map(t => t.title);
        onSelectedTopicsChange(selectedTitles);
      }

      return next;
    });
  };

  const handleAllTopicsSave = (selectedTitles: string[]) => {
    // Update local state
    const selectedIds = topics
      .filter(t => selectedTitles.includes(t.title))
      .map(t => t.id);
    setSelectedTopics(new Set(selectedIds));

    // Notify parent
    if (onSelectedTopicsChange) {
      onSelectedTopicsChange(selectedTitles);
    }

    setShowAllTopicsModal(false);
  };

  return (
    <Container>
      <SectionHeader>
        <HeaderContent>
          <HeaderTitle>
            <Title>High-impact topics identified</Title>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </HeaderTitle>
          <Subtitle>
            These topics represent the hi-impact customer questions that would benefit from automation. By default, all are selected, but you can customize your selection.
          </Subtitle>
        </HeaderContent>
      </SectionHeader>

      <CardsContainer>
        {topics.map((topic, index) => (
          <CardWrapper key={topic.id} $index={index}>
            <TopicCheckboxCard
              title={topic.title}
              description={topic.description}
              percentage={topic.percentage}
              sampleTickets={topic.sampleTickets}
              isChecked={selectedTopics.has(topic.id)}
              onChange={(checked) => handleTopicChange(topic.id, checked)}
            />
          </CardWrapper>
        ))}
      </CardsContainer>

      <ShowMoreLink onClick={() => setShowAllTopicsModal(true)}>
        Show more topics
      </ShowMoreLink>

      {showAllTopicsModal && (
        <AllTopicsModal
          onClose={() => setShowAllTopicsModal(false)}
          selectedTopicTitles={topics.filter(t => selectedTopics.has(t.id)).map(t => t.title)}
          onSave={handleAllTopicsSave}
        />
      )}
    </Container>
  );
}
