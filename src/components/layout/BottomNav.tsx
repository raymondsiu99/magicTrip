import { Home, Calendar, Map as MapIcon, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BottomNavProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export function BottomNav({ currentTab, setTab }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'itinerary', icon: Calendar, label: 'Itinerary' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'notes', icon: BookOpen, label: 'Notes' },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-card border-t border-border z-50 px-2 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={24} className={isActive ? "fill-primary/20" : ""} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
