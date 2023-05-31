import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { associationEventAndPeriode, getOneEvenement } from "../../apis/evenement";
import { getPeriodsFilter } from "../../apis/period";
import moment from "moment";
import 'moment/locale/fr';
import { useForm } from "react-hook-form";

export function EventEditPage () {
    const { evenement } = useParams();
    let evenementTitle = evenement.replaceAll('_', ' ')
    evenementTitle = evenementTitle.charAt(0).toUpperCase() + evenementTitle.slice(1)

    const [oneEvent, setOneEvent] = useState([])
    const [periodes, setPeriodes] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    
    useEffect (() => {
        getOneEvenement(evenement)
            .then(evenements => {
                const img = evenements.map(ev =>{  
                    ev.url
                })
                // console.log(img);

                const evenementWithImages = {
                    id:evenements[0].idEvenement,
                    name:evenements[0].name,
                    date: moment(evenements[0].date).locale('fr').format('DD MMMM YYYY'),
                    url: img
                };
                setOneEvent(evenementWithImages)
                getPeriodsFilter(moment(evenements[0].date).year()).then(ev => setPeriodes(ev))   
                const imgFromBackEnd = evenements[0].url;
                console.log(imgFromBackEnd);
                // création d'un tableau de données binaires qui économise de la mémoire
                const uint8Array = new Uint8Array(imgFromBackEnd);
                console.log({ uint8Array });
                // création d'un objet BLOB
                const blob = new Blob([uint8Array]);
                console.log({ blob });
                // Création d'une url temporaire de type BLOB qui va permettre d'afficher l'image sur la page web
                const urlImage = URL.createObjectURL(blob);
                console.log({ urlImage });
                // récupération sous forme de texte brut de l'URL
                // ce texte est attribué avec le useSTate previewImage pour l'affichage
                fetch(urlImage)
                    .then((response) =>{ 
                        console.log(response)
                        response.text()
                    })
                    .then((text) => {
                        setPreviewImage(text)
                        console.log(previewImage);
                    })
                    .catch((error) => console.log(error));
            })
            
    // affiche les periodes filtrer  pour ne prendre que les evenement 
    // qui ne font partis de la période
   
    }, [])

    /* async function handleSubmitName(e) {
        try {
            console.log(e);
        } catch (error) {
            
        }
    }  */

    const defaultValues = {
        periode: 'siecle_des_lumieres'
    }

    const {
        register, 
        handleSubmit, 
    } = useForm({
        defaultValues
    })

      const submitSelect = handleSubmit(async (values) => {
        let idPeriodeFilter = periodes.filter(p => p.slugName === values.periode)[0].idPeriode
        const eventAndPeriode = {
            event: oneEvent.id,
            periode: idPeriodeFilter
        };
        console.log(eventAndPeriode)
        associationEventAndPeriode(eventAndPeriode)
      }) 

    return (
        <section>
            <h1> {oneEvent.name} </h1>
            {/* <form action="" onSubmit={handleSubmitName}>
                <input type="text" value={oneEvent.name} />
                <button>Envoie</button>
            </form> */}
            <p>{oneEvent.date}</p>
            
            {
                previewImage ? (
                    <img src={previewImage} alt="test" />
                ) : (
                    // <img src="/assets/images/sacre_de_louis_xv.jpg" alt="sacre_de_louis_xv" />
                    <p>Pas d'image</p>
                    )
            }

            { periodes.length > 0 ? (
                <form action="" onSubmit={submitSelect} >
                
                    <select {...register(`periode`)} name="periode">
                        {periodes.map((p, i) => (
                            <option  key={p.idPeriode} value={p.slugName}>{p.noms}</option>
                        ))}
                            
                    </select>
                    <button>Ajouter l'évenement</button>
                </form>
            ) : (
                <p>pas de timeline</p>
            )            
            }
        </section>
    )
}