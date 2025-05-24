import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Table from '../components/UI/Table';
import FilterBar from '../components/Dashboard/FilterBar';
import { useAssets } from '../context/AssetContext';
import { mockBases } from '../utils/mockData';
import { AssetType, Purchase } from '../types';
import { Plus, FileText } from 'lucide-react';

const PurchasesPage: React.FC = () => {
  const { 
    purchases, 
    assets,
    addPurchase,
    filterOptions,
    setFilterOptions
  } = useAssets();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    assetId: '',
    baseId: '',
    quantity: 1,
    cost: 0
  });
  
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewPurchase({
      assetId: '',
      baseId: '',
      quantity: 1,
      cost: 0
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPurchase.assetId || !newPurchase.baseId || newPurchase.quantity <= 0) {
      return;
    }
    
    const selectedAsset = assets.find(a => a.id === newPurchase.assetId);
    
    if (selectedAsset) {
      addPurchase({
        assetId: selectedAsset.id,
        assetName: selectedAsset.name,
        assetType: selectedAsset.type,
        baseId: newPurchase.baseId,
        quantity: newPurchase.quantity,
        cost: newPurchase.cost
      });
      
      toggleAddForm();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPurchase({
      ...newPurchase,
      [name]: name === 'quantity' || name === 'cost' ? Number(value) : value
    });
  };
  
  // Get unique assets for the dropdown
  const uniqueAssets = Array.from(
    new Map(assets.map(asset => [asset.name, asset])).values()
  );
  
  return (
    <div>
      <FilterBar
        bases={mockBases}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Purchases</h2>
          <Button 
            onClick={toggleAddForm}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Purchase
          </Button>
        </div>
        
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Add New Purchase</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asset
                  </label>
                  <select
                    name="assetId"
                    value={newPurchase.assetId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Asset</option>
                    {uniqueAssets.map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.name} ({asset.type})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base
                  </label>
                  <select
                    name="baseId"
                    value={newPurchase.baseId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Base</option>
                    {mockBases.map(base => (
                      <option key={base.id} value={base.id}>
                        {base.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={newPurchase.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost
                  </label>
                  <input
                    type="number"
                    name="cost"
                    min="0"
                    step="0.01"
                    value={newPurchase.cost}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={toggleAddForm}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">Save Purchase</Button>
              </div>
            </form>
          </div>
        )}
        
        <Table
          columns={[
            { header: 'Date', accessor: 'date' },
            { 
              header: 'Asset', 
              accessor: item => (
                <div>
                  <p className="font-medium">{item.assetName}</p>
                  <p className="text-xs text-gray-500 capitalize">{item.assetType}</p>
                </div>
              )
            },
            { 
              header: 'Base', 
              accessor: item => {
                const base = mockBases.find(b => b.id === item.baseId);
                return base ? base.name : 'Unknown Base';
              }
            },
            { header: 'Quantity', accessor: 'quantity' },
            { 
              header: 'Cost', 
              accessor: item => (
                <span>
                  ${item.cost.toLocaleString()}
                </span>
              )
            },
            { 
              header: 'Actions', 
              accessor: () => (
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-1" />
                  View
                </Button>
              )
            },
          ]}
          data={purchases}
          keyExtractor={(item) => item.id}
          emptyMessage="No purchase records found"
        />
      </Card>
    </div>
  );
};

export default PurchasesPage;