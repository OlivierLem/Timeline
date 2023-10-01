import { NavLink } from 'react-router-dom';
import './QuizzCardList.scss'

export function QuizzCardList ({key, quizz}) {
   const {noms, slugName, timer, type, nQuestion} = quizz;
    return (
        <div key={key} className='cardQuizz'>
            <div>
                <p><span>Période:</span>  {noms} </p>
                <p><span>Type: </span> {type} </p>
                <p><span className='quizzInfoTitle'>Nombre de question:</span><span className="quizzInfo">{nQuestion}</span> </p>
                <p><span className="quizzInfoTitle">Durée du quizz:</span> <span className="quizzInfo">{timer}s</span> </p>
            </div>
            <NavLink to={slugName}>Commencer</NavLink>
        </div>
    )
}