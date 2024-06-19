import { Articles } from "./Interface";

export const getHeadlines = async () => {
    try {
        const response = await fetch(`/api/getAllnews`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json();
        return data as Articles;
    } catch (error) {
        console.error(error)
    }
}

export const newByKeyWords = async (query: string) => {
    try {
        const response = await fetch(`/api/newByKeyword/${query}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json();
        return data as Articles;
    } catch (error) {
        console.error(error)
    }
}

export const source = async (query: string) => {
    try {
        const response = await fetch(`/api/sources/${query}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json();
        return data as Articles;
    } catch (error) {
        console.error(error)
    }
}