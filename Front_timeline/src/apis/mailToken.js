const API_MAILTOKEN = `/api/mailToken`;

export async function confirmationEmail(token) {
    console.log(token);
    await fetch(`${API_MAILTOKEN}?token=${token}`);
}

export async function resendConfirmationEmail(email) {
    const response = await fetch(`${API_MAILTOKEN}/resend`, {
        method: 'POST',
        header: {
            "Content-Type": 'application/json'
        },
        body:  JSON.stringify(email),
    })
    return response.json()
}