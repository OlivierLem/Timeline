import { useParams } from "react-router-dom";
import { useState } from "react";
import TextComponent from "./TextComponent.jsx";
// import TitleComponent from "./TitleComponent.jsx";
import './creerArticle.scss'
import { useForm } from "react-hook-form";
import { createArticle } from "../../../apis/evenement.js";


export function EventEditArticle () {
    const { evenement } = useParams();

    const [component, setComponent] = useState([])
    const [create, setCreate] = useState(false)
    const {
        control, 
        handleSubmit
    } = useForm()

    function handleClick (e) {
        const {value} = e.target.dataset;
        setCreate(!create);
        console.log(value);
        switch (value) {
            case 'texte':
                console.log("ajout d'un text");
                console.log(component.length);
                setComponent([...component , 
                    <TextComponent 
                        key={component.length}
                        isEdit={true}
                        control={control}
                        order={component.length}
                    >
                    </TextComponent>])
                break;
            default:
                console.log('pas de bonne valeur');
                break;
        }
    }

    function handleChange (e) {
        console.log(e.target.value);
        setNewTitle(e.target.value)
    }

    const submit = handleSubmit((values) => {
        const newValues = values.component.map((v, i) => (
            {
                content: v,
                orderValue: i + 1
            }
            
        ))
        console.log(newValues);
        createArticle({components: [...newValues], slugName: evenement })
    })

    return (
        <section className="cours">
           <h1>{evenement}</h1>
            <form action="" onSubmit={submit}>
                <div className="cours__create">
                    {
                        component.map((c, i) => (c))
                    }
                </div>
                <div className={`addComponent ${create === true && 'active'} `}>
                    {
                        create === true ? (
                            <div>
                                <nav>
                                    <button type="button" onClick={handleClick} data-value='texte'>T</button>
                                    <button type="button" onClick={handleClick} data-value='titre'><i className="fa-solid fa-heading"></i></button>
                                </nav>
                            </div>
                        ): (
                            <button type="button" onClick={() => setCreate(!create)}>+</button>
                        )
                    }
                </div>
            <div>
                <div className="buttonNav">
                    <button >Créer article</button>
                    <button type="button">Annuler</button>
                </div>
            </div>
            </form>
            
        </section>
    )
}