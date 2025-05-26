import { Download } from 'lucide-react';
import SummaryCard from '../components/dashboard/SummaryCard';
import ProgressCircle from '../components/dashboard/ProgressCircle';
import DataTable from '../components/dashboard/DataTable';

const ExecutiveSummary = () => {
  // Mock data
  const tableData = [
    {
      id: '1',
      progress: 'Current',
      release: 'Release 0 - NA',
      milestone: 'Data Load 0',
      milestoneDate: '2/11/2024',
      design: 87.93,
      mapping: 89.65,
      build: 85.34,
      target: 90,
      status: 'warning' as const,
    },
    {
      id: '2',
      progress: 'Future',
      release: 'Release 1 - LATAM',
      milestone: 'Data Load 1',
      milestoneDate: '4/12/2024',
      design: 97.64,
      mapping: 89.65,
      build: 85.34,
      target: 95,
      status: 'success' as const,
    },
    {
      id: '3',
      progress: 'Future',
      release: 'Release 2 - EMEA',
      milestone: 'Data Load 2',
      milestoneDate: '6/13/2024',
      design: 77.64,
      mapping: 89.65,
      build: 85.34,
      target: 100,
      status: 'danger' as const,
    },
    {
      id: '4',
      progress: 'Future',
      release: 'Release 3 - APAC',
      milestone: 'Data Load 3',
      milestoneDate: '4/14/2024',
      design: 57.64,
      mapping: 89.65,
      build: 85.34,
      target: 100,
      status: 'danger' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Executive Summary</h1>
          <p className="text-gray-400">Real-time data management metrics and insights</p>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-3">
          <button className="btn btn-outline flex items-center">
            <Download size={18} className="mr-2" />
            Export CSV
          </button>
          <button className="btn btn-outline flex items-center">
            <Download size={18} className="mr-2" />
            Export Excel
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Number of Fields" value={100} icon="fields" />
        <SummaryCard title="Number of Tables" value={8} icon="tables" />
        <SummaryCard title="Number of Objects" value={2} icon="objects" />
      </div>
      
      <h2 className="text-xl font-bold text-white mt-8 mb-4">Progress Visuals</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressCircle title="Design % Complete" percentage={96.2} />
        <ProgressCircle title="Mapping % Complete" percentage={93.6} />
        <ProgressCircle title="Build % Complete" percentage={91.6} />
      </div>
      
      <h2 className="text-xl font-bold text-white mt-8 mb-4">Data Table</h2>
      
      <DataTable data={tableData} />
    </div>
  );
};

export default ExecutiveSummary;