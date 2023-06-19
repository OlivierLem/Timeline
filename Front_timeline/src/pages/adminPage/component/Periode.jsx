import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Periode ({periode: {noms, slugName, debutPeriode, finPeriode, checkQuizz, numberLinkWithEvent}}) {
    // carte de la periode avec ces paramétres et un lien pour éditer la periode
    return (
        <div className="card ">
            <p>{noms}</p>
            <p className="date"><span>Période:</span> {debutPeriode} - {finPeriode}</p>
            
            {
                numberLinkWithEvent > 0 ? (
                    <p>événement associé à la période <span> {numberLinkWithEvent} </span></p>
                ) : (
                    <p>pas d'événement associé à la période</p>
                )
            }

            {
                checkQuizz === 1 ? (
                    <NavLink to={`/periodes/${slugName}/quizz`}>Voir le quizz</NavLink>
                ) : (
                    <p>Pas encore de quizz ajouté</p>
                )
            }
            <NavLink to={`/admin/periodes/${slugName}`} className='edit'><i className="fa-solid fa-pen-to-square"></i></NavLink>
        </div>
    )
}