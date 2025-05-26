import { useState } from 'react';
import { Filter, Download, Search, Plus, Edit, Trash, X, Save, RefreshCw } from 'lucide-react';

interface AuditRecord {
  id: number;
  release: string;
  milestone: string;
  processArea: string;
  object: string;
  table: string;
  column: string;
  targetDesign: string;
  fieldMapping: string;
}

const AuditMetrics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AuditRecord | null>(null);
  
  const rows = [
    { id: 1, release: 'Version 1.0', milestone: 'Milestone 1', processArea: 'Finance', object: 'Customer', table: 'Table-1', column: 'Column-1', targetDesign: 'Design-1', fieldMapping: 'Mapping-1' },
    { id: 2, release: 'Version 1.0', milestone: 'Milestone 2', processArea: 'Human Resources', object: 'Product', table: 'Orders', column: 'ID', targetDesign: 'Design-2', fieldMapping: 'Mapping-2' },
    { id: 3, release: 'Version 1.0', milestone: 'Milestone 3', processArea: 'Sales', object: 'Order', table: 'Products', column: 'Name', targetDesign: 'Design-3', fieldMapping: 'Mapping-3' },
    { id: 4, release: 'Version 1.0', milestone: 'Milestone 1', processArea: 'Marketing', object: 'Invoice', table: 'Customers', column: 'Date', targetDesign: 'Design-4', fieldMapping: 'Mapping-4' },
    { id: 5, release: 'Version 1.0', milestone: 'Milestone 2', processArea: 'Finance', object: 'Customer', table: 'Table-5', column: 'Column-5', targetDesign: 'Design-5', fieldMapping: 'Mapping-5' },
    { id: 6, release: 'Version 2.0', milestone: 'Milestone 3', processArea: 'Human Resources', object: 'Product', table: 'Orders', column: 'ID', targetDesign: 'Design-1', fieldMapping: 'Mapping-6' },
    { id: 7, release: 'Version 2.0', milestone: 'Milestone 1', processArea: 'Sales', object: 'Order', table: 'Products', column: 'Name', targetDesign: 'Design-2', fieldMapping: 'Mapping-7' },
    { id: 8, release: 'Version 2.0', milestone: 'Milestone 2', processArea: 'Marketing', object: 'Invoice', table: 'Customers', column: 'Date', targetDesign: 'Design-3', fieldMapping: 'Mapping-8' },
  ];
  
  const filteredRows = rows.filter(row => 
    Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleRowSelect = (id: number) => {
    setSelectedRow(selectedRow === id ? null : id);
  };

  const handleAddNew = () => {
    setEditingRecord({
      id: Math.max(...rows.map(r => r.id)) + 1,
      release: '',
      milestone: '',
      processArea: '',
      object: '',
      table: '',
      column: '',
      targetDesign: '',
      fieldMapping: '',
    });
    setShowEditForm(true);
  };

  const handleEdit = () => {
    if (selectedRow) {
      const record = rows.find(r => r.id === selectedRow);
      if (record) {
        setEditingRecord(record);
        setShowEditForm(true);
      }
    }
  };

  const handleDelete = () => {
    if (selectedRow) {
      // Here you would make an API call to delete the record
      console.log('Deleting record:', selectedRow);
      setSelectedRow(null);
    }
  };

  const handleSave = () => {
    if (editingRecord) {
      // Here you would make an API call to save the record
      console.log('Saving record:', editingRecord);
      setShowEditForm(false);
      setEditingRecord(null);
    }
  };

  const handleRefresh = () => {
    // Here you would make an API call to refresh the data
    console.log('Refreshing data');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">DM Audit Metrics</h1>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search table..."
              className="w-full md:w-64 bg-navy-800 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <button 
            onClick={handleAddNew}
            className="btn btn-primary flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add New
          </button>
          
          <button 
            onClick={handleEdit}
            className={`btn btn-outline flex items-center ${!selectedRow ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedRow}
          >
            <Edit size={18} className="mr-2" />
            Edit
          </button>
          
          <button 
            onClick={handleDelete}
            className={`btn btn-outline flex items-center text-red-500 hover:bg-red-900/20 ${!selectedRow ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedRow}
          >
            <Trash size={18} className="mr-2" />
            Delete
          </button>

          <button 
            onClick={handleRefresh}
            className="btn btn-outline flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>
      
      {showEditForm && editingRecord && (
        <div className="card p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">
              {editingRecord.id ? 'Edit Record' : 'Add New Record'}
            </h2>
            <button 
              onClick={() => setShowEditForm(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Release
              </label>
              <input
                type="text"
                className="input"
                value={editingRecord.release}
                onChange={(e) => setEditingRecord({...editingRecord, release: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Milestone
              </label>
              <input
                type="text"
                className="input"
                value={editingRecord.milestone}
                onChange={(e) => setEditingRecord({...editingRecord, milestone: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Process Area
              </label>
              <input
                type="text"
                className="input"
                value={editingRecord.processArea}
                onChange={(e) => setEditingRecord({...editingRecord, processArea: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Object
              </label>
              <input
                type="text"
                className="input"
                value={editingRecord.object}
                onChange={(e) => setEditingRecord({...editingRecord, object: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Table
              </label>
              <input
                type="text"
                className="input"
                value={editingRecord.table}
                onChange={(e) => setEditingRecord({...editingRecord, table: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Column
              </label>
              <input
                type="text"
                className="input"
                value={editingRecord.column}
                onChange={(e) => setEditingRecord({...editingRecord, column: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Design
              </label>
              <input
                type="text"
                className="input"
                value={editingRecord.targetDesign}
                onChange={(e) => setEditingRecord({...editingRecord, targetDesign: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Field Mapping
              </label>
              <input
                type="text"
                className="input"
                value={editingRecord.fieldMapping}
                onChange={(e) => setEditingRecord({...editingRecord, fieldMapping: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowEditForm(false)}
              className="btn btn-outline mr-3"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      )}
      
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-navy-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">
                  RELEASE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">
                  MILESTONE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">
                  PROCESS AREA
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">
                  OBJECT
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">
                  TABLE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">
                  COLUMN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">
                  TARGET DESIGN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider">
                  FIELD MAPPING
                </th>
              </tr>
            </thead>
            <tbody className="bg-navy-800 divide-y divide-gray-800">
              {filteredRows.map((row) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-navy-700 cursor-pointer ${selectedRow === row.id ? 'bg-navy-700' : ''}`}
                  onClick={() => handleRowSelect(row.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {row.release}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {row.milestone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {row.processArea}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {row.object}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {row.table}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {row.column}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {row.targetDesign}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {row.fieldMapping}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditMetrics;