import { NavLink } from 'react-router-dom';
import './TimelinePage.scss';
import Time from './component/Times';
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import 'moment/locale/fr';
import { PeriodContext } from '../../context/PeriodContext.jsx';
import { getPeriodsWithEvent } from '../../apis/period';
import { hexToHSL } from '../../assets/script/hexToHsl';

export default function TimelinePage () {

    const { getPeriod, period, color,  evenements} = useContext(PeriodContext)
    const [ showChangeTimeline, setShowChangeTimeline ] = useState(false)

    const [periods, setPeriods] = useState([])
    useEffect(() => {
        getPeriod("age_des_vikings")
        getPeriodsWithEvent().then(p => {
            setPeriods(p)
        })

    }, [])

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
        console.log(slugName);
        getPeriod(slugName)
        setShowChangeTimeline(!showChangeTimeline)
    }

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
                    <button onClick={handleClick}><img src="assets/icons/icons-timeline.png" alt="" /></button>
                    <div className={`selectPeriod ${showChangeTimeline && 'active' }`}>
                        {
                            periods && (
                                periods.filter(p => (
                                    p.noms !== period.name
                                ))
                                .map((p) => (
                                    <button key={p.idPeriode} onClick={() => handleChangePeriod(p.slugName)}> 
                                        {p.noms} 
                                        <span> ({p.debutPeriode}-{p.finPeriode})</span>
                                    </button>
                                ))
                            )
                        }

                    </div>
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