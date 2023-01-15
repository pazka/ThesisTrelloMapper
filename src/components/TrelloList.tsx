import {TrelloCard} from "../../types/TrelloCard";
import {TrelloCardCompiled} from "../services/trello/trelloService";

export default function TrelloListMenu(
    {
        cards = []
    }: {
        cards: TrelloCardCompiled[]
    }) {
    if (cards.length === 0) return null;

    return <div>
        <h2>{cards[0]._compiled.listName}</h2>
        <ul>
            {cards?.map((cardCompiled) => <li key={cardCompiled.id}>
                <a href={cardCompiled
                    .url}
                   target="_blank"
                   rel="noreferrer">
                    {cardCompiled

                        .name}
                </a>
            </li>)}
        </ul>

    </div>
}