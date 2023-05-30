import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOneEvenement } from "../../apis/evenement";
import { getPeriodsFilter } from "../../apis/period";
import moment from "moment";
import 'moment/locale/fr';

export function EventEditPage () {
    const { evenement } = useParams();
    let evenementTitle = evenement.replaceAll('_', ' ')
    evenementTitle = evenementTitle.charAt(0).toUpperCase() + evenementTitle.slice(1)

    //const [previewImage, setPreviewImage] = useState(null);
    const [oneEvent, setOneEvent] = useState([])
    const [periodes, setPeriodes] = useState([]);

    useEffect (() => {
        getOneEvenement(evenement).then(evenements => {
            const img = evenements.map(ev =>{  
                ev.url
            })
            // console.log(img);

            const evenementWithImages = {
                name:evenements[0].name,
                date: moment(evenements[0].date, 'DD-MM-YYYY').locale('fr').format('DD MMMM YYYY'),
                url: img
            };
            setOneEvent(evenementWithImages)

            })
    // affiche les periodes filtrer  pour ne prendre que les evenement 
    // qui ne font partis de la période
    getPeriodsFilter(moment(oneEvent).year()).then(ev => setPeriodes(ev))   

    }, [])

    /* async function handleSubmitName(e) {
        try {
            console.log(e);
        } catch (error) {
            
        }
    }  */


    return (
        <section>
            <h1> {oneEvent.name} </h1>
            {/* <form action="" onSubmit={handleSubmitName}>
                <input type="text" value={oneEvent.name} />
                <button>Envoie</button>
            </form> */}
            <p>{oneEvent.date}</p>
            
            
            <form action="">
                <select name="" id="">
                    {
                        periodes && (
                            periodes.map(p => (
                                <option key={p.idPeriode} value={p.slugName}>{p.noms}</option>
                            ))
                        )
                    }
                </select>
                <button>Ajouter l'évenement</button>
            </form>
        </section>
    )
}