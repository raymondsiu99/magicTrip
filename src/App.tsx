import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Cloud, CloudOff, Loader2, CloudUpload } from 'lucide-react';
import { BottomNav } from './components/layout/BottomNav';
import { Dashboard } from './pages/Dashboard';
import { Itinerary } from './pages/Itinerary';
import { MapView } from './pages/MapView';
import { Notes } from './pages/Notes';
import { useTripStore } from './store/useTripStore';

const AUTOSAVE_DELAY_MS = 5000;

function App() {
  const [currentTab, setCurrentTab] = useState(() => localStorage.getItem('tripflow-tab') || 'dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('tripflow-dark') === 'true');
  const { t, i18n } = useTranslation();
  const { syncStatus, loadFromCloud, syncToCloud, itinerary, expenses, notes, packingList, completedItems } =
    useTripStore();

  // Apply dark mode on mount (persisted preference takes priority, otherwise use system)
  useEffect(() => {
    const saved = localStorage.getItem('tripflow-dark');
    const dark = saved !== null
      ? saved === 'true'
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  // Load from cloud once on mount
  useEffect(() => {
    loadFromCloud();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save to cloud after state changes (debounced)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (syncStatus === 'loading') return; // don't trigger save while loading
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      syncToCloud();
    }, AUTOSAVE_DELAY_MS);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [itinerary, expenses, notes, packingList, completedItems]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('tripflow-dark', String(next));
    if (next) {
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

  const syncIcon = () => {
    switch (syncStatus) {
      case 'loading':
      case 'saving':
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
      case 'saved':
        return <Cloud className="w-4 h-4 text-green-500" />;
      case 'error':
        return <CloudOff className="w-4 h-4 text-destructive" />;
      default:
        return <CloudUpload className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const syncTitle = {
    loading: 'Loading from cloud…',
    saving: 'Saving to cloud…',
    saved: 'Saved to cloud',
    error: 'Cloud sync failed – click to retry',
    idle: 'Save to cloud',
  }[syncStatus];

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 font-sans">
      <header className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border z-40">
        <div className="flex justify-between items-center px-4 h-14 max-w-md mx-auto">
          <h1 className="text-xl font-bold text-primary tracking-tight">{t('app_title')}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={syncToCloud}
              title={syncTitle}
              disabled={syncStatus === 'saving' || syncStatus === 'loading'}
              className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-50"
            >
              {syncIcon()}
            </button>
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
      <BottomNav currentTab={currentTab} setTab={(tab) => { setCurrentTab(tab); localStorage.setItem('tripflow-tab', tab); }} />
    </div>
  );
}

export default App;
