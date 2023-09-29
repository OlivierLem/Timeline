import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, Navigate } from 'react-router-dom';
import { signin } from '../../apis/auth';

export function Connexion () {

    const user = undefined;

    const defaultValues = {
        pseudo: '',
        password: '',
        stayConnected: false
    }
     
    const shemaConnexion = yup.object({
        email: yup
            .string()
            .required('Ce champ est vide')
            .email('email incorrect'),
        password: yup
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
        resolver: yupResolver(shemaConnexion)
    })

    const submit = handleSubmit( async (values) => {

        try {
            clearErrors();
            await signin(values);
        } catch (message) {
            setError('generic', {type: 'generic', message})
        }
    })

    return (
        <>
            {
                user ? (
                    <Navigate to='/' />
                ) : (
                    <section>
                        <h1 className='title'>Connexion</h1>
                        <form className='formField' onSubmit={submit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input {...register('email')} type="text" name="email" />
                            </div>
                            {errors?.pseudo && <p className='errorMessage'>{errors.email.message}</p> }
                            <div>
                                <label htmlFor="password">Mots de passe</label>
                                <input {...register('password')} type="password" name="password"  />
                            </div>
                            {errors?.password && <p className='errorMessage'>{errors.password.message}</p> }
                            <NavLink to='/mots_de_passe_oublie' >Mots de passe oublié ?</NavLink>
                            <span>
                                <input {...register('stayConnected')} type="checkbox" name="stayConnected" />
                                <label htmlFor="stayConnected">Rester connecter</label>
                            </span>
                            <div className="groupButton">
                                <NavLink to='/inscription'>Pas inscrit ?</NavLink>
                                <button>Se connecter</button>
                            </div>
                        </form>
                    </section>

                )
            }
        </>
    )
}