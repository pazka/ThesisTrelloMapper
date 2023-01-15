import example from './export_example.json';
import {TrelloCard} from "../../../types/TrelloCard";

// Trello control interface : https://trello.com/power-ups/63c42162c1ac8002c2aafbdb/edit
const TRELLO_API_KEY = "7ef26c60b9727dde14ff6ecbe7c2a02a"

//generated using my perosnnal trello account
const TRELLO_API_TOKEN = process.env.REACT_APP_TRELLO_TOKEN

export async function mockFetchTrelloCards(): Promise<any[]> {
    //@ts-ignore
    return example.cards
}

//from doc https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-get
export async function fetchTrelloCards(): Promise<TrelloCard[]> {
    if (process.env.NODE_ENV === 'development') {
        //return mockFetchTrelloCards()
    }

    //make fetch api call to trello
    const data = await fetch(`https://api.trello.com/1/boards/D6MEwgAM/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`)
    return await data.json()
}

export async function fetchTrelloLists(): Promise<TrelloList[]> {
    if (process.env.NODE_ENV === 'development') {
        //return mockFetchTrelloCards()
    }

    //make fetch api call to trello for getting the lists of the boars
    const data = await fetch(`https://api.trello.com/1/boards/D6MEwgAM/lists?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`)
    return await data.json()
}

export interface TrelloCardCompiled extends TrelloCard {
    _compiled: {
        listName: string
        listData?: TrelloList
        dateFromListName?: Date | null
    }
}

function injectListInformations(cards: TrelloCard[], lists: TrelloList[]): TrelloCardCompiled[] {
    return cards.map(card => {
        const list = lists.find(list => list.id === card.idList)
        return {
            ...card,
            _compiled: {
                listName: list?.name ?? "Unclassified",
                listData: list,
                dateFromListName: getDateOfCardFromListTitle(list?.name)
            }
        }
    })
}

function getDateOfCardFromListTitle(listName?: string): Date | null {
    if (!listName)
        return null

    //Date format is : DD/MM/YY
    const date = listName.match(/FAIT (\d{2})\/(\d{2})\/(\d{2})/)
    if (!date) {
        return null
    }

    return new Date(
        parseInt("20" + date[3]), // so that the year isn't 1923
        parseInt(date[2]) - 1, // minus one so that january is 0
        parseInt(date[1]) + 1 // wtf why +1 I don't know
    )
}


export async function getTrelloCardsWithList(): Promise<TrelloCardCompiled[]> {
    const cards = await fetchTrelloCards()
    const lists = await fetchTrelloLists()

    return injectListInformations(cards, lists)
}

export async function getGoogleMarkersFromTrelloData(): Promise<google.maps.Marker[]> {
    const cards = await fetchTrelloCards()
    const lists = await fetchTrelloLists()
    const cardsWithList = injectListInformations(cards, lists)

    return []
}
