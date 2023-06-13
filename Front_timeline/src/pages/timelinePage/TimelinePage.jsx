import { NavLink } from 'react-router-dom';
import './TimelinePage.scss';
import Time from './component/Times';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import 'moment/locale/fr';
import { PeriodContext } from '../../context/PeriodContext.jsx';
import { getPeriodsWithEvent } from '../../apis/period';
import { hexToHSL } from '../../assets/script/hexToHsl';

export default function TimelinePage () {

    const { getPeriod, period, color,  evenements} = useContext(PeriodContext)
    const [ showChangeTimeline, setShowChangeTimeline ] = useState(false)
    const timelineRef = useRef()

    const [periods, setPeriods] = useState([])
    useEffect(() => {
        getPeriod()
        getPeriodsWithEvent().then(p => {
            //console.log(p);
            setPeriods(p)
        })
        console.log(period);
    }, [])

    useEffect (() => {
        if (evenements.length > 0 && evenements.length < 3) {
            timelineRef.current.style.overflow = 'hidden'            
        } else {
            timelineRef.current.style.overflow = 'scroll hidden'            
        }
    }, [evenements])
    useLayoutEffect(() => {
        if(color) {
            const r = document.querySelector(':root');
            // modification de la variable css primary avec la variable color de la période
            r.style.setProperty('--primary', color)
            // conversion du code couleur d'héxa à hsl
            let colorConverter = hexToHSL(color)
            // modification de la variable css secondary 
            // variable color en hsl avec moins de luminosité
            r.style.setProperty('--secondary', `hsl(
                ${colorConverter.h},
                ${colorConverter.s}%,
                ${colorConverter.l - 6}%
                )`)
        }
    }, [color]);

    const handleClick = () => {
        console.log(showChangeTimeline);
        setShowChangeTimeline(!showChangeTimeline)
    }

    const handleChangePeriod = (slugName) => {
        if (slugName) {
            console.log(slugName);
            getPeriod(slugName)
        } else {
            getPeriod()
        }
        
        setShowChangeTimeline(!showChangeTimeline)
    }

    return (
        <section>
            {/* <h1>Époque moderne</h1> */}
            <div className="periodTitle">
                <div>
                    {
                        period ? (
                            <h2>{period.name} <span>({period.debutPeriode}-{period.finPeriode})</span></h2>
                        ) : (
                            <h2>Timeline compléte</h2>
                        )
                    }
                    <button onClick={handleClick}><img src="assets/icons/icons-timeline.png" alt="" /></button>
                    <div className={`selectPeriod ${showChangeTimeline && 'active' }`}>
                        {
                            periods && period ? (
                                <>
                                    <button key={-1} onClick={() => handleChangePeriod()}> 
                                        Timeline compléte 
                                    </button>
                                    {periods.filter(p => (
                                        p.noms !== period.name
                                    ))
                                    .map((p) => (
                                        <button key={p.idPeriode} onClick={() => handleChangePeriod(p.slugName)}> 
                                            {p.noms} 
                                            <span> ({p.debutPeriode}-{p.finPeriode})</span>
                                        </button>
                                    ))}
                                </>
                            ) : (
                                periods.map((p) => (
                                    <button key={p.idPeriode} onClick={() => handleChangePeriod(p.slugName)}> 
                                        {p.noms} 
                                        <span> ({p.debutPeriode}-{p.finPeriode})</span>
                                    </button>
                                ))
                            )
                        }

                    </div>
                </div>
                {   period?.slugName && (
                    <NavLink to={`/periodes/${period.slugName}/quizz`}>En voir plus <i className="fa-solid fa-arrow-right"></i></NavLink>
                )

                }
            </div>
            
            <div ref={timelineRef} className='timeline'>
                <div className='timelineBlock' >
                    {
                        evenements.length > 0 ? (
                            evenements.map((e, i) => (
                                <Time key={i} evenements={e} ></Time>
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