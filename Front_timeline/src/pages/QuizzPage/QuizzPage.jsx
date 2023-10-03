import { NavLink, useParams } from "react-router-dom";
import Quizz from "./component/Quizz";
import { useEffect, useState } from "react";
import './QuizzPage.scss'
import { getListQuizz } from "../../apis/quizz";
import { QuizzCardList } from "./component/QuizzCardList";

export default function QuizzPage () {
    // récupérer la liste des quizz
    const [quizz, setQuizz] = useState([])
    
    const { periode: periodeSlug} = useParams()

    useEffect(() => {
        // requête pour afficher le quizz d'une période
        getListQuizz(periodeSlug).then(backQuizz => {
          setQuizz(backQuizz)
        })
    }, [])

    // affiche le quizz ou un lien pour créer un quizz
    return (
        <section>
            <h1>Liste des quizz</h1>
            {
                quizz && quizz.length > 0 ? (
                    <div className="listCard">
                        <div className="createQuizzLink">
                            <NavLink to={`/quizz/creerQuizz`}>Créer un quizz</NavLink>
                        </div>

                        {    
                            quizz.map((q) => (
                                <QuizzCardList quizz={q} />
                            ))
                        }
                    </div>
                ) : (
                    <div className="createQuizzLink">
                        <p>Il n'y a pas encore de quizz pour cette période</p>
                        <NavLink to={`/quizz/creerQuizz`}>Créer un quizz</NavLink>
                    </div>
                )
            }
        </section>
    )
} 