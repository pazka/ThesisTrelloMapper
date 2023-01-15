import {Ref} from "react";
import mapStyle from "./mapStyle";
import {createMarker} from "./mapMarkers";
import {Loader} from "@googlemaps/js-api-loader";

//From https://www.npmjs.com/package/@googlemaps/js-api-loader

const loader = new Loader({
    apiKey: "AIzaSyCaYQ0yy76owBCbSktZL1vIBhfZEa4ibHQ",
    version: "weekly"
});

const mapOptions = {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 4
};

export async function initMap(mapRef: Ref<HTMLElement>): Promise<google.maps.Map | null> {
    if (mapRef === null)
        console.debug('mapRef is null, will not update the state')

    return await loader
        .load()
        .then((google) => {
            const map = new google.maps.Map(
                document.getElementById("mainMap") as HTMLElement,
                {
                    zoom: 4,
                    styles: mapStyle as google.maps.MapTypeStyle[]
                }
            );
            createMarker(map)
            return map
        })
        .catch(e => {
            console.error("Error loading map", e)
            return null
        });
}
