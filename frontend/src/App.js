import logo from './logo.svg';
import ColorBlock from './ColorBlock.tsx';
import './App.css';
import React, { useState } from 'react';
import DashBoard from './DashBoard.tsx';
import Navbar from './Navbar.tsx';
import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route index element={ <DashBoard/> }/>
        <Route path='/top-colors/:numBlocks' element={ <DashBoard randomOrFirst='top-colors'/> }/>
        <Route path='/top-colors' element={ <DashBoard randomOrFirst='top-colors' numBlocks='all'/> }/>
        <Route path='/random/:numBlocks' element={ <DashBoard/> }/>
        <Route path='/random' element={ <DashBoard/> }/>
        <Route path='/first/:numBlocks' element={ <DashBoard randomOrFirst={'first'}/> }/>
        <Route path='/first' element={ <DashBoard randomOrFirst={'first'}/> }/>
        <Route path='/bottom-colors/:numBlocks' element={ <DashBoard randomOrFirst='bottom-colors'/> }/>
        <Route path='/bottom-colors' element={ <DashBoard randomOrFirst='bottom-colors' numBlocks='all'/> }/>
      </Routes>
      <Navigate to="/" />
    </BrowserRouter>
  );
}

export default App;
