import example from './example.json';
import {TrelloCard} from "../../../types/TrelloCard";

export const TRELLO_API_KEY = "YGZH0dNdld7cMw66ZgSt0125"

export async function mockFetchTrelloExport(): Promise<TrelloCard[]> {
    //@ts-ignore
    return example.cards
}

export async function fetchTrelloExport(): Promise<TrelloCard[]> {
    if (process.env.NODE_ENV === 'development') {
        return mockFetchTrelloExport()
    }

    //@ts-ignore
    const trelloExport = await Trello.get(`https://api.trello.com/1/boards/6241fcc7a56cbd7b5fee8b14/cards?key=${TRELLO_API_KEY}`)
    const trelloExportJson = await trelloExport.json()
    return trelloExportJson
}

export async function getGoogleMarkersFromTrelloData(): Promise<google.maps.Marker[]> {
    return []
}