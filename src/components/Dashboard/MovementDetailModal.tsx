import React from 'react';
import { ShoppingCart, ArrowDownLeft, ArrowUpRight, X } from 'lucide-react';
import Button from '../UI/Button';

interface MovementDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: number;
  transferIn: number;
  transferOut: number;
}

const MovementDetailModal: React.FC<MovementDetailModalProps> = ({
  isOpen,
  onClose,
  purchases,
  transferIn,
  transferOut,
}) => {
  if (!isOpen) return null;

  const netMovement = purchases + transferIn - transferOut;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Net Movement Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium">Purchases</span>
              </div>
              <span className="text-lg font-bold">{purchases}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <ArrowDownLeft className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium">Transfer In</span>
              </div>
              <span className="text-lg font-bold">{transferIn}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-full mr-3">
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-medium">Transfer Out</span>
              </div>
              <span className="text-lg font-bold">{transferOut}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">Net Movement</span>
                <span className="text-xl font-bold">{netMovement}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default MovementDetailModal;