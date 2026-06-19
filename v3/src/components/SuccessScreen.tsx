import styled, { keyframes } from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Anchor } from '@zendeskgarden/react-buttons';
import { useEffect, useRef, useState } from 'react';

// Import icons
import SparkleAltIcon from '../assets/icons/sparkle-alt.svg?react';
import ChannelWebWidgetIcon from '../assets/icons/channel-web-widget.svg?react';
import ChannelIosSkdIcon from '../assets/icons/channel-ios-skd.svg?react';
import ChannelAndroidIcon from '../assets/icons/channel-android.svg?react';
import CoffeeBotAvatarIcon from '../assets/icons/Coffee-bot-Avatar.svg?react';
import BotAvatarProfessionalIcon from '../assets/icons/bot-avatar-professional.svg?react';
import BotAvatarEnthusiasticIcon from '../assets/icons/bot-avatar-enthusiastic.svg?react';
import BotAvatarInformalIcon from '../assets/icons/bot-avatar-informal.svg?react';
import BotAvatarCustomIcon from '../assets/icons/bot-avatar-custom.svg?react';

// Import illustration as React component
import MessagingIllustrationSVG from '../assets/icons/messaging-illustration-svg.svg?react';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  isolate: isolate;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.4;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BackgroundGradient = styled.div`
  position: absolute;
  width: 400px;
  height: 320px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
  animation: ${fadeIn} 0.8s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.2s;
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

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: var(--spacing-xl, 40px);
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1280px;
  min-height: 0;
  position: relative;
  z-index: 2;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-md, 20px);
  height: 100%;
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

const GlassCard = styled.div`
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid transparent;
  border-radius: 26px;
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 640px;
  flex-shrink: 0;
  position: relative;
  animation: ${fadeInUp} 0.6s ease-out;
  animation-fill-mode: both;
  animation-delay: 0s;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 26px;
    padding: 1px;
    background: linear-gradient(-3deg, rgba(255, 255, 255, 1) 0%, rgba(167, 167, 167, 0.4) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const LeftCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
  min-width: 0;
  overflow: hidden;
  padding: var(--spacing-lg, 32px) var(--spacing-md, 20px);
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md, 20px);
  align-items: flex-start;
  width: 100%;
  flex-shrink: 0;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  align-items: flex-start;
  width: 100%;
  flex-shrink: 0;
`;

const TitleWithIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  align-items: flex-start;
  width: 100%;
  flex-shrink: 0;
`;

const SparkleIcon = styled(SparkleAltIcon)`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  color: #8D59B1;
`;

const Title = styled.h1`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: var(--fg-default, #2f3130);
  margin: 0;
  width: 100%;
  min-width: min-content;
  flex-shrink: 0;
`;

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  align-items: flex-start;
  width: 100%;
  flex-shrink: 0;
`;

const Description = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-default, #2f3130);
  margin: 0;
  width: 100%;
  flex-shrink: 0;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 12px);
  align-items: center;
  flex-shrink: 0;
`;

const PrimaryButton = styled(Button)`
  && {
    background: var(--button-bg-emphasis, #2f3130);
    color: var(--fg-onemphasis, white);
    height: 32px;
    padding: 8px var(--spacing-md, 20px);
    border-radius: var(--border-radii-pill, 99px);
    border: none;
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.0004px;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
      background: var(--button-bg-emphasis-hover, #404241);
    }

    &:active {
      background: var(--button-bg-emphasis, #2f3130);
    }
  }
`;

const LinkSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
`;

const OrText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: var(--fg-default, #2f3130);
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
`;

const StyledAnchor = styled(Anchor)`
  && {
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.0004px;
    color: var(--anchor-fg-neutral, #2f3130);
    text-decoration: underline;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

const ReloadButton = styled(Button)`
  && {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--button-bg-emphasis, #2f3130);
    color: var(--fg-onemphasis, white);
    height: 40px;
    padding: 10px 16px;
    border-radius: var(--border-radii-pill, 99px);
    border: none;
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.154px;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);

    &:hover {
      background: var(--button-bg-emphasis-hover, #404241);
    }

    &:active {
      background: var(--button-bg-emphasis, #2f3130);
    }
  }
`;

const RightCard = styled.div`
  backdrop-filter: blur(25px);
  background: var(--bg-default, white);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--border-radii-xl, 16px);
  box-shadow: 0px 12px 24px -13px rgba(0, 0, 0, 0.12);
  width: 320px;
  flex-shrink: 0;
  animation: ${fadeInUp} 0.6s ease-out;
  animation-fill-mode: both;
  animation-delay: 0.2s;
`;

const IllustrationContainer = styled.div`
  background: var(--bg-default, white);
  height: 160px;
  overflow: hidden;
  width: 100%;
  flex-shrink: 0;
  position: relative;
`;

const IllustrationSVGWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const BotAvatarOverlay = styled.div`
  position: absolute;
  left: 50px;
  top: 112px;
  width: 32px;
  height: 32px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md, 20px);
  align-items: flex-start;
  padding: 24px;
  width: 100%;
  flex-shrink: 0;
`;

const AgentHeader = styled.div`
  display: flex;
  gap: var(--spacing-sm, 12px);
  align-items: center;
  width: 100%;
  flex-shrink: 0;
`;

const BotAvatar = styled(CoffeeBotAvatarIcon)`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
`;

const AgentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  white-space: nowrap;
`;

