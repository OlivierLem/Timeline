
import { Suspense, useRef, useState } from 'react';
import './App.scss'
import { NavLink, Outlet } from 'react-router-dom';
import PeriodProvider from './component/PeriodProvider.jsx';
import AudioPlayer from './component/AudioPlayer.jsx';

// https://codepen.io/microfront/pen/veagoK
// https://www.alloprof.qc.ca/fr/eleves/bv/histoire/epoques-historiques-h1001

function App() {

  return (
    <div className="app">   
        <header>
            <nav>
              <NavLink to='/' className='link'>Timeline</NavLink>
              <NavLink to='/admin/periodes' className='link'>Admin</NavLink>
            </nav>
        </header>
      
          <Suspense>
            <Outlet />
          </Suspense>      
        <AudioPlayer />
    </div>
  );
}

export default App;
