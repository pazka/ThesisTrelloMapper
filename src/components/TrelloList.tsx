import {TrelloCard} from "../../types/TrelloCard";
import {TrelloCardCompiled} from "../services/trello/trelloService";
import React from "react";
import {Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

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

    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMore/>}
            aria-controls={"trello-list" + listData.id}
            id={"trello-list" + listData.id}
        >
            <Typography sx={{width: '33%', flexShrink: 0}}>
                {listData.name}
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ul>
                {sortedByDateCards?.map((cardCompiled) => <li key={cardCompiled.id}>
                    <a href={cardCompiled.url} target="_blank" rel="noreferrer">
                        {cardCompiled.name}
                    </a>
                </li>)}
            </ul>
        </AccordionDetails>

    </Accordion>
}