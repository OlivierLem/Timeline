import Periode from "./Periode";

export default function PeriodesList () {
    const periode = {
       name:  'Siécle des lumieres',
       startPeriode: 1715,
       endPeriode: 1789,
    }
    return (
        <div className='epoqueList'>
            <Periode periode={periode} />
        </div>
    )
}