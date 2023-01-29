import {useEffect, useState} from "react"
import {groupTrelloCardsByListName, TrelloCardCompiled, trelloFetchObserver$} from "../services/trello/trelloService";
import TrelloListMenu from "./TrelloList";
import {getDisplayableListNames} from "../services/trello/trelloUtils";

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
            {displayableListNames.map((listName) => <TrelloListMenu
                key={listName}
                cards={cardsGroupedByListName ? cardsGroupedByListName[listName] : []}
            />)}
        </div>
    </nav>
}