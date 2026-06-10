import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ProcedureArticleCard from './ProcedureArticleCard';
import InfoIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';
import ReviewArticleOverlay from './ReviewArticleOverlay';

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

const Container = styled.div.attrs({ className: 'procedures-articles-selection' })`
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

const TabBar = styled.div.attrs({ className: 'tab-bar' })`
  display: flex;
  gap: 0;
  border-bottom: 1px solid #d8dcde;
  margin: 0 12px;
`;

const Tab = styled.button.attrs({ className: 'tab' })<{ $isActive: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.$isActive ? '#1f73b7' : 'transparent'};
  padding: 8px 16px;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${props => props.$isActive ? '#1f73b7' : '#68737d'};
  transition: all 0.2s ease;
  margin-bottom: -1px;

  &:hover {
    color: ${props => props.$isActive ? '#1f73b7' : '#2f3130'};
  }
`;

const CardsContainer = styled.div.attrs({ className: 'cards-container' })`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
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
`;

interface ProcedureArticle {
  id: string;
  type: 'procedure' | 'article';
  title: string;
  relatedTopic: string;
  articleContent?: {
    body: JSX.Element;
    edits: {
      description: string;
      oldText: string;
      newText: string;
    }[];
  };
}

const defaultItems: ProcedureArticle[] = [
  {
    id: '1',
    type: 'procedure',
    title: 'Password reset for locked accounts',
    relatedTopic: 'Password Reset Requests'
  },
  {
    id: '2',
    type: 'procedure',
    title: 'Update shipping address for pending orders',
    relatedTopic: 'Delivery Address Changes'
  },
  {
    id: '3',
    type: 'procedure',
    title: 'Billing inquiry and invoice generation',
    relatedTopic: 'Billing Questions'
  },
  {
    id: '4',
    type: 'article',
    title: 'How to reset your password',
    relatedTopic: 'Password Reset Requests',
    articleContent: {
      body: (
        <>
          <p>If you've forgotten your password or need to create a new one for security reasons, you can easily reset it using our self-service tools.</p>

          <h2>Reset via Login Page</h2>
          <p>The fastest way to reset your password:</p>
          <ol>
            <li>Go to the login page and click "Forgot Password?"</li>
            <li>Enter your email address or username.</li>
            <li>Check your email for a password reset link (it expires in 24 hours).</li>
            <li>Click the link and create a new password that meets our security requirements.</li>
          </ol>

          <h2>Password Requirements</h2>
          <p>Your new password must:</p>
          <ul>
            <li>Be at least 12 characters long</li>
            <li>Include at least one uppercase letter</li>
            <li>Include at least one number</li>
            <li>Not match your previous 3 passwords</li>
          </ul>

          <h2>Didn't Receive the Email?</h2>
          <p>If you haven't received the reset email after 5 minutes:</p>
          <ul>
            <li>Verify you entered the correct email address</li>
            <li>Request a new reset link</li>
            <li>Contact support if you still need help</li>
          </ul>

          <h2>Security Tips</h2>
          <p>To keep your account secure, we recommend enabling two-factor authentication after resetting your password.</p>
        </>
      ),
      edits: [
        {
          description: 'Update password length requirement',
          oldText: 'Be at least 12 characters long',
          newText: 'Be at least 8 characters long'
        },
        {
          description: 'Add spam folder check tip',
          oldText: 'Verify you entered the correct email address',
          newText: 'Check your spam or junk folder first, then verify you entered the correct email address'
        },
        {
          description: 'Remove outdated security section',
          oldText: 'To keep your account secure, we recommend enabling two-factor authentication after resetting your password.',
          newText: ''
        }
      ]
    }
  }
];

type FilterTab = 'all' | 'procedures' | 'articles';

interface ProceduresArticlesSelectionProps {
  items?: ProcedureArticle[];
  selectedTopics?: string[];
}

export default function ProceduresArticlesSelection({ items = defaultItems, selectedTopics = [] }: ProceduresArticlesSelectionProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set(items.map(i => i.id))
  );
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [reviewingItem, setReviewingItem] = useState<ProcedureArticle | null>(null);

  const handleItemChange = (id: string, checked: boolean) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleReviewClick = (item: ProcedureArticle) => {
    setReviewingItem(item);
  };

  const handleCloseReview = () => {
    setReviewingItem(null);
  };

  const handleSaveReview = () => {
    // Handle save logic
    setReviewingItem(null);
  };

  // Filter by selected topics first, then by active tab
  const filteredItems = items.filter(item => {
    // If no topics selected (or all topics selected), show all items
    const topicFilter = selectedTopics.length === 0 || selectedTopics.includes(item.relatedTopic);

    if (!topicFilter) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'procedures') return item.type === 'procedure';
    if (activeTab === 'articles') return item.type === 'article';
    return true;
  });

  return (
    <Container>
      <SectionHeader>
        <HeaderContent>
          <HeaderTitle>
            <Title>Suggested procedures and articles</Title>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </HeaderTitle>
          <Subtitle>
            Review AI-generated agent procedures and articles for automated workflows. By default, all are selected, but you can customize your selection.
          </Subtitle>
        </HeaderContent>
      </SectionHeader>

      <TabBar>
        <Tab $isActive={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          All
        </Tab>
        <Tab $isActive={activeTab === 'procedures'} onClick={() => setActiveTab('procedures')}>
          Procedures
        </Tab>
        <Tab $isActive={activeTab === 'articles'} onClick={() => setActiveTab('articles')}>
          Articles
        </Tab>
      </TabBar>

      <CardsContainer>
        {filteredItems.map((item, index) => (
          <CardWrapper key={item.id} $index={index}>
            <ProcedureArticleCard
              type={item.type}
              title={item.title}
              relatedTopic={item.relatedTopic}
              isChecked={selectedItems.has(item.id)}
              onChange={(checked) => handleItemChange(item.id, checked)}
              onReviewClick={() => handleReviewClick(item)}
            />
          </CardWrapper>
        ))}
      </CardsContainer>

      {reviewingItem && (
        <ReviewArticleOverlay
          item={reviewingItem}
          onClose={handleCloseReview}
          onSave={handleSaveReview}
        />
      )}
    </Container>
  );
}
