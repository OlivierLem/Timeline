import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import './Profil.scss'
import { Navigate } from "react-router-dom";

export default function Profil () {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <>
            {
                user ? (
                    <section>
                        <h1 className="title">Profil</h1>
                        <div className="formField profil">
                            <p>
                                <span><span>pseudo:</span> {user.pseudo} </span> 
                                <button><i className="fa-solid fa-pen-to-square"></i></button>
                            </p>
                            <p><span>email: </span> {user.email} </p>
                            <span><p>Changer votre mots de passe</p> <button><i className="fa-solid fa-pen-to-square"></i></button>  </span>
                        </div>
                    </section>
                ) : (
                    <Navigate to='/' />
                )
            }
        </>
    )
}