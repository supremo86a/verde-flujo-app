
import React, { useState, useEffect } from 'react';
import BalanceCard from '@/components/BalanceCard';
import FloatingButtons from '@/components/FloatingButtons';
import TransactionHistory from '@/components/TransactionHistory';
import BottomNavigation from '@/components/BottomNavigation';
import TransactionModal from '@/components/TransactionModal';
import LineChart from '@/components/LineChart';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'add' | 'transfer';
  amount: number;
  description: string;
  date: Date;
  recipient?: string;
}

const Index = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'reports'>('home');
  const [modalType, setModalType] = useState<'add' | 'transfer' | null>(null);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('mexlucky-balance');
    const savedTransactions = localStorage.getItem('mexlucky-transactions');
    
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions).map((t: any) => ({
        ...t,
        date: new Date(t.date)
      }));
      setTransactions(parsedTransactions);
    }
  }, []);

  // Save data to localStorage whenever balance or transactions change
  useEffect(() => {
    localStorage.setItem('mexlucky-balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('mexlucky-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleTransaction = (data: { amount: number; description: string; recipient?: string }) => {
    const isTransfer = modalType === 'transfer';
    
    if (isTransfer && data.amount > balance) {
      toast({
        title: "Saldo insuficiente ❌",
        description: "No puedes transferir más de lo que tienes",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: modalType!,
      amount: data.amount,
      description: data.description,
      date: new Date(),
      recipient: data.recipient,
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    if (isTransfer) {
      setBalance(prev => prev - data.amount);
    } else {
      setBalance(prev => prev + data.amount);
    }

    setModalType(null);
  };

  const getChartData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
    }).reverse();

    return last7Days.map(date => {
      const dayTransactions = transactions.filter(t => {
        const tDate = t.date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
        return tDate === date && t.type === 'add';
      });
      
      const totalAmount = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
      return { date, amount: totalAmount };
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 pb-24">
            <BalanceCard balance={balance} />
            
            <div className="px-1">
              <h2 className="text-lg font-semibold text-foreground mb-4">Actividad Reciente</h2>
              <TransactionHistory transactions={transactions.slice(0, 5)} />
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="pb-24">
            <TransactionHistory transactions={transactions} />
          </div>
        );
      
      case 'reports':
        return (
          <div className="space-y-6 pb-24">
            <LineChart 
              data={getChartData()} 
              title="Ingresos de los últimos 7 días"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-mexlucky-green/10 p-4 rounded-xl text-center">
                <p className="text-sm text-mexlucky-green font-medium">Total Agregado</p>
                <p className="text-xl font-bold text-mexlucky-green">
                  ${transactions.filter(t => t.type === 'add').reduce((sum, t) => sum + t.amount, 0).toLocaleString('es-MX')}
                </p>
              </div>
              
              <div className="bg-red-500/10 p-4 rounded-xl text-center">
                <p className="text-sm text-red-500 font-medium">Total Transferido</p>
                <p className="text-xl font-bold text-red-500">
                  ${transactions.filter(t => t.type === 'transfer').reduce((sum, t) => sum + t.amount, 0).toLocaleString('es-MX')}
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mobile-container">
      <div className="p-6">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mexlucky</h1>
              <p className="text-sm text-muted-foreground">Gestiona tus ganancias</p>
            </div>
            <div className="w-8 h-8 bg-mexlucky-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
          </div>
        </header>

        {renderContent()}
      </div>

      <FloatingButtons
        onAddBalance={() => setModalType('add')}
        onTransfer={() => setModalType('transfer')}
      />

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <TransactionModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || 'add'}
        onSubmit={handleTransaction}
      />
    </div>
  );
};

export default Index;
