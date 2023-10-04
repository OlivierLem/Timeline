import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function ErrorPage () {

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => navigate('/'), 2000)
    }, [])
    return (
        <section>
            <h1 className="title">Page inconnu</h1>
            <p>Vous allez être redirigé</p>
        </section>
    )
}