const AgentName = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: var(--fg-default, #2f3130);
  margin: 0;
  flex-shrink: 0;
`;

const AgentSubtitle = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: var(--fg-subtle, #646864);
  margin: 0;
  flex-shrink: 0;
`;

const ChannelsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
  align-items: flex-start;
  padding-left: var(--spacing-xs, 8px);
  flex-shrink: 0;
`;

const ChannelItem = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radii-pill, 99px);
  flex-shrink: 0;
`;

const ChannelIcon = styled.div`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ChannelName = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #2f3941;
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
`;

const SuccessTag = styled.div`
  background: var(--tag-bg-success, #ddf0c9);
  display: flex;
  gap: var(--spacing-xxs, 4px);
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 2px var(--spacing-xs, 8px);
  border-radius: var(--border-radii-pill, 99px);
  flex-shrink: 0;
`;

const SuccessTagText = styled.p`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: var(--tag-fg-success, #25390f);
  margin: 0;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
`;

const BackgroundIllustration = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 498px;
  height: 433.742px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.3;
`;

const BackgroundSVG = styled.div`
  position: absolute;
  inset: -2.9% -36.58% -29.03% -15.97%;
  width: 100%;
  height: 100%;
  max-width: none;
  display: block;

  svg {
    width: 100%;
    height: 100%;
  }
`;

interface SuccessScreenProps {
  agentName?: string;
  companyName?: string;
  selectedChannels?: string[];
  selectedTone?: 'professional' | 'enthusiastic' | 'informal' | 'custom';
  estimatedAutomation?: string;
  onGoHome?: () => void;
  onCreateAnother?: () => void;
}

export default function SuccessScreen({
  agentName = 'Agent name',
  companyName = "Joe's Coffee company",
  selectedChannels = [],
  selectedTone = 'professional',
  estimatedAutomation = '+8%',
  onGoHome,
  onCreateAnother
}: SuccessScreenProps) {
  const getChannelDisplay = (channelId: string) => {
    switch (channelId) {
      case 'web-widget':
        return { name: "Joe's Coffee - Web chat", icon: ChannelWebWidgetIcon };
      case 'ios-sdk':
        return { name: 'Bean There Rewards (iOS)', icon: ChannelIosSkdIcon };
      case 'android-sdk':
        return { name: 'Bean There Rewards (Android)', icon: ChannelAndroidIcon };
      default:
        return { name: channelId, icon: ChannelWebWidgetIcon };
    }
  };

  const getBotAvatarIcon = () => {
    switch (selectedTone) {
      case 'professional':
        return BotAvatarProfessionalIcon;
      case 'enthusiastic':
        return BotAvatarEnthusiasticIcon;
      case 'informal':
        return BotAvatarInformalIcon;
      case 'custom':
        return BotAvatarCustomIcon;
      default:
        return BotAvatarProfessionalIcon;
    }
  };

  const BotAvatarIcon = getBotAvatarIcon();

  const illustrationRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Hide the placeholder bot avatar in the SVG
    if (illustrationRef.current) {
      const svg = illustrationRef.current.querySelector('svg');
      if (svg) {
        // Find and hide the placeholder avatar rect and circles
        const rects = svg.querySelectorAll('rect');
        const circles = svg.querySelectorAll('circle');

        rects.forEach(rect => {
          if (rect.getAttribute('x') === '50' && rect.getAttribute('y') === '112') {
            rect.style.display = 'none';
          }
        });

        circles.forEach(circle => {
          const cy = circle.getAttribute('cy');
          if (cy === '128') {
            circle.style.display = 'none';
          }
        });
      }
    }
  }, []);

  return (
    <Container key={animationKey}>
      <BackgroundGradient>
        <PurpleShape $delay={0} />
        <BlueShape $delay={2} />
        <OrangeShape $delay={1} />
      </BackgroundGradient>
      <ContentWrapper>
        <ColumnContainer>
          <GlassCard>
            <LeftCard>
              <TopSection>
                <TitleSection>
                  <TitleWithIcon>
                    <SparkleIcon />
                    <Title>Your AI agent is now active on Messaging</Title>
                  </TitleWithIcon>
                </TitleSection>
                <DescriptionSection>
                  <Description>
                    Keep the momentum going by moving beyond FAQs and automating even your most complex workflows.
                  </Description>
                </DescriptionSection>
              </TopSection>
              <BottomSection>
                <PrimaryButton onClick={onGoHome}>
                  Go to AI Agent Home
                </PrimaryButton>
                <LinkSection>
                  <OrText>or</OrText>
                  <StyledAnchor onClick={onCreateAnother}>
                    Create another AI agent
                  </StyledAnchor>
                </LinkSection>
              </BottomSection>
            </LeftCard>
            <RightCard>
              <IllustrationContainer ref={illustrationRef}>
                <IllustrationSVGWrapper>
                  <MessagingIllustrationSVG />
                  <BotAvatarOverlay>
                    <BotAvatarIcon />
                  </BotAvatarOverlay>
                </IllustrationSVGWrapper>
              </IllustrationContainer>
              <CardContent>
                <AgentHeader>
                  <BotAvatar />
                  <AgentInfo>
                    <AgentName>{agentName}</AgentName>
                    <AgentSubtitle>{companyName}</AgentSubtitle>
                  </AgentInfo>
                </AgentHeader>
                {selectedChannels.length > 0 && (
                  <ChannelsList>
                    {selectedChannels.map((channelId) => {
                      const channel = getChannelDisplay(channelId);
                      const IconComponent = channel.icon;
                      return (
                        <ChannelItem key={channelId}>
                          <ChannelIcon>
                            <IconComponent />
                          </ChannelIcon>
                          <ChannelName>{channel.name}</ChannelName>
                        </ChannelItem>
                      );
                    })}
                  </ChannelsList>
                )}
                <SuccessTag>
                  <SuccessTagText>{estimatedAutomation} Estimated automation</SuccessTagText>
                </SuccessTag>
              </CardContent>
            </RightCard>
          </GlassCard>
        </ColumnContainer>
      </ContentWrapper>
    </Container>
  );
}
