import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Table from '../components/UI/Table';
import FilterBar from '../components/Dashboard/FilterBar';
import { useAssets } from '../context/AssetContext';
import { mockBases } from '../utils/mockData';
import { Transfer } from '../types';
import { Plus, FileText, CheckCircle, Clock, Truck } from 'lucide-react';

const TransfersPage: React.FC = () => {
  const { 
    transfers, 
    assets,
    addTransfer,
    filterOptions,
    setFilterOptions
  } = useAssets();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransfer, setNewTransfer] = useState({
    assetId: '',
    fromBaseId: '',
    toBaseId: '',
    quantity: 1
  });
  
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewTransfer({
      assetId: '',
      fromBaseId: '',
      toBaseId: '',
      quantity: 1
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !newTransfer.assetId || 
      !newTransfer.fromBaseId || 
      !newTransfer.toBaseId || 
      newTransfer.quantity <= 0 ||
      newTransfer.fromBaseId === newTransfer.toBaseId
    ) {
      return;
    }
    
    const selectedAsset = assets.find(a => 
      a.id === newTransfer.assetId && 
      a.baseId === newTransfer.fromBaseId
    );
    
    if (selectedAsset) {
      addTransfer({
        assetId: selectedAsset.id,
        assetName: selectedAsset.name,
        assetType: selectedAsset.type,
        fromBaseId: newTransfer.fromBaseId,
        toBaseId: newTransfer.toBaseId,
        quantity: newTransfer.quantity
      });
      
      toggleAddForm();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransfer({
      ...newTransfer,
      [name]: name === 'quantity' ? Number(value) : value
    });
  };
  
  // Filter assets by selected base
  const availableAssets = assets.filter(asset => 
    asset.baseId === newTransfer.fromBaseId && 
    asset.status === 'available' &&
    asset.quantity > 0
  );

  const getStatusBadge = (status: Transfer['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'in-transit':
        return (
          <span className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            <Truck className="w-3 h-3 mr-1" />
            In Transit
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <FilterBar
        bases={mockBases}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Transfers</h2>
          <Button 
            onClick={toggleAddForm}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Transfer
          </Button>
        </div>
        
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Create New Transfer</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Base
                  </label>
                  <select
                    name="fromBaseId"
                    value={newTransfer.fromBaseId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Source Base</option>
                    {mockBases.map(base => (
                      <option key={base.id} value={base.id}>
                        {base.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Base
                  </label>
                  <select
                    name="toBaseId"
                    value={newTransfer.toBaseId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    disabled={!newTransfer.fromBaseId}
                  >
                    <option value="">Select Destination Base</option>
                    {mockBases
                      .filter(base => base.id !== newTransfer.fromBaseId)
                      .map(base => (
                        <option key={base.id} value={base.id}>
                          {base.name}
                        </option>
                      ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asset
                  </label>
                  <select
                    name="assetId"
                    value={newTransfer.assetId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    disabled={!newTransfer.fromBaseId}
                  >
                    <option value="">Select Asset</option>
                    {availableAssets.map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.name} ({asset.type}) - {asset.quantity} available
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
                    max={assets.find(a => a.id === newTransfer.assetId)?.quantity || 1}
                    value={newTransfer.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    disabled={!newTransfer.assetId}
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
                <Button 
                  type="submit"
                  disabled={
                    !newTransfer.assetId || 
                    !newTransfer.fromBaseId || 
                    !newTransfer.toBaseId || 
                    newTransfer.fromBaseId === newTransfer.toBaseId
                  }
                >
                  Create Transfer
                </Button>
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
              header: 'From', 
              accessor: item => {
                const base = mockBases.find(b => b.id === item.fromBaseId);
                return base ? base.name : 'Unknown Base';
              }
            },
            { 
              header: 'To', 
              accessor: item => {
                const base = mockBases.find(b => b.id === item.toBaseId);
                return base ? base.name : 'Unknown Base';
              }
            },
            { header: 'Quantity', accessor: 'quantity' },
            { header: 'Status', accessor: item => getStatusBadge(item.status) },
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
          data={transfers}
          keyExtractor={(item) => item.id}
          emptyMessage="No transfer records found"
        />
      </Card>
    </div>
  );
};

export default TransfersPage;