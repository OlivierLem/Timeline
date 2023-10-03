import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { resendConfirmationEmail } from '../../apis/mailToken';
import "./Connexion.scss"

export function Connexion () {

    const { user, signin } = useContext(AuthContext)
    const defaultValues = {
        password: '',
        stayConnected: true
    }
    const navigate = useNavigate()

    const [mailNotConfirm, setMailNotConfirm] = useState();
    const [currentMail, setCurrentMail] = useState();
     
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
        formState: { errors } ,
        setError, 
        clearErrors
    } = useForm({
        defaultValues,
        resolver: yupResolver(shemaConnexion)
    })

    const submit = handleSubmit( async (values) => {

        try {
            clearErrors();
            await signin(values)
                .then(() => navigate('/'))
                .catch(message => { 
                    console.log(message);
                    if(message === 'Votre email doit être confirmé') {
                        setMailNotConfirm(() => true)
                        setCurrentMail(() => values.email)
                    } 
                    else {
                        setError('generic', {type: 'generic', message})
                    }
                })
            setCurrentMail()
        } catch (message) {
            setError('generic', {type: 'generic', message})
        }
    })

    const resendVerifMail = async (email) => {
        try {
            await resendConfirmationEmail(email)
            setCurrentMail()
            setMailNotConfirm(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {
                user ? (
                    <Navigate to='/' />
                ) : (
                    <>
                    <section>
                        <h1 className='title'>Connexion</h1>
                        <form className='formField' onSubmit={submit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input {...register('email')} type="text" name="email" />
                            </div>
                            {errors?.email && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.email.message}</p> }
                            <div>
                                <label htmlFor="password">Mots de passe</label>
                                <input {...register('password')} type="password" name="password"  />
                            </div>
                            {errors?.password && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.password.message}</p> }
                            {errors.generic && <p className='form-error'><i className="fa-solid fa-x"></i>{errors.generic.message}</p>}

                            <NavLink to='/mots_de_passe_oublie' >Mots de passe oublié ?</NavLink>
                            {/* <span>
                                <input {...register('stayConnected')} type="checkbox" name="stayConnected" />
                                <label hpatmlFor="stayConnected">Rester connecter</label>
                            </span> */}
                            <div className="groupButton">
                                <NavLink to='/inscription'>Pas inscrit ?</NavLink>
                                <button>Se connecter</button>
                            </div>
                        </form>
                    </section>
                    {
                        mailNotConfirm && (
                            <div className='backgroundMailNotValid'>
                                <div className='modaleMailNotValid'>
                                    <button 
                                        className='closeModale' 
                                        onClick={ () => {
                                            setMailNotConfirm(false)
                                            setCurrentMail()
                                        }
                                    }>
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                    <p>Votre mail n'as pas été confirmé !</p>
                                    <button onClick={() => resendVerifMail(currentMail)}>envoyer mail de confirmation</button>
                                </div>
                            </div>
                        ) 
                    }
                    </>

                )
            }
        </>
    )
}