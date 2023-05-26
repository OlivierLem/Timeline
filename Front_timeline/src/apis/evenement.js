const API_EVENT = '/api/evenement';

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

export async function getEvenements () {
    const response = await fetch(API_EVENT)
    if(response.ok) {
        return response.json()
    }
    
}

export async function getOneEvenement (slugName) {
    const response = await fetch (`${API_EVENT}/current?slugName=${slugName} `)
    if (response.ok) {
        
        return response.json()
    }
}

export async function associationEventAndPeriode (evenement) {
    console.log(evenement);
    /* const response = await fetch (`${API_EVENT}/association`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(evenement)
    }) */
}

