import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

interface ChartData {
  date: string;
  amount: number;
}

interface LineChartProps {
  data: ChartData[];
  title: string;
}

const CustomLineChart = ({ data, title }: LineChartProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp size={20} className="text-mexlucky-green" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <Calendar size={16} className="text-muted-foreground" />
      </div>
      
      <div className="h-48">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-mexlucky-green font-semibold">
                          ${payload[0].value?.toLocaleString('es-MX')} MXN
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="url(#mexluckyGradient)"
                strokeWidth={3}
                dot={{ fill: '#1B5E20', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#1B5E20' }}
              />
              <defs>
                <linearGradient id="mexluckyGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1B5E20" />
                  <stop offset="100%" stopColor="#2E7D32" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <TrendingUp size={48} className="mb-3 opacity-50" />
            <p className="text-sm">No hay datos para mostrar</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CustomLineChart;
