import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Time ({evenements}) {

    const { name, slugName, date, year, miniature} = evenements;
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const uint8Array = new Uint8Array(miniature); // ! ne fonctionne pas si le type n'est pas de type blob en sql
        //console.log({ uint8Array });
        const blob = new Blob([miniature]);
        //console.log({ blob });
        const urlImage = URL.createObjectURL(blob);
        //console.log({ urlImage });
        fetch(urlImage)
            .then(response => response.text())
            .then(text => setPreviewImage(text))
            .catch(error => console.error(error))

    }, [evenements])

    // composant qui affiche un événement de la timeline
    return (
    <div className="time">
        {
            previewImage ? (
                <img src={previewImage} alt="sacre_de_louis_xv" />
                
            ) : (
                <img src="assets/images/sacre_de_louis_xv.jpg" alt="sacre_de_louis_xv" />

            )
        }
        <div className="timeDisplay">
            <p> {year} </p>
            <span></span>
        </div>
        <div className="timeText">
            <p>{date} </p>
            <p className="event">
                {name}
            </p>
            <NavLink to={`/articles/${slugName}`}>En voir plus</NavLink>
        </div>
    </div>
    )
}