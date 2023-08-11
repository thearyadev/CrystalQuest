export const apiEndpoint: string = "http://localhost:8000"

export default function buildUrl(route: string): string {


    if (process.env.NODE_ENV === "development") {
        return apiEndpoint + route
    } else {
        return route
    }
}