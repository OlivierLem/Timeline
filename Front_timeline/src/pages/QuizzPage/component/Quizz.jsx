import { useEffect, useRef, useState } from "react";
import './Quizz.scss';
import { getQuizz } from "../../../apis/quizz";
import { useParams } from "react-router-dom";

export default function Quizz () {
    const [quizz, setQuizz] = useState()
    const [timer, setTimer] = useState(5) // ! bug timer ne prend pas la bonne valeur
    const [time, setTime] = useState(timer);
    const [stateQuestion, setStateQuestion] = useState(0);
    const {quizz: periodeSlug} = useParams()

    // ! bug de transition lors de l'affichage de la réponse 
    const [timerIsActive, setTimerIsActive] = useState(true);
    const reponsesRef = useRef();
    const [disableButton, setDisableButton] = useState(false);
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false);

    // fonction pour décrémenter le timer
    function changeTime () {
        setTime(time - 1)
    }

    useEffect(() => {
        getQuizz(periodeSlug).then(q => {
            console.log(q);
            setQuizz(q)
            setTime(q.timer)
        })
    }, [])
    /* function start() {
        setTime(timer);
        setTimerIsActive(true);
    } */

    // fonction pour reset le timer
    function reset() {
        setTimerIsActive(false);
        setTime(0);
    }


    useEffect(() => {
        let timeout = null
        // si le timer est supérieur à 0 et est active décréménte toute les secondes le timer
        // sinon on change la question est mest un nouveau timer
        if(time > 0 && timerIsActive) {
            timeout = setTimeout(changeTime, 1000 )

        } else if ((time < 1)){
            let reponses = reponsesRef.current.children

            for (let i = 0; i < reponses.length; i++) {
                if (quizz[stateQuestion].reponses[i].isValid) {
                    reponses[i].classList.add('goodResponse')
                }
            }
            
            if(stateQuestion < quizz.length - 1) {
                setTimeout(() => {
                    for (const reponse of reponses) {
                        reponse.classList.remove('goodResponse')
                    }
                    setStateQuestion(stateQuestion + 1)
                    setTime(timer)
                    setTimerIsActive(true)
                },1.5 * 1000)
            } else {
                setTimeout(() => {
                    setShowScore(true)
                }, 1.5 * 1000)
            }
            clearTimeout(timeout); 
        } 

        // reset du timer si le bouton est desactivé
        if(disableButton === true) {
            reset()
            clearTimeout(timeout);
        }
        
        /* if(stateQuestion === quizz.length) {
            console.log(stateQuestion);
            setShowScore(true)
        } */
        
    }, [time, timerIsActive])

    function handleClick(index) {
        // on récupére la réponse clicker et les réponses
        let currentResponse = reponsesRef.current.children[index];
        let reponses = reponsesRef.current.children
        
        // si la réponse est bonne on ajoute la classe goodResponse à la réponse clicker et on augmente le score
        // sinon on lui ajoute  la classe badResponse 
        for (let i = 0; i < reponses.length; i++) {
            if(
                quizz[stateQuestion].reponses[i].isValid &&
                reponses[i] === currentResponse
            ) 
            {
                currentResponse.classList.add('goodResponse')
                setScore(score + (((Math.round((time/timer) * 100) / 100) + 1) * 100)) 
            } 
            else {
                currentResponse.classList.add('badResponse')
            }
            
            if (quizz[stateQuestion].reponses[i].isValid) {
                reponses[i].classList.add('goodResponse')
            }
            
            // on désactive les bouton ne pas pouvoir clicker sur d'autres bouton
            // aprés 1.5s on change de question on supprimer les classes ajouté
            // à la derniére question aprés 1.5s on affiche le score final
            setDisableButton(true)
            if ( stateQuestion  < quizz.length - 1){
                setTimeout(() => {
                    setStateQuestion(stateQuestion + 1)
                    for (const reponse of reponses) {
                      reponse.classList.remove('goodResponse')
                    }
                    currentResponse.classList.remove('badResponse')
                    setDisableButton(false)
                    setTime(timer)
                    setTimerIsActive(true)
                },1.5 * 1000)
            } else {
                setTimeout(() => {
                    setShowScore(true)
                }, 1.5 * 1000)
            }
        }
    }

    // composant quizz, affiche le numéro de la question, son score le timer
    // la question et ces réponses
    return (
        <div className={'quizz'}>
            { quizz ? 
                showScore === false ? (
                    <>
                        <div>
                            <div className="paramsQuizz">
                                <p>{stateQuestion + 1} / {quizz.length}</p> 
                                <p className='score'>Score: {score}</p> 
                                {
                                    <div className={`timer ${time < 1 && 'unactive'}`}>
                                        {
                                            time > 0 && (
                                                <svg viewBox="0 0 40 40" className={`timerSvg`}>
                                                    <circle 
                                                        style={{animation: `timerSvg linear ${timer}s`}}
                                                        className={`timerSvg__segment`}
                                                        cx="20" cy="20" r="16" 
                                                    >
                                                    </circle>
                                                </svg>
                                            )
                                        }
                                        
                                        <p> {time} </p>
                                    </div>
                                }
                            </div>
                            
                            <h3>{quizz[stateQuestion].intitule} ?</h3>
                                                    
                            </div>
                            <div ref={reponsesRef} className="reponsesQuizz">       
                                {
                                    quizz[stateQuestion].reponses.map((r, i) => (
                                        <button 
                                            key={i}
                                            className='response'
                                            disabled={disableButton}
                                            onClick={() => handleClick(i)}>
                                            {r.reponse}
                                            {/* <span>25%</span> */}
                                        </button>

                                    ))
                                }
                            </div>
                    </>
                ) : (
                    <p className="scoreFinal">Score: <span>{score} pts</span></p>
                )
                : (
                    <p>chargement quizz</p>
                )
            }
            
        </div>
    )
}