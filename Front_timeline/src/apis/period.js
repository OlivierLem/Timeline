const API_PERIOD = '/api/period';

// requête pour créer une période
export async function createPeriod(period) {
    const response = await fetch(API_PERIOD, {
        method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(period),
    })
    const backResponse = await response.json()
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

// afficher la période courante
export async function getCurrentPeriod(slugName) {
    // Récupére la période courante avec les table evenement qui lui sont liés
    const response = await fetch(`${API_PERIOD}/current?slugName=${slugName}`);
    return response.json();
}

// afficher les periodes
export async function getPeriods() {
    // Récupére les périodes est récupére le nombre d'événement 
    // et de quizz quelle posséde
    const response = await fetch(`${API_PERIOD}`);
    return response.json();
}

// Requête pour afficher les périodes qui ont des événements
export async function getPeriodsWithEvent() {
    const response = await fetch(`${API_PERIOD}/withEvent`);
    return response.json();
}

// afficher les périodes comprise dans l'année de l'event
export async function getPeriodsFilter(eventYear) {
    // Récupére les périodes qui comprennent l'année de l'evenement
    const response = await fetch(`${API_PERIOD}?eventYear=${eventYear}`);
    return response.json();
}