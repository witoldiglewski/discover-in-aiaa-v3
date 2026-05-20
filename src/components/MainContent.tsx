import { useState } from 'react';
import styled from 'styled-components';
import StepProgress from './StepProgress';
import Stepper from './Stepper';
import LoaderAnimation from './LoaderAnimation';
import SummaryCard from './SummaryCard';
import ActionFooter from './ActionFooter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: linear-gradient(43.6deg, rgb(255, 255, 255) 18.584%, rgba(255, 255, 255, 0) 59.585%);
  border-radius: 12px;
  box-shadow: 0px 0px 4px 0px rgba(10, 13, 14, 0.16);
  border: 1px solid transparent;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 48px 80px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  min-height: 0;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Title = styled.h1`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.354px;
  color: #2f3130;
  margin: 0;
  max-width: 700px;
`;

const Subtitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  margin: 0;
  max-width: 670px;
`;

const PanelsContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #f7f7f7;
  border: 1px solid #eae9e8;
  border-radius: 24px;
  flex: 1;
  min-height: 0;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  border: 1px solid #eae9e8;
  border-radius: 16px;
  width: 280px;
  flex-shrink: 0;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: white;
  border: 1px solid #eae9e8;
  border-radius: 16px;
  min-width: 0;
`;

const Divider = styled.div`
  width: 300px;
  height: 1px;
  background: #eae9e8;
  flex-shrink: 0;
`;

const steps = [
  {
    label: 'Analysis',
    description: 'Include instructions and forms as needed.',
  },
  {
    label: 'Identify topics',
  },
  {
    label: 'Create articles',
  },
  {
    label: 'Create procedures',
  },
  {
    label: 'Summary',
  },
];

const summaryItems = [
  'Analyzed past support conversations',
  'Identified high-value topics',
  'Suggested automation actions',
  'Generated drafts',
];

export default function MainContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardStep, setWizardStep] = useState(2); // Step 2 of 4 as shown in design

  const handleNext = () => {
    if (wizardStep < 4) {
      setWizardStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (wizardStep > 1) {
      setWizardStep(prev => prev - 1);
    }
  };

  const handleSaveAndClose = () => {
    console.log('Save and close');
  };

  return (
    <Container>
      <ContentArea>
        <TitleSection>
          <StepProgress currentStep={wizardStep - 1} totalSteps={4} />
          <div>
            <Title>Discover automation opportunities</Title>
            <Subtitle>
              We analyzed your historical support conversations to find the best topics to automate.
              Review recommended knowledge and procedure actions before continuing.
            </Subtitle>
          </div>
        </TitleSection>

        <PanelsContainer>
          <LeftPanel>
            <Stepper steps={steps} currentStep={currentStep} />
          </LeftPanel>

          <RightPanel>
            <LoaderAnimation />
            <Divider />
            <SummaryCard items={summaryItems} animate={true} />
          </RightPanel>
        </PanelsContainer>
      </ContentArea>

      <ActionFooter
        currentStep={wizardStep}
        totalSteps={4}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSaveAndClose={handleSaveAndClose}
        isNextDisabled={true}
      />
    </Container>
  );
}
