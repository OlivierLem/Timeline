import { useState } from "react";

export default function TextComponent ({children, order, isEdit, control, deleteItem}) {
    // ! probléme pour l'edit
    const [edit, setEdit] = useState(isEdit)
    const [content, setContent] = useState(children)
    const { register } = control

    // change le contenue du textarea
    function handleChange (e) {
        setContent(e.target.value)
    }

    // si le champs est vide on ne peut pas afficher le contenu
    function handleEdit () {
        if(content) {
            setEdit(false)
        } 
    }

    function handleDelete (key) {
        deleteItem(key) 
    }

    // composant text
    return (
        <div className="text__component">  
            
            {
                edit === true ? (
                    <div className="editComponent">
                        <textarea 
                            {...register(`component.${order}`)}
                            type="text" 
                            onChange={handleChange}
                            className="editText"
                            autoFocus
                            value={content}
                        >
                        </textarea>
                        <button type="button" onClick={handleEdit}>valider</button>
                    </div>
                ) : (
                    <>
                        <div className="buttonOption" >
                            <button type="button" className="buttonEdit" onClick={() => setEdit(!edit)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button type="button" onClick={() => handleDelete(order)} > 
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </div>
                        <p>{content} </p>
                    </>
                )
            }
        </div>
    )
}