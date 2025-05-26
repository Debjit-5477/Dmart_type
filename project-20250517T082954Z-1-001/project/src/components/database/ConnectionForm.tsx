import { useState } from 'react';
import { Database, Save, Eye, EyeOff } from 'lucide-react';

interface ConnectionFormProps {
  databaseType: 'sap-hana' | 'mysql';
  onSave: (connectionDetails: any) => void;
  onCancel: () => void;
}

const ConnectionForm = ({ databaseType, onSave, onCancel }: ConnectionFormProps) => {
  const [formData, setFormData] = useState({
    host: '',
    port: databaseType === 'mysql' ? '3306' : '30015',
    database: '',
    username: '',
    password: '',
    ssl: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="card p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-primary-900 bg-opacity-30 mr-3">
          <Database size={20} className="text-primary-500" />
        </div>
        <h2 className="text-xl font-semibold text-white">
          {databaseType === 'sap-hana' ? 'SAP HANA' : 'MySQL'} Connection Details
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="host" className="block text-sm font-medium text-gray-300 mb-1">
              Host / Server
            </label>
            <input
              type="text"
              id="host"
              name="host"
              value={formData.host}
              onChange={handleChange}
              className="input"
              placeholder={databaseType === 'sap-hana' ? 'hanadb.example.com' : 'mysql.example.com'}
              required
            />
          </div>
          
          <div>
            <label htmlFor="port" className="block text-sm font-medium text-gray-300 mb-1">
              Port
            </label>
            <input
              type="text"
              id="port"
              name="port"
              value={formData.port}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="database" className="block text-sm font-medium text-gray-300 mb-1">
            Database Name
          </label>
          <input
            type="text"
            id="database"
            name="database"
            value={formData.database}
            onChange={handleChange}
            className="input"
            placeholder="Enter database name"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ssl"
              name="ssl"
              checked={formData.ssl}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-700 rounded"
            />
            <label htmlFor="ssl" className="ml-2 block text-sm text-gray-300">
              Use SSL/TLS for connection
            </label>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
          >
            <Save size={18} className="mr-2" />
            Save Connection
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConnectionForm;