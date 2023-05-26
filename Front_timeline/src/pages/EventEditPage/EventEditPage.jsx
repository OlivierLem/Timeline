import { useParams } from "react-router-dom"

export function EventEditPage () {
    const { evenement } = useParams();
    let evenementTitle = evenement.replaceAll('_', ' ')
    evenementTitle = evenementTitle.charAt(0).toUpperCase() + evenementTitle.slice(1)

    return (
        <section>
            <h1> {evenementTitle} </h1>
            <form action="">
                <select name="" id="">
                    <option value="siécle des lumiéres">siécle des lumiéres</option>
                    <option value="test">test</option>
                </select>
                <button>Ajouter l'évenement</button>
            </form>
        </section>
    )
}