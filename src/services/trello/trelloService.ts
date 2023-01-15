import example from './example.json';
import {TrelloCard} from "../../../types/TrelloCard";

export const TRELLO_API_KEY = "7ef26c60b9727dde14ff6ecbe7c2a02a"

export async function mockFetchTrelloExport(): Promise<TrelloCard[]> {
    //@ts-ignore
    return example.cards
}

export async function fetchTrelloExport(): Promise<TrelloCard[]> {
    if (process.env.NODE_ENV === 'development') {
        return mockFetchTrelloExport()
    }

    //@ts-ignore
    const trelloExport = await Trello.get(`https://api.trello.com/1/boards/D6MEwgAM/cards?key=${TRELLO_API_KEY}`)
    const trelloExportJson = await trelloExport.json()
    return trelloExportJson
}

export async function getGoogleMarkersFromTrelloData(): Promise<google.maps.Marker[]> {
    return []
}