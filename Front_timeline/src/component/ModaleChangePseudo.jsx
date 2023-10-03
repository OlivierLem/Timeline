import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { changePseudo } from "../apis/user";


export function ModaleChangePseudo ({id, pseudo}) {

    const defaultValues = {
        pseudo: pseudo,
    }

    const navigate = useNavigate()

    const shema = yup.object({
        pseudo: yup
            .string()
            .required('Ce champ est vide'),
    })

    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting } ,
        setError, 
        clearErrors
    } = useForm({
        defaultValues,
        resolver: yupResolver(shema)
    })

    const submit = handleSubmit( async (values) => {
        try {
            clearErrors();
            await changePseudo(values).then((v) => {
                console.log(v.message);
                if(v.message === 'le pseudo à été modifier') {
                    navigate(0)
                } else {
                    let message = v.message
                    setError('generic', {type: 'generic', message})

                }
            }).catch(err => {
                console.log(err);
            })
        } catch (message) {
            setError('generic', {type: 'generic', message})
        }
    })

    return (
        <form onSubmit={submit}>
            <h2>Éditer votre pseudo</h2>
            <div>
                <label  htmlFor="pseudo">Pseudo</label>
                <input  {...register('pseudo')} name="pseudo" type="text"/>
            </div>
            {errors?.pseudo && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.pseudo.message}</p> }
            {errors.generic && ( <p className='form-error'><i className="fa-solid fa-x"></i>{errors.generic.message}</p> )}
            <button type="submit">modifier mots de passe</button>
        </form>
    )
}