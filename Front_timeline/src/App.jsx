
import { Suspense, useRef, useState } from 'react';
import './App.scss'
import { Outlet } from 'react-router-dom';
import PeriodProvider from './component/PeriodProvider.jsx';
import AudioPlayer from './component/AudioPlayer.jsx';
import {Header} from './component/Header';

// https://codepen.io/microfront/pen/veagoK
// https://www.alloprof.qc.ca/fr/eleves/bv/histoire/epoques-historiques-h1001

function App() {

  return (
    <div className="app">   
        <Header/>
        <Suspense>
          <Outlet />
        </Suspense>      
        <AudioPlayer />
    </div>
  );
}

export default App;
