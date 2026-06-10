import styled from 'styled-components';
import PaperclipIcon from '@zendeskgarden/svg-icons/src/16/paperclip.svg?react';
import ReloadIcon from '../assets/icons/Reload - 12px icon.svg?react';
import ZendeskLogoIcon from '../assets/icons/Zendesk - 12px icon.svg?react';

const Panel = styled.div.attrs({ className: 'test-agent-panel' })`
  background: white;
  max-width: 368px;
  width: 368px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0px 0px 4px 0px rgba(10, 13, 14, 0.16);
  flex-shrink: 0;
  position: relative;
  align-self: stretch;
`;

const Header = styled.div.attrs({ className: 'panel-header' })`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 32px 20px 20px 20px;
  width: 100%;
`;

const Title = styled.p.attrs({ className: 'panel-title' })`
  flex: 1;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: #2f3130;
  margin: 0;
`;

const ReloadButton = styled.button.attrs({ className: 'reload-button' })`
  background: white;
  border: 1px solid #e9ebed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 40px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #f8f9f9;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #5c6970;
    flex-shrink: 0;
  }
`;

const Widget = styled.div.attrs({ className: 'chat-widget' })`
  background: white;
  border: 1px solid #d8dcde;
  display: flex;
  flex-direction: column;
  gap: 404px;
  position: absolute;
  left: 24px;
  top: 106px;
  width: 320px;
  overflow: hidden;
  padding-bottom: 4px;
  border-radius: 20px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
`;

const WidgetHeader = styled.div.attrs({ className: 'widget-header' })`
  border-bottom: 1px solid #e8eaec;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 20px 20px 12px 20px;
  width: 100%;
  flex-shrink: 0;
`;

const Logo = styled.div.attrs({ className: 'bot-logo' })`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: #16140c;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ZendeskIconWrapper = styled.div.attrs({ className: 'zendesk-icon' })`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    color: white;
  }
`;

const WidgetInfo = styled.div.attrs({ className: 'widget-info' })`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
`;

const AgentName = styled.p.attrs({ className: 'agent-name' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #293239;
  margin: 0;
  width: 100%;
`;

const AgentTagline = styled.p.attrs({ className: 'agent-tagline' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #5c6970;
  margin: 0;
  width: 100%;
`;

const Composer = styled.div.attrs({ className: 'message-composer' })`
  background: white;
  display: flex;
  height: 64px;
  align-items: flex-start;
  overflow: hidden;
  padding: 10px 12px 10px 6px;
  width: 100%;
  flex-shrink: 0;
`;

const AttachButton = styled.button.attrs({ className: 'attach-button' })`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const TextInputContainer = styled.div.attrs({ className: 'text-input-container' })`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  min-width: 0;
  padding: 2px 0;
`;

const InputWrapper = styled.div.attrs({ className: 'input-wrapper' })`
  background: white;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.55);
  width: 100%;
  flex-shrink: 0;
  position: relative;
`;

const TextArea = styled.div.attrs({ className: 'text-area' })`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  max-height: 120px;
  min-width: 0;
  padding: 10px 12px;
`;

const Placeholder = styled.p.attrs({ className: 'input-placeholder' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: rgba(0, 0, 0, 0.55);
  margin: 0;
  word-break: break-word;
  width: 100%;
`;

export default function TestAgentPanel() {
  return (
    <Panel>
      <Header>
        <Title>Test your AI agent</Title>
        <ReloadButton>
          <ReloadIcon />
        </ReloadButton>
      </Header>

      <Widget>
        <WidgetHeader>
          <Logo>
            <ZendeskIconWrapper>
              <ZendeskLogoIcon />
            </ZendeskIconWrapper>
          </Logo>
          <WidgetInfo>
            <AgentName>Your AI agent</AgentName>
            <AgentTagline>Serving your needs 24/7</AgentTagline>
          </WidgetInfo>
        </WidgetHeader>

        <Composer>
          <AttachButton>
            <PaperclipIcon />
          </AttachButton>
          <TextInputContainer>
            <InputWrapper>
              <TextArea>
                <Placeholder>Type a message</Placeholder>
              </TextArea>
            </InputWrapper>
          </TextInputContainer>
        </Composer>
      </Widget>
    </Panel>
  );
}
