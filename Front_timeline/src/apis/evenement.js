const API_EVENT = '/api/evenement';


// créer un événement
export async function createEvenement(evenement) {
    console.log(evenement);
    const response = await fetch(API_EVENT, {
        method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(evenement),
    })
    const backResponse = await response.json()
    console.log(backResponse);
    if (response.ok) {
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse
        } else {
            throw new Error("Error Api CreateUser")
        }
    }
}

// affiche les événements
export async function getEvenements () {
    const response = await fetch(API_EVENT)
    if(response.ok) {
        return response.json()
    }
}

// affiche les événements avec images de miniature
export async function getEvenementsWithMiniature () {
    const response = await fetch(`${API_EVENT}/withMiniature`)
    if(response.ok) {
        return response.json()
    }
}

// affiche 1 événement
export async function getOneEvenement (slugName) {
    const response = await fetch (`${API_EVENT}/current?slugName=${slugName} `)
    if (response.ok) {
        
        return response.json()
    }
}

// lie un event à une période
export async function associationEventAndPeriode (evenement) {
    console.log(evenement);
    const response = await fetch (`${API_EVENT}/association`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(evenement)
    })
    return response.json()
}

//supprime une événement
export async function deleteEvent(evenement) {
    const response = await fetch (`${API_EVENT}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(evenement)
    })
    return response.json()
}

// Créer un article d'un événement
export async function createArticle(article) {
    const response = await fetch(`${API_EVENT}/creerArticle`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(article)
    })
    return response.json()
}

// Affiche les article d'un évévement
export async function getArticleEvenement(slugName) {
    const response =  await fetch(`${API_EVENT}/getArticleEvenement?slugName=${slugName}`)
    return response.json();
}