import { NavLink, useParams } from "react-router-dom";
import Quizz from "./component/Quizz";
import { useState } from "react";

export default function QuizzPage () {
    //! récupérer le quizz
    const [quizz, setQuizz] = useState([])
    
    const { periode: periodeSlug} = useParams()

    return (
        <>
            {
                quizz.length > 0 ? (
                    <Quizz quizz={quizz} timer='25' />
                ) : (
                    <NavLink to={`/periodes/${periodeSlug}/creer_quizz`}>Créer quizz</NavLink>
                )
            }
        </>
    )
} 