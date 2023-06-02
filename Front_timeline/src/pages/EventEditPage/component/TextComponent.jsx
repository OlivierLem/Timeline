import { useState } from "react";

export default function TextComponent ({children, order, isEdit, control}) {
    // ! probléme pour l'edit
    const [edit, setEdit] = useState(isEdit)
    const [content, setContent] = useState(children)
    const { register } = control

    function handleChange (e) {
        //console.log(e.target.value);
        setContent(e.target.value)
    }

    function handleEdit () {
        if(content) {
            setEdit(false)
        } else {
            console.log("Le champs est vide");
        }
    }
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
                            <button className="buttonEdit" onClick={() => setEdit(!edit)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button>
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