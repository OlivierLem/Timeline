import { NavLink } from 'react-router-dom'
import './TimelinePage.scss'
import Time from './component/Times'

export default function TimelinePage () {

    return (
        <section>
            <h1>Époque moderne</h1>
            <div className="periodTitle">
                <div>
                    <h2>Siécle des lumiéres <span>(1715-1789)</span></h2>
                    <button><i className="fa-solid fa-timeline"></i></button>
                </div>
                <NavLink to='/quizz'>En voir plus <i className="fa-solid fa-arrow-right"></i></NavLink>
            </div>
            
            <div className='timeline'>
                <div className='timelineBlock' >
                    <Time>Sacre_de_Louis_XV</Time>
                    <Time>Sacre_de_Louis_XV</Time>
                    <Time>Sacre_de_Louis_XV</Time>
                    <Time>Sacre_de_Louis_XV</Time>
                    <Time>Sacre_de_Louis_XV</Time>
                </div>
            </div>
        </section>
        
    )
}