/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet } from 'react-router-dom';
import './AdminPage.scss'

export default function AdminPage () {
    
    return (
        <section className="admin">
            <h1>Admin</h1>
            <nav className='adminOnglet'>
                <NavLink to='/admin/periodes'>Périodes</NavLink>
                <NavLink to='/admin/evenements'>Événements</NavLink>
            </nav>
            <Outlet />
            <nav className='adminNav'>
                <NavLink to='/ajout_evenement'>Ajouter un évenement</NavLink>
                <NavLink to='/ajout_periode'>Ajouter une période</NavLink>
            </nav>
        </section>
    )
}