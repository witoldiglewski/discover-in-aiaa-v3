import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

const LoaderContainer = styled.div`
  width: 240px;
  height: 160px;
  position: relative;
  overflow: hidden;
`;

const BoxesContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Box = styled.div<{ $delay: number }>`
  position: absolute;
  background-color: rgba(141, 89, 177, 0.16);
  border-radius: 8px;
  animation: ${pulse} 2s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const Box1 = styled(Box)`
  left: 22px;
  top: 16px;
  width: 60px;
  height: 40px;
`;

const Box2 = styled(Box)`
  left: 90px;
  top: 16px;
  width: 60px;
  height: 60px;
`;

const Box3 = styled(Box)`
  left: 158px;
  top: 16px;
  width: 60px;
  height: 100px;
`;

const Box4 = styled(Box)`
  left: 22px;
  top: 64px;
  width: 60px;
  height: 80px;
`;

const Box5 = styled(Box)`
  left: 90px;
  top: 84px;
  width: 60px;
  height: 60px;
`;

const Box6 = styled(Box)`
  left: 158px;
  top: 124px;
  width: 60px;
  height: 20px;
`;

export default function LoaderAnimation() {
  return (
    <LoaderContainer>
      <BoxesContainer>
        <Box1 $delay={0} />
        <Box2 $delay={0.2} />
        <Box3 $delay={0.4} />
        <Box4 $delay={0.6} />
        <Box5 $delay={0.8} />
        <Box6 $delay={1.0} />
      </BoxesContainer>
    </LoaderContainer>
  );
}
