import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextComponent from "./TextComponent.jsx";
// import TitleComponent from "./TitleComponent.jsx";
import './creerArticle.scss'
import { useForm } from "react-hook-form";
import { createArticle, getOneEvenement } from "../../../apis/evenement.js";


export function EventEditArticle () {
    const { evenement } = useParams();
    const navigate = useNavigate()

    const [evenementState, setEvenementState] = useState(null)
    const [component, setComponent] = useState([])
    const [create, setCreate] = useState(false)
    const {
        control, 
        handleSubmit
    } = useForm()

    useEffect(() => {
        console.log(component);
        if (!Array.isArray(component)) {
            setComponent([])
        }
    },[component])

    useEffect(() => {
        getOneEvenement(evenement).then(ev => {
            console.log(ev);
            setEvenementState(ev)
        } )
    }, [])

    const deleteItem = (orderComponent) => {
        for (const c of component) {
            console.log(c.props.order + '-' + orderComponent)
            console.log(c.props.order !== orderComponent)
        }
        setComponent([...component.map(c => { if(c.key !== orderComponent.toString()) return c })])
    }
   
    function handleClick (e) {
        const {value} = e.target.dataset; // récupere le data_value du bouton clicker
        setCreate(!create); // on affiche plus les bouton pour ajouter des composants
        
        //  on vérifie son type, on créer le composant et on l'ajoute aux autre composant
        // on lui met ces paramétre et control pour utiliser register avec des composant react
        switch (value) {
            case 'texte':
                setComponent([...component , 
                    <TextComponent 
                        key={component.length}
                        isEdit={true}
                        control={control}
                        order={component.length}
                        deleteItem= {deleteItem}
                    >
                    </TextComponent>])
                break;
            default:
                console.log('pas de bonne valeur');
                break;
        }
    }

    const submit = handleSubmit((values) => {
        // on créer un nouveau tableau avec les valeur submit et on ajoute l'ordre des composant
        const newValues = values.component.map((v, i) => (
            {
                content: v,
                orderValue: i + 1
            }
            
        ))
        console.log(newValues);
        navigate(`/articles/${evenement}`)
        // on fait une requête fetch pour ajouter l'article
        createArticle({components: [...newValues], slugName: evenement })
    })

    // formulaire pour créer un article
    return (
        <section className="article">
           <h1>{evenementState && evenementState[0].name}</h1>
            <form action="" onSubmit={submit}>
                <div className="article__create">
                    {  Array.isArray(component) &&
                        component.map((c, i) => (c))
                    }
                </div>
                <div className={`addComponent ${create === true && 'active'} `}>
                    {
                        create === true ? (
                            <div>
                                <nav>
                                    <button type="button" onClick={handleClick} data-value='texte'>T</button>{/* 
                                    <button type="button" onClick={handleClick} data-value='titre'><i className="fa-solid fa-heading"></i></button> */}
                                </nav>
                            </div>
                        ): (
                            <button type="button" onClick={() => setCreate(!create)}>+</button>
                        )
                    }
                </div>
            <div>
                <div className="buttonNav">
                    <button >Créer l'article</button>
                    {/* <button type="button">Annuler</button> */}
                </div>
            </div>
            </form>
            
        </section>
    )
}