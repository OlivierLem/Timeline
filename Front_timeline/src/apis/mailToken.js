const API_MAILTOKEN = `/api/mailToken`;

export async function confirmationEmail(token) {
    const response = await fetch(`${API_MAILTOKEN}?token=${token}`);
    return response.json()
}

export async function resendConfirmationEmail(email) {
    const response = await fetch(`${API_MAILTOKEN}/resend`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body:  JSON.stringify({
            email: email
        }),
    })
    return response.json()
}