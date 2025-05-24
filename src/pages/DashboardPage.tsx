import React from 'react';
import MetricsSection from '../components/Dashboard/MetricsSection';
import FilterBar from '../components/Dashboard/FilterBar';
import Card from '../components/UI/Card';
import Table from '../components/UI/Table';
import { useAssets } from '../context/AssetContext';
import { mockBases } from '../utils/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';

const DashboardPage: React.FC = () => {
  const { 
    dashboardMetrics, 
    filterOptions, 
    setFilterOptions,
    assets,
    transfers,
    purchases,
    expenditures
  } = useAssets();

  // Format data for charts
  const assetTypeData = [
    { name: 'Weapons', value: assets.filter(a => a.type === 'weapon').reduce((sum, a) => sum + a.quantity, 0) },
    { name: 'Vehicles', value: assets.filter(a => a.type === 'vehicle').reduce((sum, a) => sum + a.quantity, 0) },
    { name: 'Ammunition', value: assets.filter(a => a.type === 'ammunition').reduce((sum, a) => sum + a.quantity, 0) },
    { name: 'Equipment', value: assets.filter(a => a.type === 'equipment').reduce((sum, a) => sum + a.quantity, 0) },
  ];

  const baseDistributionData = mockBases.map(base => ({
    name: base.name,
    assets: assets.filter(a => a.baseId === base.id).reduce((sum, a) => sum + a.quantity, 0)
  }));

  // Recent activity combines purchases, transfers, and expenditures
  const recentActivity = [
    ...purchases.map(p => ({ 
      id: p.id, 
      date: p.date, 
      type: 'Purchase', 
      description: `Purchased ${p.quantity} ${p.assetName}`,
      quantity: p.quantity
    })),
    ...transfers.map(t => ({ 
      id: t.id, 
      date: t.date, 
      type: 'Transfer', 
      description: `Transferred ${t.quantity} ${t.assetName} from ${mockBases.find(b => b.id === t.fromBaseId)?.name} to ${mockBases.find(b => b.id === t.toBaseId)?.name}`,
      quantity: t.quantity
    })),
    ...expenditures.map(e => ({ 
      id: e.id, 
      date: e.date, 
      type: 'Expenditure', 
      description: `Expended ${e.quantity} ${e.assetName} for ${e.reason}`,
      quantity: e.quantity
    }))
  ]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);

  const COLORS = ['#0A2463', '#3E92CC', '#990000', '#FFD700'];

  return (
    <div>
      <FilterBar 
        bases={mockBases}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      
      <MetricsSection metrics={dashboardMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card title="Asset Distribution by Type">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {assetTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} units`, 'Quantity']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Asset Distribution by Base">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={baseDistributionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="assets" fill="#0A2463" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <Card title="Recent Activity" className="mt-6">
        <Table
          columns={[
            { header: 'Date', accessor: 'date' },
            { header: 'Type', accessor: item => (
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.type === 'Purchase' ? 'bg-green-100 text-green-800' :
                item.type === 'Transfer' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.type}
              </span>
            )},
            { header: 'Description', accessor: 'description' },
            { header: 'Quantity', accessor: 'quantity' },
          ]}
          data={recentActivity}
          keyExtractor={(item) => item.id}
          emptyMessage="No recent activity"
        />
      </Card>
    </div>
  );
};

export default DashboardPage;