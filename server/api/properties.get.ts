export default defineEventHandler(async (event) => {
    const backendUrl = 'http://localhost:8000'

    try {
        const response = await fetch(`${backendUrl}/api/properties/`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        return {
            data: data.results || data,
        }
    } catch (error) {
        return {
            data: [],
        }
    }
});
