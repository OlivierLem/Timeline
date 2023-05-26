import { useParams } from "react-router-dom"

export function EventEditPage () {
    const { evenement } = useParams();
    let evenementTitle = evenement.replaceAll('_', ' ')
    evenementTitle = evenementTitle.charAt(0).toUpperCase() + evenementTitle.slice(1)

    return (
        <section>
            <h1> {evenementTitle} </h1>
        </section>
    )
}