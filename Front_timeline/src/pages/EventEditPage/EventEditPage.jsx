import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { associationEventAndPeriode, deleteEvent, getOneEvenement } from "../../apis/evenement";
import { getPeriodsFilter } from "../../apis/period";
import moment from "moment";
import 'moment/locale/fr';
import { useForm } from "react-hook-form";
import './EventEditPage.scss'
import { FormEditEvent } from "../../component/FormEditEvent";

export function EventEditPage () {
    const { evenement } = useParams();
    let evenementTitle = evenement.replaceAll('_', ' ')
    evenementTitle = evenementTitle.charAt(0).toUpperCase() + evenementTitle.slice(1)
    const navigate = useNavigate()
    const [oneEvent, setOneEvent] = useState([])
    const [periodes, setPeriodes] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [showDeleteModale, setShowDeleteModale] = useState(false)
    const [showEditModale, setShowEditModale] = useState(false)
    useEffect (() => {
        getOneEvenement(evenement)
            .then(evenements => {
                if(evenements.length > 0) {
                    // tableau des images
                    const img = evenements.map(ev =>{  
                        ev.url
                    })

                    // objet avec l'evenement et un tableau de ces images
                    const evenementWithImages = {
                        id:evenements[0].idEvenement,
                        name:evenements[0].name,
                        slugName: evenements[0].slugName,
                        date: `${moment(evenements[0].date).locale('fr').format('DD MMMM')} ${moment(evenements[0].date).year()}`,
                        url: img
                    };

                    setOneEvent(evenementWithImages)

                    // requête pour afficher les periode dans un state qui sont comprise dans l'année de l'event
                    getPeriodsFilter(moment(evenements[0].date).year()).then(ev => setPeriodes(ev))   
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
        await associationEventAndPeriode(eventAndPeriode)
        navigate(0)
      }) 

    // page pour modifier un événement
    return (
        <section>
            <h1 className="title"> {oneEvent.name} </h1>
            {
                oneEvent && (
                    <NavLink to={`/admin/evenements/article/${oneEvent.slugName}`} className="linkArticle">Créer un article</NavLink>
                )
            }
            <div className="eventEditPage formField">
                <h2>Infos événement</h2>
                <p><span>Date:</span> {oneEvent.date}</p>

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
                    <p>pas de timeline ajoutable</p>
                )            
                }
                <div className="groupButton">
                    <button onClick={() => setShowEditModale(true)} className="editEvent"><i className="fa-solid fa-pen"></i>modifier les infos</button>
                    <button onClick={handleShowDeleteModale} className="supprimerEvenement">Supprimer l'évenement</button>
                </div>
            </div>
                {
                    showDeleteModale === true && (
                        <div className="modaleDelete">
                            <p>Voulez vous vraiment supprimer cette événement</p>
                            <div>
                                <button onClick={handleShowDeleteModale} className="annuler"><i className="fa-solid fa-arrow-left"></i>Annuler</button>
                                <button onClick={handleDelete} className="supprimerEvenement"><i className="fa-solid fa-trash"></i> Supprimer</button>
                            </div>
                        </div>
                    )
                }
                {
                    showEditModale === true && (
                        <div className="modaleEdit">
                            <button onClick={() => setShowEditModale(false)} className="closeModale"><i className="fa-solid fa-x"></i></button>
                            <FormEditEvent id={oneEvent.id} date={oneEvent.date} name={oneEvent.name}/>
                        </div>
                    )
                }
        </section>
    )
}