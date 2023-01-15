import {Ref} from "react";
import mapStyle from "./mapStyle";
import {createMarker} from "./mapMarkers";

//Google api key management :
//https://console.cloud.google.com/apis/credentials/key/266d720e-fb5b-4dff-8e32-ebceeb64f55f?project=getkeywords-157712
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