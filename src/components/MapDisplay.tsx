import {useEffect, useRef, useState} from "react"
import {initMap} from "../services/maps/mapService";

export default function MapDisplay() {
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            const map = initMap(ref.current);
            if (map) {
                setMap(map);
            }
        }
    }, [ref, map])

    return <div ref={ref} id={"mainMap"} style={{
        width: "100%",
        height: "100%"
    }}/>
}