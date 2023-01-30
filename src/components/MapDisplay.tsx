import {useEffect, useRef, useState} from "react"
import {googleMapObservable$, initMap} from "../services/maps/mapService";
import {useLocation} from "react-router-dom";
import {openAnInfoWindows} from "../services/maps/infoWindows";

export default function MapDisplay() {
    const location = useLocation()
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>();
    const [shouldCheck, setShouldCheck] = useState<boolean>(false);

    const openCardIfRouteMatch = () => {
        if (location.hash !== "") {
            openAnInfoWindows(location.hash.slice(1, location.hash.length))
        }
    }
        
    
    useEffect(() => {
        if (ref.current && !map) {
            console.log("map ref changed", ref.current)
            const map = initMap(ref.current,()=>{
                openCardIfRouteMatch()
            });
            if (map) {
                setMap(map);
            }
        }
    }, [ref, map])
    
    useEffect(() => {
        openCardIfRouteMatch()
    },[location])

    return <div ref={ref} id={"mainMap"} style={{
        width: "100%",
        height: "100%"
    }}/>
}