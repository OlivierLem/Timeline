import { useEffect } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { confirmationEmail } from "../../apis/mailToken";

export function ConfirmationEmail () {
    const navigate = useNavigate()
    const [token, setToken]  = useSearchParams(); 

    useEffect(() => {
        confirmationEmail(token.get('token'))
        setTimeout(() => {
            navigate('/connexion')
        }, 2000);
    }, [])
    
    return (
        <>
        {
            token.get('token') ? (
                <p>Email validé !</p>
            ) : (
                <Navigate to='/connexion' />
            )
        }
        </>
    )
} 