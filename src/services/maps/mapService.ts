import {Ref} from "react";
import mapStyle from "./mapStyle";
import {createMarker} from "./mapMarkers";


export function initMap(mapRef: HTMLElement): google.maps.Map {

    const map = new google.maps.Map(
        mapRef,
        {
            streetViewControl: false,
            mapTypeControl: false,
            zoom: 4,
            styles: mapStyle as google.maps.MapTypeStyle[],
            center: {lat: -25.363, lng: 131.044},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    );

    createMarker(map)
    return map
}