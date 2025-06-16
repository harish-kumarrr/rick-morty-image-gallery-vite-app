
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RickAndMortyApp from './components/RickAndMortyApp';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RickAndMortyApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
