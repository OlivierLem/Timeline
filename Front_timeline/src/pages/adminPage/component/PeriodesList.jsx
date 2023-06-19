import { useEffect, useState } from "react";
import Periode from "./Periode";
import { getPeriods } from "../../../apis/period";

export default function PeriodesList () {
    const [periodes, setPeriodes] = useState([]);
    useEffect(() => {
        // requête pour récupérer les periodes on fait une promesse then pour récupérer les periodes et on les mets dans un state
        getPeriods().then(p => {
            setPeriodes(p)
            console.log(p);
        })
    }, []) 
    // affiche les cartes de toute les periodes
    return (
        <div className='epoqueList'>
            {
                periodes ? (
                    periodes.map(p => (
                        <Periode key={p.idPeriode} periode={p} />
                    ))
                ) : (
                    <p>pas d'époque ajouté</p>
                )
            }
        </div>
    )
}