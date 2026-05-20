import styled from 'styled-components';

const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StepHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
`;

const StepIcon = styled.div<{ $isCurrent: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$isCurrent ? '#5c6970' : '#e8eaec'};
  flex-shrink: 0;
`;

const StepNumber = styled.span<{ $isCurrent: boolean }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: ${props => props.$isCurrent ? 'white' : '#293239'};
`;

const StepLabel = styled.p<{ $isCurrent: boolean }>`
  flex: 1;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: ${props => props.$isCurrent ? '600' : '400'};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${props => props.$isCurrent ? '#293239' : '#5c6970'};
  margin: 0;
`;

const StepContent = styled.div<{ $showContent: boolean; $isLast: boolean }>`
  display: flex;
  padding-left: 12px;
  padding-top: 12px;
  padding-bottom: ${props => props.$isLast ? '48px' : '12px'};
  width: 100%;
`;

const StepContentInner = styled.div<{ $isCurrent: boolean; $isLast: boolean }>`
  flex: 1;
  min-width: 0;
  ${props => !props.$isLast && `
    border-left: 1px solid ${props.$isCurrent ? '#d8dcde' : '#dcdcda'};
  `}
`;

const StepDescription = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #293239;
  margin: 0;
  padding-left: 24px;
`;

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <StepperContainer>
      {steps.map((step, index) => {
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <StepItem key={index}>
            <StepHeader>
              <StepIcon $isCurrent={isCurrent}>
                <StepNumber $isCurrent={isCurrent}>{index + 1}</StepNumber>
              </StepIcon>
              <StepLabel $isCurrent={isCurrent}>{step.label}</StepLabel>
            </StepHeader>
            {(isCurrent && step.description) && (
              <StepContent $showContent={true} $isLast={isLast}>
                <StepContentInner $isCurrent={isCurrent} $isLast={isLast}>
                  <StepDescription>{step.description}</StepDescription>
                </StepContentInner>
              </StepContent>
            )}
            {!isCurrent && !isLast && (
              <StepContent $showContent={false} $isLast={isLast}>
                <StepContentInner $isCurrent={false} $isLast={isLast}>
                  <div style={{ height: '24px' }} />
                </StepContentInner>
              </StepContent>
            )}
            {isLast && !isCurrent && (
              <StepContent $showContent={false} $isLast={true}>
                <StepContentInner $isCurrent={false} $isLast={true}>
                  <div style={{ height: '24px' }} />
                </StepContentInner>
              </StepContent>
            )}
          </StepItem>
        );
      })}
    </StepperContainer>
  );
}
