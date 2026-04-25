import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomNav } from './components/layout/BottomNav';
import { Dashboard } from './pages/Dashboard';
import { Itinerary } from './pages/Itinerary';
import { MapView } from './pages/MapView';
import { Notes } from './pages/Notes';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('tripflow-lang', newLang);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 font-sans">
      <header className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border z-40">
        <div className="flex justify-between items-center px-4 h-14 max-w-md mx-auto">
          <h1 className="text-xl font-bold text-primary tracking-tight">{t('app_title')}</h1>
          <div className="flex items-center gap-2">
            <button onClick={toggleLanguage} className="px-2 py-1 text-sm font-medium rounded hover:bg-muted transition-colors">
              {i18n.language === 'en' ? '中' : 'EN'}
            </button>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-muted transition-colors">
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>
      <main className="pt-14 max-w-md mx-auto h-full">
        {currentTab === 'dashboard' && <Dashboard />}
        {currentTab === 'itinerary' && <Itinerary />}
        {currentTab === 'map' && <MapView />}
        {currentTab === 'notes' && <Notes />}
      </main>
      <BottomNav currentTab={currentTab} setTab={setCurrentTab} />
    </div>
  );
}

export default App;
