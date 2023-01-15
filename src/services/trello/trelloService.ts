import example from './export_example.json';
import {TrelloCard} from "../../../types/TrelloCard";

// Trello control interface : https://trello.com/power-ups/admin
const TRELLO_API_KEY = "7ef26c60b9727dde14ff6ecbe7c2a02a"

//generated using my perosnnal trello account
const TRELLO_API_TOKEN = process.env.REACT_APP_TRELLO_TOKEN

export async function mockFetchTrelloExport(): Promise<any[]> {
    //@ts-ignore
    return example.cards
}

//from doc https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-get
export async function fetchTrelloExport(): Promise<TrelloCard[]> {
    if (process.env.NODE_ENV === 'development') {
        //return mockFetchTrelloExport()
    }

    //make fetch api call to trello
    const trelloExport = await fetch(`https://api.trello.com/1/boards/D6MEwgAM/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`)
    return await trelloExport.json()
}

export async function getGoogleMarkersFromTrelloData(): Promise<google.maps.Marker[]> {
    return []
}