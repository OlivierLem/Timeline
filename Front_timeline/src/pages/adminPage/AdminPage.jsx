/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet } from 'react-router-dom';
import './AdminPage.scss'
import { useState } from 'react';

export default function AdminPage () {
    
    const [showNavAdmin, setShowNavAdmin] = useState()

    return (
        <section className="admin">
            <h1>Admin</h1>
            <nav className='adminOnglet'>
                <NavLink to='/admin/periodes'>Périodes</NavLink>
                <NavLink to='/admin/evenements'>Événements</NavLink>
            </nav>
            <Outlet />
            <nav className={`adminNav ${showNavAdmin && 'active'}`} >
                <NavLink to='/ajout_periode'>Ajouter une période</NavLink>
                <NavLink to='/ajout_evenement'>Ajouter un évenement</NavLink>
                <button onClick={() => setShowNavAdmin(!showNavAdmin)}><i className="fa-solid fa-chevron-right"></i></button>
            </nav>
        </section>
    )
}