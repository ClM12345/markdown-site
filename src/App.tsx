import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import GuidePage from './pages/GuidePage';
import EditorPage from './pages/EditorPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import FeedbackPage from './pages/FeedbackPage';
import HelpPage from './pages/HelpPage';
import { useTheme } from './hooks/useTheme';
import { I18nProvider } from './i18n/context';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <I18nProvider>
      <BrowserRouter>
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/editor" element={<EditorPage toggleTheme={toggleTheme} />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
