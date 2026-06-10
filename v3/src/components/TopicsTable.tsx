import styled, { keyframes } from 'styled-components';
import InfoStrokeIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';

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

const Container = styled.div.attrs({ className: 'topics-table-container' })`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Header = styled.div.attrs({ className: 'topics-table-header' })`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 8px 12px;
`;

const TitleRow = styled.div.attrs({ className: 'topics-title-row' })`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Title = styled.h2.attrs({ className: 'topics-title' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  color: #2f3130;
  margin: 0;
`;

const InfoIcon = styled(InfoStrokeIcon).attrs({ className: 'info-icon' })`
  width: 16px;
  height: 16px;
  color: #68737d;
`;

const Subtitle = styled.p.attrs({ className: 'topics-subtitle' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: #646864;
  margin: 0;
`;

const TableHeader = styled.div.attrs({ className: 'table-header-row' })`
  display: flex;
  gap: 20px;
  padding-left: 28px;
  padding-right: 41px;
  height: 20px;
`;

const ColumnHeader = styled.div.attrs({ className: 'table-column-header' })<{ $width?: string }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: #2f3130;
  ${props => props.$width ? `width: ${props.$width};` : 'flex: 1;'}
`;

const TableContent = styled.div.attrs({ className: 'table-content' })`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  border: 1px solid #dcdcda;
  border-radius: 12px;
  padding: 12px 20px;
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

const FadeOverlay = styled.div.attrs({ className: 'fade-overlay' })`
  position: absolute;
  bottom: 1px;
  left: 21px;
  right: 33px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  pointer-events: none;
  border-radius: 0 0 11px 11px;
`;

const TableRow = styled.div.attrs({ className: 'table-row' })<{ $index?: number }>`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #eae9e8;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.05 : 0}s;

  &:last-child {
    border-bottom: none;
  }
`;

const TopicCell = styled.div.attrs({ className: 'table-cell-topic' })`
  flex: 1;
  min-width: 260px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: #2f3130;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ConversationsCell = styled.div.attrs({ className: 'table-cell-conversations' })`
  width: 200px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: #2f3130;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AutomationCell = styled.div.attrs({ className: 'table-cell-automation' })`
  width: 120px;
  display: flex;
  align-items: center;
`;

const Tag = styled.div.attrs({ className: 'automation-tag' })`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 2px 8px;
  background: #ddf0c9;
  border-radius: 99px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: #25390f;
  white-space: nowrap;
`;

interface Topic {
  topic: string;
  conversations: string;
  automation: string;
}

const topics: Topic[] = [
  { topic: 'Troubleshooting login issues', conversations: '13,902', automation: '12%' },
  { topic: 'Resetting passwords', conversations: '12,875', automation: '11%' },
  { topic: 'Recovering usernames', conversations: '10,294', automation: '10%' },
  { topic: 'Unlocking accounts after too many attempts', conversations: '9,857', automation: '8%' },
  { topic: 'Guiding users through 2FA', conversations: '8,421', automation: '8%' },
  { topic: 'Enhancing password recovery flow', conversations: '7,539', automation: '8%' },
  { topic: 'Optimizing onboarding experience', conversations: '6,902', automation: '7%' },
  { topic: 'Reducing checkout abandonment', conversations: '6,381', automation: '5%' },
  { topic: 'Improving mobile app performance', conversations: '4,750', automation: '5%' },
  { topic: 'Enhancing customer support response time', conversations: '3,212', automation: '5%' },
  { topic: 'Optimizing inventory management with AI', conversations: '4,580', automation: '12%' },
  { topic: 'Reducing operational costs through automation', conversations: '2,950', automation: '8%' },
  { topic: 'Increasing website traffic via targeted ads', conversations: '7,430', automation: '15%' },
  { topic: 'Improving product quality with user feedback', conversations: '1,820', automation: '7%' },
];

export default function TopicsTable() {
  return (
    <Container>
      <Header>
        <TitleRow>
          <Title>Identify topics</Title>
          <InfoIcon />
        </TitleRow>
        <Subtitle>
          These topics represent the hi-impact customer questions that could benefit from automation.
        </Subtitle>
      </Header>

      <TableHeader>
        <ColumnHeader>Topic</ColumnHeader>
        <ColumnHeader $width="200px">Conversations</ColumnHeader>
        <ColumnHeader $width="120px">Est. Automation</ColumnHeader>
      </TableHeader>

      <TableContent>
        {topics.map((item, index) => (
          <TableRow key={index} $index={index}>
            <TopicCell>{item.topic}</TopicCell>
            <ConversationsCell>{item.conversations}</ConversationsCell>
            <AutomationCell>
              <Tag>{item.automation}</Tag>
            </AutomationCell>
          </TableRow>
        ))}
      </TableContent>

      <FadeOverlay />
    </Container>
  );
}
