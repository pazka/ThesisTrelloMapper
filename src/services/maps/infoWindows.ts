import {TrelloCardCompiled} from "../trello/trelloService";
import {convertLabelsToSvgUrl, trelloColorToRGB} from "../../components/TrelloLabelsIcon";
import {getTextColorFromBackgroundColor} from "../myMath";

const allInfoWindows: {card:TrelloCardCompiled,marker : google.maps.Marker,elem: google.maps.InfoWindow }[] = [];

let currentOpenedInfoWindow: google.maps.InfoWindow;

function capitalizeFirstLetters(str: string) {
    return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}
function renderCardContent(card: TrelloCardCompiled): string {
    const labels = convertLabelsToSvgUrl(card.labels)

    return `
        <div class="map-card">
            <h1>
                ${capitalizeFirstLetters(card.name)} 
            </h1>
            <div class="map-badges">
                ${card.labels.map((label: TrelloLabel) => `<div style="
                    background-color:${trelloColorToRGB(label.color)};
                    color : ${getTextColorFromBackgroundColor(trelloColorToRGB(label.color))}
                ">
                    ${label.name}
                </div>`).join(" ")}
            </div>
            <a href="${card.url}" target="_blank">🔗 Link to trello</a> 
            <div class="map-description">
                ${card.desc}
            </div>
        </div>
    `
}

export function createNewInfoWindow(marker: google.maps.Marker, card: TrelloCardCompiled): google.maps.InfoWindow {
    const cardInfos = new google.maps.InfoWindow({
        content: renderCardContent(card),
        ariaLabel: card.name,
    })
    
    allInfoWindows.push({card,marker, elem: cardInfos});

    marker.addListener("click", () => {
        openAnInfoWindows(card.id);
    });
    
    return cardInfos;
}

export function openAnInfoWindows(id: string): void {
    const infoWindow = allInfoWindows.find(infoWindow => infoWindow.card.id === id);
    if (infoWindow) {
        infoWindow.elem.open({
            anchor: infoWindow.marker,
            map: infoWindow.marker.getMap(),
        });
        currentOpenedInfoWindow?.close()
        currentOpenedInfoWindow = infoWindow.elem;
        window.history.pushState(infoWindow.card.name, "","#"+id);
    }else{
        console.error("infoWindow not found", id);
    }
}