import { ReactNode, useState } from 'react';
import {
  Product,
  Header,
  Nav,
  Subnav,
  Main,
  ProfileMenu,
} from '@zendesk-ui/navigation';

// Import 20px icons from @zendesk-ui/assets for navigation
import LayoutGridIcon from '@zendesk-ui/assets/icons/20px/layout-grid-fill.svg?react';
import BotSparkleIcon from '@zendesk-ui/assets/icons/20px/bot-sparkle-fill.svg?react';
import BubblesIcon from '@zendesk-ui/assets/icons/20px/bubbles-fill.svg?react';
import GearIcon from '@zendesk-ui/assets/icons/20px/gear-fill.svg?react';
import WrenchIcon from '@zendesk-ui/assets/icons/20px/wrench-fill.svg?react';
import PeopleIcon from '@zendesk-ui/assets/icons/20px/people-fill.svg?react';
import DatabaseIcon from '@zendesk-ui/assets/icons/20px/database-fill.svg?react';
import SquareGridCircleIcon from '@zendesk-ui/assets/icons/20px/square-grid-circle-fill.svg?react';
import SproutIcon from '@zendesk-ui/assets/icons/20px/sprout-fill.svg?react';
import SearchIcon from '@zendesk-ui/assets/icons/20px/magnifying-glass-fill.svg?react';
import HelpIcon from '@zendesk-ui/assets/icons/20px/rescue-ring-fill.svg?react';

// Import product icons
import ProductSupportIcon from '@zendesk-ui/assets/icons/20px/product-support.svg?react';
import ProductContactCenterIcon from '@zendesk-ui/assets/icons/20px/product-contact-center.svg?react';
import ProductVoiceIcon from '@zendesk-ui/assets/icons/20px/product-voice.svg?react';
import ProductKnowledgeIcon from '@zendesk-ui/assets/icons/20px/product-knowledge.svg?react';
import ProductAnalyticsIcon from '@zendesk-ui/assets/icons/20px/product-analytics.svg?react';
import ProductCommunityIcon from '@zendesk-ui/assets/icons/20px/product-community.svg?react';
import ProductAdminCenterIcon from '@zendesk-ui/assets/icons/20px/product-admin-center.svg?react';
import ProductAiAgentsIcon from '@zendesk-ui/assets/icons/20px/product-ai-agents.svg?react';

interface GlobalNavProps {
  children: ReactNode;
}

const products = [
  { value: 'support', label: 'Support', href: '#', icon: <ProductSupportIcon /> },
  { value: 'contact-center', label: 'Contact Center', href: '#', icon: <ProductContactCenterIcon /> },
  { value: 'voice', label: 'Voice', href: '#', icon: <ProductVoiceIcon /> },
  { value: 'knowledge', label: 'Knowledge', href: '#', icon: <ProductKnowledgeIcon /> },
  { value: 'analytics', label: 'Analytics', href: '#', icon: <ProductAnalyticsIcon /> },
  { value: 'community', label: 'Community', href: '#', icon: <ProductCommunityIcon /> },
  { value: 'ai-agents', label: 'AI agents', href: '#', icon: <ProductAiAgentsIcon />, isSelected: true },
  { value: 'admin-center', label: 'Admin Center', href: '#', icon: <ProductAdminCenterIcon /> },
];

export default function GlobalNav({ children }: GlobalNavProps) {
  const [currentNav, setCurrentNav] = useState('agents');

  return (
    <Product locale="en-US" products={products}>
      <Header>
        <Header.IconButton tooltip="Search">
          <SearchIcon />
        </Header.IconButton>
        <Header.IconButton tooltip="Help">
          <HelpIcon />
        </Header.IconButton>
        <ProfileMenu name="Witold Iglewski" meta="witold.iglewski@zendesk.com">
          <ProfileMenu.ItemGroup aria-label="Profile actions">
            <ProfileMenu.Item value="profile">Manage profile</ProfileMenu.Item>
            <ProfileMenu.Item value="settings">Settings</ProfileMenu.Item>
          </ProfileMenu.ItemGroup>
          <ProfileMenu.ItemGroup aria-label="Session actions">
            <ProfileMenu.Item value="logout">Sign out</ProfileMenu.Item>
          </ProfileMenu.ItemGroup>
        </ProfileMenu>
      </Header>

      <Nav>
        <Nav.Item
          icon={<LayoutGridIcon />}
          isCurrent={currentNav === 'overview'}
          onAction={() => setCurrentNav('overview')}
        >
          Overview
        </Nav.Item>
        <Nav.Item
          icon={<BotSparkleIcon />}
          isCurrent={currentNav === 'agents'}
          onAction={() => setCurrentNav('agents')}
        >
          AI Agents
        </Nav.Item>
        <Nav.Item
          icon={<BubblesIcon />}
          isCurrent={currentNav === 'conversations'}
          onAction={() => setCurrentNav('conversations')}
        >
          Conversations
        </Nav.Item>
        <Nav.Item
          icon={<GearIcon />}
          isCurrent={currentNav === 'settings'}
          onAction={() => setCurrentNav('settings')}
        >
          Settings
        </Nav.Item>
        <Nav.Item
          icon={<WrenchIcon />}
          isCurrent={currentNav === 'tools'}
          onAction={() => setCurrentNav('tools')}
        >
          Tools
        </Nav.Item>
        <Nav.Item
          icon={<PeopleIcon />}
          isCurrent={currentNav === 'people'}
          onAction={() => setCurrentNav('people')}
        >
          People
        </Nav.Item>
        <Nav.Item
          icon={<DatabaseIcon />}
          isCurrent={currentNav === 'database'}
          onAction={() => setCurrentNav('database')}
        >
          Database
        </Nav.Item>
        <Nav.Item
          icon={<SquareGridCircleIcon />}
          isCurrent={currentNav === 'apps'}
          onAction={() => setCurrentNav('apps')}
        >
          Apps
        </Nav.Item>
        <Nav.Item
          icon={<SproutIcon />}
          isCurrent={currentNav === 'growth'}
          onAction={() => setCurrentNav('growth')}
        >
          Growth
        </Nav.Item>
      </Nav>

      {currentNav === 'agents' && (
        <Subnav>
          <Subnav.Item isCurrent>Discover</Subnav.Item>
          <Subnav.Item>Custom Agents</Subnav.Item>
          <Subnav.Item>Agent Builder</Subnav.Item>
          <Subnav.Item>Performance</Subnav.Item>
          <Subnav.Item>Analytics</Subnav.Item>
        </Subnav>
      )}

      <Main>
        {children}
      </Main>
    </Product>
  );
}
