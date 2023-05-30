import { NavLink } from 'react-router-dom';
import './TimelinePage.scss';
import Time from './component/Times';
import { useEffect, useState } from 'react'
import { getCurrentPeriod } from '../../apis/period';
import moment from 'moment';
import 'moment/locale/fr';


export default function TimelinePage () {

    const [period, setPeriod] = useState({})
    const [evenements, setEvenements] = useState([])
    useEffect(() => {
        getCurrentPeriod('siecle_des_lumieres')
            .then(periode => {
                console.log(periode);
                //* ajouter tableaux d'image
                const evenementsMap = periode.map(p => (
                    {
                        id: p.idEvenement,
                        name:  p.name,
                        slugName: p.slugName,
                        date: moment(p.date).locale('fr').format('DD MMMM YYYY'),
                        year: moment(p.date).year()
                    }
                ))
                setEvenements(evenementsMap)

                const periodeObj = {
                    audio: periode[0].audio,
                    color: periode[0].color,
                    debutPeriode: periode[0].debutPeriode,
                    finPeriode: periode[0].finPeriode,
                    namePeriod: periode[0].noms,
                }
                //console.log(periodeObj);
                setPeriod(periodeObj)
            })
    }, [])

    return (
        <section>
            <h1>Époque moderne</h1>
            <div className="periodTitle">
                <div>
                    <h2>{period.namePeriod} <span>({period.debutPeriode}-{period.finPeriode})</span></h2>
                    <button><i className="fa-solid fa-timeline"></i></button>
                </div>
                <NavLink to='/quizz'>En voir plus <i className="fa-solid fa-arrow-right"></i></NavLink>
            </div>
            
            <div className='timeline'>
                <div className='timelineBlock' >
                    {/* {
                        evenements.length > 0 ? (
                            evenements.map(e => (
                                <Time key={e.id} evenements={e} ></Time>
                            ))
                        ) : (
                            <p>pas d'événement</p>
                        )
                    } */}
                </div>
            </div>
        </section>
        
    )
}