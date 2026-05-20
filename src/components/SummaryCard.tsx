import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 5px;
  width: 266px;
`;

const ChecklistItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 100%;
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIconSvg = styled.svg`
  width: 16.67px;
  height: 16.67px;
  color: #646864;
`;

const ItemText = styled.p`
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
}

export default function SummaryCard({ items }: SummaryCardProps) {
  return (
    <Card>
      {items.map((item, index) => (
        <ChecklistItem key={index}>
          <CheckIcon>
            <CheckIconSvg viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.33" fill="currentColor" opacity="0.3"/>
              <path
                d="M7.5 10L9.16667 11.6667L12.5 8.33333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </CheckIconSvg>
          </CheckIcon>
          <ItemText>{item}</ItemText>
        </ChecklistItem>
      ))}
    </Card>
  );
}
