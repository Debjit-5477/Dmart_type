import { useState } from 'react';
import { Database, CheckCircle } from 'lucide-react';

interface DatabaseSelectorProps {
  onSelect: (type: 'sap-hana' | 'mysql') => void;
}

const DatabaseSelector = ({ onSelect }: DatabaseSelectorProps) => {
  const [selected, setSelected] = useState<'sap-hana' | 'mysql' | null>(null);

  const handleSelect = (type: 'sap-hana' | 'mysql') => {
    setSelected(type);
    onSelect(type);
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Select Database Type</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all ${
            selected === 'sap-hana' 
              ? 'border-primary-500 bg-navy-700' 
              : 'border-gray-700 hover:border-gray-500'
          }`}
          onClick={() => handleSelect('sap-hana')}
        >
          <div className="flex items-start">
            <div className="mr-4 p-3 rounded-full bg-blue-900 bg-opacity-30">
              <Database size={24} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">SAP HANA</h3>
                {selected === 'sap-hana' && (
                  <CheckCircle size={20} className="text-primary-500" />
                )}
              </div>
              <p className="text-gray-400 mt-2">Enterprise-grade in-memory database optimized for complex analytics and data processing.</p>
              
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <span className="mr-2 text-primary-500">✓</span>
                  High-performance in-memory computing
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="mr-2 text-primary-500">✓</span>
                  Advanced analytics capabilities
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="mr-2 text-primary-500">✓</span>
                  Integrated with SAP ecosystem
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all ${
            selected === 'mysql' 
              ? 'border-primary-500 bg-navy-700' 
              : 'border-gray-700 hover:border-gray-500'
          }`}
          onClick={() => handleSelect('mysql')}
        >
          <div className="flex items-start">
            <div className="mr-4 p-3 rounded-full bg-orange-900 bg-opacity-30">
              <Database size={24} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">MySQL</h3>
                {selected === 'mysql' && (
                  <CheckCircle size={20} className="text-primary-500" />
                )}
              </div>
              <p className="text-gray-400 mt-2">Open-source relational database management system with proven reliability.</p>
              
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-300">
                  <span className="mr-2 text-primary-500">✓</span>
                  Widely adopted and supported
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="mr-2 text-primary-500">✓</span>
                  ACID compliant transactions
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="mr-2 text-primary-500">✓</span>
                  Excellent performance for web applications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {selected && (
        <div className="mt-6">
          <button 
            className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
            onClick={() => onSelect(selected)}
          >
            Continue with {selected === 'sap-hana' ? 'SAP HANA' : 'MySQL'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DatabaseSelector;