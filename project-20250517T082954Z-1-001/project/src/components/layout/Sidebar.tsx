import { Link, useLocation } from 'react-router-dom';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  // Only show filters on the audit metrics page
  const showFilters = location.pathname === '/audit-metrics';
  
  const filterGroups = [
    {
      title: 'Release',
      options: ['All Releases'],
    },
    {
      title: 'Milestone',
      options: ['All Milestones'],
    },
    {
      title: 'Process Area',
      options: ['All Process Areas'],
    },
    {
      title: 'Object',
      options: ['All Objects'],
    },
    {
      title: 'Table',
      options: ['All Tables'],
    },
    {
      title: 'Column',
      options: ['All Columns'],
    },
    {
      title: 'Target Design',
      options: ['All Target Designs'],
    },
    {
      title: 'Field Mapping',
      options: ['All Field Mappings'],
    },
  ];

  if (!showFilters) {
    return null;
  }

  return (
    <aside className={clsx(
      "w-64 bg-navy-900 border-r border-gray-800 transition-all duration-300 fixed h-[calc(100vh-64px)] z-40 md:relative overflow-y-auto",
      isOpen ? "left-0" : "-left-64 md:left-0"
    )}>
      <div className="px-6 py-4 border-b border-gray-800 sticky top-0 bg-navy-900 z-10">
        <div className="flex items-center">
          <Filter size={20} className="text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold text-white">Filters</h2>
        </div>
      </div>
      
      <div className="px-3 py-4">
        {filterGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="text-sm font-medium text-primary-400 mb-2">{group.title}</h3>
            {group.options.map((option, i) => (
              <div key={i} className="mb-1">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-navy-800 rounded-md">
                  {option}
                  <span className="ml-auto text-xs">▼</span>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;