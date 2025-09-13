import React from 'react';
import { Card } from '@/components/ui/card';
import { Home, ClipboardList, BarChart } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'home' | 'history' | 'reports';
  onTabChange: (tab: 'home' | 'history' | 'reports') => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Inicio' },
    { id: 'history' as const, icon: ClipboardList, label: 'Historial' },
    { id: 'reports' as const, icon: BarChart, label: 'Reportes' },
  ];

  return (
    <Card className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm mx-auto border-t bg-white/90 backdrop-blur-sm shadow-2xl rounded-t-2xl border-x-0 border-b-0">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-mexlucky-green text-white shadow-md transform translate-y-[-2px]' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon size={20} className={`mb-1 ${isActive ? 'animate-scale-in' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default BottomNavigation;
