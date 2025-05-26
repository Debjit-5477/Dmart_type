import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface QualityData {
  id: string;
  objectName: string;
  extractCount: number;
  validCount: number;
  invalidCount: number;
  percentValid: number;
  lastRefreshed: string;
}

interface QualityTableProps {
  data: QualityData[];
}

const QualityTable = ({ data }: QualityTableProps) => {
  const [sortField, setSortField] = useState<keyof QualityData>('objectName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof QualityData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else {
      const numA = Number(aValue);
      const numB = Number(bValue);
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    }
  });

  return (
    <div className="card">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Quality Metrics</h2>
        <button className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center">
          Export
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-navy-700">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-navy-600"
                onClick={() => handleSort('objectName')}
              >
                <div className="flex items-center">
                  Object Name
                  {sortField === 'objectName' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-navy-600"
                onClick={() => handleSort('extractCount')}
              >
                <div className="flex items-center">
                  Extract Count
                  {sortField === 'extractCount' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-navy-600"
                onClick={() => handleSort('validCount')}
              >
                <div className="flex items-center">
                  Valid Count
                  {sortField === 'validCount' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-navy-600"
                onClick={() => handleSort('invalidCount')}
              >
                <div className="flex items-center">
                  Invalid Count
                  {sortField === 'invalidCount' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-navy-600"
                onClick={() => handleSort('percentValid')}
              >
                <div className="flex items-center">
                  % Valid
                  {sortField === 'percentValid' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-navy-600"
                onClick={() => handleSort('lastRefreshed')}
              >
                <div className="flex items-center">
                  Last Refreshed
                  {sortField === 'lastRefreshed' && (
                    sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedData.map((row) => (
              <tr key={row.id} className="hover:bg-navy-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {row.objectName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {row.extractCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium">
                  {row.validCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                  {row.invalidCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    row.percentValid >= 90 ? 'text-green-500' : 
                    row.percentValid >= 75 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {row.percentValid}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {row.lastRefreshed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QualityTable;