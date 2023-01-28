import {TrelloCardCompiled} from "../trello/trelloService";
import {convertLabelToIconSvg} from "../../components/TrelloLabelsIcon";

const uluru = {lat: -25.363, lng: 131.044};


const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Uluru",
});

export function createMarker(map: google.maps.Map): google.maps.Marker {
    const marker = new google.maps.Marker({
        position: uluru,
        map,
        title: "Hello World!",
        "icon": {
            "url": "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        },
        "label": {
            "text": "A",
            "color": "white",
            "fontWeight": "bold"
        },
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });
    
    return marker
}

export function convertTrelloCardToMarker(map: google.maps.Map,card: TrelloCardCompiled): google.maps.Marker {
    //creat random location 
    const lat = Math.random() * 180 - 90;
    const lng = Math.random() * 360 - 180;
    
    const marker = new google.maps.Marker({
        position: {lat, lng},
        map,
        title: card.name,
        "icon": {
            "url": convertLabelToIconSvg(card.labels),
        },
        "label": {
            "text": card.name,
            "color": "white",
            "fontWeight": "bold"
        },
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });
    
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