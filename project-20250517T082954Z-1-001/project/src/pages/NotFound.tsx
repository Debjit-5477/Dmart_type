import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-primary-500">404</h1>
      <h2 className="text-3xl font-semibold text-white mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 max-w-md">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      
      <Link 
        to="/" 
        className="mt-8 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;