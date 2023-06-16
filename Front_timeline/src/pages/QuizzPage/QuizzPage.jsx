import { NavLink, useParams } from "react-router-dom";
import Quizz from "./component/Quizz";
import { useEffect, useState } from "react";
import './QuizzPage.scss'
import { getQuizz } from "../../apis/quizz";

export default function QuizzPage () {
    //! récupérer le quizz
    const [quizz, setQuizz] = useState([])
    
    const { periode: periodeSlug} = useParams()

    useEffect(() => {
        getQuizz(periodeSlug).then(backQuizz => {
          setQuizz(backQuizz)
          console.log(backQuizz);
        })
    }, [])

    return (
        <section>
            {
                quizz.length > 0 ? (
                    <Quizz quizz={quizz} timer='25' />
                ) : (
                    <div className="createQuizzLink">
                        <p>Il n'y a pas encore de quizz pour cette période</p>
                        <NavLink to={`/periodes/${periodeSlug}/creer_quizz`}>Créer un quizz</NavLink>
                    </div>
                    

                )
            }
        </section>
    )
} 