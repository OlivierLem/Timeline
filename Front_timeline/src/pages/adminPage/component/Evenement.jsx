import moment from "moment";
import { NavLink } from "react-router-dom";
import 'moment/locale/fr'  // without this line it didn't work
export default function Evenement ({evenement: {name, date, slugName, testArticle}}) {


    //const dateFormat = new Date(date).toLocaleDateString("fr")
    
    const dateFormat = moment(date).locale('fr') // date traduite en français
    //console.log(dateFormat);

    // carte de l'event avec ces paramétres et un lien pour éditer l'evenement
    // on formate la date, si l'evenement à un article on affiche un lien vers l'article
    return (
        <div className={`card ${testArticle === 1 && 'cardWithArticle'}`}>
            <p>{name}</p>
            <p className="date"><span>Date: </span> {dateFormat.format('DD MMMM YYYY')} {/* {dateFormat} */}  </p>
            {
                testArticle === 1 ? (
                    <NavLink to={`/articles/${slugName}`}>Voir la news</NavLink>
                ) : (
                    <p>La news n'a pas encore était créer</p>
                )
            }
            <NavLink to={`/admin/evenements/${slugName}`} className='edit'><i className="fa-solid fa-pen-to-square"></i></NavLink>
        </div>
    )
}