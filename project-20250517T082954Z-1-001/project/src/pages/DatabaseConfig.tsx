import { useState } from 'react';
import DatabaseSelector from '../components/database/DatabaseSelector';
import ConnectionForm from '../components/database/ConnectionForm';
import { CheckCircle } from 'lucide-react';

type DatabaseType = 'sap-hana' | 'mysql';

const DatabaseConfig = () => {
  const [selectedDatabase, setSelectedDatabase] = useState<DatabaseType | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState<any>(null);

  const handleDatabaseSelect = (type: DatabaseType) => {
    setSelectedDatabase(type);
    setIsConfigured(false);
  };

  const handleSaveConnection = (details: any) => {
    setConnectionDetails(details);
    setIsConfigured(true);
  };

  const handleReset = () => {
    setSelectedDatabase(null);
    setIsConfigured(false);
    setConnectionDetails(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Database Configuration</h1>
        <p className="text-gray-400">Connect to your preferred database for data management</p>
      </div>
      
      {!selectedDatabase && (
        <DatabaseSelector onSelect={handleDatabaseSelect} />
      )}
      
      {selectedDatabase && !isConfigured && (
        <ConnectionForm 
          databaseType={selectedDatabase} 
          onSave={handleSaveConnection}
          onCancel={handleReset}
        />
      )}
      
      {isConfigured && connectionDetails && (
        <div className="card p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-green-900 bg-opacity-30 mr-3">
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Connection Established
            </h2>
          </div>
          
          <div className="bg-navy-700 rounded-md p-4 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Connection Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Database Type</p>
                <p className="text-white">{selectedDatabase === 'sap-hana' ? 'SAP HANA' : 'MySQL'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Host</p>
                <p className="text-white">{connectionDetails.host}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Port</p>
                <p className="text-white">{connectionDetails.port}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Database</p>
                <p className="text-white">{connectionDetails.database}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Username</p>
                <p className="text-white">{connectionDetails.username}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">SSL Enabled</p>
                <p className="text-white">{connectionDetails.ssl ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-900 bg-opacity-10 border border-green-800 rounded-md p-4 mb-6">
            <p className="text-green-400">
              Database connection has been successfully established. You can now manage data through the dashboard.
            </p>
          </div>
          
          <div className="flex items-center justify-end space-x-4">
            <button
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700"
              onClick={handleReset}
            >
              Change Connection
            </button>
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Test Connection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseConfig;