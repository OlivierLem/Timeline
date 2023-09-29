 
export function ForgotPassword() {
    return (
        <section>
            <h1 className="title">Mots de passe oublié</h1>
            <form action="" className="formField">
                <p>Veuillez saisir votre adresse email ci-dessous et nous vous enverrons un mail pour changer votre mot de passe.</p>
                <div>
                    <input type="text" placeholder="Email" aria-placeholder="Email"/>
                </div>
                <button type="submit">Envoyer un email</button>
            </form>
        </section>
    )
}