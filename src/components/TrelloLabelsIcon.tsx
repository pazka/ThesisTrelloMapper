import {darken, lighten} from "@mui/material";

interface TrelloLabelsIconProps {
    labels: TrelloLabel[],
    className?: string,
    sx?: any,
    iconSize?: number
}

export function convertLabelsToSvgUrl(labels: TrelloLabel[], iconSize: number = 20): string {

    let svgString = `<svg 
            width="${iconSize}px" 
            height = "${iconSize}px" 
            viewBox="0 0 ${iconSize} ${iconSize}" 
            xmlns='http://www.w3.org/2000/svg'
        >
        ${getCirclesForIcon(labels, iconSize).map((dim, index) =>
        `<circle 
                cx="${dim.center}" 
                cy="${dim.center}" 
                r="${dim.radius}" 
                fill="${dim.normalizedColor}" 
            />`
    ).join()
    }</svg>`

    const encodedSvgString = unescape(encodeURIComponent(svgString));
    var base64 = btoa(encodedSvgString).replace("==", "");
    return `data:image/svg+xml;utf8, ${svgString}`
}

export function TrelloLabelsIcon({
                                     labels = [],
                                     className,
                                     sx,
                                     iconSize = 20
                                 }: TrelloLabelsIconProps) {
    if (labels.length === 0) return <></>

    return <img {...{className, sx}} width={iconSize} src={convertLabelsToSvgUrl(labels, iconSize)}
                alt={"trello icon"}/>
}

function getCirclesForIcon(labels: TrelloLabel[], iconSize: number = 20) {

    //urgent label case
    const colors = labels.filter(l => l.name != "URGENT").map(label => label.color)

    const isUrgent = labels.some(label => label.name == "URGENT")

    // no label case
    if (colors.length === 0) return [{
        center: iconSize / 2,
        radius: iconSize / 2,
        normalizedColor: "rgb(0,0,255)"
    }, {
        center: iconSize / 2,
        radius: iconSize / 2 - 2,
        normalizedColor: "black"
    }]

    const circles: any[] = [{}]

    if (isUrgent) {
        circles.push({
            center: iconSize / 2,
            radius: iconSize / 2,
            normalizedColor: "rgb(255,0,0)"
        })
    }

    //create svg concentric circles for each color
    labels.forEach((label, index) => {
        const i = colors.length - index;
        const center = iconSize / 2;

        let radius = (i / colors.length * iconSize) / 2;
        if (isUrgent) radius = radius * 0.8;

        const normalizedColor = trelloColorToRGB(label.color);

        //reduce the size at each iteration
        circles.push({radius, center, normalizedColor})
    })

    return circles
}

export function trelloColorToRGB(str: string, separator: string = "_"): string {
    const parts = str.split(separator);
    const colorReversed = parts.reverse().join("");

    return standardColorNameToRGB(colorReversed)
}

function standardColorNameToRGB(colorName: string): string {
    const simpleColor = colorName.replace("dark", "").replace("light", "");
    const simpleColorToRgb: { [key: string]: string } = {
        blue: "rgb(0,121,191)",
        green: "rgb(97,189,79)",
        orange: "rgb(255,159,26)",
        purple: "rgb(195,119,224)",
        red: "rgb(235,90,70)",
        yellow: "rgb(242,214,0)",
        sky: "rgb(0,194,224)",
        lime: "rgb(81,232,152)",
        pink: "rgb(255,120,203)",
        black: "rgb(77,77,77)"
    }

    //color not present in the list
    if (!simpleColorToRgb[simpleColor]) return colorName;

    let colorRgb = simpleColorToRgb[simpleColor];

    //if the str contains "dark", darken the rgb color
    if (colorName.includes("dark")) {
        colorRgb = darken(colorRgb, 0.5);
    }
    if (colorName.includes("light")) {
        colorRgb = lighten(colorRgb, 0.5);
    }

    return colorRgb;
}