import { useEffect, useState } from "react"
import Evenement from "./Evenement"
import { getEvenements } from "../../../apis/evenement"

export default function EvenementList () {
    
    const [evenements, setEvenements] = useState([]);
    useEffect(() => {
        // requête pour récupérer les évenements
        getEvenements().then(ev => {
            setEvenements(ev)
            //console.log(ev);
        })
    }, []) 

    // affiche les cartes de toute les événements
    return (
        <div className='epoqueList'>
            {
                evenements ? (
                    evenements
                        .map(e => (
                            <Evenement key={e.idEvenement} evenement={e} />
                        ))
                ) : (
                    <p>pas d'événement ajouté</p>
                )
            }
        </div>
    )
}