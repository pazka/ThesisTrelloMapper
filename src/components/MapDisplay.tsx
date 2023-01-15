import {useEffect, useRef, useState} from "react"
import {initMap} from "../services/maps/mapService";

export default function MapDisplay() {
    const ref = useRef(null)
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)
    
    useEffect(() => {
        if (ref.current) {
            setMapInstance(initMap(ref))
        }
    }, [ref])

    return <div ref={ref} id={"mainMap"} style={{
        width: "100%",
        height: "100%"
    }}/>
}