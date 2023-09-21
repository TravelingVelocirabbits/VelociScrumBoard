import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Board from './components/Board';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/board' element={<Board />} />
    </Routes>
  );
};

export default App;
