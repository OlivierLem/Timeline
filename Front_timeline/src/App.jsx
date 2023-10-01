
import { Suspense, useRef, useState } from 'react';
import './App.scss'
import { Outlet } from 'react-router-dom';
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
        <Suspense>
          <Outlet />
        </Suspense>     
      </PeriodProvider> 
    </AuthProvider>
    </div>
  );
}

export default App;
