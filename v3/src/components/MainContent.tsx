import { useState, ReactElement } from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import SparkleIcon from '@zendeskgarden/svg-icons/src/16/sparkle-fill.svg?react';
import ConnectKnowledge, { ConnectKnowledgeHeader, ConnectKnowledgeFooter } from './ConnectKnowledge';
import PersonalizeAgent, { PersonalizeAgentHeader, PersonalizeAgentFooter } from './PersonalizeAgent';
import PersonalizeProfile, { PersonalizeProfileHeader, PersonalizeProfileFooter } from './PersonalizeProfile';
import PersonalizeAgentC, { PersonalizeAgentCHeader, PersonalizeAgentCFooter } from './PersonalizeAgentC';
import OptimizeAgent, { OptimizeAgentHeader, OptimizeAgentFooter } from './OptimizeAgent';
import TestAgent, { TestAgentHeader, TestAgentFooter } from './TestAgent';
import ActivateAgent, { ActivateAgentHeader, ActivateAgentFooter } from './ActivateAgent';
import SuccessScreen from './SuccessScreen';
import TestingWidget from './TestingWidget';
import ArticleEditor from './ArticleEditor';

// Import SVG as React components
import BubbleIcon from '../assets/Bubble.svg?react';
import PaperPlaneIcon from '../assets/Paper plane.svg?react';
import ChevronLeftIcon from '../assets/icons/buttons-chevron-left.svg?react';
import ChevronRightDefaultIcon from '../assets/icons/buttons-chevron-right-default.svg?react';
import ChevronRightDisabledIcon from '../assets/icons/buttons-chevron-right-disabled.svg?react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: var(--spacing-xxl, 48px);
  position: relative;
`;

const StepWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  width: 100%;
  padding: var(--spacing-lg, 32px) var(--spacing-lg, 32px) var(--spacing-md, 20px);
  gap: 32px var(--spacing-xs, 8px);
  grid-template-areas:
    "header header"
    "content widget"
    "footer footer";
`;

const StepHeader = styled.div`
  grid-area: header;
`;

const StepContentArea = styled.div`
  grid-area: content;
  min-width: 0;
  display: flex;
  gap: var(--spacing-xs, 8px);
  min-height: 0;
`;

const WidgetArea = styled.div`
  grid-area: widget;
  min-height: 0;
  display: flex;
`;

const StepFooter = styled.div`
  grid-area: footer;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xs, 8px) 0;
  width: 100%;
`;

const BackButton = styled(Button)`
  && {
    height: 40px;
    padding: 10px 16px;
    border-radius: var(--border-radii-pill, 99px);
    border: 1px solid var(--button-border-default, #999b97);
    background: transparent;
    color: var(--button-fg-default, #2f3130);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const ContinueButton = styled(Button)<{ $isEnabled: boolean }>`
  && {
    height: 40px;
    padding: 10px 16px;
    border-radius: var(--border-radii-pill, 99px);
    background: ${props => props.$isEnabled ? 'var(--button-bg-emphasis, #2f3130)' : 'var(--bg-disabled, rgba(100, 104, 100, 0.08))'};
    color: ${props => props.$isEnabled ? 'var(--fg-onemphasis, white)' : 'var(--fg-disabled, #8b8e89)'};
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: ${props => props.$isEnabled ? 'pointer' : 'not-allowed'};

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      ${props => props.$isEnabled && `
        background: var(--button-bg-emphasis-hover, #404241);
      `}
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl, 40px);
  max-width: 720px;
  width: 100%;
  position: relative;
  z-index: 2;
  padding-bottom: var(--spacing-xxl, 48px);
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  padding: 0 64px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  svg {
    width: 40px;
    height: 40px;
    color: #8b65d8;
  }
