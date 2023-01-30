import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {TrelloCardCompiled} from "../../../types/TrelloCard";

interface TrelloState {
    lists: TrelloList[],
    cards: TrelloCardCompiled[],
    board: TrelloBoardCompiled | null,
}

const initialState = {
    lists: [],
    cards: [],
    board: null
} as TrelloState

const trelloSlice = createSlice({
    name: 'trello',
    initialState,
    reducers: {
        updateTrelloCards(state, action: PayloadAction<TrelloCardCompiled[]>) {
            state.cards = action.payload
        },
        updateTrelloLists(state, action: PayloadAction<TrelloList[]>) {
            state.lists = action.payload
        },
        updateTrelloBoard(state, action: PayloadAction<TrelloBoardCompiled>) {
            state.board = action.payload
        },
    },
})

export const {updateTrelloCards, updateTrelloLists, updateTrelloBoard} = trelloSlice.actions

export default trelloSlice.reducer