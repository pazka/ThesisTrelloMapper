import {darken, lighten} from "@mui/material";

interface TrelloLabelsIconProps {
    labels: TrelloLabel[],
    className?: string,
    sx?: any
}

export function convertLabelToIconSvg(labels: TrelloLabel[], iconSize: number = 20): string {
    const svgString = `<svg viewBox="0 0 ${iconSize} ${iconSize}" xmlns='http://www.w3.org/2000/svg'>
        ${
        getCirclesForIcon(labels, iconSize).map((dim, index) =>
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
                                     sx
                                 }: TrelloLabelsIconProps) {
    if (labels.length === 0) return <></>

    const iconSize = 20;

    return <img {...{className,sx}} width={iconSize} src={convertLabelToIconSvg(labels,iconSize)} alt={"trello icon"}/>
}

function getCirclesForIcon(labels: TrelloLabel[], iconSize: number = 20) {
    const colors = labels.map(label => label.color)

    //create svg concentric circles for each color
    return colors.map((color, index) => {
        const i = colors.length - index;
        const radius = (i / colors.length * iconSize) / 2;
        const center = iconSize / 2;

        const normalizedColor = normalizeColor(color);

        //reduce the size at each iteration
        return {radius, center, normalizedColor}
    })
}

function normalizeColor(str: string, separator: string = "_"): string {
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