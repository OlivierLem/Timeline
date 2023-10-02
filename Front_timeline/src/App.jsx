
import { Suspense, useRef, useState } from 'react';
import './App.scss'
import { NavLink, Outlet } from 'react-router-dom';
import PeriodProvider from './component/PeriodProvider.jsx';
import AudioPlayer from './component/AudioPlayer.jsx';
import {Header} from './component/Header';
import AuthProvider from './component/AuthProvider';


function App() {

  return (
    <div className="app">   
    <AuthProvider>
      <PeriodProvider>
        <Header/>
        <main>
          <Suspense>
            <Outlet />
          </Suspense>     
        </main>
        <footer className='linkMentions'>
          <p>© copyright. <NavLink to='/mentions_legales'>Mentions légales & CGU</NavLink></p>

        </footer>
      </PeriodProvider> 
    </AuthProvider>
    </div>
  );
}

export default App;
