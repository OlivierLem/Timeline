import moment from "moment";
import { NavLink } from "react-router-dom";
import 'moment/locale/fr'  // without this line it didn't work
export default function Evenement ({evenement: {name, date, slugName}}) {

    
    //const dateFormat = new Date(date).toLocaleDateString("fr")
    const dateFormat = moment(date, 'DD-MM-YYYY').locale('fr')
    console.log(dateFormat);
    return (
        <div>
            <p>{name}</p>
            <p className="date"><span>Date: </span> {dateFormat.format('DD MMMM YYYY')} {/* {dateFormat} */}  </p>
            <p>La news n'a pas encore était créer</p>
            <NavLink to={`/admin/evenements/${slugName}`} className='edit'><i className="fa-solid fa-pen-to-square"></i></NavLink>
        </div>
    )
}