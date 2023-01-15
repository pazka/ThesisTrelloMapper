import {useEffect, useRef, useState} from "react"
import {initMap} from "../services/maps/mapService";
import {
    fetchTrelloCards,
    fetchTrelloLists, getDateOfCardFromListTitle,
    getTrelloCardsWithList, groupTrelloCardsByListName,
    TrelloCardCompiled
} from "../services/trello/trelloService";
import {TrelloCard} from "../../types/TrelloCard";
import TrelloListMenu from "./TrelloList";

export default function TrelloControls() {
    const [trelloCardsCompiled, setTrelloCardCompiled] = useState<TrelloCardCompiled[]>();

    useEffect(() => {
        getTrelloCardsWithList().then(setTrelloCardCompiled);
    }, [])

    //cards sorted by listName
    const cardsGroupedByListName = groupTrelloCardsByListName(trelloCardsCompiled ?? []);
    const listNamesSortedByDate = Object.keys(cardsGroupedByListName)

    return <nav style={{
        overflow: "auto",
    }}>
        <h1>Alessia Sanna - Journal de Bord</h1>
        {!trelloCardsCompiled && <p>Loading...</p>}
        <div>
            {listNamesSortedByDate.map((listName) => <TrelloListMenu
                key={listName}
                cards={cardsGroupedByListName ? cardsGroupedByListName[listName] : []}
            />)}
        </div>
    </nav>
}