const API_USER = '/api/user'; 

export async function createUser(newUser) {
    // requête http pour ajouter des utilisateur
    const response = await fetch(API_USER, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    })
}

export async function changePseudo(value) {
    const response = await fetch(`${API_USER}/changePseudo`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value)
    })
    return response.json()
}
export async function changePassword(value) {
    const response = await fetch(`${API_USER}/changePassword`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value)
    })
    return response.json()
}

export async function resetPassword(value) {
    const response = await fetch(`${API_USER}/resetPassword`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value)
    })
    return response.json()
}