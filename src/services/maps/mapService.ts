import {Ref} from "react";
import mapStyle from "./mapStyle";
import {createMarker} from "./mapMarkers";


export function initMap(mapRef: HTMLElement): google.maps.Map {

    const map = new google.maps.Map(
        mapRef,
        {
            zoom: 4,
            styles: mapStyle as google.maps.MapTypeStyle[]
        }
    );

    createMarker(map)
    return map
}