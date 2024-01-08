import logo from './logo.svg';
import ColorBlock from './ColorBlock.tsx';
import './App.css';
import React, { useState } from 'react';
import DashBoard from './DashBoard.tsx';
import Navbar from './Navbar.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route index element={ <DashBoard/> }/>
        <Route path='/random/:numBlocks' element={ <DashBoard /> }/>
        <Route path='/random' element={ <DashBoard /> }/>
        <Route path='/ordered/:numBlocks' element={ <DashBoard randomized={'first'}/> }/>
        <Route path='/ordered' element={ <DashBoard randomized={'first'}/> }/>
        <Route path='' />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
