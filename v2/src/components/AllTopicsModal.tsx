import { createPortal } from 'react-dom';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import XIcon from '@zendeskgarden/svg-icons/src/16/x-stroke.svg?react';
import InfoStrokeIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const tableRowFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div.attrs({ className: 'all-topics-overlay' })`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const Modal = styled.div.attrs({ className: 'all-topics-modal' })`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 800px;
  background: white;
  border: 1px solid transparent;
  border-radius: 16px;
  box-shadow: 0px 0px 4px 0px rgba(10, 13, 14, 0.16);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeInUp} 0.4s ease forwards;
`;

const Header = styled.div.attrs({ className: 'modal-header' })`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 20px 20px 20px 32px;
  border-bottom: 1px solid #dcdcda;
  flex-shrink: 0;
`;

const HeaderTitle = styled.div.attrs({ className: 'header-title' })`
  flex: 1;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: #2f3130;
  font-weight: 400;
`;

const HeaderCloseButton = styled.button.attrs({ className: 'close-button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  color: #68737d;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const CloseIcon = styled(XIcon).attrs({ className: 'close-icon' })`
  width: 16px;
  height: 16px;
`;

const Content = styled.div.attrs({ className: 'modal-content' })`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 32px;
  gap: 20px;
`;

const TopHeader = styled.div.attrs({ className: 'top-header' })`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const TitleRow = styled.div.attrs({ className: 'title-row' })`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Title = styled.h2.attrs({ className: 'title' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: #2f3130;
  margin: 0;
`;

const InfoIcon = styled(InfoStrokeIcon).attrs({ className: 'info-icon' })`
  width: 16px;
  height: 16px;
  color: #68737d;
`;

