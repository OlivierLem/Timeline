import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import './Profil.scss'
import { Navigate } from "react-router-dom";
import { ModaleChangePseudo } from "../../component/ModaleChangePseudo";
import { FormChangePassword } from "../../component/FormChangePassword";

export default function Profil () {
    const {user} = useContext(AuthContext);
    const [modaleChangePseudo, setModaleChangePseudo] = useState(false)
    const [modaleChangePassword, setModaleChangePassword] = useState(false)
    console.log(user);
    return (
        <>
            {
                user ? (
                    <>
                    <section>
                        <h1 className="title">Profil</h1>
                        <div className="formField profil">
                            <p>
                                <span><span>pseudo:</span> {user.pseudo} </span> 
                                <button onClick={() => {
                                    setModaleChangePseudo(true)
                                    setModaleChangePassword(false)
                                }
                                }>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </p>
                            <p><span>email: </span> {user.email} </p>
                            <span><p>Changer votre mots de passe</p> 
                                <button onClick={() =>{ 
                                    setModaleChangePseudo(false)
                                    setModaleChangePassword(true)
                                }}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>  
                            </span>
                        </div>
                    </section>
                    <div className={`modaleChangeInfoUser ${modaleChangePseudo ? 'active' : ''}`}>
                        <button 
                            className='closeModale' 
                            onClick={() => setModaleChangePseudo(false)}
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <ModaleChangePseudo pseudo={user.pseudo} />
                    </div>
                    <div className={`modaleChangeInfoUser ${modaleChangePassword ? 'active' : ''}`}>
                        <button 
                            className='closeModale' 
                            onClick={() => setModaleChangePassword(false)}
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <FormChangePassword />
                    </div>
                    </>
                ) : (
                    <Navigate to='/' />
                )
            }
        </>
    )
}