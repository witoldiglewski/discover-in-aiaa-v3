import styled, { keyframes } from 'styled-components';

// Column 1: starts 20, 80 -> 80, 20 -> back to 20, 80
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

// Column 2: starts 80, 20 -> 20, 80 -> back to 80, 20 (opposite direction - animates up)
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

// Column 3: starts 40, 60 -> 60, 40 -> back to 40, 60
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

const LoaderContainer = styled.div.attrs({ className: 'loader-container' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 196px;
`;

const GridAnimation = styled.div.attrs({ className: 'grid-animation' })`
  display: flex;
  gap: 8px;
  height: 128px;
`;

const Column = styled.div.attrs({ className: 'loader-column' })`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 60px;
  height: 100%;
`;

const Square = styled.div.attrs({ className: 'loader-square' })`
  border-radius: 8px;
  background: rgba(141, 89, 177, 0.16);
  flex-shrink: 0;
`;

// Column 1 squares
const Column1Top = styled(Square)`
  height: 20px;
  animation: ${animateColumn1Top} 3.2s ease-in-out infinite;
`;

const Column1Bottom = styled(Square)`
  height: 80px;
  animation: ${animateColumn1Bottom} 3.2s ease-in-out infinite;
`;

// Column 2 squares
const Column2Top = styled(Square)`
  height: 80px;
  animation: ${animateColumn2Top} 3.2s ease-in-out infinite;
`;

const Column2Bottom = styled(Square)`
  height: 20px;
  animation: ${animateColumn2Bottom} 3.2s ease-in-out infinite;
`;

// Column 3 squares
const Column3Top = styled(Square)`
  height: 40px;
  animation: ${animateColumn3Top} 3.2s ease-in-out infinite;
`;

const Column3Bottom = styled(Square)`
  height: 60px;
  animation: ${animateColumn3Bottom} 3.2s ease-in-out infinite;
`;

export default function LoaderAnimation() {
  return (
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
  );
}
