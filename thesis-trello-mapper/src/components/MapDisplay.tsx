import { useEffect, useRef } from "react"
import { initMap } from "../services/map"

export default function MapDisplay() {
    const ref = useRef(null)
    useEffect(() => {
        if (ref.current){
            initMap(ref)
        }
    }, [ref])

    return <div ref={ref} style={{
        width: "100%",
        height: "100%"
    }} />
}