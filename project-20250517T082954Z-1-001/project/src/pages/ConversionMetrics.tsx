import { useState } from 'react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import QualityTable from '../components/quality/QualityTable';

const ConversionMetrics = () => {
  const [selectedRelease, setSelectedRelease] = useState('Release 2024 Q3');
  const [selectedProcessArea, setSelectedProcessArea] = useState('Procurement');
  const [selectedObject, setSelectedObject] = useState('Vendor Master');

  // Mock data for the charts
  const pieChartData = [
    { name: 'Valid', value: 91, color: '#8b5cf6' },
    { name: 'Invalid', value: 9, color: '#0ea5e9' },
  ];

  const barChartData = [
    { name: 'Valid', value: 1400, color: '#0ea5e9' },
    { name: 'Invalid', value: 220, color: '#8b5cf6' },
    { name: 'Extra', value: 180, color: '#0ea5e9' },
  ];

  // Mock data for the quality table
  const qualityData = [
    { id: '1', objectName: 'Vendor Master', extractCount: 200, validCount: 180, invalidCount: 20, percentValid: 90, lastRefreshed: '2024-10-20 11:23' },
    { id: '2', objectName: 'Customer Data', extractCount: 320, validCount: 290, invalidCount: 30, percentValid: 90.6, lastRefreshed: '2024-10-20 10:45' },
    { id: '3', objectName: 'Product Catalog', extractCount: 150, validCount: 140, invalidCount: 10, percentValid: 93.3, lastRefreshed: '2024-10-20 09:30' },
    { id: '4', objectName: 'Sales Transactions', extractCount: 500, validCount: 450, invalidCount: 50, percentValid: 90, lastRefreshed: '2024-10-19 17:20' },
    { id: '5', objectName: 'Inventory Status', extractCount: 275, validCount: 260, invalidCount: 15, percentValid: 94.5, lastRefreshed: '2024-10-19 16:15' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">CONVERSION METRICS</h1>
          <p className="text-gray-400">Data Quality Dashboard</p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <div className="flex items-center mr-4">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-300">Data live</span>
          </div>
          <div className="text-sm text-gray-300">
            Last updated: {new Date().toLocaleDateString()}, {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Release
            </label>
            <select 
              className="bg-navy-700 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedRelease}
              onChange={(e) => setSelectedRelease(e.target.value)}
            >
              <option value="Release 2024 Q3">Release 2024 Q3</option>
              <option value="Release 2024 Q2">Release 2024 Q2</option>
              <option value="Release 2024 Q1">Release 2024 Q1</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Process Area
            </label>
            <select 
              className="bg-navy-700 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedProcessArea}
              onChange={(e) => setSelectedProcessArea(e.target.value)}
            >
              <option value="Procurement">Procurement</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Supply Chain">Supply Chain</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Object Name
            </label>
            <select 
              className="bg-navy-700 border border-gray-700 rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedObject}
              onChange={(e) => setSelectedObject(e.target.value)}
            >
              <option value="Vendor Master">Vendor Master</option>
              <option value="Purchase Orders">Purchase Orders</option>
              <option value="Contracts">Contracts</option>
              <option value="Payment Terms">Payment Terms</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChart 
          data={pieChartData} 
          title="Overall Data Accuracy" 
          subtitle="Percentage of valid vs. invalid data points" 
        />
        
        <BarChart 
          data={barChartData} 
          title="Data Quality Metrics" 
          subtitle="Distribution of valid, invalid, and extra data points" 
        />
      </div>
      
      <QualityTable data={qualityData} />
      
      <footer className="text-center text-gray-400 text-sm py-4">
        Conversion Metrics Dashboard • 2025
      </footer>
    </div>
  );
};

export default ConversionMetrics;