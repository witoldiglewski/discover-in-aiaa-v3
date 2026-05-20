import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.div.attrs({ className: 'summary-card' })`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 5px;
  width: 266px;
`;

const ChecklistItem = styled.div.attrs({ className: 'checklist-item' })`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 100%;
`;

const CheckIcon = styled.div.attrs({ className: 'check-icon' })<{ $isComplete: boolean }>`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const CheckIconSvg = styled.svg.attrs({ className: 'check-icon-svg' })<{ $isComplete: boolean }>`
  width: 20px;
  height: 20px;
  transition: color 0.3s ease;
`;

const CheckCircle = styled.circle.attrs({ className: 'check-circle' })<{ $isComplete: boolean }>`
  fill: ${props => props.$isComplete ? '#68B828' : '#D8DCDE'};
  opacity: 1;
  transition: all 0.3s ease;
`;

const CheckMark = styled.path.attrs({ className: 'check-mark' })<{ $isComplete: boolean }>`
  stroke: white;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  transition: all 0.3s ease;
`;

const ItemText = styled.p.attrs({ className: 'checklist-item-text' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

interface SummaryCardProps {
  items: string[];
  animate?: boolean;
  onAnimationComplete?: () => void;
}

export default function SummaryCard({ items, animate = false, onAnimationComplete }: SummaryCardProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!animate) {
      // If not animating, show all items as complete
      setCompletedSteps(items.map((_, index) => index));
      return;
    }

    // Animate items one by one with 0.5s delay
    const timers: NodeJS.Timeout[] = [];

    items.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => {
          const newSteps = [...prev, index];

          // If this is the last item, call onAnimationComplete
          if (index === items.length - 1 && onAnimationComplete) {
            onAnimationComplete();
          }

          return newSteps;
        });
      }, index * 500); // 500ms = 0.5s delay between each

      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [animate, items, onAnimationComplete]);

  return (
    <Card>
      {items.map((item, index) => {
        const isComplete = completedSteps.includes(index);

        return (
          <ChecklistItem key={index}>
            <CheckIcon $isComplete={isComplete}>
              <CheckIconSvg viewBox="0 0 20 20" $isComplete={isComplete}>
                <CheckCircle
                  cx="10"
                  cy="10"
                  r="8.33"
                  $isComplete={isComplete}
                />
                <CheckMark
                  d="M7.5 10L9.16667 11.6667L12.5 8.33333"
                  $isComplete={isComplete}
                />
              </CheckIconSvg>
            </CheckIcon>
            <ItemText>{item}</ItemText>
          </ChecklistItem>
        );
      })}
    </Card>
  );
}
