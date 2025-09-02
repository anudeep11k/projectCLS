import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Dancehalls from './pages/Dancehalls.jsx';
import DancehallDetail from './pages/DancehallDetail.jsx';
import Parish from './pages/Parish.jsx';
import MapPage from './pages/Map.jsx';
import LetsDance from './pages/LetsDance.jsx';
import Film from './pages/Film.jsx';
import Links from './pages/Links.jsx';
import LookAndListen from './pages/LookAndListen.jsx';
import YourStory from './pages/YourStory.jsx';

export default function App(){
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/dancehalls" element={<Dancehalls/>}/>
        <Route path="/dancehalls/:slug" element={<DancehallDetail/>}/>
        <Route path="/parish/:parish" element={<Parish/>}/>
        <Route path="/map" element={<MapPage/>}/>
        <Route path="/lets-dance" element={<LetsDance/>}/>
        <Route path="/film" element={<Film/>}/>
        <Route path="/links" element={<Links/>}/>
        <Route path="/look-and-listen" element={<LookAndListen/>}/>
        <Route path="/your-story" element={<YourStory/>}/>
      </Routes>
      <Footer />
    </div>
  );
}
