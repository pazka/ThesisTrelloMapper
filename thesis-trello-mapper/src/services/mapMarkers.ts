
    const uluru = { lat: -25.363, lng: 131.044 };

export function createMarker(map : google.maps.Map) : google.maps.Marker{
    return new google.maps.Marker({
        position: uluru,
        map,
        title: "Uluru (Ayers Rock)",
    });
}