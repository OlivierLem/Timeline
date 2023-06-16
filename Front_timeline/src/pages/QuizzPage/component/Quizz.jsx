import { useEffect, useRef, useState } from "react";
import './Quizz.scss';

export default function Quizz ({quizz, timer}) {
    const [time, setTime] = useState(timer);
    const [stateQuestion, setStateQuestion] = useState(0);

    // ! bug de transition lors de l'affichage de la réponse 
    const [timerIsActive, setTimerIsActive] = useState(true);
    const reponsesRef = useRef();
    const [disableButton, setDisableButton] = useState(false);
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false);

    function changeTime () {
        setTime(time - 1)
    }

    function start() {
        setTime(timer);
        setTimerIsActive(true);
      }

    function reset() {
        setTimerIsActive(false);
        setTime(0);
    }


    useEffect(() => {
        let timeout = null
        if(time > 0 && timerIsActive) {
            timeout = setTimeout(changeTime, 1000 )

        } else if ((time < 1)){
            if(stateQuestion < quizz.length - 1) {
                setTimeout(() => {
                    setStateQuestion(stateQuestion + 1)
                    setTime(timer)
                    setTimerIsActive(true)
                },1.5 * 1000)
            }
            clearTimeout(timeout);
        } 

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
        let currentResponse = reponsesRef.current.children[index];
        let reponses = reponsesRef.current.children
        
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
            
            setDisableButton(true)
            if ( stateQuestion  < quizz.length - 1){
                setTimeout(() => {
                    setStateQuestion(stateQuestion + 1)
                    currentResponse.classList.remove('goodResponse')
                    currentResponse.classList.remove('badResponse')
                    setDisableButton(false)
                    setTime(timer)
                    setTimerIsActive(true)
                },1.5 * 1000)
            } else {
                setShowScore(true)
            }
        }
    }
    return (
        <div className={'quizz'}>
            {
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
            }
            
        </div>
    )
}