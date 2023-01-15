import {useEffect, useRef, useState} from "react"
import {initMap} from "../services/maps/mapService";
import {fetchTrelloExport} from "../services/trello/trelloService";
import {TrelloCard} from "../../types/TrelloCard";

export default function TrelloControls() {
    const [trelloExport, setTrelloExport] = useState<any>();

    useEffect(() => {
        fetchTrelloExport().then((data : TrelloCard[]) => {
            console.log(data);
            setTrelloExport(data);
        });
    })

    //return a absolute position floating div 
    return <div style={{
        position: "absolute",
        top: "0",
        right: "0",
        width: "300px",
        height: "100%",
        backgroundColor: "white"
    }}></div>
}