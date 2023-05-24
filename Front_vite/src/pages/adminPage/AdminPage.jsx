/* eslint-disable react/no-unescaped-entities */
import { NavLink } from 'react-router-dom';
import './AdminPage.scss'

export default function AdminPage () {
    
   
    return (
        <section className="admin">
            <h1>Admin</h1>
            <div className='epoqueList'>
                <div>
                    <p>Siécle des lumiere</p>
                    <p className="date"><span>Période:</span>  1715 - 1789</p>
                    <p>Nombres d'événement <span>5</span></p>
                    <button className='edit'><i className="fa-solid fa-pen-to-square"></i></button>
                </div>
               <nav>
                    <NavLink to='/ajout_evenement'>Ajouter un évenement</NavLink>
                    <NavLink to='/ajout_periode'>Ajouter une période</NavLink>
               </nav>
            </div>
        </section>
    )
}