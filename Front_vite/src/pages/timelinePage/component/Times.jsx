import { NavLink } from "react-router-dom";

export default function Time ({date, children}) {

    let event = children.replaceAll('_', ' ')
    event = event.charAt(0).toUpperCase() + event.slice(1)
    return (
    <div className="time">
        <img src="assets/images/sacre_de_louis_xv.jpg" alt="sacre_de_louis_xv" />
        <div className="timeDisplay">
            <p>1722</p>
            <span></span>
        </div>
        <div className="timeText">
            <p>24 septembre</p>
            <p className="event">
                Sacre de Louis XV
            </p>
            <NavLink to={`/articles/${children}`}>En voir plus</NavLink>
        </div>
    </div>
    )
}