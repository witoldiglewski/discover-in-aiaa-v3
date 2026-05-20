import styled from 'styled-components';
import InfoStrokeIcon from '@zendeskgarden/svg-icons/src/16/info-stroke.svg?react';
import ChevronRightIcon from '@zendeskgarden/svg-icons/src/16/chevron-right-stroke.svg?react';

const Container = styled.div.attrs({ className: 'articles-table-container' })`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const Header = styled.div.attrs({ className: 'articles-table-header' })`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 8px 12px;
`;

const TitleRow = styled.div.attrs({ className: 'articles-title-row' })`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Title = styled.h2.attrs({ className: 'articles-title' })`
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

const Subtitle = styled.p.attrs({ className: 'articles-subtitle' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  margin: 0;
`;

const TableHeader = styled.div.attrs({ className: 'articles-table-header-row' })`
  display: flex;
  gap: 20px;
  padding-left: 20px;
  padding-right: 20px;
  height: 20px;
`;

const ColumnHeader = styled.div.attrs({ className: 'articles-column-header' })<{ $width?: string }>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #2f3130;
  ${props => props.$width ? `width: ${props.$width};` : ''}
  ${props => props.$width === '260px' ? 'min-width: 260px;' : ''}
  ${props => !props.$width ? 'flex: 1;' : ''}
`;

const TableContent = styled.div.attrs({ className: 'articles-table-content' })`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-height: 0;
`;

const TableRow = styled.div.attrs({ className: 'articles-table-row' })`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 12px 20px;
  border: 1px solid #eae9e8;
  border-radius: 12px;
`;

const TitleCell = styled.div.attrs({ className: 'articles-cell-title' })`
  min-width: 260px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #2f3130;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusCell = styled.div.attrs({ className: 'articles-cell-status' })`
  flex: 1;
  display: flex;
  gap: 4px;
  align-items: center;
  min-width: 0;
`;

const SparkleIcon = styled.div.attrs({ className: 'sparkle-icon' })`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 1.5L9.75 5.25L11.25 9L9.75 12.75L9 16.5L8.25 12.75L6.75 9L8.25 5.25L9 1.5Z' fill='%238D59B1'/%3E%3Cpath d='M1.5 9L5.25 8.25L9 6.75L12.75 8.25L16.5 9L12.75 9.75L9 11.25L5.25 9.75L1.5 9Z' fill='%238D59B1'/%3E%3C/svg%3E") center / contain no-repeat;
`;

const StatusText = styled.span.attrs({ className: 'status-text' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #2f3130;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImpactCell = styled.div.attrs({ className: 'articles-cell-impact' })`
  flex: 1;
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 0;
`;

const ImpactIndicator = styled.div.attrs({ className: 'impact-indicator' })<{ $level: 'high' | 'medium' }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.$level === 'high' ? '#68B828' : '#F79A3E'};
  flex-shrink: 0;
`;

const ImpactText = styled.span.attrs({ className: 'impact-text' })`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #646864;
  white-space: nowrap;
`;

const ActionCell = styled.div.attrs({ className: 'articles-cell-action' })`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ReviewButton = styled.button.attrs({ className: 'review-button' })`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 99px;
  cursor: pointer;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: #2f3130;
  white-space: nowrap;

  &:hover {
    background: #f8f9f9;
  }
`;

const ChevronIcon = styled(ChevronRightIcon).attrs({ className: 'chevron-icon' })`
  width: 16px;
  height: 16px;
  color: currentColor;
`;

interface Article {
  title: string;
  status: string;
  impact: 'high' | 'medium';
}

const articles: Article[] = [
  { title: 'Troubleshooting login issues', status: 'New article', impact: 'high' },
  { title: 'Resetting passwords', status: 'New article', impact: 'high' },
  { title: 'Recovering usernames', status: 'New article', impact: 'high' },
  { title: 'Unlocking accounts after too many attempts', status: 'Article changes', impact: 'medium' },
];

export default function ArticlesTable() {
  return (
    <Container>
      <Header>
        <TitleRow>
          <Title>Create articles</Title>
          <InfoIcon />
        </TitleRow>
        <Subtitle>
          All recommendations are drafts and require your review before publishing.
        </Subtitle>
      </Header>

      <TableHeader>
        <ColumnHeader $width="260px">Title</ColumnHeader>
        <ColumnHeader>Status</ColumnHeader>
        <ColumnHeader>Impact</ColumnHeader>
        <ColumnHeader $width="80px">Action</ColumnHeader>
      </TableHeader>

      <TableContent>
        {articles.map((article, index) => (
          <TableRow key={index}>
            <TitleCell>{article.title}</TitleCell>
            <StatusCell>
              <SparkleIcon />
              <StatusText>{article.status}</StatusText>
            </StatusCell>
            <ImpactCell>
              <ImpactIndicator $level={article.impact} />
              <ImpactText>{article.impact === 'high' ? 'High' : 'Medium'}</ImpactText>
            </ImpactCell>
            <ActionCell>
              <ReviewButton>
                Review
                <ChevronIcon />
              </ReviewButton>
            </ActionCell>
          </TableRow>
        ))}
      </TableContent>
    </Container>
  );
}
