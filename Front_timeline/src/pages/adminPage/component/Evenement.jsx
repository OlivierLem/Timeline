import { NavLink } from "react-router-dom";
import transformLink from "../../../assets/script/transformLink";

export default function Evenement ({evenement: {name, date}}) {

    const nameLink = transformLink(name)
    console.log(nameLink);
    return (
        <div>
            <p>{name}</p>
            <p className="date"><span>Date: </span> {date} </p>
            <p>La news n'a pas encore était créer</p>
            <NavLink to={`/admin/evenements/${nameLink}`} className='edit'><i className="fa-solid fa-pen-to-square"></i></NavLink>
        </div>
    )
}