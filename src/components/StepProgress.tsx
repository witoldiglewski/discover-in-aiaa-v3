import styled from 'styled-components';

const ProgressContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 6px;
`;

const ProgressBar = styled.div<{ $width: number; $progress: number }>`
  height: 6px;
  background-color: #d8dcf4;
  border-radius: 30px;
  position: relative;
  width: ${props => props.$width}px;
  flex-shrink: 0;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 6px;
  background-color: #4c67d3;
  border-radius: 30px;
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  // Calculate progress for each step
  const getStepProgress = (stepIndex: number): number => {
    if (stepIndex < currentStep) return 100;
    if (stepIndex === currentStep) return 50;
    return 0;
  };

  // Define widths for each bar (based on Figma design)
  const widths = [123, 54, 46, 46];

  return (
    <ProgressContainer>
      {widths.slice(0, totalSteps).map((width, index) => (
        <ProgressBar key={index} $width={width} $progress={getStepProgress(index)}>
          <ProgressFill $progress={getStepProgress(index)} />
        </ProgressBar>
      ))}
    </ProgressContainer>
  );
}
