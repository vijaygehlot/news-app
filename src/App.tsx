// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary'; // Import your ErrorBoundary component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ErrorBoundary><Home /></ErrorBoundary>} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
