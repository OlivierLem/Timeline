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
    console.log(response.json())
}