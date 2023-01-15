import {useEffect, useRef, useState} from "react"
import {initMap} from "../services/maps/mapService";
import {
    fetchTrelloCards,
    fetchTrelloLists,
    getTrelloCardsWithList,
    TrelloCardCompiled
} from "../services/trello/trelloService";
import {TrelloCard} from "../../types/TrelloCard";
import TrelloListMenu from "./TrelloList";

export default function TrelloControls() {
    const [trelloCards, setTrelloCards] = useState<TrelloCard[]>();
    const [trelloLists, setTrelloLists] = useState<TrelloList[]>();
    const [trelloCardWithList, setTrelloCardCompiled] = useState<TrelloCardCompiled[]>();

    useEffect(() => {
        getTrelloCardsWithList().then(setTrelloCardCompiled);
    }, [])

    //cards sorted by listName
    const cardsGroupedByListName = trelloCardWithList?.reduce((acc, card: TrelloCardCompiled) => {

        if (!acc[card._compiled.listName]) {
            acc[card._compiled.listName] = [];
        }
        acc[card._compiled.listName].push(card);
        return acc;
    }, {} as { [key: string]: TrelloCardCompiled[] });

    return <nav style={{
        overflow: "auto",
    }}>
        <h1>Alessia Sanna - Journal de Bord</h1>
        <div>
            {Object.keys(cardsGroupedByListName ?? {}).map((listName) => <TrelloListMenu
                key={listName}
                cards={cardsGroupedByListName ? cardsGroupedByListName[listName] : []}
            />)}
        </div>
    </nav>
}