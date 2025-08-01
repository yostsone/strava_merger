import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../Home/Home';
import MyStats from '../MyStats/MyStats';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="h-screen md:w-2/3 lg:w-1/2 mx-auto md:border-x-4 md:border-dashed md:border-indigo-400 ">
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='stats' element={<MyStats/>}/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
