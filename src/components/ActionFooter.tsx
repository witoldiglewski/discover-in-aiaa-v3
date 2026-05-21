import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';

const Footer = styled.div.attrs({ className: 'action-footer' })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 20px 32px;
  border-top: 1px solid #e8eaec;
  width: 100%;
  flex-shrink: 0;
`;

const StepIndicator = styled.div.attrs({ className: 'step-indicator' })`
  display: flex;
  gap: 19px;
  align-items: center;
`;

const ChevronButton = styled.button.attrs({ className: 'chevron-button' })<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  padding: 0;
  opacity: ${props => props.$disabled ? 0.4 : 1};

  &:hover:not(:disabled) {
    opacity: 0.7;
  }
`;

const ChevronIcon = styled.svg.attrs({ className: 'chevron-icon' })<{ $rotate?: boolean }>`
  width: 16px;
  height: 16px;
  transform: ${props => props.$rotate ? 'rotate(180deg)' : 'none'};
`;

const StepText = styled.p.attrs({ className: 'step-text' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: #646864;
  margin: 0;
  white-space: nowrap;
`;

const Actions = styled.div.attrs({ className: 'footer-actions' })`
  display: flex;
  gap: 20px;
  align-items: center;
`;

interface ActionFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onSaveAndClose?: () => void;
  isNextDisabled?: boolean;
}

export default function ActionFooter({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSaveAndClose,
  isNextDisabled = true,
}: ActionFooterProps) {
  const canGoPrevious = currentStep > 1;
  const canGoNext = currentStep < totalSteps;

  // Steps 3 and 4 use "Approve and go next" instead of "Next"
  const nextButtonText = (currentStep === 3 || currentStep === 4) ? 'Approve and go next' : 'Next';

  return (
    <Footer>
      <StepIndicator>
        <ChevronButton
          onClick={onPrevious}
          disabled={!canGoPrevious}
          $disabled={!canGoPrevious}
        >
          <ChevronIcon viewBox="0 0 16 16" $rotate={true}>
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </ChevronIcon>
        </ChevronButton>
        <StepText>Step {currentStep} of {totalSteps}</StepText>
        <ChevronButton
          onClick={onNext}
          disabled={!canGoNext}
          $disabled={!canGoNext}
        >
          <ChevronIcon viewBox="0 0 16 16">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </ChevronIcon>
        </ChevronButton>
      </StepIndicator>

      <Actions>
        <Button onClick={onSaveAndClose}>
          Save and close
        </Button>
        <Button isPrimary disabled={isNextDisabled} onClick={onNext}>
          {nextButtonText}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginLeft: '8px' }}>
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </Actions>
    </Footer>
  );
}
