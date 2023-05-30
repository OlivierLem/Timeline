import moment from "moment";
import { NavLink } from "react-router-dom";

export default function Time ({evenements}) {

    const { name, slugName, date, year} = evenements
    return (
    <div className="time">
        <img src="assets/images/sacre_de_louis_xv.jpg" alt="sacre_de_louis_xv" />
        <div className="timeDisplay">
            <p> {year} </p>
            <span></span>
        </div>
        <div className="timeText">
            <p>{date} </p>
            <p className="event">
                {name}
            </p>
            <NavLink to={`/articles/${slugName}`}>En voir plus</NavLink>
        </div>
    </div>
    )
}