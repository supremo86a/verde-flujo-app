
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Calendar } from 'lucide-react';

interface ChartData {
  date: string;
  amount: number;
}

interface SimpleChartProps {
  data: ChartData[];
  title: string;
}

const SimpleChart = ({ data, title }: SimpleChartProps) => {
  const maxAmount = Math.max(...data.map(d => d.amount), 1);
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp size={20} className="text-mexlucky-green" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <Calendar size={16} className="text-muted-foreground" />
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="text-xs text-muted-foreground w-16 text-right">
              {item.date}
            </div>
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-mexlucky-gradient transition-all duration-500 ease-out"
                  style={{ 
                    width: `${(item.amount / maxAmount) * 100}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              </div>
              <div className="text-sm font-medium text-foreground w-20 text-right">
                ${item.amount.toLocaleString('es-MX')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <TrendingUp size={48} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">No hay datos para mostrar</p>
        </div>
      )}
    </Card>
  );
};

export default SimpleChart;
