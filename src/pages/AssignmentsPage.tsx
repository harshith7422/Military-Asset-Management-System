import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Table from '../components/UI/Table';
import FilterBar from '../components/Dashboard/FilterBar';
import { useAssets } from '../context/AssetContext';
import { mockBases } from '../utils/mockData';
import { Plus, FileText, UserCheck, AlertTriangle } from 'lucide-react';

const AssignmentsPage: React.FC = () => {
  const { 
    assignments,
    expenditures,
    assets,
    addAssignment,
    addExpenditure,
    filterOptions,
    setFilterOptions
  } = useAssets();
  
  const [activeTab, setActiveTab] = useState<'assignments' | 'expenditures'>('assignments');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    assetId: '',
    baseId: '',
    quantity: 1,
    personnelId: '',
    personnelName: '',
    reason: ''
  });
  
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewItem({
      assetId: '',
      baseId: '',
      quantity: 1,
      personnelId: '',
      personnelName: '',
      reason: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.assetId || !newItem.baseId || newItem.quantity <= 0) {
      return;
    }
    
    const selectedAsset = assets.find(a => 
      a.id === newItem.assetId && 
      a.baseId === newItem.baseId
    );
    
    if (selectedAsset) {
      if (activeTab === 'assignments') {
        if (!newItem.personnelId || !newItem.personnelName) {
          return;
        }
        
        addAssignment({
          assetId: selectedAsset.id,
          assetName: selectedAsset.name,
          assetType: selectedAsset.type,
          baseId: newItem.baseId,
          quantity: newItem.quantity,
          personnelId: newItem.personnelId,
          personnelName: newItem.personnelName
        });
      } else {
        if (!newItem.reason) {
          return;
        }
        
        addExpenditure({
          assetId: selectedAsset.id,
          assetName: selectedAsset.name,
          assetType: selectedAsset.type,
          baseId: newItem.baseId,
          quantity: newItem.quantity,
          reason: newItem.reason
        });
      }
      
      toggleAddForm();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === 'quantity' ? Number(value) : value
    });
  };
  
  // Filter assets by selected base
  const availableAssets = assets.filter(asset => 
    asset.baseId === newItem.baseId && 
    asset.status === 'available' &&
    asset.quantity > 0
  );
  
  return (
    <div>
      <FilterBar
        bases={mockBases}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'assignments'
                ? 'border-b-2 border-[#0A2463] text-[#0A2463]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('assignments')}
          >
            <UserCheck className="w-4 h-4 inline mr-1" />
            Assignments
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'expenditures'
                ? 'border-b-2 border-[#0A2463] text-[#0A2463]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('expenditures')}
          >
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            Expenditures
          </button>
        </div>
      </div>
      
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {activeTab === 'assignments' ? 'Asset Assignments' : 'Asset Expenditures'}
          </h2>
          <Button 
            onClick={toggleAddForm}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'assignments' ? 'Assign Asset' : 'Record Expenditure'}
          </Button>
        </div>
        
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {activeTab === 'assignments' ? 'Assign Asset to Personnel' : 'Record Asset Expenditure'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base
                  </label>
                  <select
                    name="baseId"
                    value={newItem.baseId}
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
                    Asset
                  </label>
                  <select
                    name="assetId"
                    value={newItem.assetId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    disabled={!newItem.baseId}
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
                    max={assets.find(a => a.id === newItem.assetId)?.quantity || 1}
                    value={newItem.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    disabled={!newItem.assetId}
                  />
                </div>
                
                {activeTab === 'assignments' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Personnel ID
                      </label>
                      <input
                        type="text"
                        name="personnelId"
                        value={newItem.personnelId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Personnel Name
                      </label>
                      <input
                        type="text"
                        name="personnelName"
                        value={newItem.personnelName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Expenditure
                    </label>
                    <textarea
                      name="reason"
                      value={newItem.reason}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={toggleAddForm}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {activeTab === 'assignments' ? 'Assign Asset' : 'Record Expenditure'}
                </Button>
              </div>
            </form>
          </div>
        )}
        
        {activeTab === 'assignments' ? (
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
                header: 'Assigned To', 
                accessor: item => (
                  <div>
                    <p className="font-medium">{item.personnelName}</p>
                    <p className="text-xs text-gray-500">ID: {item.personnelId}</p>
                  </div>
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
            data={assignments}
            keyExtractor={(item) => item.id}
            emptyMessage="No assignment records found"
          />
        ) : (
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
              { header: 'Reason', accessor: 'reason' },
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
            data={expenditures}
            keyExtractor={(item) => item.id}
            emptyMessage="No expenditure records found"
          />
        )}
      </Card>
    </div>
  );
};

export default AssignmentsPage;