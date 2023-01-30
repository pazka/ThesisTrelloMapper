import React, {useEffect, useState} from "react"
import {groupTrelloCardsByListName, trelloFetchObserver$} from "../services/trello/trelloService";
import TrelloListMenu from "./TrelloList";
import {getDisplayableListNames} from "../services/trello/trelloUtils";
import {TrelloCardCompiled} from "../../types/TrelloCard";

export default function TrelloControls() {
    const [trelloCardsCompiled, setTrelloCardCompiled] = useState<TrelloCardCompiled[]>();

    useEffect(() => {
        trelloFetchObserver$.subscribe({
                next: (data) => {
                    console.log("trelloFetchObserver$ data", data);
                    // @ts-ignore
                    setTrelloCardCompiled(data[0]);
                },
                error: error => console.error(error),
                complete: () => console.log("trelloFetchObserver completed")
            }
        )
    }, [])

    //cards sorted by listName
    const cardsGroupedByListName = groupTrelloCardsByListName(trelloCardsCompiled ?? []);
    const displayableListNames = getDisplayableListNames(Object.keys(cardsGroupedByListName)).reverse()

    return <nav className={"nav-controls scrollbar"}>
        <h1>Carnet de bord</h1>
        {!trelloCardsCompiled && <p>Loading...</p>}
        <div>
            {displayableListNames.map((listName) => <div key={listName}>
                    <TrelloListMenu
                        cards={cardsGroupedByListName ? cardsGroupedByListName[listName] : []}
                    />
                </div>
            )}
        </div>
    </nav>
}