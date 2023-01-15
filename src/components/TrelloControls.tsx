import {useEffect, useRef, useState} from "react"
import {initMap} from "../services/maps/mapService";
import {
    fetchTrelloCards,
    fetchTrelloLists,
    getTrelloCardsWithList,
    TrelloCardWithList
} from "../services/trello/trelloService";
import {TrelloCard} from "../../types/TrelloCard";

export default function TrelloControls() {
    const [trelloCards, setTrelloCards] = useState<TrelloCard[]>();
    const [trelloLists, setTrelloLists] = useState<TrelloList[]>();
    const [trelloCardWithList, setTrelloCardWithList] = useState<TrelloCardWithList[]>();
    
    useEffect(() => {
        getTrelloCardsWithList().then(setTrelloCardWithList);
    },[])

    //return a absolute position floating div 
    return <div>
        <pre style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "300px",
            height: "100%",
            backgroundColor: "white",
            overflow: "scroll"
        }}>{JSON.stringify(trelloCardWithList, null, 4)}</pre>
        <pre style={{
        position: "absolute",
        top: "0",
        right: "0",
        width: "300px",
        height: "100%",
        backgroundColor: "white",
        overflow: "scroll"
    }}>{JSON.stringify(trelloCards, null, 4)}</pre>
    </div>
}