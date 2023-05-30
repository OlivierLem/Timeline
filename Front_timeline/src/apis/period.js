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

export async function getCurrentPeriod() {
    // Récupére la période courante avec les table evenement qui lui sont liés
    const response = await fetch(`${API_PERIOD}/current`);
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

export async function getPeriodsFilter(eventYear) {
    // Récupére les périodes est récupére le nombre d'événement 
    // et de quizz quelle posséde
    console.log(eventYear);
   /*  const response = await fetch(`${API_PERIOD}?eventYear=${eventYear}`);
    console.log(response);
    return response.json(); */
}