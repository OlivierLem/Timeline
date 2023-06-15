const API_QUIZZ = '/api/quizz'

export async function getQuizz() {
    const response = await fetch(`${API_QUIZZ}`)
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