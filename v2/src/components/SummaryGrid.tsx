import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import InfoStrokeIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';
import ChevronTrendIcon from '../assets/icons/chevron_trend.svg?react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div.attrs({ className: 'summary-grid-container' })`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const Header = styled.div.attrs({ className: 'summary-grid-header' })`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 8px 12px;
`;

const TitleRow = styled.div.attrs({ className: 'summary-title-row' })`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Title = styled.h2.attrs({ className: 'summary-title' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: #2f3130;
  margin: 0;
`;

const InfoIcon = styled(InfoStrokeIcon).attrs({ className: 'info-icon' })`
  width: 16px;
  height: 16px;
  color: #68737d;
`;

const Subtitle = styled.p.attrs({ className: 'summary-subtitle' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  margin: 0;
`;

const GridContainer = styled.div.attrs({ className: 'summary-grid' })`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
  flex: 1;
  min-height: 0;
`;

const Card = styled.div.attrs({ className: 'summary-card' })<{ $span?: string; $index?: number }>`
  background: white;
  border: 1px solid #eae9e8;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$index ? props.$index * 0.1 : 0}s;
  ${props => props.$span ? props.$span : ''}
`;

const CardMain = styled(Card).attrs({ className: 'summary-card-main' })`
  background: white;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainCardHeader = styled.div.attrs({ className: 'main-card-header' })`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
`;

const MainCardTitle = styled.p.attrs({ className: 'main-card-title' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #293239;
  margin: 0;
  flex: 1;
`;

const MainCardSubtitle = styled.p.attrs({ className: 'main-card-subtitle' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #5c6970;
  margin: 0;
  width: 100%;
`;

const MainValueRow = styled.div.attrs({ className: 'main-value-row' })`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const fadeInUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TrendIconWrapper = styled.div.attrs({ className: 'trend-icon' })<{ $show: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0;
  animation: ${props => props.$show ? fadeInUpAnimation : 'none'} 0.5s ease forwards;
`;

const TrendIcon = styled(ChevronTrendIcon).attrs({ className: 'chevron-trend' })`
  width: 15px;
  height: 8px;
`;

const ChangeTag = styled.div.attrs({ className: 'change-tag' })<{ $show: boolean }>`
  background: #d1f3c7;
  border-radius: 99px;
  padding: 2px 8px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #203614;
  opacity: 0;
  animation: ${props => props.$show ? fadeInUpAnimation : 'none'} 0.5s ease forwards;
`;

const ProgressBar = styled.div.attrs({ className: 'progress-bar' })`
  width: 100%;
  height: 20px;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ProgressSegment = styled.div.attrs({ className: 'progress-segment' })<{ $width: number; $isGradient?: boolean }>`
  height: 100%;
  width: ${props => props.$width}%;
  background: ${props => props.$isGradient ? 'linear-gradient(90deg, #00d26d 0%, #16a260 100%)' : 'rgba(100, 104, 100, 0.16)'};
  border-radius: 6px;
  transition: width 1.2s cubic-bezier(0.42, 0, 0.2, 1);
`;

const Legend = styled.div.attrs({ className: 'legend' })`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LegendItem = styled.div.attrs({ className: 'legend-item' })`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 4px;
`;

const LegendDot = styled.div.attrs({ className: 'legend-dot' })<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
  flex-shrink: 0;
`;

const LegendText = styled.span.attrs({ className: 'legend-text' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #293239;
  flex: 1;
`;

const CardFooter = styled.div.attrs({ className: 'card-footer' })`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
`;

const CardLabel = styled.div.attrs({ className: 'card-label' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #2f3130;
  flex: 1;
`;

const InfoIconWrapper = styled.div.attrs({ className: 'card-info-icon' })`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const ValueContainer = styled.div.attrs({ className: 'card-value-container' })`
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;
  width: 100%;
`;

const ValueLarge = styled.div.attrs({ className: 'card-value-large' })`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.3536px;
  color: #293239;
`;

const ValueExtraLarge = styled.div.attrs({ className: 'card-value-extra-large' })`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0.396px;
  color: #293239;
`;

const ValueWithUnit = styled.div.attrs({ className: 'card-value-with-unit' })`
  display: flex;
  gap: 8px;
  align-items: flex-end;
  white-space: nowrap;
`;

const ValueUnit = styled.span.attrs({ className: 'card-value-unit' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  color: #293239;
`;

function useAnimatedNumber(startValue: number, endValue: number, duration: number = 1200, delay: number = 0) {
  const [value, setValue] = useState(startValue);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const easeOutCubic = (t: number): number => {
      // cubic-bezier(0.42, 0, 0.2, 1) - ease-in with extended ease-out
      const x1 = 0.42;
      const y1 = 0;
      const x2 = 0.2;
      const y2 = 1;

      // Cubic bezier formula for finding t given x (Newton-Raphson method)
      const sampleCurveX = (t: number) => {
        return ((1 - t) ** 3) * 0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * 1;
      };

      const sampleCurveY = (t: number) => {
        return ((1 - t) ** 3) * 0 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * 1;
      };

      const sampleCurveDerivativeX = (t: number) => {
        return 3 * (1 - t) ** 2 * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t ** 2 * (1 - x2);
      };

      // Newton-Raphson iteration to solve for t given x
      let currentT = t;
      for (let i = 0; i < 8; i++) {
        const currentX = sampleCurveX(currentT) - t;
        if (Math.abs(currentX) < 0.00001) break;
        const currentSlope = sampleCurveDerivativeX(currentT);
        if (Math.abs(currentSlope) < 0.00001) break;
        currentT -= currentX / currentSlope;
      }

      return sampleCurveY(currentT);
    };

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current - delay;

      if (elapsed < 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);

      setValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startValue, endValue, duration, delay]);

  return value;
}

function formatNumber(num: number, format: 'currency' | 'number' | 'thousands' | 'percentage' | 'plus'): string {
  if (format === 'currency') {
    return `$${num.toLocaleString()}`;
  } else if (format === 'thousands') {
    return `${Math.round(num / 1000)}k`;
  } else if (format === 'percentage') {
    return `+${num}%`;
  } else if (format === 'plus') {
    return `+${num}`;
  }
  return num.toLocaleString();
}

interface AnimatedValueProps {
  startValue?: number;
  endValue: number;
  format: 'currency' | 'number' | 'thousands' | 'percentage' | 'plus';
  delay?: number;
  component: typeof ValueLarge | typeof ValueExtraLarge;
}

function AnimatedValue({ startValue = 1, endValue, format, delay = 0, component: Component }: AnimatedValueProps) {
  const animatedValue = useAnimatedNumber(startValue, endValue, 1200, delay);
  return <Component>{formatNumber(animatedValue, format)}</Component>;
}

export default function SummaryGrid() {
  const [progressWidth, setProgressWidth] = useState(36);
  const [showTrendElements, setShowTrendElements] = useState(false);

  useEffect(() => {
    // Show trend elements after 1 second
    setTimeout(() => {
      setShowTrendElements(true);
    }, 1000);

    // Animate progress after trend elements have faded in (1s + 0.5s fade)
    setTimeout(() => {
      setProgressWidth(82);
    }, 1500);
  }, []);

  return (
    <Container>
      <Header>
        <TitleRow>
          <Title>Summary</Title>
          <InfoIcon />
        </TitleRow>
        <Subtitle>
          Review the impact of your approved automation recommendations. Click "Next" to publish all approved articles and procedures.
        </Subtitle>
      </Header>

      <GridContainer>
        {/* Main card: Improved Automation rate - spans 2 columns and 3 rows */}
        <CardMain $span="grid-row: 1 / span 3; grid-column: 1;" $index={0}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <MainCardHeader>
                <MainCardTitle>Improved Automation rate</MainCardTitle>
                <InfoIconWrapper>
                  <InfoIcon />
                </InfoIconWrapper>
              </MainCardHeader>
              <MainCardSubtitle>
                Estimated automated resolution rate you will achieve by connecting your Al agent to automation procedures and closing knowledge gaps
              </MainCardSubtitle>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <MainValueRow>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <AnimatedValue startValue={36} endValue={82} format="number" delay={1500} component={ValueExtraLarge} />
                  <ValueUnit>%</ValueUnit>
                </div>
                <TrendIconWrapper $show={showTrendElements}>
                  <TrendIcon />
                </TrendIconWrapper>
                <ChangeTag $show={showTrendElements}>+46%</ChangeTag>
              </MainValueRow>
              <ProgressBar>
                <ProgressSegment $width={progressWidth} $isGradient />
                <ProgressSegment $width={100 - progressWidth} />
              </ProgressBar>
            </div>
          </div>
          <Legend>
            <LegendItem>
              <LegendDot $color="#8bd400" />
              <LegendText>Resolved by closing knowledge and procedure gaps</LegendText>
            </LegendItem>
            <LegendItem>
              <LegendDot $color="#d8dcde" />
              <LegendText>Can be automated using advanced features</LegendText>
            </LegendItem>
          </Legend>
        </CardMain>

        {/* Row 1, Col 2: Potential ticket coverage */}
        <Card $index={1}>
          <CardFooter>
            <CardLabel>Potential ticket coverage</CardLabel>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </CardFooter>
          <ValueContainer>
            <ValueLarge>2,252</ValueLarge>
          </ValueContainer>
        </Card>

        {/* Row 2, Col 2: Potential savings */}
        <Card $index={2}>
          <CardFooter>
            <CardLabel>Potential savings</CardLabel>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </CardFooter>
          <ValueContainer>
            <ValueLarge>$33,370</ValueLarge>
          </ValueContainer>
        </Card>

        {/* Row 3, Col 2: Est. Annual time savings */}
        <Card $index={3}>
          <CardFooter>
            <CardLabel>Est. Annual time savings</CardLabel>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </CardFooter>
          <ValueContainer>
            <ValueWithUnit>
              <ValueLarge>24,400</ValueLarge>
              <ValueUnit>hrs</ValueUnit>
            </ValueWithUnit>
          </ValueContainer>
        </Card>
      </GridContainer>
    </Container>
  );
}
