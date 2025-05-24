import React, { useState } from 'react';
import { Package, ArrowDownLeft, ArrowUpRight, User, AlertTriangle } from 'lucide-react';
import MetricCard from './MetricCard';
import MovementDetailModal from './MovementDetailModal';
import { DashboardMetrics } from '../../types';

interface MetricsSectionProps {
  metrics: DashboardMetrics;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  const [showMovementDetails, setShowMovementDetails] = useState(false);

  const toggleMovementDetails = () => {
    setShowMovementDetails(!showMovementDetails);
  };

  const netMovement = metrics.purchases + metrics.transferIn - metrics.transferOut;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Opening Balance"
          value={metrics.openingBalance}
          icon={<Package className="w-5 h-5" />}
          className="border-l-4 border-blue-500"
        />
        
        <MetricCard
          title="Net Movement"
          value={netMovement}
          icon={<ArrowUpRight className="w-5 h-5" />}
          onClick={toggleMovementDetails}
          className="border-l-4 border-green-500"
        />
        
        <MetricCard
          title="Assigned Assets"
          value={metrics.assigned}
          icon={<User className="w-5 h-5" />}
          className="border-l-4 border-yellow-500"
        />
        
        <MetricCard
          title="Expended Assets"
          value={metrics.expended}
          icon={<AlertTriangle className="w-5 h-5" />}
          className="border-l-4 border-red-500"
        />
      </div>

      {showMovementDetails && (
        <MovementDetailModal 
          isOpen={showMovementDetails}
          onClose={toggleMovementDetails}
          purchases={metrics.purchases}
          transferIn={metrics.transferIn}
          transferOut={metrics.transferOut}
        />
      )}
    </div>
  );
};

export default MetricsSection;