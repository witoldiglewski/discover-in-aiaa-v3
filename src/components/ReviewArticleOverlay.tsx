import { createPortal } from 'react-dom';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import XIcon from '@zendeskgarden/svg-icons/src/16/x-stroke.svg?react';
import CheckIcon from '@zendeskgarden/svg-icons/src/16/check-sm-stroke.svg?react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div.attrs({ className: 'article-overlay' })`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const Modal = styled.div.attrs({ className: 'article-modal' })`
  width: 100%;
  height: 100%;
  max-width: calc(100vw - 96px);
  max-height: calc(100vh - 96px);
  background: white;
  border: 1px solid transparent;
  border-radius: 16px;
  box-shadow: 0px 0px 4px 0px rgba(10, 13, 14, 0.16);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeInUp} 0.4s ease forwards;
`;

const Header = styled.div.attrs({ className: 'modal-header' })`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 20px 20px 20px 32px;
  border-bottom: 1px solid #dcdcda;
  flex-shrink: 0;
`;

const HeaderTitle = styled.div.attrs({ className: 'header-title' })`
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  color: #2f3130;
  white-space: nowrap;
`;

const HeaderTitleRegular = styled.span.attrs({ className: 'header-title-regular' })`
  font-weight: 400;
`;

const HeaderTitleBold = styled.span.attrs({ className: 'header-title-bold' })`
  font-weight: 600;
`;

const HeaderCloseButton = styled.button.attrs({ className: 'close-button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  color: #68737d;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const CloseIcon = styled(XIcon).attrs({ className: 'close-icon' })`
  width: 16px;
  height: 16px;
`;

const Content = styled.div.attrs({ className: 'modal-content' })`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

const Toolbar = styled.div.attrs({ className: 'toolbar' })`
  height: 48px;
  width: 100%;
  flex-shrink: 0;
  background: #ffffff;
  border-bottom: 1px solid #d8dcde;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 12px 8px 32px;
  overflow: hidden;
`;

const ToolbarItems = styled.div.attrs({ className: 'toolbar-items' })`
  display: flex;
  align-items: center;
  gap: 0;
`;

const ToolbarButton = styled.button.attrs({ className: 'toolbar-btn' })`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  img {
    width: 16px;
    height: 16px;
    display: block;
    flex-shrink: 0;
  }
`;

const ToolbarDropdown = styled.div.attrs({ className: 'toolbar-dropdown' })`
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 4px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #68737d;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  img {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    display: block;

    &.toolbar-icon-large {
      width: 16px;
      height: 16px;
    }
  }
`;

const ToolbarDivider = styled.div.attrs({ className: 'toolbar-divider' })`
  width: 1px;
  height: 26px;
  background: #d8dcde;
  margin: 0 4px;
  flex-shrink: 0;
`;

const ToolbarHtml = styled.button.attrs({ className: 'toolbar-btn toolbar-html' })`
  width: auto;
  padding: 0 12px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
    color: #68737d;
  }
`;

const MainContentArea = styled.div.attrs({ className: 'main-content-area' })`
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
`;

const ArticleEditorContainer = styled.div.attrs({ className: 'article-editor' })`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  padding: 40px 48px;
  background: white;
`;

const ArticleWrapper = styled.div.attrs({ className: 'article-wrapper' })`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ArticleHeaderBar = styled.div.attrs({ className: 'article-header-bar' })`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 12px 8px 0;
`;

const DraftBadge = styled.div.attrs({ className: 'draft-badge' })`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #646864;
`;

const DraftIcon = styled.div.attrs({ className: 'draft-icon' })`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d8dcde;
  flex-shrink: 0;
`;

const HeaderDivider = styled.div.attrs({ className: 'header-divider' })`
  width: 0;
  height: 20px;
  border-left: 1px solid #d8dcde;
`;

const NewArticleTag = styled.div.attrs({ className: 'new-article-tag' })`
  padding: 4px 12px;
  background: white;
  border-radius: 4px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #646864;
`;

const LanguageButton = styled.button.attrs({ className: 'language-button' })`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 32px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #1f73b7;

  &:hover {
    background: #f8f9f9;
  }
