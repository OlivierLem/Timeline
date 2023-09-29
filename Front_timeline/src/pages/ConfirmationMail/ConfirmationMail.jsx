import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { confirmationEmail } from "../../apis/mailToken";

export function ConfirmationEmail () {
    const navigate = useNavigate()
    const [token, setToken]  = useSearchParams(); 

    useEffect(() => {
        confirmationEmail(token.get('token'))
       /*  setTimeout(() => {
            navigate('/connexion')
        }, 3000); */
    }, [])
    
    return (
        <>
            <p>Email validé !</p>
        </>
    )
} 