const Subtitle = styled.p.attrs({ className: 'subtitle' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  margin: 0;
`;

const TableHeader = styled.div.attrs({ className: 'table-header' })`
  display: flex;
  gap: 20px;
  padding: 0 28px 0 28px;
  height: 20px;
  align-items: center;
`;

const CheckboxSpacer = styled.div`
  width: 16px;
  flex-shrink: 0;
`;

const ColumnHeader = styled.div.attrs({ className: 'column-header' })<{ $width?: string }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #2f3130;
  text-align: left;
  ${props => props.$width ? `width: ${props.$width}; flex-shrink: 0;` : 'flex: 1; min-width: 260px;'}
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
  position: relative;

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

const TableRow = styled.div.attrs({ className: 'table-row' })<{ $index?: number }>`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #eae9e8;
  opacity: 0;
  animation: ${tableRowFadeIn} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.05 : 0}s;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

const CheckboxContainer = styled.div.attrs({ className: 'checkbox-container' })`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
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

const TopicCell = styled.div.attrs({ className: 'cell-topic' })`
  flex: 1;
  min-width: 260px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #2f3130;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ConversationsCell = styled.div.attrs({ className: 'cell-conversations' })`
  width: 200px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #2f3130;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CoverageCell = styled.div.attrs({ className: 'cell-coverage' })`
  width: 120px;
  display: flex;
  align-items: center;
`;

const Tag = styled.div.attrs({ className: 'coverage-tag' })`
  background: #d9ecfc;
  display: flex;
  gap: 4px;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 99px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #1a3250;
  white-space: nowrap;
`;

const Footer = styled.div.attrs({ className: 'modal-footer' })`
  height: 72px;
  width: 100%;
  flex-shrink: 0;
  background: #ffffff;
  box-shadow: inset 0 1px 0 0 #d8dcde;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px;
  gap: 20px;
`;

const CloseButton = styled.button.attrs({ className: 'btn-close' })`
  height: 40px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #1f73b7;

  &:hover {
    background: rgba(31, 115, 183, 0.04);
  }
`;

const SaveButton = styled.button.attrs({ className: 'btn-save' })`
  height: 40px;
  padding: 10px 16px;
  background: #1f73b7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #ffffff;

  &:hover {
    background: #1a5f99;
  }
`;

interface Topic {
  id: string;
  topic: string;
  conversations: string;
  coverage: string;
}

const allTopics: Topic[] = [
  { id: '1', topic: 'Password Reset Requests', conversations: '13,902', coverage: '12%' },
  { id: '2', topic: 'Delivery Address Changes', conversations: '12,875', coverage: '11%' },
  { id: '3', topic: 'Billing Questions', conversations: '10,294', coverage: '10%' },
  { id: '4', topic: 'Unlocking accounts after too many attempts', conversations: '9,857', coverage: '8%' },
  { id: '5', topic: 'Guiding users through 2FA', conversations: '8,421', coverage: '8%' },
  { id: '6', topic: 'Enhancing password recovery flow', conversations: '7,539', coverage: '8%' },
  { id: '7', topic: 'Optimizing onboarding experience', conversations: '6,902', coverage: '7%' },
  { id: '8', topic: 'Reducing checkout abandonment', conversations: '6,381', coverage: '5%' },
  { id: '9', topic: 'Improving mobile app performance', conversations: '4,750', coverage: '5%' },
  { id: '10', topic: 'Enhancing customer support response time', conversations: '3,212', coverage: '5%' },
  { id: '11', topic: 'Optimizing inventory management with AI', conversations: '4,580', coverage: '12%' },
  { id: '12', topic: 'Reducing operational costs through automation', conversations: '2,950', coverage: '8%' },
  { id: '13', topic: 'Increasing website traffic via targeted ads', conversations: '7,430', coverage: '15%' },
  { id: '14', topic: 'Improving product quality with user feedback', conversations: '1,820', coverage: '7%' },
];

interface AllTopicsModalProps {
  onClose: () => void;
  selectedTopicTitles: string[];
  onSave: (selectedTitles: string[]) => void;
}

export default function AllTopicsModal({ onClose, selectedTopicTitles, onSave }: AllTopicsModalProps) {
  const portalRoot = document.getElementById('root')?.parentElement || document.body;

  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(
    new Set(allTopics.filter(t => selectedTopicTitles.includes(t.topic)).map(t => t.id))
  );

  const handleRowClick = (id: string) => {
    setSelectedTopics(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSave = () => {
    const selectedTitles = allTopics
      .filter(t => selectedTopics.has(t.id))
      .map(t => t.topic);
    onSave(selectedTitles);
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderTitle>All topics</HeaderTitle>
          <HeaderCloseButton onClick={onClose}>
            <CloseIcon />
          </HeaderCloseButton>
        </Header>

        <Content>
          <TopHeader>
            <TitleRow>
              <Title>High-impact topics identified</Title>
              <InfoIcon />
            </TitleRow>
            <Subtitle>
              These topics represent the hi-impact customer questions that would benefit from automation. Select topics to include in your automation strategy.
            </Subtitle>
          </TopHeader>

          <TableHeader>
            <CheckboxSpacer />
            <ColumnHeader>Topic</ColumnHeader>
            <ColumnHeader $width="200px">Conversations</ColumnHeader>
            <ColumnHeader $width="120px">Coverage</ColumnHeader>
          </TableHeader>

          <TableContent>
            {allTopics.map((item, index) => (
              <TableRow key={item.id} $index={index} onClick={() => handleRowClick(item.id)}>
                <CheckboxContainer>
                  <Checkbox $isChecked={selectedTopics.has(item.id)} />
                </CheckboxContainer>
                <TopicCell>{item.topic}</TopicCell>
                <ConversationsCell>{item.conversations}</ConversationsCell>
                <CoverageCell>
                  <Tag>{item.coverage}</Tag>
                </CoverageCell>
              </TableRow>
            ))}
          </TableContent>
        </Content>

        <Footer>
          <CloseButton onClick={onClose}>Cancel</CloseButton>
          <SaveButton onClick={handleSave}>Apply selection</SaveButton>
        </Footer>
      </Modal>
    </Overlay>,
    portalRoot
  );
}
