import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyAccount from './MyAccount/MyAccount';
import StartPage from './StartPage/StartPage';
import MyStats from './MyStats/MyStats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<StartPage/>}/>
        <Route path='profile' element={<MyAccount/>}/>
        <Route path='stats' element={<MyStats/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
