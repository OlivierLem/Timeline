const API_PERIOD = '/api/period';

export async function createPeriod(period) {
    // Créer une periode qui posséde des évenements, des quizz et un article
    console.log(period);
    const response = await fetch(API_PERIOD, {
        method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(period),
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

export async function getCurrentPeriod(slugName) {
    // Récupére la période courante avec les table evenement qui lui sont liés
    const response = await fetch(`${API_PERIOD}/current?slugName=${slugName}`);
    console.log(response);
    return response.json();
}
export async function getPeriods() {
    // Récupére les périodes est récupére le nombre d'événement 
    // et de quizz quelle posséde
    const response = await fetch(`${API_PERIOD}`);
    console.log(response);
    return response.json();
}

export async function getPeriodsWithEvent() {
    // Récupére les périodes qui ont des événements
    const response = await fetch(`${API_PERIOD}/withEvent`);
    console.log(response);
    return response.json();
}

export async function getPeriodsFilter(eventYear) {
    // Récupére les périodes qui comprennent l'année de l'evenement
    console.log(eventYear);
    const response = await fetch(`${API_PERIOD}?eventYear=${eventYear}`);
    console.log(response);
    return response.json();
}