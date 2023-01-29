import {useEffect, useState} from "react"
import {groupTrelloCardsByListName, TrelloCardCompiled, trelloFetchObserver$} from "../services/trello/trelloService";
import TrelloListMenu from "./TrelloList";

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
    const listNamesSortedByDate = Object.keys(cardsGroupedByListName)

    return <nav style={{
        overflow: "auto",
    }} className={"scrollbar"}>
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