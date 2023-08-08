export const apiEndpoint: string = "http://localhost:8000"

export default function buildUrl(route: string): string {
    return apiEndpoint + route
}