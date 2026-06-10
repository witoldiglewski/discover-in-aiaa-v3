import styled from 'styled-components';
import TestingWidget from './TestingWidget';
import { useState, ReactNode } from 'react';
import { StepPartsContext } from '../contexts/StepPartsContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 32px);
  height: 100%;
  width: 100%;
  padding: var(--spacing-lg, 32px) var(--spacing-lg, 32px) var(--spacing-md, 20px);
`;

const ContentRow = styled.div`
  display: flex;
  flex: 1;
  gap: var(--spacing-xs, 8px);
  min-height: 0;
  width: 100%;
  position: relative;
`;

interface StepLayoutProps {
  children: React.ReactNode;
  widgetCollapsed: boolean;
  setWidgetCollapsed: (collapsed: boolean) => void;
  widgetIsReady: boolean;
}

export default function StepLayout({
  children,
  widgetCollapsed,
  setWidgetCollapsed,
  widgetIsReady
}: StepLayoutProps) {
  const [header, setHeader] = useState<ReactNode>(null);
  const [footer, setFooter] = useState<ReactNode>(null);

  return (
    <StepPartsContext.Provider value={{ setHeader, setFooter }}>
      <Container>
        {header}
        <ContentRow>
          {children}
          <TestingWidget
            collapsed={widgetCollapsed}
            onToggle={() => setWidgetCollapsed(!widgetCollapsed)}
            isReady={widgetIsReady}
          />
        </ContentRow>
        {footer}
      </Container>
    </StepPartsContext.Provider>
  );
}
