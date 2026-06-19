import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';

// Import icons
import ChevronLeftIcon from '../assets/icons/buttons-chevron-left.svg?react';
import ChevronDownOutlineIcon from '../assets/icons/button-chevrondown-outline.svg?react';
import ChevronDownDarkIcon from '../assets/icons/button-chevrondown-dark.svg?react';
import SideSettingsIcon from '../assets/icons/article-editor-side-settings.svg?react';
import SideWorldIcon from '../assets/icons/article-editor-side-world.svg?react';
import SideSparkleIcon from '../assets/icons/article-editor-side-sparkle.svg?react';
import SideChatIcon from '../assets/icons/article-editor-side-chat.svg?react';
import SideHistoryIcon from '../assets/icons/article-editor-side-history.svg?react';

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

const EditorContainer = styled.div`
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

const Modal = styled.div`
  width: calc(100vw - 96px);
  height: calc(100vh - 96px);
  background: white;
  border: 1px solid transparent;
  border-radius: 24px;
  box-shadow: 0px 0px 4px 0px rgba(10, 13, 14, 0.16);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeInUp} 0.4s ease forwards;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md, 20px) var(--spacing-xl, 40px);
  border-bottom: 1px solid var(--border-default, #dcdcda);
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 20px);
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: var(--button-fg-default, #2f3130);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm, 12px);
`;

const PageTitle = styled.h1`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
`;

const DraftTag = styled(Tag)`
  && {
    border-radius: var(--border-radii-pill, 99px);
    padding: 2px var(--spacing-xs, 8px);
    height: 20px;

    span {
      font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
`;

const ButtonSeparator = styled.div`
  width: 1px;
  height: 100%;
  background: var(--button-border-default, #999b97);
`;

const ButtonSeparatorDark = styled.div`
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
`;

const InProgressButton = styled(Button)`
  && {
    height: 32px;
    padding: 0;
    border-radius: var(--border-radii-pill, 99px);
    border: 1px solid var(--button-border-default, #999b97);
    background: transparent;
    color: var(--button-fg-default, #2f3130);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    gap: 0;
    overflow: hidden;

    span {
      padding: 8px 12px;
    }

    svg {
      width: 16px;
      height: 16px;
      margin: 0 8px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const PreviewButton = styled(Button)`
  && {
    height: 32px;
    padding: 0;
    border-radius: var(--border-radii-pill, 99px);
    border: 1px solid var(--button-border-default, #999b97);
    background: transparent;
    color: var(--button-fg-default, #2f3130);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    gap: 0;
    overflow: hidden;

    span {
      padding: 8px 12px;
    }

    svg {
      width: 16px;
      height: 16px;
      margin: 0 8px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

const SaveButton = styled(Button)`
  && {
    height: 32px;
    padding: 0;
    border-radius: var(--border-radii-pill, 99px);
    background: var(--button-bg-emphasis, #2f3130);
    color: var(--fg-onemphasis, white);
    font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0;
    border: none;
    display: flex;
    align-items: center;
    gap: 0;
    overflow: hidden;

    span {
      padding: 8px 12px;
    }

    svg {
      width: 16px;
      height: 16px;
      margin: 0 8px;
      color: var(--fg-onemphasis, white);

      path {
        fill: var(--fg-onemphasis, white);
      }
    }

    &:hover {
      background: var(--button-bg-emphasis-hover, #404241);
    }

    &:active {
      background: var(--button-bg-emphasis, #2f3130);
    }
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

const Toolbar = styled.div`
  height: 48px;
  width: 100%;
  flex-shrink: 0;
  background: var(--bg-default, white);
  border-bottom: 1px solid var(--border-default, #dcdcda);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 12px 8px var(--spacing-xl, 40px);
  overflow: hidden;
`;

const ToolbarItems = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const ToolbarButton = styled.button`
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

const ToolbarDropdown = styled.div`
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
  color: var(--fg-subtle, #646864);
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

const ToolbarDivider = styled.div`
  width: 1px;
  height: 26px;
  background: var(--border-default, #dcdcda);
  margin: 0 4px;
  flex-shrink: 0;
`;

const ToolbarHtml = styled.button`
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
    color: var(--fg-subtle, #646864);
  }
`;

const MainContentArea = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
`;

const ArticleEditorContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl, 40px);
  background: white;
`;

const ArticleWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg, 32px);
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md, 20px);
`;

const ArticleTitle = styled.h1`
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
  margin: 0;
  outline: none;
  cursor: text;
  border: none;
  background: transparent;
  width: 100%;
  padding: 0;
`;

const ArticleBody = styled.div`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  color: var(--fg-default, #2f3130);
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
    color: var(--fg-default, #2f3130);
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

const SideMenu = styled.div`
  flex-shrink: 0;
  background: var(--bg-default, white);
  border-left: 1px solid var(--border-default, #dcdcda);
  padding: var(--spacing-xs, 8px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 8px);
`;

const SideIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: var(--fg-default, #2f3130);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

interface ArticleEditorProps {
  contentDetails: {type: 'article' | 'procedure', title: string, topic: string};
  onBack: () => void;
  onSave?: () => void;
}

const ARTICLE_CONTENT: Record<string, JSX.Element> = {
  'How to update payment information': (
    <>
      <p>Keeping your payment information up to date ensures uninterrupted service and helps prevent billing issues. Follow these steps to update your payment details.</p>
      <h2>Before you begin</h2>
      <p>Make sure you have your new payment information ready, including card number, expiration date, and security code.</p>
      <h2>Steps to update payment information</h2>
      <ol>
        <li>Log in to your account using your email and password</li>
        <li>Navigate to Account Settings from the dropdown menu in the top right</li>
        <li>Click on "Billing & Payment" in the left sidebar</li>
        <li>Under Payment Methods, click "Edit" next to your current payment method</li>
        <li>Enter your new payment information in the secure form</li>
        <li>Click "Save Changes" to update your payment method</li>
      </ol>
      <h2>Troubleshooting</h2>
      <p>If you encounter an error when updating your payment information, verify that all required fields are filled out correctly. Your card must have sufficient funds and be authorized for online transactions. If issues persist, contact your bank or our support team for assistance.</p>
    </>
  ),
  'Process refund for duplicate charge': (
    <>
      <p>If you've been charged twice for the same transaction, we'll process a refund for the duplicate charge. This procedure ensures quick resolution of duplicate billing issues.</p>
      <h2>Identifying duplicate charges</h2>
      <p>Check your billing history to confirm you have two identical charges with the same amount and date. Take note of both transaction IDs for reference.</p>
      <h2>Refund process steps</h2>
      <ol>
        <li>Contact our support team via chat or email with your account details</li>
        <li>Provide the transaction IDs for both charges</li>
        <li>Our billing team will verify the duplicate charge within 1 business day</li>
        <li>Once confirmed, the refund will be processed to your original payment method</li>
        <li>You'll receive a confirmation email with the refund details</li>
        <li>Allow 5-7 business days for the refund to appear in your account</li>
      </ol>
      <h2>Important notes</h2>
      <p>Refunds are processed to the original payment method used for the purchase. If that payment method is no longer active, please contact support to arrange an alternative refund method. For questions about refund timing, check with your financial institution.</p>
    </>
  ),
  'Understanding your invoice charges': (
    <>
      <p>Your invoice provides a detailed breakdown of all charges for the billing period. This guide helps you understand each line item and how your total is calculated.</p>
      <h2>Invoice sections explained</h2>
      <p>Every invoice contains several key sections: Account Summary, Service Charges, Usage Fees, Taxes and Fees, and Payment Information.</p>
      <h2>Understanding charges</h2>
      <ol>
        <li><strong>Base subscription fee:</strong> Your monthly or annual plan cost</li>
        <li><strong>Usage charges:</strong> Additional fees for usage beyond your plan limits</li>
        <li><strong>Add-on features:</strong> Optional services or features you've enabled</li>
        <li><strong>Prorated charges:</strong> Adjustments for plan changes during the billing period</li>
        <li><strong>Taxes and fees:</strong> Applicable sales tax and regulatory fees based on your location</li>
      </ol>
      <h2>Common questions</h2>
      <p>If a charge seems incorrect, compare it with your plan details in Account Settings. Usage charges reflect actual consumption as measured by our system. For questions about specific line items, our billing team can provide detailed explanations and usage reports.</p>
    </>
  ),
  'Using advanced search filters': (
    <>
      <p>Advanced search filters help you quickly find exactly what you're looking for by narrowing down results with specific criteria. Master these tools to improve your search efficiency.</p>
      <h2>Accessing advanced filters</h2>
      <p>Click the "Filters" button next to the search bar to open the advanced filter panel. You can combine multiple filters to create highly specific searches.</p>
      <h2>Available filter options</h2>
      <ol>
        <li><strong>Date range:</strong> Specify a custom date range or use presets like "Last 7 days" or "This month"</li>
        <li><strong>Status:</strong> Filter by active, inactive, archived, or pending items</li>
        <li><strong>Category:</strong> Select one or multiple categories to narrow results</li>
        <li><strong>Tags:</strong> Search by specific tags assigned to items</li>
        <li><strong>Owner:</strong> Filter by who created or owns the item</li>
        <li><strong>Custom fields:</strong> Use your organization's custom fields for specialized filtering</li>
      </ol>
      <h2>Saving and reusing filters</h2>
      <p>Once you've configured filters, click "Save Filter" to create a reusable preset. Give it a descriptive name and access it anytime from the saved filters dropdown. You can modify or delete saved filters from your preferences.</p>
    </>
  ),
  'Configure custom fields': (
    <>
      <p>Custom fields allow you to capture additional information specific to your business needs. This procedure walks you through creating and configuring custom fields.</p>
      <h2>Planning your custom fields</h2>
      <p>Before creating custom fields, identify what information you need to track and what field type best fits that data (text, number, dropdown, checkbox, date, etc.).</p>
      <h2>Configuration steps</h2>
      <ol>
        <li>Navigate to Settings → Custom Fields from the admin panel</li>
        <li>Click "Add New Field" to open the field configuration dialog</li>
        <li>Enter a field name that clearly describes the data it will contain</li>
        <li>Select the appropriate field type from the dropdown menu</li>
        <li>Configure field-specific options (such as dropdown choices or number ranges)</li>
        <li>Set field visibility and whether it's required or optional</li>
        <li>Click "Create Field" to save your configuration</li>
      </ol>
      <h2>Managing custom fields</h2>
      <p>Once created, custom fields can be reordered, edited, or archived from the Custom Fields page. Note that editing a field type after creation may affect existing data. Always test custom fields with sample data before rolling them out to your team.</p>
    </>
  ),
  'Troubleshoot mobile app crashes': (
    <>
      <p>If the mobile app is crashing or closing unexpectedly, follow these troubleshooting steps to resolve the issue and restore normal functionality.</p>
      <h2>Quick fixes to try first</h2>
      <p>Many app crashes can be resolved with basic troubleshooting. Start with these simple steps before moving to advanced solutions.</p>
      <h2>Troubleshooting steps</h2>
      <ol>
        <li><strong>Force close and restart:</strong> Completely close the app and reopen it</li>
        <li><strong>Check for updates:</strong> Visit your app store and install any available app updates</li>
        <li><strong>Clear app cache:</strong> Go to device Settings → Apps → [App Name] → Clear Cache</li>
        <li><strong>Restart your device:</strong> Power off your device completely and turn it back on</li>
        <li><strong>Check storage space:</strong> Ensure you have at least 1GB of free storage on your device</li>
        <li><strong>Reinstall the app:</strong> Uninstall and reinstall the app from your app store</li>
      </ol>
      <h2>Still experiencing issues?</h2>
      <p>If crashes persist after trying these steps, the issue may be related to your device's operating system or hardware. Check that your device meets the minimum system requirements. Contact our support team with details about when crashes occur and any error messages you see.</p>
    </>
  ),
  'Fix data sync issues between devices': (
    <>
      <p>Data sync issues can prevent your information from updating across devices. This procedure helps restore proper synchronization between your devices.</p>
      <h2>Understanding sync issues</h2>
      <p>Sync problems typically occur due to connection issues, outdated app versions, or account authentication problems. Identifying the cause helps determine the solution.</p>
      <h2>Resolution steps</h2>
      <ol>
        <li>Verify you're logged into the same account on all devices</li>
        <li>Check that each device has a stable internet connection</li>
        <li>Ensure the app is updated to the latest version on all devices</li>
        <li>Manually trigger a sync by pulling down on the main screen (or using the sync button in settings)</li>
        <li>If sync still fails, log out of your account on all devices</li>
        <li>Wait 5 minutes, then log back in starting with your primary device</li>
        <li>Log into remaining devices one at a time, waiting for sync to complete between each</li>
      </ol>
      <h2>Preventing future sync issues</h2>
      <p>Keep automatic sync enabled in app settings. Avoid making simultaneous edits to the same item on multiple devices. If you frequently work offline, allow time for sync to complete when you reconnect before making new changes.</p>
    </>
  ),
};

export default function ArticleEditor({ contentDetails, onBack, onSave }: ArticleEditorProps) {
  const portalRoot = document.getElementById('root')?.parentElement || document.body;
  const articleContent = ARTICLE_CONTENT[contentDetails.title] || (
    <p>Content for {contentDetails.type} "{contentDetails.title}" related to {contentDetails.topic}.</p>
  );

  return createPortal(
    <EditorContainer onClick={onBack}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderLeft>
            <BackButton onClick={onBack}>
              <ChevronLeftIcon />
            </BackButton>
            <TitleGroup>
              <PageTitle>{contentDetails.type === 'article' ? 'Article' : 'Procedure'} review</PageTitle>
              <DraftTag size="small">
                <span>Draft</span>
              </DraftTag>
            </TitleGroup>
          </HeaderLeft>
          <HeaderRight>
            <InProgressButton>
              <span>In progress</span>
              <ButtonSeparator />
              <ChevronDownOutlineIcon />
            </InProgressButton>
            <PreviewButton>
              <span>Preview</span>
              <ButtonSeparator />
              <ChevronDownOutlineIcon />
            </PreviewButton>
            <SaveButton onClick={onSave || onBack}>
              <span>Save</span>
              <ButtonSeparatorDark />
              <ChevronDownDarkIcon />
            </SaveButton>
          </HeaderRight>
        </Header>

        <Content>
          <Toolbar>
            <ToolbarItems>
              <ToolbarDropdown>
                <span>Heading 1</span>
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" />
              </ToolbarDropdown>
              <ToolbarDropdown>
                <span>T</span>
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" />
              </ToolbarDropdown>
              <ToolbarDropdown>
                <img src="/toolbar-icons/ico-article-editor-toolbar-fontsize-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" />
              </ToolbarDropdown>
              <ToolbarDropdown>
                <img src="/toolbar-icons/ico-article-editor-toolbar-color-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" />
              </ToolbarDropdown>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-bold-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-italic-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-underline-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarDivider />
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-listbullet-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-listnumber-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarDropdown>
                <img src="/toolbar-icons/ico-article-editor-toolbar-align-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" />
              </ToolbarDropdown>
              <ToolbarDivider />
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-terminal-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-attachment-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-link-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-image-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-play-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarDropdown>
                <img src="/toolbar-icons/ico-article-editor-toolbar-table-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" />
              </ToolbarDropdown>
              <ToolbarDivider />
              <ToolbarButton>
                <img src="/toolbar-icons/ico-article-editor-toolbar-duplicate-16.svg" alt="" />
              </ToolbarButton>
              <ToolbarDropdown>
                <img src="/toolbar-icons/ico-article-editor-toolbar-enhance-16.svg" alt="" className="toolbar-icon-large" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" />
              </ToolbarDropdown>
              <ToolbarDropdown>
                <img src="/toolbar-icons/ico-article-editor-toolbar-plus-12.svg" alt="" />
                <img src="/toolbar-icons/ico-article-editor-toolbar-chevron-12.svg" alt="" />
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
                <Article>
                  <ArticleTitle contentEditable suppressContentEditableWarning>
                    {contentDetails.title}
                  </ArticleTitle>

                  <ArticleBody contentEditable suppressContentEditableWarning>
                    {articleContent}
                  </ArticleBody>
                </Article>
              </ArticleWrapper>
            </ArticleEditorContainer>

            <SideMenu>
              <SideIconButton>
                <SideSettingsIcon />
              </SideIconButton>
              <SideIconButton>
                <SideWorldIcon />
              </SideIconButton>
              <SideIconButton>
                <SideSparkleIcon />
              </SideIconButton>
              <SideIconButton>
                <SideChatIcon />
              </SideIconButton>
              <SideIconButton>
                <SideHistoryIcon />
              </SideIconButton>
            </SideMenu>
          </MainContentArea>
        </Content>
      </Modal>
    </EditorContainer>,
    portalRoot
  );
}
