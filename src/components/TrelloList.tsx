import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Link} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {TrelloLabelsIcon} from "./TrelloLabelsIcon";
import {TrelloCardCompiled} from "../../types/TrelloCard";

export default function TrelloListMenu(
    {
        cards = []
    }: {
        cards: TrelloCardCompiled[]
    }) {
    if (cards.length === 0) return null;

    //@ts-ignore
    const listData: TrelloList = cards[0]._compiled.listData;

    const sortedByDateCards = cards.sort((a, b) => {
        const aDate = new Date(a.dateLastActivity);
        const bDate = new Date(b.dateLastActivity);
        return aDate.getTime() - bDate.getTime() > 0 ? 1 : -1;
    });

    return <Accordion id={"list-menu"}>
        <AccordionSummary
            expandIcon={<ExpandMore/>}
            aria-controls={"trello-list" + listData.id}
            id={"trello-list" + listData.id}
            className={"list-menu-name"}
        >
            {listData.name}
        </AccordionSummary>
        <AccordionDetails>
            <ul>
                {sortedByDateCards?.map((cardCompiled) => <li key={cardCompiled.id}>
                    <Link href={"#" + cardCompiled.id}>
                        <TrelloLabelsIcon className={"trello-icon"} labels={cardCompiled.labels}/>
                        {cardCompiled.name}
                    </Link>
                </li>)}
            </ul>
        </AccordionDetails>

    </Accordion>
}