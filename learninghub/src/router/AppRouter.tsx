import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Users from '../pages/Users/Users';
import Management from '../pages/Management/Management';
import ProgressTrack from '../pages/ProgressTrack/ProgressTrack';
import About from '../pages/About/About';

const AppRouter: React.FC = () => {
  return (
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<Users />} />
        <Route path="/management" element={<Management />} />
        <Route path="/progress-track" element={<ProgressTrack />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
  );
};

export default AppRouter;