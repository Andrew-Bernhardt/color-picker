import logo from './logo.svg';
import ColorBlock from './ColorBlock.tsx';
import './App.css';
import React, { useState } from 'react';
import DashBoard from './DashBoard.tsx';

function App() {
  return (
    <DashBoard numBlocks={100}/>
  );
}

export default App;
