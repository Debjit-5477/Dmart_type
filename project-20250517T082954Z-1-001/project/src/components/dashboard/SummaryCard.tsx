import { Database, LayoutGrid, FileText } from 'lucide-react';
import { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: 'fields' | 'tables' | 'objects';
}

const SummaryCard = ({ title, value, icon }: SummaryCardProps) => {
  let iconComponent: ReactNode;
  
  switch (icon) {
    case 'fields':
      iconComponent = <FileText size={24} className="text-primary-500" />;
      break;
    case 'tables':
      iconComponent = <LayoutGrid size={24} className="text-primary-500" />;
      break;
    case 'objects':
      iconComponent = <Database size={24} className="text-primary-500" />;
      break;
    default:
      iconComponent = <Database size={24} className="text-primary-500" />;
  }

  return (
    <div className="card p-6">
      <div className="flex items-start">
        <div className="mr-4 p-3 rounded-md bg-navy-700 bg-opacity-50">
          {iconComponent}
        </div>
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-4xl font-bold text-primary-500 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;