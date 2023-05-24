
import { Suspense, useState } from 'react';
import './App.scss'
import { NavLink, Outlet } from 'react-router-dom';
import AuthProvider from './component/AuthProvider.jsx';

// https://codepen.io/microfront/pen/veagoK
// https://www.alloprof.qc.ca/fr/eleves/bv/histoire/epoques-historiques-h1001

function App() {

  // etat qui vérifie si l'audio est muté ou non
  const [sound, setSound] = useState(true)

  return (
    <div className="app">
      <header>
          <nav>
            <NavLink to='/' className='link'>Timeline</NavLink>
            <NavLink to='/admin' className='link'>Admin</NavLink>
          </nav>
      </header>
    <AuthProvider>
        <Suspense>
          <Outlet />
        </Suspense>
    </AuthProvider>
      
      <button className={`sound ${sound !== true && 'slash-music'}`} onClick={() => setSound(!sound)}>
        <i className="fa-solid fa-music"></i>
      </button>
    </div>
  );
}

export default App;
