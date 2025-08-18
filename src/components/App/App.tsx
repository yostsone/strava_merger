import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../Home/Home';
import MyStats from '../MyStats/MyStats';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import { setInitialUser } from '../../utils/User';

function App() {
  setInitialUser();

  return (
    <BrowserRouter>
      <Header />
      <div className="grow md:w-2/3 lg:w-1/2 mx-auto border-none md:border-x-8 lg:border-dashed lg:border-lime-900 ">
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
