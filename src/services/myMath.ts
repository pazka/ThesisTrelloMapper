import {rgbToHex} from "@mui/material";

function sfc32(a: number, b: number, c: number, d: number) {
    return function () {
        a >>>= 0;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        var t = (a + b) | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        d = d + 1 | 0;
        t = t + d | 0;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

const textEncoder = new TextEncoder()
const rndGenerator = sfc32(0, 1, 2, 3)

export function getSeededRandomFromStr(str: string): number {
    const number = textEncoder.encode(str).reduce((acc, val) => acc + val, 0)
    return rndGenerator() * number
}

export function getTextColorFromBackgroundColor(backgroundColor: string): string {
    //if backgroundCOlor is in rgb format, convert to hex
    if (backgroundColor.startsWith("rgb")) {
        backgroundColor = rgbToHex(backgroundColor)
    }
    
    const color = backgroundColor.substring(1); // strip #
    const rgb = parseInt(color, 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >>  8) & 0xff;  // extract green
    const b = (rgb >>  0) & 0xff;  // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 100 ? '#fff' : '#000';
}