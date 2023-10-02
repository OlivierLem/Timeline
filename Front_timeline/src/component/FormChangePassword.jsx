import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "../apis/user";

export function FormChangePassword () {
    
    const defaultValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    const navigate = useNavigate()

    const shema = yup.object({
        oldPassword: yup
            .string()
            .required('Ce champ est vide'),
        newPassword: yup
            .string()
            .required('Ce champ est vide')
            .min(4, 'Le mdp doit avoir plus de 4 charactéres')
            .matches(/[0-9]/, "Le mdp n'as pas de chiffre")
            .matches(/[a-z]/, "Le mdp n'as pas de lettre en minuscule")
            .matches(/[A-Z]/, "Le mdp n'as pas de lettre en majuscule")
            .matches(/[-+!*$@%_]/, "Le mdp n'as pas de caractéres spéciaux"),
        confirmPassword: yup
            .string()
            .required('Ce champ est vide')
            .oneOf([yup.ref('newPassword')], "le mots de passe n'est pas le même"),
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
            await changePassword(values).then((v) => {
                if(v.message === 'le mots de passe à été modifier') {
                    navigate(0)
                }
                else {
                    let message = v.message
                    setError('generic', {type: 'generic', message})
                }
            })
        } catch (message) {
            setError('generic', {type: 'generic', message})
        }
    })
    
    return (
        <form onSubmit={submit}>
            <h2>Éditer votre mots de passe</h2>
            <div>
                <label htmlFor="oldPassword">Ancien mots de passe</label>
                <input type="password"  {...register('oldPassword')} name="oldPassword"/>
            </div>
            {errors?.oldPassword &&  <p className='errorMessage'>{errors.oldPassword.message}</p>} 

            <div>
                <label htmlFor="newPassword">nouveau mots de passe</label>
                <input type="password"  {...register('newPassword')} name="newPassword"/>
            </div>
            {errors?.newPassword &&  <p className='errorMessage'>{errors.newPassword.message}</p>} 

            <div>
                <label htmlFor="confirmPassword">confirmer mots de passe</label>
                <input type="password" {...register('confirmPassword')} name="confirmPassword"/>
            </div>
            {errors?.confirmPassword &&  <p className='errorMessage'>{errors.confirmPassword.message}</p>} 
            {errors.generic && ( <p className='errorMessage'>{errors.generic.message}</p> )}

            <button type="submit">modifier mots de passe</button>
        </form>
    )
}