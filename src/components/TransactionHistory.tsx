
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'add' | 'transfer';
  amount: number;
  description: string;
  date: Date;
  recipient?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return date.toLocaleDateString('es-MX');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Historial</h2>
        <Clock size={16} className="text-muted-foreground" />
      </div>
      
      {transactions.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={24} />
            </div>
            <p className="text-sm">No hay transacciones aún</p>
            <p className="text-xs mt-1">Agrega tu primera transacción</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2">
          {transactions.map((transaction, index) => (
            <Card key={transaction.id} className="p-4 hover-lift animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.type === 'add' 
                    ? 'bg-mexlucky-green/10 text-mexlucky-green' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {transaction.type === 'add' ? (
                    <ArrowDownLeft size={20} />
                  ) : (
                    <ArrowUpRight size={20} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground truncate">
                      {transaction.description}
                    </p>
                    <p className={`font-semibold ${
                      transaction.type === 'add' 
                        ? 'text-mexlucky-green' 
                        : 'text-red-500'
                    }`}>
                      {transaction.type === 'add' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    {transaction.recipient && (
                      <p className="text-sm text-muted-foreground truncate">
                        Para: {transaction.recipient}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground ml-auto">
                      {getRelativeTime(transaction.date)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
