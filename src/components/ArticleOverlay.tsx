import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import XIcon from '@zendeskgarden/svg-icons/src/16/x-stroke.svg?react';

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

// Toolbar styles
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

// Article editor area
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

// Footer styles
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

interface ArticleOverlayProps {
  onClose: () => void;
}

export default function ArticleOverlay({ onClose }: ArticleOverlayProps) {
  const portalRoot = document.getElementById('root')?.parentElement || document.body;

  return createPortal(
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderTitle>
            <HeaderTitleRegular>Review recommendations for topic:</HeaderTitleRegular>
            <HeaderTitleBold>Password reset</HeaderTitleBold>
          </HeaderTitle>
          <HeaderCloseButton onClick={onClose}>
            <CloseIcon />
          </HeaderCloseButton>
        </Header>

        <Content>
          {/* Formatting Toolbar */}
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

          {/* Article Editor */}
          <ArticleEditorContainer>
            <ArticleWrapper>
              <ArticleHeaderBar>
                <DraftBadge>
                  <DraftIcon />
                  Draft
                </DraftBadge>
                <HeaderDivider />
                <NewArticleTag>New article</NewArticleTag>
                <HeaderDivider />
                <LanguageButton>American English</LanguageButton>
              </ArticleHeaderBar>

              <Article>
                <ArticleTitle contentEditable suppressContentEditableWarning>
                  Defective product returns and replacements
                </ArticleTitle>

                <ArticleBody contentEditable suppressContentEditableWarning>
                  <p>If your product stopped working or arrived defective, we're here to help. You can request a replacement or repair within 30 days of your purchase. To start your return:</p>

                  <h2>Step 1: Check Your Eligibility</h2>
                  <p>Before starting a return, please make sure:</p>
                  <ul>
                    <li>The product is within 30 days of the purchase date.</li>
                    <li>The item is in its original condition (not intentionally damaged).</li>
                    <li>You have proof of purchase (e.g., receipt or order confirmation).</li>
                  </ul>

                  <h2>Step 2: Start Your Return Request</h2>
                  <p>To request a replacement or repair:</p>
                  <ol>
                    <li>Log in to your account on our website.</li>
                    <li>Go to the Orders section and select the item you want to return.</li>
                    <li>Click on Request Return/Repair and complete the form with details about the issue.</li>
                  </ol>
                </ArticleBody>
              </Article>
            </ArticleWrapper>
          </ArticleEditorContainer>
        </Content>

        {/* Footer */}
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
