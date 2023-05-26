import { NavLink } from "react-router-dom";
import transformLink from "../../../assets/script/transformLink";

export default function Periode ({periode: {noms, debutPeriode, finPeriode}}) {

    const nameLink = transformLink(noms)

    return (
        <div>
            <p>{noms}</p>
            <p className="date"><span>Période:</span> {debutPeriode} - {finPeriode}</p>
            <p>Pas encore d'évenement ajouté</p>
            <p>Pas encore de quizz ajouté</p>
            <NavLink to={`/admin/periodes/${nameLink}`} className='edit'><i className="fa-solid fa-pen-to-square"></i></NavLink>
        </div>
    )
}