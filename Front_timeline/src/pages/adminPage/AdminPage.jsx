/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet } from 'react-router-dom';
import './AdminPage.scss'
import { useState } from 'react';

export default function AdminPage () {
    
    const [showNavAdmin, setShowNavAdmin] = useState() // state pour afficher ou pas la nav des pages de création

    // page de l'admin avec les onglet periodes et evenement 
    // outlet affiche le composant da la route soit les événements ou les périodes
    // on met une autre nav pour les pages pour créer une période ou un event 
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