import { NavLink } from "react-router-dom";

export default function Periode ({periode: {noms, slugName, debutPeriode, finPeriode}}) {


    return (
        <div className="card ">
            <p>{noms}</p>
            <p className="date"><span>Période:</span> {debutPeriode} - {finPeriode}</p>
            <p>Pas encore d'évenement ajouté</p>
            <p>Pas encore de quizz ajouté</p>
            <NavLink to={`/admin/periodes/${slugName}`} className='edit'><i className="fa-solid fa-pen-to-square"></i></NavLink>
        </div>
    )
}