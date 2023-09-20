import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { associationEventAndPeriode, deleteEvent, getOneEvenement } from "../../apis/evenement";
import { getPeriodsFilter } from "../../apis/period";
import moment from "moment";
import 'moment/locale/fr';
import { useForm } from "react-hook-form";
import './EventEditPage.scss'

export function EventEditPage () {
    const { evenement } = useParams();
    let evenementTitle = evenement.replaceAll('_', ' ')
    evenementTitle = evenementTitle.charAt(0).toUpperCase() + evenementTitle.slice(1)
    const navigate = useNavigate()
    const [oneEvent, setOneEvent] = useState([])
    const [periodes, setPeriodes] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [showDeleteModale, setShowDeleteModale] = useState(false)
    useEffect (() => {
        getOneEvenement(evenement)
            .then(evenements => {
                if(evenements.length > 0) {
                    // tableau des images
                    const img = evenements.map(ev =>{  
                        ev.url
                    })
                    // console.log(img);

                    // objet avec l'evenement et un tableau de ces images
                    const evenementWithImages = {
                        id:evenements[0].idEvenement,
                        name:evenements[0].name,
                        slugName: evenements[0].slugName,
                        date: moment(evenements[0].date).locale('fr').format('DD MMMM YYYY'),
                        url: img
                    };

                    //console.log(evenements[0]);
                    setOneEvent(evenementWithImages)

                    // requête pour afficher les periode dans un state qui sont comprise dans l'année de l'event
                    getPeriodsFilter(moment(evenements[0].date).year()).then(ev => setPeriodes(ev))   

                    /* const imgFromBackEnd = evenements[0].url;
                    //console.log(imgFromBackEnd);
                    // création d'un tableau de données binaires qui économise de la mémoire
                    const uint8Array = new Uint8Array(imgFromBackEnd);
                    //console.log({ uint8Array });
                    // création d'un objet BLOB
                    const blob = new Blob([uint8Array]);
                    //console.log({ blob });
                    // Création d'une url temporaire de type BLOB qui va permettre d'afficher l'image sur la page web
                    const urlImage = URL.createObjectURL(blob);
                    //console.log({ urlImage });
                    // récupération sous forme de texte brut de l'URL
                    // ce texte est attribué avec le useState previewImage pour l'affichage
                    fetch(urlImage)
                        .then((response) =>{ 
                            console.log(response)
                            response.text()
                        })
                        .then((text) => {
                            setPreviewImage(text)
                            console.log(previewImage);
                        })
                        .catch((error) => console.log(error)); */
                }  else {
                    console.log('evenement non récupérer');
                }
            })
   
    }, [])

    // affiche la modale pour supprimer un event
    function handleShowDeleteModale () {
        setShowDeleteModale(!showDeleteModale)
    }

    //supprime l'evenement et redirige vers la page admin/evenement
    function handleDelete () {
        deleteEvent(oneEvent)
        navigate('/admin/evenements')
    }

    const defaultValues = {
        periodes: ''
    }

    const {
        register, 
        handleSubmit, 
    } = useForm({
        defaultValues
    })

    // créer une association entre une période et un événement
    const submitSelect = handleSubmit(async (values) => {
        let idPeriodeFilter = periodes.filter(p => p.slugName === values.periode)[0].idPeriode
        const eventAndPeriode = {
            event: oneEvent.id,
            periode: idPeriodeFilter
        };
        console.log(eventAndPeriode)
        associationEventAndPeriode(eventAndPeriode)
      }) 

    // page pour modifier un événement
    return (
        <section>
            <h1> {oneEvent.name} </h1>
            {
                oneEvent && (
                    <NavLink to={`/admin/evenements/article/${oneEvent.slugName}`} className="linkArticle">Article <i className="fa-solid fa-arrow-right"></i></NavLink>
                )
            }
            <div className="eventEditPage">
            <p><span>Date:</span> {oneEvent.date}</p>
            
            <div className="listImages">
            {/* <p><span>Images</span></p>
            {
                previewImage ? (
                    <img src={previewImage} alt="test" />
                ) : (
                    // <img src="/assets/images/sacre_de_louis_xv.jpg" alt="sacre_de_louis_xv" />
                    <p>Pas d'image</p>
                    )
            } */}
            </div>
            

            { periodes.length > 0 ? (
                <form action="" onSubmit={submitSelect} >
                    {/* <label htmlFor="">Timeline</label> */}
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
            <button onClick={handleShowDeleteModale} className="supprimerEvenement">Supprimer l'évenement</button>
             {
                showDeleteModale === true && (
                    <div className="modaleDelete">
                        <p>Voulez vous vraiment supprimer cette événement</p>
                        <div>
                            <button onClick={handleShowDeleteModale} className="annuler">Annuler</button>
                            <button onClick={handleDelete} className="supprimerEvenement">Supprimer l'événement</button>
                        </div>
                    </div>
                )
             }
            </div>
        </section>
    )
}