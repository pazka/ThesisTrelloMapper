import {TrelloCardCompiled} from "../trello/trelloService";
import {convertLabelsToSvgUrl, trelloColorToRGB} from "../../components/TrelloLabelsIcon";

const allInfoWindows: {id:string,marker : google.maps.Marker,elem: google.maps.InfoWindow }[] = [];

let currentOpenedInfoWindow: google.maps.InfoWindow;

function renderCardContent(card: TrelloCardCompiled): string {
    const labels = convertLabelsToSvgUrl(card.labels)

    return `
        <div class="map-card">
            <h1>
                ${card.name} <a href="${card.url}" target="_blank">🔗</a> 
            </h1>
            <div class="map-badges">
                ${card.labels.map((label: TrelloLabel) => `<div style="background-color: ${trelloColorToRGB(label.color)}">
                    ${label.name}
                </div>`).join(" ")}
            </div>
        </div>
    `
}

export function createNewInfoWindow(marker: google.maps.Marker, card: TrelloCardCompiled): google.maps.InfoWindow {
    const cardInfos = new google.maps.InfoWindow({
        content: renderCardContent(card),
        ariaLabel: card.name,
    })
    
    allInfoWindows.push({id: card.id,marker, elem: cardInfos});

    marker.addListener("click", () => {
        openAnInfoWindows(card.id);
    });
    
    return cardInfos;
}

export function openAnInfoWindows(id: string): void {
    const infoWindow = allInfoWindows.find(infoWindow => infoWindow.id === id);
    if (infoWindow) {
        infoWindow.elem.open({
            anchor: infoWindow.marker,
            map: infoWindow.marker.getMap(),
        });
        currentOpenedInfoWindow?.close()
        currentOpenedInfoWindow = infoWindow.elem;
    }
}