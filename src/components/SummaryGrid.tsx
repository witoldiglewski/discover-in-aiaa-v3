import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import InfoStrokeIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';
import GradientImage from '../../png-assets/Gradient.png';

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
  letter-spacing: 0;
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
  letter-spacing: 0;
  color: #646864;
  margin: 0;
`;

const GridContainer = styled.div.attrs({ className: 'summary-grid' })`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
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
  animation-delay: ${props => props.$index ? props.$index * 0.2 : 0}s;
  ${props => props.$span ? props.$span : ''}
`;

const CardGradient = styled(Card).attrs({ className: 'summary-card-gradient' })`
  background: #f7f7f7;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 120px;
    left: 0;
    width: 620px;
    height: auto;
    aspect-ratio: 1;
    background-image: url(${GradientImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left top;
    pointer-events: none;
  }
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
  letter-spacing: 0;
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
  letter-spacing: 0;
  color: #293239;
`;

const ValueExtraLarge = styled.div.attrs({ className: 'card-value-extra-large' })`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0;
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

function useAnimatedNumber(endValue: number, duration: number = 1200, delay: number = 0) {
  const [value, setValue] = useState(1);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const easeOutCubic = (t: number): number => {
      // cubic-bezier(0, .67, .27, 1)
      const x1 = 0;
      const y1 = 0.67;
      const x2 = 0.27;
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
      const currentValue = Math.round(1 + (endValue - 1) * easedProgress);

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
  }, [endValue, duration, delay]);

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
  endValue: number;
  format: 'currency' | 'number' | 'thousands' | 'percentage' | 'plus';
  delay?: number;
  component: typeof ValueLarge | typeof ValueExtraLarge;
}

function AnimatedValue({ endValue, format, delay = 0, component: Component }: AnimatedValueProps) {
  const animatedValue = useAnimatedNumber(endValue, 1200, delay);
  return <Component>{formatNumber(animatedValue, format)}</Component>;
}

export default function SummaryGrid() {
  return (
    <Container>
      <Header>
        <TitleRow>
          <Title>Summary</Title>
          <InfoIcon />
        </TitleRow>
        <Subtitle>
          All recommendations are drafts and require your review before publishing.
        </Subtitle>
      </Header>

      <GridContainer>
        {/* Row 1, Col 1: Est. Annual Cost savings */}
        <Card $index={0}>
          <ValueContainer>
            <AnimatedValue endValue={211200} format="currency" delay={0} component={ValueLarge} />
          </ValueContainer>
          <CardFooter>
            <CardLabel>Est. Annual Cost savings</CardLabel>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </CardFooter>
        </Card>

        {/* Row 1, Col 2: Annual time savings */}
        <Card $index={1}>
          <ValueContainer>
            <ValueWithUnit>
              <AnimatedValue endValue={4400} format="number" delay={200} component={ValueLarge} />
              <ValueUnit>hrs</ValueUnit>
            </ValueWithUnit>
          </ValueContainer>
          <CardFooter>
            <CardLabel>Annual time savings</CardLabel>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </CardFooter>
        </Card>

        {/* Row 1-2, Col 3: Increased Automation (spans 2 rows) */}
        <CardGradient $span="grid-row: 1 / span 2; grid-column: 3;" $index={2}>
          <ValueContainer style={{ position: 'relative', zIndex: 1 }}>
            <AnimatedValue endValue={24} format="percentage" delay={400} component={ValueExtraLarge} />
          </ValueContainer>
          <CardFooter style={{ position: 'relative', zIndex: 1 }}>
            <CardLabel>Increased Automation</CardLabel>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </CardFooter>
        </CardGradient>

        {/* Row 2, Col 1: Ticket volume */}
        <Card $index={3}>
          <ValueContainer>
            <AnimatedValue endValue={32000} format="thousands" delay={600} component={ValueLarge} />
          </ValueContainer>
          <CardFooter>
            <CardLabel>Ticket volume</CardLabel>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </CardFooter>
        </Card>

        {/* Row 2, Col 2: New procedures and articles */}
        <Card $index={4}>
          <ValueContainer>
            <AnimatedValue endValue={12} format="plus" delay={800} component={ValueLarge} />
          </ValueContainer>
          <CardFooter>
            <CardLabel>New procedures and articles</CardLabel>
            <InfoIconWrapper>
              <InfoIcon />
            </InfoIconWrapper>
          </CardFooter>
        </Card>
      </GridContainer>
    </Container>
  );
}
