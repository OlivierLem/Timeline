import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Periode ({periode: {noms, slugName, debutPeriode, finPeriode, checkQuizz, nLinkWithEvent}}) {
    // carte de la periode avec ces paramétres et un lien pour éditer la periode
    // ! mettre un fichier svg à la place pour le bouton edit
    return (
        <div className="card ">
            <p>{noms}</p>
            <p className="date"><span>Période:</span> {debutPeriode} - {finPeriode}</p>
            
            {
                nLinkWithEvent > 0 ? (
                    <p>événement associé à la période <span> {nLinkWithEvent} </span></p>
                ) : (
                    <p>pas d'événement associé à la période</p>
                )
            }

            {
                checkQuizz === 1 ? (
                    <NavLink to={`/quizz/${slugName}`}>Voir le quizz</NavLink>
                ) : (
                    <p>Pas encore de quizz ajouté</p>
                )
            }
            {/* <NavLink to={`/admin/periodes/${slugName}`} className='edit'><img src="../../../assets/icons/edit.png" alt="" /> </NavLink> */}
        </div>
    )
}