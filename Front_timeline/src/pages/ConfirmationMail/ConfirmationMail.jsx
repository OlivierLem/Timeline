import { useEffect, useState } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { confirmationEmail, resendConfirmationEmail } from "../../apis/mailToken";

export function ConfirmationEmail () {
    const navigate = useNavigate()
    const [token, setToken]  = useSearchParams(); 
    const [mailValidate, setMailValidate] = useState();

    useEffect(() => {
        confirmationEmail(token.get('token')).catch(() => {
            if(message === 'Le jeton de confirmation est invalide ou a expiré.') {
                setMailValidate(false)
            } 
        })
        setTimeout(() => {
            navigate('/connexion')
        }, 2000);
    }, [])

    const resendVerifMail = async (email) => {
        try {
            await resendConfirmationEmail(email)
            setCurrentMail()
            setMailNotConfirm(false)
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <>
        {
            token.get('token') ? (
                    mailValidate === false ? (
                        <p>L'email de confirmation à expiré</p>
                    ) : (
                        <p>Votre mail est validé</p>
                    )
            ) : (
                <Navigate to='/connexion' />
            )
        }
        </>
    )
} 