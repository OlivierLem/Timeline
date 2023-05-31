import { NavLink } from 'react-router-dom';
import './TimelinePage.scss';
import Time from './component/Times';
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import 'moment/locale/fr';
import { PeriodContext } from '../../context/PeriodContext.jsx';


export default function TimelinePage () {

    const { getPeriod, period, color,  evenements} = useContext(PeriodContext)
    //const [ changeTimeline, setChangeTimeline ] = useState(false)
    useEffect(() => {
        getPeriod('siecle_des_lumieres')
    }, [])

    useLayoutEffect(() => {
        const r = document.querySelector(':root');
        r.style.setProperty('--primary', color)
    }, [color])
  /*   const handleClick = () => {
        
    }
 */
    return (
        <section>
            <h1>Époque moderne</h1>
            <div className="periodTitle">
                <div>
                    {
                        period && (
                            <h2>{period.name} <span>({period.debutPeriode}-{period.finPeriode})</span></h2>
                        )
                    }
                    <button><i className="fa-solid fa-timeline"></i></button>
                </div>
                <NavLink to='/quizz'>En voir plus <i className="fa-solid fa-arrow-right"></i></NavLink>
            </div>
            
            <div className='timeline'>
                <div className='timelineBlock' >
                    {
                        evenements.length > 0 ? (
                            evenements.map(e => (
                                <Time key={e.id} evenements={e} ></Time>
                            ))
                        ) : (
                            <p>pas d'événement</p>
                        )
                    }
                </div>
            </div>
        
        </section>
        
    )
}