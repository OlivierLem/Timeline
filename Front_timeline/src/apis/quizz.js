const API_QUIZZ = '/api/quizz'

export async function getQuizz(periode) {
    const response = await fetch(`${API_QUIZZ}?slugName=${periode}`)
    return response.json()
}

export async function createQuizz(quizz) {
    const response = await fetch(`${API_QUIZZ}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(quizz)
    })
}