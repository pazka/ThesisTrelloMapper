import {useEffect, useRef, useState} from "react"
import {initMap} from "../services/maps/mapService";
import {useLocation} from "react-router-dom";
import {openAnInfoWindows} from "../services/maps/infoWindows";
import {trelloFetchObserver$} from "../services/trello/trelloService";
import {trelloColorToRGB} from "./TrelloLabelsIcon";

export default function MapDisplay() {
    const location = useLocation()
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>();
    const [labels, setLabels] = useState<TrelloLabelList>({});

    const openCardIfRouteMatch = () => {
        if (location.hash !== "") {
            openAnInfoWindows(location.hash.slice(1, location.hash.length))
        }
    }


    useEffect(() => {
        if (ref.current && !map) {
            console.log("map ref changed", ref.current)
            const map = initMap(ref.current, () => {
                openCardIfRouteMatch()
            });
            if (map) {
                setMap(map);
            }
        }
    }, [ref, map])

    useEffect(() => {
        openCardIfRouteMatch()
    }, [location])

    useEffect(() => {
        trelloFetchObserver$.subscribe({
            next: (data) => {
                // @ts-ignore
                setLabels(data[1].labelNames);
            }
        })
    }, [])

    return <div id={"map-container"} style={{
    }}>
        <div ref={ref} id={"mainMap"} style={{
        }}/>
        <div  id={"map-legend"} style={{
        }}>
            {
                Object.keys(labels).filter(k => labels[k] != "").sort().map((color,i) => <span key={i} className="legend-item">
                    <span style={{display:"block",width: "10px", height: "10px",marginRight : "0.5em", backgroundColor: trelloColorToRGB(color)}}></span>
                    <span style={{color: "white"}}> {labels[color]}</span>
                    </span>
                )
            }
        </div>
    </div>
}