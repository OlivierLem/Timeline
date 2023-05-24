const API_PERIOD = '/api/period';

export async function createPeriod(period) {
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
    const response = await fetch(`${API_PERIOD}/current`);
    console.log(response);
    return response.json();

}