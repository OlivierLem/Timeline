import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { createUser } from '../../apis/user';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export function Inscription () {

    const { user } = useContext(AuthContext)
    const defaultValues = {
        pseudo: '',
        password: '',
        email: '',
    }

    const navigate = useNavigate()

    const shema = yup.object({
        pseudo: yup
            .string()
            .required('Ce champ est vide'),
        email: yup
            .string()
            .required('Ce champ est vide')
            .email('email incorrect'),
        password: yup
            .string()
            .required('Ce champ est vide')
            .min(4, 'Le mdp doit avoir plus de 4 charactéres')
            .matches(/[0-9]/, "Le mdp n'as pas de chiffre")
            .matches(/[a-z]/, "Le mdp n'as pas de lettre en minuscule")
            .matches(/[A-Z]/, "Le mdp n'as pas de lettre en majuscule")
            .matches(/[-+!*$@%_]/, "Le mdp n'as pas de caractéres spéciaux"),
        confirm_password: yup
            .string()
            .required('Ce champ est vide')
            .oneOf([yup.ref('password')], "le mots de passe n'est pas le même"),
    })

    const { 
        register, 
        handleSubmit: handleSubmit, 
        formState: { errors },
        setError,
        clearErrors
    } = useForm({
        defaultValues,
        resolver: yupResolver(shema)
    })

    const submit = handleSubmit (async (values) => {
        console.log(values);
        try {
            clearErrors();
            await createUser(values)
                .then((message) => {
                    if(message === 'email déjà utilisé') {
                        setError('generic', {type: "generic", message})
                    } else {
                        navigate('/connexion')
                    }
                })            
            
        } catch (message) {
            setError('generic', {type: "generic", message})
        }
    })
    
    return (
        <>
            {
                user ? (
                    <Navigate to='/' />
                ) : (
                    <section>
                        <h1 className='title'>Inscription</h1>
                        <form className='formField' onSubmit={submit} >
                            <div>
                                <label htmlFor="pseudo">Pseudo</label>
                                <input {...register('pseudo')} type="text" name="pseudo" />
                            </div>
                            {errors?.pseudo &&  <p className='errorMessage'>{errors.pseudo.message}</p>}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input {...register('email')} type="text" name="email"  />
                            </div>
                            {errors?.email && <p className='errorMessage'>{errors.email.message}</p>}
                            <div>
                                <label htmlFor="password">Mots de passe</label>
                                <input {...register('password')} type="password" name="password" />
                            </div>
                            {errors?.password &&  <p className='errorMessage'>{errors.password.message}</p>} 
                            <div>
                                <label htmlFor="confirm_password">confirmation mots de passe</label>
                                <input {...register('confirm_password')} type="password" name="confirm_password" />
                            </div>
                            {errors?.confirm_password &&  <p className='errorMessage'>{errors.confirm_password.message}</p>}
                            {errors.generic && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.generic.message}</p>}

                            <p>En créant un compte, vous acceptez nos <NavLink to='/mentions_legales' target='_blank'>conditions générales</NavLink></p>
                            <div className="groupButton">
                                <NavLink to='/connexion'>Déjà inscrit ?</NavLink>
                                <button>S'inscrire</button>
                            </div>
                        </form>
                    </section>
                )
            }
        
        </>
    )
}