import { NextRequest, NextResponse } from "next/server";
export const GET = async (request: NextRequest, { params }: any) => {
    try {
        const { source } = params
        const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${process.env.API_KEY}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error)
    }
}