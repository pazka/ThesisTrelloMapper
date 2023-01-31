import {TrelloCardCompiled} from "../../../types/TrelloCard";
import {convertLabelsToSvgUrl, trelloColorToRGB} from "../../components/TrelloLabelsIcon";
import {getTextColorFromBackgroundColor} from "../myMath";
import {TrelloChecklist} from "../../../types/TrelloChecklist";

const allInfoWindows: {
    card:TrelloCardCompiled,
    marker : google.maps.Marker,
    elem: google.maps.InfoWindow 
}[] = [];

let currentOpenedInfoWindow: google.maps.InfoWindow;

function capitalizeFirstLetters(str: string) {
    return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

function renderChecklistText(checklist: TrelloChecklist): string {
    return `
        <div>
            <h3>${checklist.name}</h3>
            <ul>
            ${checklist.checkItems.map((item) => `
                <li>
                    ${item.state === "complete" ? "✅" : "⬛"}
                    ${item.name}
                </li>
            `).join(" ")}
            </ul>
        </div>
    `
}

function renderCoverImage(card: TrelloCardCompiled): string {
    if(!card.cover) return ""
    
    return `
        <div class="map-cover-image" style="background-image: url(${card.cover?.idUploadedBackground})"></div>
    `
}
function renderCardContent(card: TrelloCardCompiled): string {
    const labels = convertLabelsToSvgUrl(card.labels)

    return `
        <div class="map-card">
            ${renderCoverImage(card)}
            <h1>
                ${capitalizeFirstLetters(card.name)} 
            </h1>
            <div class="map-badges">
                ${card.labels.map((label: TrelloLabel) => `<div style="
                    background-color:${trelloColorToRGB(label.color)};
                    color : ${getTextColorFromBackgroundColor(trelloColorToRGB(label.color))}
                "></div>`).join(" ")}
            </div>
            <div class="card-date">
                <span>${card.dateLastActivity ? `Dernière Activité : ${new Date(card.dateLastActivity).toDateString()}` : ""}</span>
                <span>${card.due ? `Deadline : ${new Date(card.due).toDateString()}` : ""}</span>
            </div>
            <a href="${card.url}" target="_blank">🔗 Link to trello</a> 
            <div class="map-description">
                ${card.desc}
            </div>
            <div>
                ${card._compiled.checklists?.map(renderChecklistText).join("\n")}
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

export function setCardsVisibilityByListId(idList: string,visibility:boolean): void {
    allInfoWindows.forEach(infoWindow => {
        if(infoWindow.card.idList === idList){
            infoWindow.marker.setVisible(visibility);
        }
    })
}

export function setVisibilityForAllList(visibility : boolean): void {
    allInfoWindows.forEach(infoWindow => {
        infoWindow.marker.setVisible(visibility);
    })
}

export function setVisibilityForOneList(idList: string,visibility : boolean): void {

    if(visibility && idOfSeenLists.length === 0) setVisibilityForAllList(false)
    
    if(!visibility && idOfSeenLists.includes(idList)){
        // remove id from list
        idOfSeenLists.splice(idOfSeenLists.indexOf(idList),1)
        setCardsVisibilityByListId(idList,false)
    }
    
    if(visibility && !idOfSeenLists.includes(idList)){
        // add id to list
        idOfSeenLists.push(idList)
        setCardsVisibilityByListId(idList,true)
    }
    
    if(idOfSeenLists.length === 0) return setVisibilityForAllList(true)
}

const idOfSeenLists : string[] = []