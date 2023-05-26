import { useEffect, useState } from "react"
import Evenement from "./Evenement"
import { getEvenements } from "../../../apis/evenement"

export default function EvenementList () {
    
    const [evenements, setEvenements] = useState([]);
    useEffect(() => {
        getEvenements().then(ev => {
            setEvenements(ev)
        })
    }, []) 
    return (
        <div className='epoqueList'>
            {
                evenements ? (
                    evenements.map(e => (
                        <Evenement key={e.idEvenement} evenement={e} />
                    ))
                ) : (
                    <p>pas d'événement ajouté</p>
                )
            }
            {/* <Evenement evenement={evenements[0]} /> */}
        </div>
    )
}