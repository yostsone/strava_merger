import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyAccount from '../MyAccount/MyAccount';
import Home from '../Home/Home';
import MyStats from '../MyStats/MyStats';
import Header from "../HeaderFooter/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='profile' element={<MyAccount/>}/>
        <Route path='stats' element={<MyStats/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
