import { Ref } from "react";
import mapStyle from "./mapStyle";
import { createMarker } from "./mapMarkers";

export function initMap(mapRef: Ref<HTMLElement>): void {
    if (mapRef === null)
        return

    //@ts-ignore
    const mapRefValue: HTMLElement = mapRef?.current as HTMLElement

    const map = new google.maps.Map(
        mapRefValue,
        {
            zoom: 4,
            styles: mapStyle as google.maps.MapTypeStyle[]
        }
    );

    createMarker(map)
}
