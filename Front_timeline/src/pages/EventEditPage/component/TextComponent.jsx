import { useState } from "react";

export default function TextComponent ({children, order, isEdit}) {
    // ! probléme pour l'edit
    const [edit, setEdit] = useState(isEdit)
    const [content, setContent] = useState(children)

    function handleChange (e) {
        console.log(e.target.value);
        setContent(e.target.value)
    }

    return (
        <div className="text__component">  
            <div className="buttonOption" >
                <button className="buttonEdit" onClick={() => setEdit(!edit)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
            {
                edit === true ? (
                    <div>
                        <textarea 
                            type="text" 
                            onChange={handleChange}
                            className="editText"
                            autoFocus
                            value={content}>
                        </textarea>
                        <button onClick={() => setEdit(false)}>valider</button>
                    </div>
                ) : (
                    <p>{content} </p>
                )
            }
        </div>
    )
}