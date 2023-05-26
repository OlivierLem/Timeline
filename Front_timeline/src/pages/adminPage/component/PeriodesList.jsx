import { useEffect, useState } from "react";
import Periode from "./Periode";
import { getPeriods } from "../../../apis/period";

export default function PeriodesList () {
    const [periodes, setPeriodes] = useState([]);
    useEffect(() => {
        getPeriods().then(p => {
            setPeriodes(p)
        })
    }, []) 
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