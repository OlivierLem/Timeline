import { useParams } from "react-router-dom";
import { useState } from "react";
import TextComponent from "./TextComponent.jsx";
// import TitleComponent from "./TitleComponent.jsx";
import './creerArticle.scss'


export function EventEditArticle () {
    const { evenement } = useParams();

    const [component, setComponent] = useState([])
    const [create, setCreate] = useState(false)
  

    function handleClick (e) {
        const {value} = e.target.dataset;
        setCreate(!create);
        console.log(value);
        switch (value) {
            case 'texte':
                console.log("c'est un text");
                setComponent([...component , <TextComponent isEdit={true}></TextComponent>])
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

    return (
        <section className="cours">
           <h1>{evenement}</h1>
            <form action="">
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
                                <button onClick={handleClick} data-value='texte'>T</button>
                                <button onClick={handleClick} data-value='titre'><i className="fa-solid fa-heading"></i></button>
                            </nav>
                        </div>
                    ): (
                        <button onClick={() => setCreate(!create)}>+</button>
                    )
                }
            </div>
            <div>
                <div className="buttonNav"><button >Créer article</button><button>Annuler</button></div>
            </div>
            </form>
            
        </section>
    )
}