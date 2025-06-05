import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoutes from './pages/admin';
import { useTheme } from './ThemeContext';
import TranscriptPage from './pages/TranscriptPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TranscriptPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;