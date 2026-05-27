import { ThemeProvider } from '@zendeskgarden/react-theming';
import GlobalNav from './components/GlobalNav';
import MainContent from './components/MainContent';

function App() {
  return (
    <ThemeProvider>
      <GlobalNav>
        <MainContent />
      </GlobalNav>
    </ThemeProvider>
  );
}

export default App;
