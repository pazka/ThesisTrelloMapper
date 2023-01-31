import {TrelloCard, TrelloCardCompiled} from "../../../types/TrelloCard";
import {InfoWindowData} from "./infoWindows";

let availableConstellations: { [lisName: string]: google.maps.Polyline }

function createPathFromInfoDataWithDijkstraAlgorithm(data: InfoWindowData[]): google.maps.LatLng[] {
    const path = []
    const positions = data.map((infoWindowData) => infoWindowData.marker.getPosition() as google.maps.LatLng)
    const start = positions[0]
    path.push(start)
    let current = start
    while (path.length < positions.length) {
        let minDistance = Infinity
        let minDistanceIndex = -1
        for (let i = 0; i < positions.length; i++) {
            const position = positions[i]
            if (path.includes(position)) {
                continue
            }
            const distance = google.maps.geometry.spherical.computeDistanceBetween(current, position)
            if (distance < minDistance) {
                minDistance = distance
                minDistanceIndex = i
            }
        }
        current = positions[minDistanceIndex]
        path.push(current)
    }
    
    return path
}

function createPolylineFromInfosWindows(data: InfoWindowData[]): google.maps.Polyline {
    const path = createPathFromInfoDataWithDijkstraAlgorithm(data)
    
    const polyline = new google.maps.Polyline({
        path,
        strokeColor: "#0000FF",
        strokeOpacity: 0.5,
        strokeWeight: 3
    });
    return polyline
}

export function initConstellationsFromInfoWindowData(data: InfoWindowData[]) {
    availableConstellations = {}
    for (const infoWindowData of data) {
        const listName = infoWindowData.card._compiled.listName
        if (!availableConstellations[listName]) {
            //get all cards from the same list
            const listData = data.filter((infoWindowData) => infoWindowData.card._compiled.listName === listName)
            availableConstellations[listName] = createPolylineFromInfosWindows(listData)
        }
    }
}

export function displayConstellation(listName: string, map: google.maps.Map,) {
    if (availableConstellations[listName]) {
        availableConstellations[listName].setMap(map)
    }
    
    //hide other constellations
    for (const tmplistName in availableConstellations) {
        if (tmplistName !== listName) {
            availableConstellations[tmplistName].setMap(null)
        }
    }
}