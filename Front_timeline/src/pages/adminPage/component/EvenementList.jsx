import Evenement from "./Evenement"

export default function EvenementList () {
    const evenement = {
        name:  'Sacres de Louis XV',
        date: '24 Sept. 1722',
     }
    return (
        <div className='epoqueList'>
            <Evenement evenement={evenement} />
        </div>
    )
}