import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AnimationCheckIcon from '../assets/icons/animation-check.svg?react';

// Column animations
const animateColumn1Top = keyframes`
  0% {
    height: 20px;
  }
  50% {
    height: 80px;
  }
  100% {
    height: 20px;
  }
`;

const animateColumn1Bottom = keyframes`
  0% {
    height: 80px;
  }
  50% {
    height: 20px;
  }
  100% {
    height: 80px;
  }
`;

const animateColumn2Top = keyframes`
  0% {
    height: 80px;
  }
  50% {
    height: 20px;
  }
  100% {
    height: 80px;
  }
`;

const animateColumn2Bottom = keyframes`
  0% {
    height: 20px;
  }
  50% {
    height: 80px;
  }
  100% {
    height: 20px;
  }
`;

const animateColumn3Top = keyframes`
  0% {
    height: 40px;
  }
  50% {
    height: 60px;
  }
  100% {
    height: 40px;
  }
`;

const animateColumn3Bottom = keyframes`
  0% {
    height: 60px;
  }
  50% {
    height: 40px;
  }
  100% {
    height: 60px;
  }
`;

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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 160px;
`;

const GridAnimation = styled.div`
  display: flex;
  gap: 8px;
  height: 128px;
  padding: 16px 22px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 60px;
  height: 100%;
`;

const Square = styled.div`
  border-radius: 8px;
  background: rgba(141, 89, 177, 0.16);
  flex-shrink: 0;
`;

const Column1Top = styled(Square)`
  height: 20px;
  animation: ${animateColumn1Top} 3.2s ease-in-out infinite;
`;

const Column1Bottom = styled(Square)`
  height: 80px;
  animation: ${animateColumn1Bottom} 3.2s ease-in-out infinite;
`;

const Column2Top = styled(Square)`
  height: 80px;
  animation: ${animateColumn2Top} 3.2s ease-in-out infinite;
`;

const Column2Bottom = styled(Square)`
  height: 20px;
  animation: ${animateColumn2Bottom} 3.2s ease-in-out infinite;
`;

const Column3Top = styled(Square)`
  height: 40px;
  animation: ${animateColumn3Top} 3.2s ease-in-out infinite;
`;

const Column3Bottom = styled(Square)`
  height: 60px;
  animation: ${animateColumn3Bottom} 3.2s ease-in-out infinite;
`;

const StatusText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-accent, #8d59b1);
  margin: 0;
  text-align: center;
`;

const Divider = styled.div`
  background: var(--border-subtle, #eae9e8);
  height: 1px;
  width: 300px;
  margin: 4px 0;
`;

const ChecklistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 5px;
  width: 266px;
`;

const ChecklistItem = styled.div<{ $isComplete: boolean; $delay: number }>`
  display: flex;
  gap: 8px;
  align-items: center;
  opacity: 0;
  animation: ${fadeInUp} 0.4s ease forwards;
  animation-delay: ${props => props.$delay}ms;
`;

const CheckIconWrapper = styled.div<{ $isComplete: boolean }>`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    width: 16px;
    height: 16px;
    display: ${props => props.$isComplete ? 'block' : 'none'};
  }

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: transparent;
    border: ${props => props.$isComplete ? 'none' : '1.5px solid #dcdcda'};
    display: ${props => props.$isComplete ? 'none' : 'block'};
  }
`;

const ChecklistText = styled.p<{ $isComplete: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: ${props => props.$isComplete ? 'var(--fg-default, #2f3130)' : 'var(--fg-subtle, #646864)'};
  margin: 0;
`;

const CHECKLIST_ITEMS = [
  { text: 'Analyzed past support conversations', statusText: 'Analyzing conversations', duration: 1000 },
  { text: 'Identified high-value topics', statusText: 'Identifying topics', duration: 2000 },
  { text: 'Suggested automation actions', statusText: 'Suggesting actions', duration: 3500 },
  { text: 'Generated drafts', statusText: 'Generating drafts', duration: 5000 },
];

interface BuildAgentLoaderProps {
  onComplete?: () => void;
}

export default function BuildAgentLoader({ onComplete }: BuildAgentLoaderProps) {
  const [completedItems, setCompletedItems] = useState(0);
  const [currentStatusText, setCurrentStatusText] = useState(CHECKLIST_ITEMS[0].statusText);

  useEffect(() => {
    const timers = CHECKLIST_ITEMS.map((item, index) => {
      return setTimeout(() => {
        setCompletedItems(index + 1);
        // Update status text to next item's text before completing current one
        if (index < CHECKLIST_ITEMS.length - 1) {
          setCurrentStatusText(CHECKLIST_ITEMS[index + 1].statusText);
        }
        if (index === CHECKLIST_ITEMS.length - 1 && onComplete) {
          // Call onComplete after a short delay when all items are done
          setTimeout(onComplete, 800);
        }
      }, item.duration);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <Container>
      <LoaderContainer>
        <GridAnimation>
          <Column>
            <Column1Top />
            <Column1Bottom />
          </Column>
          <Column>
            <Column2Top />
            <Column2Bottom />
          </Column>
          <Column>
            <Column3Top />
            <Column3Bottom />
          </Column>
        </GridAnimation>
      </LoaderContainer>

      <StatusText>{currentStatusText}</StatusText>

      <Divider />

      <ChecklistContainer>
        {CHECKLIST_ITEMS.map((item, index) => (
          <ChecklistItem key={index} $isComplete={index < completedItems} $delay={item.duration}>
            <CheckIconWrapper $isComplete={index < completedItems}>
              <AnimationCheckIcon />
            </CheckIconWrapper>
            <ChecklistText $isComplete={index < completedItems}>{item.text}</ChecklistText>
          </ChecklistItem>
        ))}
      </ChecklistContainer>
    </Container>
  );
}
