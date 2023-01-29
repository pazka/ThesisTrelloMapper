import example from './export_example.json';
import {TrelloCard} from "../../../types/TrelloCard";
import {from, Observable} from "rxjs";
import {TrelloChecklist} from "../../../types/TrelloChecklist";
import {getDateOfCardFromListTitle} from "./trelloUtils";

// Trello control interface : https://trello.com/power-ups/63c42162c1ac8002c2aafbdb/edit
const TRELLO_API_KEY = "7ef26c60b9727dde14ff6ecbe7c2a02a"

//generated using my perosnnal trello account
const TRELLO_API_TOKEN = process.env.REACT_APP_TRELLO_TOKEN

let allCards: TrelloCardCompiled[] = []

export interface TrelloCardCompiled extends TrelloCard {
    _compiled: {
        listName: string
        listData?: TrelloList
        dateInListName?: Date | null
        checklists?: TrelloChecklist[]
    }
}

function injectListInformationsInCard(cards: TrelloCard[] | TrelloCardCompiled[], lists: TrelloList[]): TrelloCardCompiled[] {
    return cards.map(card => {
        const list = lists.find(list => list.id === card.idList)
        if(!list) return null
        return {
            ...card,
            _compiled: {
                // @ts-ignore
                ...card._compiled,
                listName: list?.name ?? "Unclassified",
                listData: list?? {},
                dateInListName: getDateOfCardFromListTitle(list?.name)
            }
        }
    }).filter(x=>x) as TrelloCardCompiled[]
}

export function injectLabelsInformationsInBoard(board: TrelloBoard): TrelloBoardCompiled {
    const labels = board.labelNames
    const labelToColor: TrelloLabelList = {}

    Object.keys(labels).forEach(color => {
        labelToColor[labels[color]] = color
    })

    return {
        ...board,
        _compiled: {
            labelToColor
        }
    }
}

export function injectChecklistsInformationsInCard(cards: TrelloCard[] | TrelloCardCompiled[], checklists: TrelloChecklist[]): TrelloCardCompiled[] {
    return cards.map(card => {
        const cardChecklists = card.idChecklists.map(checklistId => checklists.find(checklist => checklist.id === checklistId))

        return {
            ...card,
            _compiled: {
                // @ts-ignore
                ...card._compiled,
                checklists: cardChecklists
            }
        }
    })
}

export function removePlanywayDataFromCard(card: TrelloCardCompiled): TrelloCardCompiled {
    //remove all text from description that is placed after [](Planyway_Data-DO_NOT_DELETE)[]
    const description = card.desc
    const index = description.indexOf("[](Planyway_Data-DO_NOT_DELETE)[]")
    if (index !== -1) {
        card = {
            ...card,
            desc: description.substring(0, index)
        }
    }
    
    return card
}



export async function getTrelloCardsWithList(): Promise<TrelloCardCompiled[]> {
    const cards = fetchTrelloCards()
    const lists = fetchTrelloLists().then(lists => lists.map(removeAllEmojiFromTrelloListName).map(removeWordsFromTrelloListName))
    const labels = fetchTrelloBoard()
    const checklists = fetchTrelloChecklists()

    const allValues = await Promise.all([cards, lists, labels, checklists])

    allCards = injectListInformationsInCard(allValues[0], allValues[1])
    allCards = injectChecklistsInformationsInCard(allCards, allValues[3])
    allCards = allCards.map(card => removePlanywayDataFromCard(card))

    return allCards
}

export function groupTrelloCardsByListName(cards: TrelloCardCompiled[]): { [key: string]: TrelloCardCompiled[] } {
    return cards?.reduce((acc, card: TrelloCardCompiled) => {

        if (!acc[card._compiled.listName]) {
            acc[card._compiled.listName] = [];
        }
        acc[card._compiled.listName].push(card);
        return acc;
    }, {} as { [key: string]: TrelloCardCompiled[] });
}

export async function mockFetchTrelloCards(): Promise<any[]> {
    //@ts-ignore
    return example.cards
}

//from doc https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-get
export async function fetchTrelloCards(): Promise<TrelloCard[]> {
    //make fetch api call to trello
    const data = await fetch(`https://api.trello.com/1/boards/D6MEwgAM/cards/all?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`)
    return await data.json()
}

export async function fetchTrelloLists(): Promise<TrelloList[]> {
    //make fetch api call to trello for getting the lists of the boars
    const data = await fetch(`https://api.trello.com/1/boards/D6MEwgAM/lists/closed?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`)
    return await data.json()
}

function removeAllEmojiFromTrelloListName(list: TrelloList): TrelloList {
    const name = list.name.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, "")
    return {
        ...list,
        name
    }
}

function removeWordsFromTrelloListName(list: TrelloList): TrelloList {
    const name = list.name.replace(/(FAIT)/gi, "")
    return {
        ...list,
        name
    }
}

export async function fetchTrelloBoard(): Promise<TrelloBoardCompiled> {
    //make fetch api call to trello for getting the lists of the boars
    const data = await fetch(`https://api.trello.com/1/boards/D6MEwgAM?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`)
    const jsonData: TrelloBoard = await data.json()

    return injectLabelsInformationsInBoard(jsonData)
}

export async function fetchTrelloChecklists(): Promise<TrelloChecklist[]> {
    //make fetch api call to trello for getting the lists of the boars
    const data = await fetch(`https://api.trello.com/1/boards/D6MEwgAM/checklists?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`)

    return await data.json()
}

export const trelloFetchObserver$: Observable<[TrelloCardCompiled[], TrelloBoard]> = from(Promise.all([getTrelloCardsWithList(), fetchTrelloBoard()]))
