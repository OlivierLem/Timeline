import { NavLink } from "react-router-dom";
import Quizz from "./component/Quizz";

export default function QuizzPage () {
    //! récupérer le quizz
    const quizz = [
        {
            question: 'Question',
            reponses: [
                {
                    reponse: 'r1',
                    isCorrect:false
                },
                {
                    reponse: 'r2',
                    isCorrect:false
                },
                {
                    reponse: 'r3',
                    isCorrect:true
                },
                {
                    reponse: 'r4',
                    isCorrect:false
                },
            ]
        },
        {
            question: 'Question2',
            reponses: [
                {
                    reponse: 'r1',
                    isCorrect:false
                },
                {
                    reponse: 'r2',
                    isCorrect:false
                },
                {
                    reponse: 'r3',
                    isCorrect:true
                },
                {
                    reponse: 'r4',
                    isCorrect:false
                },
            ]
        }
    ]
    return (
        <>
            {
                quizz ? (
                    <Quizz quizz={quizz} timer='25' />
                ) : (
                    <NavLink to='/creerQuizz'>Créer quizz</NavLink>
                )
            }
        </>
    )
} 