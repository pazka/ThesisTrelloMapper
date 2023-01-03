import { Ref } from "react";
import mapStyle from "./mapStyle";

export function initMap(mapRef: Ref<HTMLElement>): void {
    const uluru = { lat: -25.363, lng: 131.044 };
    if (mapRef === null)
        return

        //@ts-ignore
    const mapRefValue: HTMLElement = mapRef?.current as HTMLElement

    const map = new google.maps.Map(
        mapRefValue,
        {
            zoom: 4,
            center: uluru,
            styles: mapStyle as google.maps.MapTypeStyle[]
        }
    );

    const marker = new google.maps.Marker({
        position: uluru,
        map,
        title: "Uluru (Ayers Rock)",
    });

    
}