`;

const Title = styled.h1`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const Description = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md, 20px);
`;

const CardOuter = styled.div`
  position: relative;
  background: linear-gradient(43.6deg, rgb(255, 255, 255) 18.584%, rgba(255, 255, 255, 0) 59.585%);
  backdrop-filter: blur(15px);
  border: 1px solid transparent;
  border-radius: 26px;
  padding: var(--spacing-sm, 12px);
  box-shadow: 0px 12px 26px -8px rgba(30, 39, 65, 0.12);
  overflow: visible;
  transition: transform 0.3s ease, opacity 0.3s ease;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    z-index: 0;
    border-radius: 26px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 26px;
    padding: 1px;
    background: linear-gradient(-2deg, white 0%, rgba(167, 167, 167, 0.4) 100%);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    z-index: -1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-10px);
    opacity: 0.95;

    &::after {
      background: #8B8E89;
    }
  }
`;

const Card = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(30px);
  border-radius: var(--border-radii-xl, 16px);
  padding: var(--spacing-md, 20px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md, 20px);
`;

const CardIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 13.636px;
  background: var(--bg-raised, white);
  border: 1px solid var(--border-default, #dcdcda);
  border-radius: var(--border-radii-lg, 12px);
  width: fit-content;

  svg {
    width: 22.727px;
    height: 22.727px;
    color: var(--fg-default, #2f3130);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
`;

const CardTitle = styled.h2`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const CardDescription = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const StyledButton = styled(Button)`
  && {
    height: 32px;
    padding: 8px var(--spacing-md, 20px);
    border-radius: var(--border-radii-pill, 99px);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0;
    width: fit-content;
    background-color: var(--button-bg-emphasis, #2f3130);
    color: var(--fg-onemphasis, white);
    border: none;

    &:hover {
      background-color: var(--button-bg-emphasis-hover, #404241);
    }

    &:active {
      background-color: var(--button-bg-emphasis, #2f3130);
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(47, 49, 48, 0.2);
    }
  }
`;

const BackgroundGradient = styled.div`
  position: absolute;
  width: 400px;
  height: 320px;
  left: 50%;
  top: calc(50% + 34px);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  opacity: 0.4;
`;

const PurpleShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 300px;
  height: 300px;
  left: -50px;
  top: 50px;
  background: #AB59F7;
  filter: blur(50px);
  border-radius: 50%;
  opacity: 0.85;
  animation: float1 14s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  mix-blend-mode: overlay;

  @keyframes float1 {
    0% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    20% {
      transform: translate(-40px, 50px) rotate(72deg) scale(1.15);
    }
    40% {
      transform: translate(60px, -30px) rotate(144deg) scale(0.9);
    }
    60% {
      transform: translate(-30px, -50px) rotate(216deg) scale(1.1);
    }
    80% {
      transform: translate(50px, 40px) rotate(288deg) scale(0.95);
    }
    100% {
      transform: translate(0, 0) rotate(360deg) scale(1);
    }
  }
`;

const BlueShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 280px;
  height: 280px;
  right: -50px;
  top: 80px;
  background: #729AFF;
  filter: blur(47px);
  border-radius: 50%;
  opacity: 0.85;
  animation: float2 16s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  mix-blend-mode: screen;

  @keyframes float2 {
    0% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    16% {
      transform: translate(50px, 35px) rotate(-60deg) scale(1.12);
    }
    33% {
      transform: translate(-60px, -40px) rotate(-120deg) scale(0.88);
    }
    50% {
      transform: translate(40px, 60px) rotate(-180deg) scale(1.08);
    }
    66% {
      transform: translate(-50px, 30px) rotate(-240deg) scale(0.92);
    }
    83% {
      transform: translate(30px, -55px) rotate(-300deg) scale(1.05);
    }
    100% {
      transform: translate(0, 0) rotate(-360deg) scale(1);
    }
  }
`;

const OrangeShape = styled.div<{ $delay: number }>`
  position: absolute;
  width: 260px;
  height: 260px;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  background: #AB59F7;
  filter: blur(45px);
  border-radius: 50%;
  opacity: 0.85;
  animation: float3 13s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  mix-blend-mode: screen;

  @keyframes float3 {
    0% {
      transform: translate(-50%, 0) rotate(0deg) scale(1);
    }
    25% {
      transform: translate(-90%, -45px) rotate(90deg) scale(1.1);
    }
    50% {
      transform: translate(-10%, 50px) rotate(180deg) scale(0.9);
    }
    75% {
      transform: translate(-80%, 25px) rotate(270deg) scale(1.05);
    }
    100% {
      transform: translate(-50%, 0) rotate(360deg) scale(1);
    }
  }
`;

export default function MainContent() {
  const [currentStep, setCurrentStep] = useState<'home' | 'connect' | 'personalize-profile' | 'personalize' | 'personalize-c' | 'optimize' | 'test' | 'activate' | 'success'>('home');
  const [widgetCollapsed, setWidgetCollapsed] = useState(true);
  const [widgetIsReady, setWidgetIsReady] = useState(false);
  const [conversationDetails, setConversationDetails] = useState<{name: string, status: string} | null>(null);
  const [agentName, setAgentName] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState<'professional' | 'enthusiastic' | 'informal' | 'custom'>('professional');
  const [customToneText, setCustomToneText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTranslationLanguages, setSelectedTranslationLanguages] = useState<string[]>([]);
  const [testComplete, setTestComplete] = useState(false);
  const [isOptimizeLoading, setIsOptimizeLoading] = useState(true);
  const [isTestLoading, setIsTestLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<{type: 'article' | 'procedure', title: string, topic: string} | null>(null);
  const [editingContent, setEditingContent] = useState<{type: 'article' | 'procedure', title: string, topic: string} | null>(null);
  const [rejectedContent, setRejectedContent] = useState<Array<{type: 'article' | 'procedure', title: string, topic: string}>>([]);
  const [fadingContent, setFadingContent] = useState<{type: 'article' | 'procedure', title: string, topic: string} | null>(null);

  const handleRejectContent = () => {
    if (selectedContent) {
      setFadingContent(selectedContent);
      setSelectedContent(null);
      setWidgetCollapsed(true);

      setTimeout(() => {
        setRejectedContent(prev => [...prev, selectedContent]);
        setFadingContent(null);
      }, 300);
    }
  };

  const handleApproveContent = () => {
    if (selectedContent) {
      setEditingContent(selectedContent);
      setSelectedContent(null);
    }
  };

  const handleCloseEditor = () => {
    setEditingContent(null);
  };

  const handleStartMessaging = () => {
    setCurrentStep('connect');
  };

  const handleStartEmail = () => {
    console.log('Start Email agent');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
  };

  const handleContinueToPersonalizeProfile = () => {
    setCurrentStep('personalize-profile');
  };

  const handleBackToConnect = () => {
    setCurrentStep('connect');
  };

  const handleContinueToPersonalize = () => {
    setCurrentStep('personalize');
  };

  const handleBackToPersonalizeProfile = () => {
    setCurrentStep('personalize-profile');
  };


  const handleContinueToPersonalizeC = () => {
    setCurrentStep('personalize-c');
  };

  const handleBackToPersonalize = () => {
    setCurrentStep('personalize');
  };

  const handleContinueToOptimize = () => {
    setCurrentStep('optimize');
    setWidgetCollapsed(true);
  };

  const handleBackToPersonalizeC = () => {
    setCurrentStep('personalize-c');
  };

  const handleBuildContinue = () => {
    setCurrentStep('test');
  };

  const handleBackToOptimize = () => {
    setCurrentStep('optimize');
  };

  const handleTestComplete = () => {
    setTestComplete(true);
  };

  const handleContinueToActivate = () => {
    setCurrentStep('activate');
  };

  const handleBackToTest = () => {
    setCurrentStep('test');
  };

  const handleActivate = () => {
    setCurrentStep('success');
  };

  const handleGoHome = () => {
    setCurrentStep('home');
  };

  const handleCreateAnother = () => {
    setCurrentStep('connect');
  };

  // Render step content based on current step
  let stepContent;

  if (currentStep === 'success') {
    stepContent = (
      <SuccessScreen
        agentName={agentName || "Agent name"}
        companyName={selectedBrand || "Company name"}
        selectedChannels={selectedChannels}
        selectedTone={selectedTone}
        estimatedAutomation="+8%"
        onGoHome={handleGoHome}
        onCreateAnother={handleCreateAnother}
      />
    );
  } else if (currentStep === 'activate') {
    stepContent = (
      <StepWrapper>
        <StepHeader>
          <ActivateAgentHeader />
        </StepHeader>
        <StepContentArea>
          <ActivateAgent
            selectedChannels={selectedChannels}
            setSelectedChannels={setSelectedChannels}
          />
        </StepContentArea>
        <WidgetArea>
          <TestingWidget
            collapsed={widgetCollapsed}
            onToggle={() => setWidgetCollapsed(!widgetCollapsed)}
            isReady={widgetIsReady}
          />
        </WidgetArea>
        <StepFooter>
          <ActivateAgentFooter
            onBack={handleBackToTest}
            onActivate={handleActivate}
            hasSelectedChannels={selectedChannels.length > 0}
          />
        </StepFooter>
      </StepWrapper>
    );
  } else if (currentStep === 'test') {
    stepContent = (
      <StepWrapper>
        <StepHeader>
          <TestAgentHeader />
        </StepHeader>
        <StepContentArea>
          <TestAgent
            selectedTone={selectedTone}
            agentName={agentName || 'Agent name'}
            companyName={selectedBrand || 'Company name'}
            onTestComplete={handleTestComplete}
            onLoadingChange={setIsTestLoading}
            onConversationSelect={setConversationDetails}
          />
        </StepContentArea>
        <WidgetArea>
          <TestingWidget
            collapsed={widgetCollapsed}
            onToggle={() => setWidgetCollapsed(!widgetCollapsed)}
            isReady={widgetIsReady}
            conversationDetails={conversationDetails}
            onConversationClose={() => setConversationDetails(null)}
          />
        </WidgetArea>
        <StepFooter>
          <TestAgentFooter
            onBack={handleBackToOptimize}
            onContinue={handleContinueToActivate}
            testComplete={testComplete}
            isLoading={isTestLoading}
          />
        </StepFooter>
      </StepWrapper>
    );
  } else if (currentStep === 'optimize') {
    stepContent = (
      <StepWrapper>
        <StepHeader>
          <OptimizeAgentHeader />
        </StepHeader>
        <StepContentArea>
          <OptimizeAgent
            widgetIsReady={widgetIsReady}
            selectedTone={selectedTone}
            onLoadingChange={setIsOptimizeLoading}
            onContentSelect={setSelectedContent}
            rejectedContent={rejectedContent}
            fadingContent={fadingContent}
          />
        </StepContentArea>
        <WidgetArea>
          <TestingWidget
            collapsed={widgetCollapsed}
            onToggle={() => setWidgetCollapsed(!widgetCollapsed)}
            isReady={widgetIsReady}
            contentDetails={selectedContent}
            onApprove={handleApproveContent}
            onReject={handleRejectContent}
          />
        </WidgetArea>
        <StepFooter>
          <OptimizeAgentFooter
            onBack={handleBackToPersonalizeC}
            onContinue={handleBuildContinue}
            isLoading={isOptimizeLoading}
          />
        </StepFooter>
      </StepWrapper>
    );
  } else if (currentStep === 'personalize-c') {
    stepContent = (
      <StepWrapper>
        <StepHeader>
          <PersonalizeAgentCHeader />
        </StepHeader>
        <StepContentArea>
          <PersonalizeAgentC
            widgetIsReady={widgetIsReady}
          />
        </StepContentArea>
        <WidgetArea>
          <TestingWidget
            collapsed={widgetCollapsed}
            onToggle={() => setWidgetCollapsed(!widgetCollapsed)}
            isReady={widgetIsReady}
          />
        </WidgetArea>
        <StepFooter>
          <PersonalizeAgentCFooter
            onBack={handleBackToPersonalize}
            onContinue={handleContinueToOptimize}
          />
        </StepFooter>
      </StepWrapper>
    );
  } else if (currentStep === 'personalize-profile') {
    stepContent = (
      <StepWrapper>
        <StepHeader>
          <PersonalizeProfileHeader />
        </StepHeader>
        <StepContentArea>
          <PersonalizeProfile
            name={agentName}
            onNameChange={setAgentName}
          />
        </StepContentArea>
        <WidgetArea>
          <TestingWidget
            collapsed={widgetCollapsed}
            onToggle={() => setWidgetCollapsed(!widgetCollapsed)}
            isReady={widgetIsReady}
          />
        </WidgetArea>
        <StepFooter>
          <PersonalizeProfileFooter
            onBack={handleBackToConnect}
            onContinue={handleContinueToPersonalize}
          />
        </StepFooter>
      </StepWrapper>
    );
  } else if (currentStep === 'personalize') {
    stepContent = (
      <StepWrapper>
        <StepHeader>
          <PersonalizeAgentHeader />
        </StepHeader>
        <StepContentArea>
          <PersonalizeAgent
            widgetIsReady={widgetIsReady}
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            customToneText={customToneText}
            setCustomToneText={setCustomToneText}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedTranslationLanguages={selectedTranslationLanguages}
            setSelectedTranslationLanguages={setSelectedTranslationLanguages}
          />
        </StepContentArea>
        <WidgetArea>
          <TestingWidget
            collapsed={widgetCollapsed}
            onToggle={() => setWidgetCollapsed(!widgetCollapsed)}
            isReady={widgetIsReady}
          />
        </WidgetArea>
        <StepFooter>
          <PersonalizeAgentFooter
            onBack={handleBackToPersonalizeProfile}
            onContinue={handleContinueToPersonalizeC}
          />
        </StepFooter>
      </StepWrapper>
    );
  } else if (currentStep === 'connect') {
    stepContent = (
      <StepWrapper>
        <StepHeader>
          <ConnectKnowledgeHeader />
        </StepHeader>
        <StepContentArea>
          <ConnectKnowledge
            widgetIsReady={widgetIsReady}
            setWidgetIsReady={setWidgetIsReady}
            widgetCollapsed={widgetCollapsed}
            setWidgetCollapsed={setWidgetCollapsed}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        </StepContentArea>
        <WidgetArea>
          <TestingWidget
            collapsed={widgetCollapsed}
            onToggle={() => setWidgetCollapsed(!widgetCollapsed)}
            isReady={widgetIsReady}
          />
        </WidgetArea>
        <StepFooter>
          <ConnectKnowledgeFooter
            onBack={handleBackToHome}
            onContinue={handleContinueToPersonalizeProfile}
            selectedBrand={selectedBrand}
          />
        </StepFooter>
      </StepWrapper>
    );
  } else {
    stepContent = (
      <Container>
      <BackgroundGradient>
        <PurpleShape $delay={0} />
        <BlueShape $delay={2} />
        <OrangeShape $delay={1} />
      </BackgroundGradient>
      <ContentWrapper>
        <TitleSection>
          <IconWrapper>
            <SparkleIcon />
          </IconWrapper>
          <Title>Choose your AI agent</Title>
          <Description>
            Each AI agent uses your knowledge and business context to deliver helpful, accurate support.
          </Description>
        </TitleSection>

        <CardsGrid>
          <CardOuter onClick={handleStartMessaging}>
            <Card>
              <CardIconWrapper>
                <BubbleIcon />
              </CardIconWrapper>
              <CardContent>
                <CardTitle>Messaging agent</CardTitle>
                <CardDescription>
                  Help customers in live chat and messaging channels with fast answers and guided resolutions.
                </CardDescription>
                <StyledButton onClick={(e) => {
                  e.stopPropagation();
                  handleStartMessaging();
                }}>
                  Create
                </StyledButton>
              </CardContent>
            </Card>
          </CardOuter>

          <CardOuter>
            <Card>
              <CardIconWrapper>
                <PaperPlaneIcon />
              </CardIconWrapper>
              <CardContent>
                <CardTitle>Email agent</CardTitle>
                <CardDescription>
                  Respond to email and web form requests with clear, consistent replies and smart escalation.
                </CardDescription>
                <StyledButton onClick={handleStartEmail}>
                  Create
                </StyledButton>
              </CardContent>
            </Card>
          </CardOuter>
        </CardsGrid>
      </ContentWrapper>
    </Container>
    );
  }

  return (
    <>
      {stepContent}
      {editingContent && (
        <ArticleEditor
          contentDetails={editingContent}
          onBack={handleCloseEditor}
          onSave={handleCloseEditor}
        />
      )}
    </>
  );
}
