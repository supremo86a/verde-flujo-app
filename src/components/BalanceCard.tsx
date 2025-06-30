
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  currency?: string;
  trend?: number;
}

const BalanceCard = ({ balance, currency = 'MXN', trend = 5.2 }: BalanceCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="relative overflow-hidden bg-mexlucky-gradient p-6 text-white shadow-2xl border-0 animate-scale-in">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/80 text-sm font-medium">Saldo Total</p>
          <div className="flex items-center space-x-1 text-mexlucky-bright">
            <TrendingUp size={16} />
            <span className="text-xs font-semibold">+{trend}%</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h1 className="text-4xl font-bold tracking-tight animate-counter">
            {formatCurrency(balance)}
          </h1>
          <p className="text-white/60 text-sm mt-1">Mexlucky Wallet</p>
        </div>

        <div className="flex items-center space-x-4 text-white/80 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-mexlucky-bright rounded-full"></div>
            <span>Activo</span>
          </div>
          <div>
            Última actualización: {new Date().toLocaleTimeString('es-MX', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12"></div>
    </Card>
  );
};

export default BalanceCard;
