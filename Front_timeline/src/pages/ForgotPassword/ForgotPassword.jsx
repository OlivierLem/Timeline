import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { resetPassword } from '../../apis/user';

export function ForgotPassword() {
    const { user } = useContext(AuthContext)

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
            await resetPassword(values)
            navigate('/')
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
                    <h1 className="title">Mots de passe oublié</h1>
                    <form onSubmit={submit} className="formField">
                        <p>Veuillez saisir votre adresse email ci-dessous et nous vous enverrons un mail pour réinitialiser votre mot de passe.</p>
                        <div>
                            <input type="text" placeholder="Email" aria-placeholder="Email"/>
                        </div>
                        <button type="submit">Envoyer un mail</button>
                    </form>
                </section>
                )
            }
        </>
    )
}