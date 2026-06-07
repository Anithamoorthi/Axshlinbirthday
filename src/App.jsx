import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './components/MusicPlayer';

import LockScreen from './pages/LockScreen';
import PhotoPage from './pages/PhotoPage';
import LetterPage from './pages/LetterPage';
import VideoPage from './pages/VideoPage';
import FinalPage from './pages/FinalPage';

import './App.css';

export default function App() {
  return (
    <MusicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LockScreen />} />
          <Route path="/photo" element={<PhotoPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/final" element={<FinalPage />} />
        </Routes>
      </Router>
    </MusicProvider>
  );
}