`;

const Article = styled.div.attrs({ className: 'article' })`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ArticleTitle = styled.h1.attrs({ className: 'article-title' })`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0;
  color: #2f3130;
  margin: 0;
  outline: none;
  cursor: text;
`;

const ArticleBody = styled.div.attrs({ className: 'article-body' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: #2f3130;
  outline: none;
  cursor: text;

  p {
    margin: 0 0 16px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  h2 {
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0;
    color: #2f3130;
    margin: 24px 0 16px 0;
  }

  ul, ol {
    margin: 0 0 16px 0;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const HighlightAddition = styled.span.attrs({ className: 'highlight-addition' })`
  background: #ddf0c9;
  padding: 2px 0;
`;

const HighlightDeletion = styled.span.attrs({ className: 'highlight-deletion' })`
  background: #f7e5e6;
  text-decoration: line-through;
  padding: 2px 0;
`;

const SidePanel = styled.div.attrs({ className: 'side-panel' })`
  width: 360px;
  flex-shrink: 0;
  background: #f8f9f9;
  border-left: 1px solid #d8dcde;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 12px 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d8dcde;
    border-radius: 6px;
    border: 3px solid #f8f9f9;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b8c0c5;
  }
`;

const SummaryCard = styled.div.attrs({ className: 'summary-card' })`
  background: white;
  border: 1px solid #dcdcda;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SummaryTitle = styled.div.attrs({ className: 'summary-title' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: #2f3130;
`;

const SummaryText = styled.div.attrs({ className: 'summary-text' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: #646864;
`;

const ReviewCard = styled.div.attrs({ className: 'review-card' })`
  background: white;
  border: 1px solid #dcdcda;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReviewCardHeader = styled.div.attrs({ className: 'review-card-header' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewCardTitle = styled.div.attrs({ className: 'review-card-title' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: #2f3130;
`;

const ReviewCardCount = styled.div.attrs({ className: 'review-card-count' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: #646864;
`;

const ReviewCardContent = styled.div.attrs({ className: 'review-card-content' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: #2f3130;
  padding: 12px;
  background: #f8f9f9;
  border-radius: 4px;
`;

const ReviewCardActions = styled.div.attrs({ className: 'review-card-actions' })`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const RejectButton = styled.button.attrs({ className: 'reject-button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #d8dcde;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  color: #68737d;

  &:hover {
    background: #f8f9f9;
  }
`;

const AcceptButton = styled.button.attrs({ className: 'accept-button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #078d4f;
  border-radius: 4px;
  background: #078d4f;
  cursor: pointer;
  color: white;

  &:hover {
    background: #067042;
  }
`;

const RejectIcon = styled(XIcon).attrs({ className: 'reject-icon' })`
  width: 16px;
  height: 16px;
`;

const AcceptIconStyled = styled(CheckIcon).attrs({ className: 'accept-icon' })`
  width: 16px;
  height: 16px;
`;

const Footer = styled.div.attrs({ className: 'modal-footer' })`
  height: 72px;
  width: 100%;
  flex-shrink: 0;
  background: #ffffff;
  box-shadow: inset 0 1px 0 0 #d8dcde;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
`;

const FooterLeft = styled.div.attrs({ className: 'footer-left' })`
  display: flex;
  align-items: center;
`;

const FooterRight = styled.div.attrs({ className: 'footer-right' })`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const PreviewButton = styled.button.attrs({ className: 'btn-preview' })`
  height: 40px;
  padding: 10px 16px;
  background: transparent;
  border: 1px solid #1f73b7;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #1f73b7;

  &:hover {
    background: rgba(31, 115, 183, 0.04);
  }

  img {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    display: block;
  }
`;

const CloseButton = styled.button.attrs({ className: 'btn-close' })`
  height: 40px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #1f73b7;

  &:hover {
    background: rgba(31, 115, 183, 0.04);
  }
`;

const SaveButton = styled.button.attrs({ className: 'btn-save' })`
  height: 40px;
  padding: 10px 16px;
  background: #1f73b7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #ffffff;

  &:hover {
    background: #1a5f99;
  }
`;

interface ReviewArticleOverlayProps {
  onClose: () => void;
}

export default function ReviewArticleOverlay({ onClose }: ReviewArticleOverlayProps) {
  const portalRoot = document.getElementById('root')?.parentElement || document.body;
  const [currentEdit, setCurrentEdit] = useState(1);

  return createPortal(
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderTitle>
            <HeaderTitleRegular>Article review:</HeaderTitleRegular>
            <HeaderTitleBold>Unlocking accounts after too many attempts</HeaderTitleBold>
          </HeaderTitle>
          <HeaderCloseButton onClick={onClose}>
            <CloseIcon />
          </HeaderCloseButton>
        </Header>

        <Content>
          <Toolbar>
            <ToolbarItems>
              <ToolbarDropdown className="toolbar-heading">
                <span>Heading 1</span>
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" className="toolbar-icon" />
              </ToolbarDropdown>
              <ToolbarDropdown className="toolbar-text-size">
                <span>T</span>
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" className="toolbar-icon" />
              </ToolbarDropdown>
              <ToolbarDropdown className="toolbar-font-size">
                <img src="/toolbar-icons/ico-article-editor-toolbar-fontsize-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" className="toolbar-icon" />
              </ToolbarDropdown>
              <ToolbarDropdown className="toolbar-color">
                <img src="/toolbar-icons/ico-article-editor-toolbar-color-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" className="toolbar-icon" />
              </ToolbarDropdown>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-bold-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-italic-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarButton className="toolbar-underline">
                <img src="/toolbar-icons/ico-article-editor-toolbar-underline-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarDivider />
              <ToolbarButton className="toolbar-listbullet">
                <img src="/toolbar-icons/ico-article-editor-toolbar-listbullet-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarButton className="toolbar-listnumber">
                <img src="/toolbar-icons/ico-article-editor-toolbar-listnumber-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarDropdown className="toolbar-align">
                <img src="/toolbar-icons/ico-article-editor-toolbar-align-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" className="toolbar-icon" />
              </ToolbarDropdown>
              <ToolbarDivider />
              <ToolbarButton className="toolbar-terminal">
                <img src="/toolbar-icons/ico-article-editor-toolbar-terminal-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarButton className="toolbar-attachment">
                <img src="/toolbar-icons/ico-article-editor-toolbar-attachment-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarButton className="toolbar-link">
                <img src="/toolbar-icons/ico-article-editor-toolbar-link-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarButton className="toolbar-image">
                <img src="/toolbar-icons/ico-article-editor-toolbar-image-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarButton className="toolbar-play">
                <img src="/toolbar-icons/ico-article-editor-toolbar-play-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarDropdown className="toolbar-table">
                <img src="/toolbar-icons/ico-article-editor-toolbar-table-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" className="toolbar-icon" />
              </ToolbarDropdown>
              <ToolbarDivider />
              <ToolbarButton className="toolbar-duplicate">
                <img src="/toolbar-icons/ico-article-editor-toolbar-duplicate-16.svg" alt="" className="toolbar-icon-large" />
              </ToolbarButton>
              <ToolbarDropdown className="toolbar-enhance">
                <img src="/toolbar-icons/ico-article-editor-toolbar-enhance-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" className="toolbar-icon" />
              </ToolbarDropdown>
              <ToolbarDropdown className="toolbar-add">
                <img src="/toolbar-icons/ico-article-editor-toolbar-plus-12.svg" alt="" className="toolbar-icon" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" className="toolbar-icon" />
              </ToolbarDropdown>
              <ToolbarDivider />
              <ToolbarHtml>
                <span>HTML</span>
              </ToolbarHtml>
            </ToolbarItems>
          </Toolbar>

          <MainContentArea>
            <ArticleEditorContainer>
              <ArticleWrapper>
                <ArticleHeaderBar>
                  <DraftBadge>
                    <DraftIcon />
                    Draft
                  </DraftBadge>
                  <HeaderDivider />
                  <NewArticleTag>Article changes</NewArticleTag>
                  <HeaderDivider />
                  <LanguageButton>American English</LanguageButton>
                </ArticleHeaderBar>

                <Article>
                  <ArticleTitle contentEditable suppressContentEditableWarning>
                    Unlocking accounts after too many attempts
                  </ArticleTitle>

                  <ArticleBody contentEditable suppressContentEditableWarning>
                    <p>For security reasons, your account is temporarily locked after multiple unsuccessful login attempts. Here's how to unlock it and regain access.</p>

                    <h2>Wait for Automatic Unlock</h2>
                    <p>Your account will automatically unlock after <HighlightDeletion>30 minutes</HighlightDeletion><HighlightAddition>15 minutes</HighlightAddition>. This is the simplest option if you're not in a hurry.</p>

                    <h2>Unlock Immediately via Email</h2>
                    <p>To unlock your account right away:</p>
                    <ol>
                      <li>Check your email for an "Account Locked" notification.</li>
                      <li>Click the "Unlock My Account" link in the email.</li>
                      <li>Follow the verification steps to confirm your identity.</li>
                      <li><HighlightDeletion>Create a new password if prompted.</HighlightDeletion><HighlightAddition>You'll be able to log in immediately without changing your password.</HighlightAddition></li>
                    </ol>

                    <h2>Unlock via Support</h2>
                    <p>If you didn't receive an unlock email:</p>
                    <ul>
                      <li>Contact our support team through the help center.</li>
                      <li>Provide your username or email address.</li>
                      <li>Verify your identity by answering security questions.</li>
                      <li>Our team will unlock your account and help you reset your password.</li>
                    </ul>

                    <h2>Prevent Future Lockouts</h2>
                    <p>To avoid getting locked out again:</p>
                    <ul>
                      <li>Use a password manager to store your credentials securely.</li>
                      <li>Reset your password if you're having trouble remembering it.</li>
                      <li>Enable two-factor authentication for added security.</li>
                    </ul>
                  </ArticleBody>
                </Article>
              </ArticleWrapper>
            </ArticleEditorContainer>

            <SidePanel>
              <SummaryCard>
                <SummaryTitle>Review 2 of 2 edits</SummaryTitle>
                <SummaryText>AI has suggested changes to improve clarity and accuracy based on your knowledge base.</SummaryText>
              </SummaryCard>

              <ReviewCard>
                <ReviewCardHeader>
                  <ReviewCardTitle>Reduce wait time</ReviewCardTitle>
                  <ReviewCardCount>1 of 2</ReviewCardCount>
                </ReviewCardHeader>
                <ReviewCardContent>
                  Change automatic unlock time from 30 minutes to 15 minutes to match updated security policy.
                </ReviewCardContent>
                <ReviewCardActions>
                  <RejectButton>
                    <RejectIcon />
                  </RejectButton>
                  <AcceptButton>
                    <AcceptIconStyled />
                  </AcceptButton>
                </ReviewCardActions>
              </ReviewCard>

              <ReviewCard>
                <ReviewCardHeader>
                  <ReviewCardTitle>Simplify unlock process</ReviewCardTitle>
                  <ReviewCardCount>2 of 2</ReviewCardCount>
                </ReviewCardHeader>
                <ReviewCardContent>
                  Users no longer need to reset their password after unlocking via email, making the process faster.
                </ReviewCardContent>
                <ReviewCardActions>
                  <RejectButton>
                    <RejectIcon />
                  </RejectButton>
                  <AcceptButton>
                    <AcceptIconStyled />
                  </AcceptButton>
                </ReviewCardActions>
              </ReviewCard>
            </SidePanel>
          </MainContentArea>
        </Content>

        <Footer>
          <FooterLeft>
            <PreviewButton>
              <img src="/toolbar-icons/ico-article-editor-footer-preview-16.svg" alt="" />
              <span>Preview</span>
            </PreviewButton>
          </FooterLeft>
          <FooterRight>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <SaveButton>Save</SaveButton>
          </FooterRight>
        </Footer>
      </Modal>
    </Overlay>,
    portalRoot
  );
}
