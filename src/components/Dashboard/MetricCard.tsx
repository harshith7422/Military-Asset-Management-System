import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../UI/Card';
import clsx from 'clsx';

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isCurrency?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  onClick,
  className,
  isCurrency = false,
}) => {
  const isPositiveChange = change && change > 0;

  const formatValue = (val: number) => {
    if (isCurrency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(val);
    }
    
    return new Intl.NumberFormat('en-US').format(val);
  };

  return (
    <Card 
      className={clsx(
        "transition-all duration-200 hover:shadow-lg", 
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{formatValue(value)}</h3>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositiveChange ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span 
                className={clsx(
                  "text-xs font-medium",
                  isPositiveChange ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositiveChange ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-blue-50 text-[#0A2463]">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;