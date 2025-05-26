import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import ExecutiveSummary from './pages/ExecutiveSummary';
import AuditMetrics from './pages/AuditMetrics';
import ConversionMetrics from './pages/ConversionMetrics';
import DatabaseConfig from './pages/DatabaseConfig';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ExecutiveSummary />} />
        <Route path="audit-metrics" element={<AuditMetrics />} />
        <Route path="conversion-metrics" element={<ConversionMetrics />} />
        <Route path="database-config" element={<DatabaseConfig />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;