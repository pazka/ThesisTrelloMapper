import {convertLabelsToSvgUrl} from "../../components/TrelloLabelsIcon";
import {getSeededRandomFromStr} from "../myMath";
import {createNewInfoWindow} from "./infoWindows";
import {TrelloCardCompiled} from "../../../types/TrelloCard";

const allMarkers: google.maps.Marker[] = [];

function getRandomLatLngFromCard(card: TrelloCardCompiled): google.maps.LatLng {
    //creat random location 
    const fngX = (getSeededRandomFromStr(card.id) % 100) / 100;
    const fngY = (getSeededRandomFromStr(card.id) % 100) / 100;

    const lat = (fngX * 150) - 75;
    const lng = (fngY * 360) - 180;
    return new google.maps.LatLng(lat, lng)
}
export function convertTrelloCardToMarker(map: google.maps.Map, card: TrelloCardCompiled): google.maps.Marker {
    let position = getRandomLatLngFromCard(card);
    
    if(card._compiled.posTag) {
        position = new google.maps.LatLng(card._compiled.posTag.lat, card._compiled.posTag.lng)
    }
    
    const marker = new google.maps.Marker({
        map,
        position,
        title: card.name,
        icon: {
            url: convertLabelsToSvgUrl(card.labels, 20),
            labelOrigin: new google.maps.Point(0, 30),
        }
    });

    createNewInfoWindow(marker, card);
    
    allMarkers.push(marker);

    return marker
}


export function createPolygon(map: google.maps.Map, card: TrelloCardCompiled): google.maps.Polygon {
    const polygon = new google.maps.Polygon({
        paths: [
            {lat: -25.363, lng: 131.044},
            {lat: -25.363, lng: 131.044},
            {lat: -25.363, lng: 131.044},
            {lat: -25.363, lng: 131.044},
        ],
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });
    polygon.setMap(map);
    return polygon
}