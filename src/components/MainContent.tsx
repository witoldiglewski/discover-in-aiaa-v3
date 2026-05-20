import { useState } from 'react';
import styled from 'styled-components';
import StepProgress from './StepProgress';
import Stepper from './Stepper';
import LoaderAnimation from './LoaderAnimation';
import SummaryCard from './SummaryCard';
import TopicsTable from './TopicsTable';
import ArticlesTable from './ArticlesTable';
import ActionFooter from './ActionFooter';

const Container = styled.div.attrs({ className: 'main-content-container' })`
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

const ContentArea = styled.div.attrs({ className: 'main-content-area' })`
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

const TitleSection = styled.div.attrs({ className: 'title-section' })`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Title = styled.h1.attrs({ className: 'page-title' })`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.354px;
  color: #2f3130;
  margin: 0;
  max-width: 700px;
`;

const Subtitle = styled.p.attrs({ className: 'page-subtitle' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  margin: 0;
  max-width: 670px;
`;

const PanelsContainer = styled.div.attrs({ className: 'panels-container' })`
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #f7f7f7;
  border: 1px solid #eae9e8;
  border-radius: 24px;
  flex: 1;
  min-height: 0;
`;

const LeftPanel = styled.div.attrs({ className: 'stepper-panel' })`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  border: 1px solid #eae9e8;
  border-radius: 16px;
  width: 280px;
  flex-shrink: 0;
`;

const RightPanel = styled.div.attrs({ className: 'content-panel' })`
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

const Divider = styled.div.attrs({ className: 'section-divider' })`
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
    description: 'Selecting trending topics that could be automated',
  },
  {
    label: 'Create articles',
    description: 'Include instructions and forms as needed.',
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
  const [showTable, setShowTable] = useState(false);

  const handleAnimationComplete = () => {
    // Wait 0.5s after animation completes, then switch to table view
    setTimeout(() => {
      setShowTable(true);
      setCurrentStep(1); // Move to step 2: "Identify topics"
    }, 500);
  };

  const handleNext = () => {
    // Progress through the stepper steps
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    // Go back through the stepper steps
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSaveAndClose = () => {
    console.log('Save and close');
  };

  return (
    <Container>
      <ContentArea>
        <TitleSection>
          <StepProgress currentStep={1} totalSteps={4} />
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
            {currentStep === 2 ? (
              <ArticlesTable />
            ) : showTable ? (
              <TopicsTable />
            ) : (
              <>
                <LoaderAnimation />
                <Divider />
                <SummaryCard items={summaryItems} animate={true} onAnimationComplete={handleAnimationComplete} />
              </>
            )}
          </RightPanel>
        </PanelsContainer>
      </ContentArea>

      <ActionFooter
        currentStep={2}
        totalSteps={4}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSaveAndClose={handleSaveAndClose}
        isNextDisabled={!showTable}
      />
    </Container>
  );
}
