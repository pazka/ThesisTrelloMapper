import mapStyle from "./mapStyle";
import {convertTrelloCardToMarker} from "./mapMarkers";
import {trelloFetchObserver$} from "../trello/trelloService";
import {Observable} from "rxjs";
import {allInfoWindows} from "./infoWindows";
import {initConstellationsFromInfoWindowData} from "./constellation";

let GoogleMapContext: google.maps.Map

export function getMap(): google.maps.Map {
    return GoogleMapContext
}

//Google api key management :
//https://console.cloud.google.com/apis/credentials/key/266d720e-fb5b-4dff-8e32-ebceeb64f55f?project=getkeywords-157712
export function initMap(mapRef: HTMLElement | null,callback : Function): google.maps.Map {
    if (!mapRef) return {} as google.maps.Map;

    if (GoogleMapContext) return GoogleMapContext;

    GoogleMapContext = new google.maps.Map(
        mapRef,
        {
            streetViewControl: false,
            mapTypeControl: false,
            zoom: 4,
            minZoom: 3, 
            maxZoom: 13,
            styles: mapStyle as google.maps.MapTypeStyle[],
            center: {lat: -25.363, lng: 131.044},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    );

    trelloFetchObserver$.subscribe({
            next: (data) => {
                console.log("starting global trello convertion ")
                data[0].forEach((card) => {
                    convertTrelloCardToMarker(GoogleMapContext, card);
                });
                
                initConstellationsFromInfoWindowData(allInfoWindows)
                
                callback(data[1])
            },
            error: error => console.error(error),
            complete: () => console.log("google sub trelloFetchObserver completed")
        }
    )

    return GoogleMapContext
}

export const googleMapObservable$ = new Observable<google.maps.Map>()
