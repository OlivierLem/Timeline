import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export function ForgotPassword() {
    const { user } = useContext(AuthContext)

    return (
        <>
            {
                user ? (
                    <Navigate to='/' />
                ) : (
                <section>
                    <h1 className="title">Mots de passe oublié</h1>
                    <form action="" className="formField">
                        <p>Veuillez saisir votre adresse email ci-dessous et nous vous enverrons un mail pour changer votre mot de passe.</p>
                        <div>
                            <input type="text" placeholder="Email" aria-placeholder="Email"/>
                        </div>
                        <button type="submit">Envoyer un mail</button>
                    </form>
                </section>
                )
            }
        </>
    )
}