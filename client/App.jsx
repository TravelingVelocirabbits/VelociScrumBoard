import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Board from './components/Board';
import { gapi } from 'gapi-script';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/board' element={<Board />} />
    </Routes>
  );
};

export default App;