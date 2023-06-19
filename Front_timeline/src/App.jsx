
import { Suspense, useRef, useState } from 'react';
import './App.scss'
import { NavLink, Outlet } from 'react-router-dom';
import PeriodProvider from './component/PeriodProvider.jsx';

// https://codepen.io/microfront/pen/veagoK
// https://www.alloprof.qc.ca/fr/eleves/bv/histoire/epoques-historiques-h1001

function App() {
  // etat qui vérifie si l'audio est muté ou non
  const [sound, setSound] = useState(false)
  const audioRef = useRef();

  let audio = new Audio('assets/audio/Relaxing_NordicViking_Music - Ótroðinn.mp3');

  function playMusic() {
    setTimeout(() => {
      audio.play();

    }, 1000)
    audio.loop = true;
  }
  function pauseMusic() {
    setTimeout(() => {
      audio.pause();
    }, 1000)
  }

  function handleClickAudio() {
    if (sound === false) {
      //console.log('play');
      //playMusic()      
      mutedMusic()
    } else {
      //console.log('pause');
      pauseMusic()
    }
    setSound(!sound)

  }
  return (
    <div className="app">
      <PeriodProvider>
        <header>
            <nav>
              <NavLink to='/' className='link'>Timeline</NavLink>
              <NavLink to='/admin/periodes' className='link'>Admin</NavLink>
            </nav>
        </header>
      
          <Suspense>
            <Outlet />
          </Suspense>      
        <button ref={audioRef} className={`sound ${sound !== true && 'slash-music'}`} onClick={handleClickAudio}>
          <i className="fa-solid fa-music"></i>
        </button>
      </PeriodProvider>
    </div>
  );
}

export default App;
