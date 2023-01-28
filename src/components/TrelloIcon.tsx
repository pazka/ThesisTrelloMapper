import {darken, lighten} from "@mui/material";

interface TrelloIconProps {
    labels: TrelloLabel[],
    className?  : string,
    sx ? : any
}

export default function TrelloIcon({
                                       labels = [],
                                       className,
                                       sx
                                   }: TrelloIconProps) {
    //get labels colors
    const colors = labels.map(label => label.color)
    const iconSize = 20;

    //create svg concentric circles for each color
    const svg = colors.map((color, index) => {
        const i = colors.length - index;
        const radius = (i / colors.length * iconSize) / 2;
        const center = iconSize / 2;

        const normalizedColor = normalizeColor(color);

        //reduce the size at each iteration
        return <circle key={i} cx={center} cy={center} r={radius} fill={normalizedColor}/>
    })

    if (svg.length === 0) return <></>

    return <svg viewBox={`0 0 ${iconSize} ${iconSize}`} {...{className, sx}}>
        {svg}
    </svg>
}

function normalizeColor(str: string, separator: string = "_"): string {
    const parts = str.split(separator);
    const colorReversed = parts.reverse().join("");

    return standardColorNameToRGB(colorReversed)
}

function standardColorNameToRGB(colorName: string): string {
    const simpleColor = colorName.replace("dark", "").replace("light", "");
    const simpleColorToRgb: { [key: string]: string } = {
        blue: "#0079BF",
        green: "#61BD4F",
        orange: "#FF9F1A",
        purple: "#C377E0",
        red: "#EB5A46",
        yellow: "#F2D600",
        sky: "#00C2E0",
        lime: "#51E898",
        pink: "#FF78CB",
        black: "#4D4D4D"
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