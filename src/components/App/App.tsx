import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../Home/Home';
import MyStats from '../MyStats/MyStats';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import Merger from '../Merger/Merger';
import { GH_SUB_LINK } from '../../constants';
import { setInitialUser } from '../../utils/User';

function App() {
  setInitialUser();
  const basename = `/${GH_SUB_LINK}`;
  return (
    <BrowserRouter basename={basename}>
      <Header />
      <div className="grow w-full lg:w-2/3 2xl:w-1/2 mx-auto border-none md:border-x-8 lg:border-dashed lg:border-lime-900 ">
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='stats' element={<MyStats/>}/>
          <Route path='merge' element={<Merger/>}/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
