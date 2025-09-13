import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowUpRight } from 'lucide-react';

interface FloatingButtonsProps {
  onAddBalance: () => void;
  onTransfer: () => void;
}

const FloatingButtons = ({ onAddBalance, onTransfer }: FloatingButtonsProps) => {
  return (
    <div className="fixed bottom-24 right-6 flex flex-col space-y-3 z-50">
      <Button
        onClick={onTransfer}
        size="lg"
        className="w-14 h-14 rounded-full bg-mexlucky-dark hover:bg-mexlucky-dark/90 shadow-lg hover-lift"
      >
        <ArrowUpRight size={24} className="text-white" />
      </Button>
      
      <Button
        onClick={onAddBalance}
        size="lg"
        className="w-16 h-16 rounded-full bg-mexlucky-gradient hover:opacity-90 shadow-xl hover-lift animate-pulse"
      >
        <Plus size={28} className="text-white" />
      </Button>
    </div>
  );
};

export default FloatingButtons;
