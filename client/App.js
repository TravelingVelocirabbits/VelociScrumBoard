import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Board from './components/Board';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/board' element={<Board />} />
    </Routes>
  );
};

export default App;