import {useEffect, useRef, useState} from "react"
import {initMap} from "../services/maps/mapService";

export default function MapDisplay() {
    const history = useHistory()
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            console.log("map ref changed",ref.current)
            const map = initMap(ref.current);
            if (map) {
                setMap(map);
            }
        }
    }, [ref, map])
    
    useEffect()

    return <div ref={ref} id={"mainMap"} style={{
        width: "100%",
        height: "100%"
    }}/>
}