import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

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

interface TestAgentLoaderProps {
  onComplete?: () => void;
}

export default function TestAgentLoader({ onComplete }: TestAgentLoaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
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

      <StatusText>Generating testing plan</StatusText>
    </Container>
  );
}
