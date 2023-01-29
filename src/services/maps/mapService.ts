import mapStyle from "./mapStyle";
import {convertTrelloCardToMarker} from "./mapMarkers";
import {trelloFetchObserver$} from "../trello/trelloService";

let GoogleMapContext: google.maps.Map

export function getMap(): google.maps.Map {
    return GoogleMapContext
}

//Google api key management :
//https://console.cloud.google.com/apis/credentials/key/266d720e-fb5b-4dff-8e32-ebceeb64f55f?project=getkeywords-157712
export function initMap(mapRef: HTMLElement): google.maps.Map {

    GoogleMapContext = new google.maps.Map(
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

    trelloFetchObserver$.subscribe({
            next: (data) => {
                console.log(data)
                data[0].forEach((card) => {
                    convertTrelloCardToMarker(GoogleMapContext, card);
                });
            },
            error: error => console.error(error),
            complete: () => console.log("google sub trelloFetchObserver completed")
        }
    )

    return GoogleMapContext
}