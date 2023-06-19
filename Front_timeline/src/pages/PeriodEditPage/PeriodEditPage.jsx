import { useParams } from "react-router-dom"

export function PeriodEditPage () {
    const { periode } = useParams();
    let periodeTitle = periode.replaceAll('_', ' ')
    periodeTitle = periodeTitle.charAt(0).toUpperCase() + periodeTitle.slice(1)
    // page pour modifier une période
    return (
        <section>
            <h1> {periodeTitle} </h1>
        </section>
    )
}