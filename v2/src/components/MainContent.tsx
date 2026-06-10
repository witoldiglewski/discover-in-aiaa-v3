import { useState } from 'react';
import styled from 'styled-components';
import StepProgress from './StepProgress';
import LoaderAnimation from './LoaderAnimation';
import SummaryCard from './SummaryCard';
import TopicsSelection from './TopicsSelection';
import ProceduresArticlesSelection from './ProceduresArticlesSelection';
import SummaryGrid from './SummaryGrid';
import ActionFooter from './ActionFooter';
import TestAgentPanel from './TestAgentPanel';

const Container = styled.div.attrs({ className: 'panels-wrapper' })`
  display: flex;
  gap: 12px;
  height: 100%;
  width: 100%;
  padding-bottom: 12px;
  padding-right: 12px;
  background: transparent;
  flex: 1;
  min-height: 0;
`;

const LeftPanel = styled.div.attrs({ className: 'main-content-container' })`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
  background: linear-gradient(52.79deg, rgb(255, 255, 255) 18.584%, rgba(255, 255, 255, 0) 59.585%);
  border-radius: 12px;
  box-shadow: 0px 0px 4px 0px rgba(10, 13, 14, 0.16);
  border: 1px solid transparent;
  overflow: hidden;
  position: relative;
  align-self: stretch;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    border-radius: 12px;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/gradient-overlay.png') no-repeat;
    background-size: cover;
    opacity: 0.7;
    border-radius: 12px;
    z-index: 1;
  }
`;

const ContentArea = styled.div.attrs({ className: 'main-content-area' })`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  position: relative;
  z-index: 2;
  overflow: hidden;
`;

const ScrollableContent = styled.div.attrs({ className: 'scrollable-content' })`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 48px 80px;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 0;
`;

const TitleSection = styled.div.attrs({ className: 'title-section' })`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const TitleWrapper = styled.div.attrs({ className: 'title-wrapper' })`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h1.attrs({ className: 'page-title' })`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.3536px;
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

const ContentCard = styled.div.attrs({ className: 'content-card' })<{ $centered?: boolean }>`
  background: white;
  border: 1px solid #dcdcda;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  align-items: ${props => props.$centered ? 'center' : 'flex-start'};
  justify-content: ${props => props.$centered ? 'center' : 'flex-start'};
  min-height: 0;
  padding: 20px;
  border-radius: 24px;
  width: 100%;
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
    description: '',
  },
  {
    label: 'Identify topics',
    description: 'AI selected trending topics for automation',
  },
  {
    label: 'Create procedures',
    description: 'Review AI-generated procedures and articles',
  },
  {
    label: 'Summary',
    description: 'Review impact and publish approved content',
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
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleAnimationComplete = () => {
    // Wait 0.5s after animation completes, then switch to table view
    setTimeout(() => {
      setShowTable(true);
      setCurrentStep(1); // Move to step 2: "Identify topics"
    }, 500);
  };

  const handleTopicsChange = (topics: string[]) => {
    setSelectedTopics(topics);
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
      // If going back to step 0, hide the table to show the loader/summary card
      if (currentStep === 1) {
        setShowTable(false);
      }
    }
  };

  const handleSaveAndClose = () => {
    console.log('Save and close');
  };

  return (
    <Container>
      <LeftPanel>
        <ContentArea>
          <ScrollableContent>
            <TitleSection>
              <StepProgress currentStep={1} totalSteps={4} />
              <TitleWrapper>
                <Title>Discover automation opportunities</Title>
                <Subtitle>
                  We analyzed your historical support conversations to find the best topics to automate.
                  Review recommended knowledge and procedure actions before continuing.
                </Subtitle>
              </TitleWrapper>
            </TitleSection>

            <ContentCard $centered={!showTable && currentStep === 0}>
              {currentStep === 3 ? (
                <SummaryGrid />
              ) : currentStep === 2 ? (
                <ProceduresArticlesSelection selectedTopics={selectedTopics} />
              ) : showTable ? (
                <TopicsSelection onSelectedTopicsChange={handleTopicsChange} initialSelectedTopics={selectedTopics} />
              ) : (
                <>
                  <LoaderAnimation />
                  <Divider />
                  <SummaryCard items={summaryItems} animate={true} onAnimationComplete={handleAnimationComplete} />
                </>
              )}
            </ContentCard>
          </ScrollableContent>

          <ActionFooter
            currentStep={currentStep + 1}
            totalSteps={3}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSaveAndClose={handleSaveAndClose}
            isNextDisabled={!showTable}
          />
        </ContentArea>
      </LeftPanel>

      <TestAgentPanel />
    </Container>
  );
}
