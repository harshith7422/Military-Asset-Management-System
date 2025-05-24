import React from 'react';
import { FilterX } from 'lucide-react';
import DateRangePicker from '../UI/DateRangePicker';
import { Base, AssetType, FilterOptions } from '../../types';
import Button from '../UI/Button';

interface FilterBarProps {
  bases: Base[];
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  bases,
  filterOptions,
  setFilterOptions,
}) => {
  const assetTypes: AssetType[] = ['weapon', 'vehicle', 'ammunition', 'equipment'];
  
  const handleDateRangeChange = (dateRange: { start: string; end: string }) => {
    setFilterOptions({ ...filterOptions, dateRange });
  };
  
  const handleBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const baseId = e.target.value;
    setFilterOptions({ ...filterOptions, baseId: baseId || undefined });
  };
  
  const handleAssetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const assetType = e.target.value as AssetType;
    setFilterOptions({ ...filterOptions, assetType: assetType || undefined });
  };
  
  const clearFilters = () => {
    setFilterOptions({});
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Base</label>
            <select
              value={filterOptions.baseId || ''}
              onChange={handleBaseChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
            >
              <option value="">All Bases</option>
              {bases.map((base) => (
                <option key={base.id} value={base.id}>
                  {base.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Asset Type</label>
            <select
              value={filterOptions.assetType || ''}
              onChange={handleAssetTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2463] focus:border-transparent"
            >
              <option value="">All Types</option>
              {assetTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
            <DateRangePicker onChange={handleDateRangeChange} />
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="flex items-center"
        >
          <FilterX className="w-4 h-4 mr-1" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;