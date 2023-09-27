/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet } from 'react-router-dom';
import './AdminPage.scss'
import { useState } from 'react';

export default function AdminPage () {

    // page de l'admin avec les onglet periodes et evenement 
    // outlet affiche le composant da la route soit les événements ou les périodes
    // on met une autre nav pour les pages pour créer une période ou un event 
    return (
        <section className="admin">
            <nav className='adminOnglet'>
                <NavLink to='/admin/periodes'>Périodes</NavLink>
                <NavLink to='/admin/evenements'>Événements</NavLink>
            </nav>
            <Outlet />
            <div className='adminNav-block'>
                <nav className={`adminNav`}>
                    <NavLink to='/ajout_periode'>Ajouter une période</NavLink>
                    <span></span>
                    <NavLink to='/ajout_evenement'>Ajouter un évenement</NavLink>
                </nav>
            </div>
        </section>
    )
}