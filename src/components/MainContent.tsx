import { XXL, LG } from '@zendeskgarden/react-typography';
import { Button } from '@zendeskgarden/react-buttons';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 32px;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export default function MainContent() {
  return (
    <PageContainer>
      <Header>
        <XXL tag="h1">Discover in AI Agents</XXL>
        <LG>Welcome to the AI Agents automation platform</LG>
      </Header>

      <ContentSection>
        <p>
          This is a production-quality Zendesk prototype built with:
        </p>
        <ul>
          <li>React with TypeScript</li>
          <li>Vite for fast development</li>
          <li>Garden design system (@zendeskgarden/react-*)</li>
          <li>Zendesk-UI navigation (@zendesk-ui/navigation)</li>
        </ul>
        <Button isPrimary onClick={() => alert('Button clicked!')}>
          Get Started
        </Button>
      </ContentSection>
    </PageContainer>
  );
}
