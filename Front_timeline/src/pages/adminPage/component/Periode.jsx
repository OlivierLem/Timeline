import { NavLink } from "react-router-dom";
import transformLink from "../../../assets/script/transformLink";

export default function Periode ({periode: {name, startPeriode, endPeriode}}) {

    const nameLink = transformLink(name)
    console.log(nameLink);
    return (
        <div>
            <p>{name}</p>
            <p className="date"><span>Période:</span> {startPeriode} - {endPeriode}</p>
            <p>Nombres d'événement <span>5</span></p>
            <p>Nombres de quizz <span>10</span></p>
            <NavLink to={`/admin/periodes/${nameLink}`} className='edit'><i className="fa-solid fa-pen-to-square"></i></NavLink>
        </div>
    )
}