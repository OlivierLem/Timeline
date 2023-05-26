import { NavLink } from "react-router-dom";

export default function Evenement ({evenement: {name, date, slugName}}) {

    
    const dateFormat = new Date(date).toLocaleDateString("fr")

    return (
        <div>
            <p>{name}</p>
            <p className="date"><span>Date: </span> {dateFormat} </p>
            <p>La news n'a pas encore était créer</p>
            <NavLink to={`/admin/evenements/${slugName}`} className='edit'><i className="fa-solid fa-pen-to-square"></i></NavLink>
        </div>
    )
}